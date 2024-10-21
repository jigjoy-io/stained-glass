import { useState } from "react"
import LocalizedStrings from "react-localization"

const localization = new LocalizedStrings({
    US: {
        fileTooLarge: "File is too large. Please upload a file smaller than 5MB."
    },
    RS: {
        fileTooLarge: "Fajl je prevelik. Molimo vas da otpremite fajl manji od 5MB."
    }
})

export default function useFileChangeHandler(language: string) {
    localization.setLanguage(language)

    const [file, setFile] = useState<File | null>(null)
    const [fileAlert, setFileAlert] = useState<{type: string, message: string} | null>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, callback) => {
        const selectedFile = event.target.files?.[0]
        if (selectedFile) {
            if (selectedFile.size > 5 * 1024 * 1024) {
                setFileAlert({ type: "danger", message: localization.fileTooLarge })
            } else {
                setFile(selectedFile)
                callback()
            }
        }
    }

    return {
        file,
        fileAlert,
        handleFileChange,
        setFileAlert,
    }
}
