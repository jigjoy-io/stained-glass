import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import LocalizedStrings from "react-localization";
import { useDispatch } from "react-redux";
import { useLanguage } from "../../util/store";
import useFileUpload from "../../util/file-upload";
import { blockingUpdated } from "../../reducers/toolbar-reducer";
import TemplateFactory from "../../factories/templates/template-factory";
import { updateBlock } from "../../reducers/page-reducer";
import { createPortal } from "react-dom";
import ClickOutsideListener from "../popover/click-outside-listener";
import Tabs from "../tabs/tabs";
import Tab from "../tabs/tab";
import Alert from "../alert/alert";
import Button from "../button/button";
import VideoEditingIcon from "../../icons/video-editing-icon";
import useFileChangeHandler from "../../util/handle-file-change";

let localization = new LocalizedStrings({
    US: {
        create: "Create",
        update: "Update",
        embedLink: "Embed link",
        uploadImage: "Upload reel",
        clickToUpload: "Click to upload reel",
        maxFileUpload: "Maximum reel size is 5mb.",
        fileTooLarge: "Reel is too large. Please upload a reel smaller than 5MB.",
        fileLoadSuccess: "You can start uploading your reel.",
        fileUploadedSuccessfully: "Your reel upload has finished!",
        uploadInProgress: "Upload in progress...",
        uploadError: "Error has occured during the upload!",
        clickToAdd: "Click to create."
    },
    RS: {
        create: "Kreiraj",
        update: "Promeni",
        embedLink: "Unesi link",
        uploadImage: "Promeni reel",
        clickToUpload: "Klikni da ubaciš reel",
        maxFileUpload: "Maksimalna velicina reel-a je 5mb.",
        fileTooLarge: "Reel je prevelik. Molimo vas da otpremite reel manji od 5MB.",
        fileLoadSuccess: "Možete započeti otpremanje reel-a.",
        fileUploadedSuccessfully: "Vaš reel je uspešno otpremljen!",
        uploadInProgress: "Otpremljivanje je u toku...",
        uploadError: "Greška prilikom otpremljivanja!",
        clickToAdd: "Klikni da kreiraš."
    }
})

export default function ReelConfigurer(props: any) {
    const [display, setDisplay] = useState(false)
    const [value, setValue] = useState(props.value)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState(false)
    const [fileUrl, setFileUrl] = useState<string | null>(null)

    const dispatch = useDispatch()
    const lang = useLanguage()
    localization.setLanguage(lang)

    const { file, fileAlert, handleFileChange, setFileAlert } = useFileChangeHandler(lang);
    const { handleFileUpload } = useFileUpload(setValue, "video");

    const triggerFileInput = () => {
        fileInputRef.current?.click()
    }

    const [top, setTop] = useState(window.innerHeight / 2)
    const [y, setY] = useState(0)

    const ref = useRef<HTMLDivElement>(null)

    const update = async () => {
        setLoading(true)
        try {
            let uploadedFileUrl = fileUrl

            if (file && !fileUrl) {
                setFileAlert({ type: "info", message: localization.uploadInProgress })
                uploadedFileUrl = await handleFileUpload(file)
                setFileUrl(uploadedFileUrl)
                setFileAlert({ type: "success", message: localization.fileUploadedSuccessfully })
            }

            const block = { ...props.block }
            block[props.attribute] = uploadedFileUrl || value
            dispatch(updateBlock(block))

        } catch (error) {
            setFileAlert({ type: "danger", message: localization.uploadError })
        } finally {
            setLoading(false)
        }
    }

    useLayoutEffect(() => {

        if (ref.current) {
            let contentRect = ref.current.getBoundingClientRect()

            if (contentRect.top + window.innerHeight / 2 > window.innerHeight) {
                setY(-100)
                setTop(contentRect.top)
            }
            else {
                setY(0)
                setTop(contentRect.top)
            }
        }


    }, [display])

    const openConfigurer = () => {
        setDisplay(true)
        dispatch(blockingUpdated(true))
    }

    const create = () => {
        dispatch(blockingUpdated(false))

        let block = TemplateFactory.createReelBlock(fileUrl)

        block.id = props.id;

        dispatch(updateBlock(block))
    }

    const turnOffPopup = () => {
        let block = JSON.parse(JSON.stringify(props))
        block.display = false
        dispatch(updateBlock(block))
    }

    const onClose = () => {

        dispatch(blockingUpdated(false))
        setDisplay(false)
        turnOffPopup()
    }

    useEffect(() => {

        window.onbeforeunload = function () {
            turnOffPopup()
            return true
        }

        return () => {
            window.onbeforeunload = null
        }

    }, [])

    return (
        <div>

            {display && createPortal(<ClickOutsideListener callback={onClose}>
                <div
                    style={{
                        width: 460,
                        pointerEvents: 'auto',
                        top: top,
                        transform: `translate(-25%, ${y}%)`
                    }}

                    className="fixed rounded-md bg-[white] rounded-lg rounded-[5px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] z-50 -translate-x-[25%] left-[50%]"

                >
                    <div className="p-[5%]">
                        <div>
                            <Tabs>
                                <Tab key={localization.uploadImage}>
                                    <div className="mb-2">
                                        <Alert type={fileAlert.type} message={fileAlert.message} />
                                    </div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        accept="video/*"
                                        style={{ display: 'none' }}
                                    />
                                    <Button width="w-full" text={localization.clickToUpload} color="default" action={triggerFileInput} />
                                    {file && !loading && <p className="mt-2 text-sm text-ellipsis overflow-hidden">{file.name}</p>}
                                </Tab>
                                <Tab key={localization.embedLink}>
                                    <input className="p-1 rounded-lg border w-[100%] mb-3" value={value} onChange={(e: any) => setValue(e.target.value)} />
                                </Tab>
                            </Tabs>
                            <Button text={localization.update} action={update} />
                        </div>
                        <div className="mt-[1rem]">
                            <Button width="w-full" text={localization.create} action={create} />
                        </div>
                    </div>
                </div>
            </ClickOutsideListener>, document.body)


            }

            <div
                ref={ref}
                onClick={openConfigurer}
                className="w-[100%] h-[50px] bg-default-light hover:bg-gray-300 cursor-pointer rounded-md flex items-center pl-5 hover:opacity-60"
            >
                <VideoEditingIcon />
                <div className="pl-2">{localization.clickToAdd}</div>
            </div>
        </div>
    )

}