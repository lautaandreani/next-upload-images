'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Icons from './icons'

const FilePreview = ({ fileId }: { fileId: string }) => {
  const [fileUrl, setFileUrl] = useState('')

  useEffect(() => {
    fetch(`/api/upload/${fileId}`).then(async (res) => {
      const blob = await res.blob()
      setFileUrl(window.URL.createObjectURL(blob))
    })
  }, [])

  const onClickShare = () => {
    const clipboard = window.navigator.clipboard
    if (clipboard) {
      clipboard.writeText(window.location.href)
    }
  }

  if (fileUrl) {
    return (
      <div>
        <section className='max-w-md p-2 rounded-md bg-dark-charcoal-2 min-h-[30rem] min-w-[50rem] relative flex items-center'>
          <Image
            src={fileUrl}
            alt='file url image preview'
            width={1100}
            height={1600}
            className='rounded-[4px] object-cover aspect-video'
          />
        </section>

        <div className='flex w-full justify-center items-center mt-6'>
          <button
            type='button'
            className='flex gap-2 items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
            onClick={onClickShare}
          >
            <Icons.external_link />
            Share
          </button>
          <a
            role='button'
            href={fileUrl}
            download={fileId}
            className=' flex gap-2 items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
          >
            <Icons.download />
            Download
          </a>
        </div>
      </div>
    )
  }

  return null
}

export default FilePreview
