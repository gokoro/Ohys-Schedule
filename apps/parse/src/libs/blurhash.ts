import { encode } from 'blurhash'
import sharp from 'sharp'
import got from 'got'

async function getImage(url: string) {
  return await got(url).buffer()
}

export const encodeImageToBlurhash = async (
  imageUrl: string
): Promise<string> => {
  const imageBuffer = await getImage(imageUrl)

  return new Promise((resolve, reject) => {
    sharp(imageBuffer)
      .raw()
      .ensureAlpha()
      .resize(32, 32, { fit: 'inside' })
      .toBuffer((err, buffer, { width, height }) => {
        if (err) return reject(err)
        resolve(encode(new Uint8ClampedArray(buffer), width, height, 4, 4))
      })
  })
}
