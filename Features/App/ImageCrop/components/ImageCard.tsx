import React from 'react'
import { tw } from 'twind/style'

import { Cross2Icon } from '@radix-ui/react-icons'

type ImageCardTypes = {
  imageUrl: string
  handleDeleteSingleImg: (_cardNo: number) => void
  cardNo: number
  imgClassName?: string
  wrapperClassName?: string
}
const ImageCard = (props: ImageCardTypes) => {
  const {
    cardNo,
    imageUrl,
    handleDeleteSingleImg,
    wrapperClassName,
    imgClassName,
  } = props
  return (
    <div
      className={tw('group w-full relative cursor-pointer', wrapperClassName)}
    >
      <a href={imageUrl} target={'_blank'} className="z-10" rel="noreferrer">
        <img
          src={imageUrl}
          alt=""
          className={tw(
            'w-full group-hover:scale-[1.02] border-4 rounded',
            imgClassName
          )}
        />
      </a>
      <Cross2Icon
        onClick={() => handleDeleteSingleImg(cardNo)}
        className="z-20 hover:scale-[1.1] invisible group-hover:visible absolute -top-2 -right-2 bg-white w-6 h-6 border-2 rounded-full border-gray-400 text-gray-400 hover:border-black hover:text-black"
      />
    </div>
  )
}

export default ImageCard
