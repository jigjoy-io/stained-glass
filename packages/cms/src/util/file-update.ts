import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateBlock } from '../reducers/page-reducer'

export const fileUpdate = (block, setFileAlert, localization) => {
	const [fileUrl, setFileUrl] = useState(null)
	const [loading, setLoading] = useState(false)
	const dispatch = useDispatch()

	const update = async (file, handleFileUpload, localValue) => {
		
		setLoading(true)

		try {

			let uploadedFileUrl = fileUrl

			if (file) {
				setFileAlert({ type: "info", message: localization.uploadInProgress })
				uploadedFileUrl = await handleFileUpload(file)
				setFileUrl(uploadedFileUrl)
				setFileAlert({ type: "success", message: localization.fileUploadedSuccessfully })
			}

			const updatedBlock = { ...block, source: uploadedFileUrl || localValue }
			dispatch(updateBlock(updatedBlock))

			return uploadedFileUrl

		} catch (error) {
			console.error("Error in update function:", error)
			setFileAlert({ type: "danger", message: localization.uploadError })
		} finally {
			setLoading(false)
		}
	}

	return { update, loading, fileUrl }
}