import { useRef, useState } from "react"
import Alert from "../../../components/alert/alert"
import { useRootPage } from "../../../util/store"
import AlertProps, { AlertType } from "../../../components/alert/alert-props"
import { FileTooLargeError } from "../../../util/errors/file-too-large-error"
import FileHelper from "../../../util/file-upload/file-upload"
import Button from "../../../components/button/button"

export default function FileUploader({
	mediaType,
	callback,
}: {
	mediaType: string
	callback: (filePath: string) => void
}) {
	const [uploading, setUploadingStatus] = useState(false)
	const rootPage = useRootPage()
	const [fileAlert, setFileAlert] = useState<AlertProps | null>(null)

	const fileInputRef = useRef<HTMLInputElement>(null)

	const triggerFileInput = () => {
		fileInputRef.current?.click()
	}

	const handleFileChange = async (event: any) => {
		const selectedFile = event.target.files?.[0]
		setUploadingStatus(true)
		setFileAlert({ type: AlertType.INFO, message: "Upload in progress.." })

		try {
			let filePath = await FileHelper.upload(selectedFile, rootPage.id)
			setFileAlert({ type: AlertType.SUCCESS, message: `Your ${mediaType} upload has finished!` })

			callback(filePath)
		} catch (err) {
			if (err instanceof FileTooLargeError) {
				setFileAlert({
					type: AlertType.DANGER,
					message: `${mediaType} is too large. Please upload a ${mediaType} smaller than 5MB.`,
				})
			}
		} finally {
			setUploadingStatus(false)
		}
	}

	return (
		<>
			{fileAlert && (
				<div className="mb-2">
					<Alert type={fileAlert.type} message={fileAlert.message} />
				</div>
			)}
			<input
				type="file"
				ref={fileInputRef}
				onChange={handleFileChange}
				accept={`${mediaType}/*`}
				style={{ display: "none" }}
			/>
			<Button width="w-full" text="Upload" action={triggerFileInput} disabled={uploading} />
		</>
	)
}
