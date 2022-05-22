import saveAs from 'file-saver'
import JSZip from 'jszip'
// @ts-ignore
import JSZipUtils from 'jszip-utils'
import React, { useRef, useState } from 'react'
import ReactCrop, { PixelCrop } from 'react-image-crop'

import { Button } from '../../../../components/Theme/Button'
import { Input } from '../../../../components/Theme/Input'
import useDebounceEffect from '../../../../hooks/useDebounceEffect'
import { canvasPreview } from '../utils/canvasPreview'
import { imgPreview } from '../utils/imgPreview'

export type allImage = {
  imgUrl: string
  id: number
  x: number
  y: number
  width: number
  height: number
}

const ImageCropEle = () => {
  const [imgSrc, setImgSrc] = useState('')
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [cropPx, setCropPx] = useState<PixelCrop>()
  const [cropPxSettings, setCropPxSettings] = useState<PixelCrop>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    unit: 'px',
  })
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [aspect, setAspect] = useState<number | undefined>(undefined)
  const [previewSrc, setPreviewSrc] = useState<string | null>(null)
  const [allCropImage, setAllCropImage] = useState<allImage[]>([])
  const [uploadFiles, setUploadFiles] = useState<FileList | null>(null)

  // console.log(crop)
  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || ''),
      )
      reader.readAsDataURL(e.target.files[0])
      setUploadFiles(e.target.files)
      setAllCropImage([])
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        await canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        )
        setPreviewSrc(
          await imgPreview(imgRef.current, completedCrop, scale, rotate),
        )
      }
    },
    100,
    [completedCrop, scale, rotate],
  )

  const handleToggleAspectClick = () => {
    if (aspect) {
      setAspect(undefined)
    } else if (imgRef.current) {
      setAspect(16 / 9)
    }
  }

  const handleSelectCrop = () => {
    if (previewSrc && cropPx) {
      setImgSrc(previewSrc)
      setAspect(undefined)
    }
  }

  const handleSaveCropSettings = async () => {
    if (
      cropPxSettings &&
      cropPx &&
      imgRef.current &&
      previewCanvasRef.current &&
      cropPx.x + cropPxSettings.x + cropPx.width <= imgRef.current.width &&
      cropPx.y + cropPxSettings.y + cropPx.height <= imgRef.current.height &&
      cropPx.x + cropPxSettings.x >= 0 &&
      cropPx.y + cropPxSettings.y >= 0
    ) {
      if (cropPxSettings.width > 0) {
        setCropPx({
          ...cropPx,
          x: cropPx.x + cropPxSettings.x,
          y: cropPx.y + cropPxSettings.y,
          width: cropPxSettings.width,
        })
      } else if (cropPxSettings.height > 0) {
        setCropPx({
          ...cropPx,
          x: cropPx.x + cropPxSettings.x,
          y: cropPx.y + cropPxSettings.y,
          height: cropPxSettings.height,
        })
      } else {
        setCropPx({
          ...cropPx,
          x: cropPx.x + cropPxSettings.x,
          y: cropPx.y + cropPxSettings.y,
        })
      }
      await canvasPreview(
        imgRef.current,
        previewCanvasRef.current,
        cropPx,
        scale,
        rotate,
      )
      setPreviewSrc(await imgPreview(imgRef.current, cropPx, scale, rotate))
    }
  }

  const handleAddImage = () => {
    if (imgRef.current && previewSrc && cropPx) {
      const isFound = allCropImage.some((img) => {
        return (
          cropPx.x === img.x &&
          cropPx.y === img.y &&
          cropPx.width === img.width &&
          cropPx.height === img.height
        )
      })

      if (!isFound) {
        setAllCropImage([
          ...allCropImage,
          {
            id: allCropImage.length + 1,
            imgUrl: previewSrc,
            x: cropPx.x,
            y: cropPx.y,
            width: cropPx.width,
            height: cropPx.height,
          },
        ])
      }
    }
  }

  const downloadAsZip = (imageData: allImage[]) => {
    if (!uploadFiles) return
    const zip = new JSZip()
    let count = 0
    const fileName = uploadFiles[0].name.split('.').slice(0, -1).join('.')
    const zipFilename = `${fileName}.zip`
    const imgFolder = zip.folder(fileName)

    if (!imgFolder) return

    imageData.forEach(function(url) {
      // loading a file and add it in a zip file
      JSZipUtils.getBinaryContent(url.imgUrl, function(err: any, data: any) {
        if (err) {
          throw err // or handle the error
        }
        count++
        imgFolder.file(`frame-${url.id}.jpeg`, data, { binary: true })
        if (count === imageData.length) {
          zip.generateAsync({ type: 'blob' }).then(function(content) {
            saveAs(content, zipFilename)
          })
        }
      })
    })
  }

  return (
    <div className='w-full'>
      <div className='flex flex-col absolute right-8 space-y-2 max-h-full px-2'>
        <div className='space-x-4'>
          <Button
            className={'w-max'}
            onClick={() => downloadAsZip(allCropImage)}
            disabled={allCropImage.length === 0}
          >
            Download All
          </Button>
          <Button
            className={'w-max'}
            variant={'secondary'}
            onClick={() => setAllCropImage([])}
            disabled={allCropImage.length === 0}
          >
            Clear All
          </Button>
        </div>
        <div className='flex flex-col-reverse space-y-2 overflow-y-scroll'>
          {allCropImage?.length !== 0 &&
            allCropImage.map((img) => (
              <img src={img.imgUrl} key={img.id} alt='' />
            ))}
        </div>
      </div>
      <div className='flex space-y-4 flex-col my-4'>
        <input type='file' accept='image/*' onChange={onSelectFile} />
        <div className='flex space-x-10 flex-row'>
          <div className='flex space-y-4 flex-col w-1/2 shadow-lg px-4 py-8'>
            <p className='text-center underline text-xl'>Image Settings</p>
            <div>
              <Input
                label={`Scale : ${scale}`}
                min={-10}
                max={10}
                step={0.5}
                type={'range'}
                id='scale-input'
                value={scale}
                disabled={!imgSrc}
                className='px-2 py-1 border-gray-400 border-2'
                onChangeValue={(_value) => setScale(Number(_value))}
              />
            </div>
            <div>
              <Input
                id='rotate-input'
                value={rotate}
                min={0}
                max={360}
                step={5}
                type={'range'}
                disabled={!imgSrc}
                className='px-2 py-1 border-gray-400 border-2'
                onChangeValue={(_value) =>
                  setRotate(Math.min(180, Math.max(-180, Number(_value))))
                }
                label={`Rotate : ${rotate}`}
              />
            </div>
          </div>
          <div className='flex space-y-4 flex-col w-1/2 shadow-lg px-4 py-8'>
            <p className='text-center underline text-xl'>Crop Settings</p>
            <div className='flex flex-row justify-between'>
              <Input
                label={'Add Move-X :'}
                id='Move-X'
                value={String(cropPxSettings?.x)}
                type={'number'}
                disabled={!imgSrc}
                className='px-2 py-1 border-gray-400 border-2'
                onChangeValue={(_value) => {
                  cropPxSettings &&
                  setCropPxSettings({
                    ...cropPxSettings,
                    x: parseInt(_value),
                  })
                }}
              />
              <Input
                label={'Add Move-Y :'}
                id='Move-Y'
                type={'number'}
                value={String(cropPxSettings?.y)}
                disabled={!imgSrc}
                className='px-2 py-1 border-gray-400 border-2'
                onChangeValue={(_value) => {
                  console.log(_value)
                  if (_value === '') {
                    setCropPxSettings({
                      ...cropPxSettings,
                      y: 0,
                    })
                  } else {
                    setCropPxSettings({
                      ...cropPxSettings,
                      y: parseInt(_value),
                    })
                  }
                }}
              />
            </div>
            <div className='flex flex-row justify-between'>
              <Input
                label={'Width :'}
                id='Width'
                type={'number'}
                value={String(cropPxSettings?.width)}
                disabled={!imgSrc}
                className='px-2 py-1 border-gray-400 border-2'
                onChangeValue={(_value) =>
                  cropPxSettings &&
                  setCropPxSettings({
                    ...cropPxSettings,
                    width: parseInt(_value),
                  })
                }
              />
              <Input
                label={'Height :'}
                id='Height'
                type={'number'}
                value={String(cropPxSettings?.height)}
                disabled={!imgSrc}
                className='px-2 py-1 border-gray-400 border-2'
                onChangeValue={(_value) =>
                  cropPxSettings &&
                  setCropPxSettings({
                    ...cropPxSettings,
                    height: parseInt(_value),
                  })
                }
              />
            </div>
            <Button
              className='w-max'
              disabled={!imgSrc}
              onClick={handleSaveCropSettings}
            >
              Add Next
            </Button>
          </div>
        </div>
        <div className='flex flex-row space-x-4 relative'>
          <div className='flex flex-row space-x-4'>
            <Button
              onClick={handleAddImage}
              variant={'secondary'}
              disabled={!imgSrc}
            >
              Add Image
            </Button>
            <Button
              onClick={handleSelectCrop}
              variant={'secondary'}
              disabled={!imgSrc}
            >
              Select Crop
            </Button>
            <Button
              onClick={handleToggleAspectClick}
              variant={'secondary'}
              disabled={!imgSrc}
            >
              Toggle aspect {aspect ? 'off' : 'on'}
            </Button>
          </div>
          {cropPx && (
            <div className='absolute right-2 flex flex-col space-y-2'>
              <div>
                width: {cropPx?.width.toFixed(2)}, height:
                {cropPx?.height.toFixed(2)}
              </div>
              <div>
                x: {cropPx?.x.toFixed(2)}, y: {cropPx?.y.toFixed(2)}
              </div>
            </div>
          )}
        </div>
      </div>

      {Boolean(imgSrc) && (
        <ReactCrop
          ruleOfThirds
          crop={cropPx}
          onChange={(pxCrop) => {
            setCropPx(pxCrop)
            // setCropPxSettings(pxCrop)
          }}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={aspect}
        >
          <img
            ref={imgRef}
            alt='Crop me'
            src={imgSrc}
            className='w-full'
            style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
          />
        </ReactCrop>
      )}
      {/* {previewSrc && <img alt="Crop preview" src={previewSrc} />} */}
      <canvas ref={previewCanvasRef} />
    </div>
  )
}

export default ImageCropEle
