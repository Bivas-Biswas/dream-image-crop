import React from 'react'

import ImageCropEle from './components/ImageCropEle'

import 'react-image-crop/dist/ReactCrop.css'

const ImageCrop = () => {
  return (
    <div className="mb-24 w-max mx-auto min-w-[64rem]">
      <ImageCropEle />
    </div>
  )
}

export default ImageCrop

ImageCrop.layout = {
  hideNavbar: true,
  hideFooter: true,
  pageClassName: 'max-w-none',
}
