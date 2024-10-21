import React, { useRef, useState } from "react"
import useFileChangeHandler from "../../util/handle-file-change";
import useFileUpload from "../../util/file-upload";
import Tabs from "../tabs/tabs";
import Tab from "../tabs/tab";
import Alert from "../alert/alert";
import Button from "../button/button";
import { fileUpdate } from "../../util/file-update";

interface LocalizationStrings {
    update: string;
    embedLink: string;
    uploadFile: string;
    clickToUpload: string;
    maxFileUpload: string;
    fileTooLarge: string;
    fileLoadSuccess: string;
    fileUploadedSuccessfully: string;
    uploadInProgress: string;
    uploadError: string;
};

interface FileEditorProps {
    value: string;
    block: any;
    fileType: "image" | "video" | "audio";
    localization: LocalizationStrings;
    lang: "US" | "RS",
}

export default function FileEditor({ value, block, fileType, localization, lang }: FileEditorProps) {
    const [localValue, setLocalValue] = useState(value)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const { file, fileAlert, handleFileChange, setFileAlert } = useFileChangeHandler(lang)
    const { handleFileUpload } = useFileUpload(setLocalValue, fileType)

    const triggerFileInput = () => {
        fileInputRef.current?.click()
    }

    const { update, loading } = fileUpdate(block, setFileAlert, localization);

    const handleUpdate = () => {
        update(file, handleFileUpload, localValue);
    }

    return (
        <div className="flex flex-col p-2 w-[300px] mt-4">
            {fileType === "image" && <img src={value} className="w-[100px] my-2 rounded-lg" alt="Uploaded" />}
            <Tabs>
                <Tab key={localization.uploadFile}>
                    <div className="mb-2">
                        <Alert type={fileAlert.type} message={fileAlert.message} />
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept={`${fileType}/*`}
                        style={{ display: 'none' }}
                    />
                    <Button width="w-full" text={localization.clickToUpload} color="default" action={triggerFileInput} />
                    {file && !loading && <p className="mt-2 text-sm text-ellipsis overflow-hidden">{file.name}</p>}
                </Tab>
                <Tab key={localization.embedLink}>
                    <input
                        className="p-1 rounded-lg border w-full mb-3"
                        value={localValue}
                        onChange={(e) => setLocalValue(e.target.value)}
                    />
                </Tab>
            </Tabs>
            <Button text={localization.update} action={handleUpdate} />
        </div>
    )
}