import { PixelCrop } from 'react-image-crop'

import { canvasPreview } from './canvasPreview'

let previewUrl = ''

const toBlob = (canvas: HTMLCanvasElement) => {
  return new Promise((resolve) => {
    canvas.toBlob(resolve)
  })
}

// Returns an image source you should set to state and pass
// `{previewSrc && <img alt="Crop preview" src={previewSrc} />}`
export const imgPreview = async (
  image: HTMLImageElement,
  crop: PixelCrop,
  scale = 1,
  rotate = 0
) => {
  const canvas = document.createElement('canvas')
  await canvasPreview(image, canvas, crop, scale, rotate)

  const blob = await toBlob(canvas)

  if (blob instanceof Blob) {
    previewUrl = URL.createObjectURL(blob)
  }
  return previewUrl
}
