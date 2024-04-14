import FilePreview from '@/components/file-preview'

export default async function FilePage({ params }: { params: { id: string } }) {
  const id = params.id
  return (
    <div className='flex h-full items-center justify-center mt-20'>
      <FilePreview fileId={id} />
    </div>
  )
}
