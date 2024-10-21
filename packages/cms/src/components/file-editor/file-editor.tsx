import React, { useRef, useState } from "react"
import useFileChangeHandler from "../../util/handle-file-change";
import useFileUpload from "../../util/file-upload";
import Tabs from "../tabs/tabs";
import Tab from "../tabs/tab";
import Alert from "../alert/alert";
import Button from "../button/button";
import { fileUpdate } from "../../util/file-update";
import Input from "../input/input";
import UrlValidator from "../../util/url-validator";

interface LocalizationStrings {
    update: string
    embedLink: string
    uploadFile: string
    clickToUpload: string
    maxFileUpload: string
    fileTooLarge: string
    fileLoadSuccess: string
    fileUploadedSuccessfully: string
    uploadInProgress: string
    uploadError: string
    embedLinkPlaceholder: string
    embedButton: string
}

interface FileEditorProps {
    value: string
    block: any
    fileType: "image" | "video" | "audio"
    localization: LocalizationStrings
    lang: "US" | "RS"
}

export default function FileEditor({ value, block, fileType, localization }: FileEditorProps) {
    const [localValue, setLocalValue] = useState<any>(value)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [fileAlert, setFileAlert] = useState<{ type: string, message: string } | null>(null)
    const [urlAlert, setUrlAlert] = useState<{ type: string, message: string } | null>(null)

    const handleFileChange = async (event) => {


        const selectedFile = event.target.files?.[0]
        if (selectedFile) {
            if (selectedFile.size > 5 * 1024 * 1024) {
                setFileAlert({ type: "danger", message: localization.fileTooLarge })
            } else {

                const uploadedFileUrl = await update(selectedFile, handleFileUpload, localValue)
                setLocalValue(uploadedFileUrl)
            }
        }
    }

    const { handleFileUpload } = useFileUpload(setLocalValue, fileType)



    const triggerFileInput = () => {
        fileInputRef.current?.click()
    }

    const { update, loading } = fileUpdate(block, setFileAlert, localization)

    const handleUrlUpdate = (url) => {
        if(UrlValidator.validate(fileType, url)){
            
        }else{
            setUrlAlert({type: 'danger', message: localization.uploadError})
        }
    }

    return (
        <div className="flex flex-col p-2 w-[300px] mt-4">
            {fileType === "image" && localValue && <img src={localValue} className="w-[100px] my-2 rounded-lg" alt="Uploaded" />}
            <Tabs>
                <Tab key={localization.uploadFile}>
                    {
                        fileAlert && <div className="mb-2">
                            <Alert type={fileAlert.type} message={fileAlert.message} />
                        </div>
                    }
                    <input
                        type="file"
                        key={value}
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept={`${fileType}/*`}
                        style={{ display: 'none' }}
                    />
                    <Button width="w-full" text={localization.clickToUpload} action={triggerFileInput} disabled={loading} />
                </Tab>
                <Tab key={localization.embedLink}>

                    {
                        urlAlert && <div className="mb-2">
                            <Alert type={urlAlert.type} message={urlAlert.message} />
                        </div>
                    }

                    <Input value={localValue} onChange={setLocalValue} placeholder={localization.embedLinkPlaceholder} />

                    <div className="mt-3">
                        <Button width="w-full" text={localization.embedButton} action={() => handleUrlUpdate(localValue)} />
                    </div>
                </Tab>
            </Tabs>

        </div>
    )
}