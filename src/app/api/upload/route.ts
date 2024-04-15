import chalk from 'chalk'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

import { v4 as uuidv4 } from 'uuid'

import { r2 } from '@/lib/r2'

export async function POST(req: Request) {
  try {
    console.log(chalk.yellow(`Generating an upload URL!`))

    const fileKey = uuidv4()
    const signedUrl = await getSignedUrl(
      r2,
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: fileKey,
      }),
      { expiresIn: 60 }
    )

    return Response.json({ url: signedUrl, key: fileKey })
  } catch (err) {
    console.error('error')
    return Response.json({ message: 'Error fetching URL' }, { status: 500 })
  }
}
