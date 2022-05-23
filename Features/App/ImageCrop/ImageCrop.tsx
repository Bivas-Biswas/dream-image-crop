import React from 'react'

import ImageCropEle from './components/ImageCropEle'

import 'react-image-crop/dist/ReactCrop.css'

const ImageCrop = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="min-h-screen px-4 py-2 pb-24 w-max mx-auto min-w-[64rem] bg-white h-full shadow-lg">
        <ImageCropEle />
      </div>
    </div>
  )
}

export default ImageCrop

ImageCrop.layout = {
  hideNavbar: true,
  hideFooter: true,
  pageClassName: 'max-w-none',
}
