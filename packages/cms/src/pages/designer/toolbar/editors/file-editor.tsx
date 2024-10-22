import React, { useRef, useState } from "react"
import Tabs from "../../../../components/tabs/tabs"
import Tab from "../../../../components/tabs/tab"
import Alert from "../../../../components/alert/alert"
import Button from "../../../../components/button/button"
import Input from "../../../../components/input/input"
import UrlValidator from "../../../../util/file-upload/url-validator"
import { useRootPage } from "../../../../util/store"
import FileUploadHelper from "../../../../util/file-upload/file-upload"

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
    const [filePath, setFilePath] = useState<any>(value)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [fileAlert, setFileAlert] = useState<{ type: string, message: string } | null>(null)
    const [urlAlert, setUrlAlert] = useState<{ type: string, message: string } | null>(null)

    const [uploading, setUploadingStatus] = useState(false)
	const rootPage = useRootPage()

    const handleFileChange = async (event) => {


        const selectedFile = event.target.files?.[0]

        setUploadingStatus(true)

		try {
			let filePath = await FileUploadHelper.upload(selectedFile, rootPage.id)
			setFilePath(filePath)
		} catch (error) {
			setUploadingStatus(false)
		}
    }



    const triggerFileInput = () => {
        fileInputRef.current?.click()
    }

    const handleUrlUpdate = (url) => {
        if(UrlValidator.validate(fileType, url)){
            
        }else{
            setUrlAlert({type: 'danger', message: localization.uploadError})
        }
    }

    return (
        <div className="flex flex-col p-2 w-[300px] mt-4">
            {fileType === "image" && filePath && <img src={filePath} className="w-[100px] my-2 rounded-lg" alt="Uploaded" />}
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
                    <Button width="w-full" text={localization.clickToUpload} action={triggerFileInput} disabled={uploading} />
                </Tab>
                <Tab key={localization.embedLink}>

                    {
                        urlAlert && <div className="mb-2">
                            <Alert type={urlAlert.type} message={urlAlert.message} />
                        </div>
                    }

                    <Input value={filePath} onChange={setFilePath} placeholder={localization.embedLinkPlaceholder} />

                    <div className="mt-3">
                        <Button width="w-full" text={localization.embedButton} action={() => handleUrlUpdate(filePath)} />
                    </div>
                </Tab>
            </Tabs>

        </div>
    )
}