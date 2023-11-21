import axios from 'axios'

const CLOUD_NAME = 'dfbib0vvt'
const CLOUD_UPLOAD_PRESET = 'my-uploads'

export const uploadImage = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', CLOUD_UPLOAD_PRESET)
  try {
    const response = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data.secure_url
  } catch (error) {
    throw error
  }
}
