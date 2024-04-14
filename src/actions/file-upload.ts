export const uploadToR2 = async (formData: FormData) => {
  const file = formData.get('file') as File

  if (!file) return null

  const response = await fetch('/api/upload', {
    method: 'POST',
  })

  const { url, key } = await response.json()
  await fetch(url, {
    method: 'PUT',
    body: file,
  })

  return key
}
