import chalk from 'chalk'
import { GetObjectCommand } from '@aws-sdk/client-s3'

import { r2 } from '@/lib/r2'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = params.id
  try {
    console.log(chalk.yellow(`Retrieving file from R2!`))

    const file = await r2.send(
      new GetObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: id,
      })
    )

    if (!file) {
      throw new Error('file not found.')
    }

    return new Response(file.Body?.transformToWebStream(), {
      headers: {
        'Content-Type': file.ContentType ?? 'image/jpeg',
      },
    })
  } catch (err) {
    console.log('error', err)
    return Response.json({ message: 'Error Retrieving file' }, { status: 500 })
  }
}
