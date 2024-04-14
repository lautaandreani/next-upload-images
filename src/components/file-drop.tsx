'use client'
import Image from 'next/image'

import { uploadToR2 } from '@/actions/file-upload'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'

const FileDrop = () => {
  const [file, setFile] = useState<File>()
  const [isLoading, setIsLoading] = useState<boolean | null>(null)
  const router = useRouter()

  const uploadAndRedirect = async (formData: FormData) => {
    setIsLoading(true)
    try {
      const key = await uploadToR2(formData)
      router.push(`/files/${key}`)
    } catch (error) {
      console.log('uploadAndRedirect error', error)
    }
  }

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const currentFile = event.target.files[0]
        const formData = new FormData()
        formData.append('file', event.target.files[0])
        setFile(currentFile)
        uploadAndRedirect(formData)
      }
    },
    [file]
  )

  if (isLoading) {
    return (
      <div className='max-w-md p-2 rounded-md bg-dark-charcoal-2 min-h-[10rem] min-w-[50rem] py-8 relative'>
        <h3 className='text-white text-center'>
          <strong>Uploading</strong>, please wait...
        </h3>

        <div className='w-[80%] mx-auto mt-10 h-2 bg-gray-200 rounded-full overflow-hidden bg-charcoal-gray relative'>
          <div className='w-full h-full bg-blue-500 animate-progress rounded-full absolute'></div>
        </div>
      </div>
    )
  }

  return (
    <form className='max-w-md p-2 rounded-md bg-dark-charcoal-2 min-h-[30rem] min-w-[50rem] relative'>
      <input
        type='file'
        id='file-input'
        name='file'
        className='invisible absolute'
        accept='image/jpeg image/png'
        onChange={handleFileChange}
      />
      <label
        htmlFor='file-input'
        className='border-dashed border border-charcoal-gray absolute rounded-sm inset-4 p-2 flex flex-col gap-4 items-center justify-center cursor-pointer'
      >
        <Image src='/exit.svg' alt='upload file icon' height={40} width={40} />
        <div className='text-center'>
          <p className='text-soft-white'>
            Drag & drop a file or <span className='text-primary-blue'>browse files</span>
          </p>

          <small className='font-light text-off-white'>JPG, PNG or GIF - Max file size 2MB</small>
        </div>
      </label>
    </form>
  )
}

export default FileDrop
