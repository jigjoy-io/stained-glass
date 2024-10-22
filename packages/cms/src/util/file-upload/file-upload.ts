import { uploadDocument } from "../../api/upload"

export default class FileUploadHelper{

    static fileToBase64 = (file: File, ): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = error => reject(error)
        })
    }

    static isValid = (file) => {

        if(!file)
            throw new Error('Missing file.')

        if(file.size > 5 * 1024 * 1024)
            throw new Error('File to large.')

        return true

    }

    static upload = async (file: File,  rootPageId) => {

        if(this.isValid(file)){

            try {
                const base64 = await FileUploadHelper.fileToBase64(file)
                const response = await uploadDocument({
                    file: base64,
                    name: file.name,
                    type: file.type,
                    rootPageId: rootPageId,
                })
    
                return response.filePath
            } catch (error) {
                throw error
            }
        }


    }
}