import classNames from 'classnames'
import FileSaver from 'file-saver'
import JSZip from 'jszip'
// @ts-ignore
import JSZipUtils from 'jszip-utils'
import React, { useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import ReactCrop, { PixelCrop } from 'react-image-crop'
import ScrollToBottom from 'react-scroll-to-bottom'
import { tw } from 'twind/style'

import {
  Cross2Icon,
  FileTextIcon,
  ListBulletIcon,
  UploadIcon,
} from '@radix-ui/react-icons'

import { Button } from '../../../../components/Theme/Button'
import { Input } from '../../../../components/Theme/Input'
import useDebounceEffect from '../../../../hooks/useDebounceEffect'
import { textTruncate } from '../../../../utils'
import formatBytes from '../../../../utils/formatBytes'
import { canvasPreview } from '../utils/canvasPreview'
import { imgPreview } from '../utils/imgPreview'

export type allImage = {
  imgUrl: string
  x: number
  y: number
  width: number
  height: number
}
const initialCropPxSettings: PixelCrop = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  unit: 'px',
}

const ImageCropEle = () => {
  const [imgSrc, setImgSrc] = useState<string>()
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [cropPx, setCropPx] = useState<PixelCrop>()
  const [cropPxSettings, setCropPxSettings] = useState<PixelCrop>(
    initialCropPxSettings
  )
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [aspect, setAspect] = useState<number | undefined>(undefined)
  const [previewSrc, setPreviewSrc] = useState<string | null>(null)
  const [allCropImage, setAllCropImage] = useState<allImage[]>([])
  const [uploadFiles, setUploadFiles] = useState<File[]>()
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [showImageListModal, setShowImageListModal] = useState<boolean>(true)
  const [initialUploadImage, setInitialUploadImage] = useState<{
    imgSrc?: string
    files?: File[]
  } | null>(null)
  const { getRootProps, getInputProps, open, isDragAccept, isDragReject } =
    useDropzone({
      // Disable click and keydown behavior
      noClick: true,
      noKeyboard: true,
      accept: {
        'image/*': ['.jpeg', '.png'],
      },
      onDrop: (acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
          const reader = new FileReader()
          reader.addEventListener('load', () => {
            setImgSrc(reader.result?.toString() || '')
            setInitialUploadImage((preState) => ({
              ...preState,
              imgSrc: reader.result?.toString() || '',
            }))
          })
          reader.readAsDataURL(acceptedFiles[0])
          setUploadFiles(acceptedFiles)
          setInitialUploadImage({
            ...initialUploadImage,
            files: acceptedFiles,
          })
          setAllCropImage([])
        }
      },
    })

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
          rotate
        )
        setPreviewSrc(
          await imgPreview(imgRef.current, completedCrop, scale, rotate)
        )
      }
    },
    100,
    [completedCrop, scale, rotate]
  )

  const handleToggleAspectClick = () => {
    if (aspect) {
      setAspect(undefined)
    } else {
      setAspect(16 / 9)
    }
  }

  const handleSelectCrop = async () => {
    if (
      previewSrc &&
      cropPx &&
      imgRef.current &&
      previewCanvasRef.current &&
      completedCrop
    ) {
      setScale(1)
      setRotate(0)
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
      let newCropPx: PixelCrop
      if (cropPxSettings.width > 0 || cropPxSettings.height > 0) {
        newCropPx = {
          ...cropPx,
          x: cropPx.x + cropPxSettings.x,
          y: cropPx.y + cropPxSettings.y,
          width: cropPxSettings.width,
          height: cropPxSettings.height,
        }
        setCropPx(newCropPx)
      } else {
        newCropPx = {
          ...cropPx,
          x: cropPx.x + cropPxSettings.x,
          y: cropPx.y + cropPxSettings.y,
        }
        setCropPx(newCropPx)
      }
      /*
       * why i call here this function
       * after update the crop settings
       * we have to update the canvas according to
       * the new crop settings
       * also need to update the image src
       * */
      await canvasPreview(
        imgRef.current,
        previewCanvasRef.current,
        newCropPx,
        scale,
        rotate
      )
      setPreviewSrc(await imgPreview(imgRef.current, newCropPx, scale, rotate))
    }
  }

  const handleImageLoad = async () => {
    if (imgRef.current && previewCanvasRef.current) {
      const newCropPx: PixelCrop = {
        x: imgRef.current.width / 4,
        unit: 'px',
        y: imgRef.current.height / 4,
        width: imgRef.current.width / 2,
        height: imgRef.current.height / 2,
      }
      setCropPx(newCropPx)
      await canvasPreview(
        imgRef.current,
        previewCanvasRef.current,
        newCropPx,
        scale,
        rotate
      )
      setPreviewSrc(await imgPreview(imgRef.current, newCropPx, scale, rotate))
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
        setAllCropImage((prevState) => [
          ...prevState,
          {
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

    imageData.forEach(function (url, index) {
      // loading a file and add it in a zip file
      JSZipUtils.getBinaryContent(url.imgUrl, function (err: any, data: any) {
        if (err) {
          throw err // or handle the error
        }
        count++
        imgFolder.file(`frame-${index + 1}.jpeg`, data, { binary: true })
        if (count === imageData.length) {
          zip.generateAsync({ type: 'blob' }).then(function (content) {
            FileSaver.saveAs(content, zipFilename)
          })
        }
      })
    })
  }

  const handleReset = () => {
    if (inputFileRef.current) inputFileRef.current.value = ''
    setImgSrc('')
    setUploadFiles(undefined)
    setCropPxSettings(initialCropPxSettings)
    setAllCropImage([])
    setScale(1)
    setRotate(0)
    setAspect(undefined)
    setInitialUploadImage(null)
  }

  const handleDeleteSingleImg = (id: number) => {
    const newAllImageCrop = allCropImage.filter((image, index) => id !== index)
    setAllCropImage(newAllImageCrop)
  }

  const handleBackToStart = async () => {
    if (initialUploadImage) {
      setImgSrc(initialUploadImage.imgSrc)
      setUploadFiles(initialUploadImage?.files)
    }
  }

  return (
    <div className="w-full">
      {allCropImage?.length !== 0 && (
        <div className="z-10 absolute right-4 fixed">
          <Button
            disabled={allCropImage.length === 0}
            onClick={() => setShowImageListModal(true)}
            className={`absolute ease-in-out duration-300 ${
              !showImageListModal
                ? 'translate-x-0  right-0'
                : 'translate-x-full -right-10'
            }`}
          >
            <ListBulletIcon className="w-6 h-6 mr-2" />
            Show All Image
          </Button>
          <div
            className={`flex flex-col relative right-0 space-y-2 max-h-full bg-white rounded py-4 shadow-lg ease-in-out duration-300 ${
              showImageListModal
                ? 'translate-x-0'
                : 'translate-x-full -right-10'
            }`}
          >
            <Cross2Icon
              onClick={() => setShowImageListModal(false)}
              className="hover:scale-[1.1] hover:block absolute -top-2 -left-4 cursor-pointer bg-white w-7 h-7 border-2 rounded-full border-gray-400 text-gray-400 hover:border-black hover:text-black"
            />
            <ScrollToBottom
              scrollViewClassName={
                'flex flex-col space-y-3 max-h-[500px] px-4 py-2 bg-gray-50'
              }
            >
              {allCropImage.map((img, index) => (
                <div
                  key={index}
                  className="group w-full relative cursor-pointer"
                >
                  <a
                    href={img.imgUrl}
                    target={'_blank'}
                    className="z-10"
                    rel="noreferrer"
                  >
                    <img
                      src={img.imgUrl}
                      alt=""
                      className="w-full group-hover:scale-[1.02] border-4 rounded"
                    />
                  </a>
                  <Cross2Icon
                    onClick={() => handleDeleteSingleImg(index)}
                    className="z-20 hover:scale-[1.1] invisible group-hover:visible absolute -top-2 -right-2 bg-white w-6 h-6 border-2 rounded-full border-gray-400 text-gray-400 hover:border-black hover:text-black"
                  />
                </div>
              ))}
            </ScrollToBottom>
            <p className="px-4">Total Frame: {allCropImage.length}</p>

            <div className="space-x-4 px-4">
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
          </div>
        </div>
      )}

      <div className="z-0 flex space-y-4 flex-col my-4">
        <div
          className={classNames(
            `rounded h-[10rem] justify-center py-4 flex flex-col space-y-4 items-center w-full border-dashed border-2 bg-gray-50 border-gray-300`,
            {
              'border-red-300 bg-red-50': isDragReject,
              'border-green-300 bg-green-50': isDragAccept,
              'border-indigo-500 bg-indigo-50':
                uploadFiles && uploadFiles?.length > 0,
            }
          )}
          {...getRootProps()}
        >
          <input {...getInputProps()} />

          <div>
            {uploadFiles ? (
              <div className="flex">
                <div className="flex gap-2 py-1 items-center rounded">
                  <FileTextIcon className="h-9 w-9" />
                  <div className="flex flex-col">
                    <p className="whitespace-nowrap">
                      {textTruncate(uploadFiles[0].name, 20, 10)}
                    </p>
                    <p className="text-xs text-gray-700">
                      {formatBytes(uploadFiles[0].size)}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xl">Drag and drop files here</p>
            )}
          </div>
          <div className="flex flex-row space-x-5 items-center">
            <Button
              className={tw(`flex justify-center space-x-3 items-center`)}
              onClick={open}
            >
              <UploadIcon className="h-5 w-5" />
              <p>Choose File</p>
            </Button>
            <Button
              variant="secondary"
              disabled={!imgSrc}
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </div>
        <div className="flex space-x-10 flex-row">
          <div className="flex space-y-4 flex-col w-1/2 shadow-lg px-4 py-8">
            <p className="text-center underline text-xl">Image Settings</p>
            <div>
              <Input
                label={`Scale : ${scale}`}
                min={-10}
                max={10}
                step={0.1}
                type={'range'}
                id="scale-input"
                value={scale}
                disabled={!imgSrc}
                className="px-2 py-1 border-gray-400 border-2"
                onChangeValue={(_value) => setScale(Number(_value))}
              />
            </div>
            <div>
              <Input
                id="rotate-input"
                value={rotate}
                min={-180}
                max={180}
                step={5}
                type={'range'}
                disabled={!imgSrc}
                className="px-2 py-1 border-gray-400 border-2"
                onChangeValue={(_value) =>
                  setRotate(Math.min(180, Math.max(-180, Number(_value))))
                }
                label={`Rotate : ${rotate}`}
              />
            </div>
          </div>
          <div className="flex space-y-4 flex-col w-1/2 shadow-lg px-4 py-8">
            <p className="text-center underline text-xl">Crop Settings</p>
            <div className="flex flex-row justify-between">
              <Input
                label={'Add Move-X :'}
                id="Move-X"
                value={String(cropPxSettings?.x)}
                type={'number'}
                disabled={!imgSrc}
                className="px-2 py-1 border-gray-400 border-2"
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
                id="Move-Y"
                type={'number'}
                value={String(cropPxSettings?.y)}
                disabled={!imgSrc}
                className="px-2 py-1 border-gray-400 border-2"
                onChangeValue={(_value) => {
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
            <div className="flex flex-row justify-between">
              <Input
                label={'Width :'}
                id="Width"
                type={'number'}
                value={String(cropPxSettings?.width)}
                disabled={!imgSrc}
                className="px-2 py-1 border-gray-400 border-2"
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
                id="Height"
                type={'number'}
                value={String(cropPxSettings?.height)}
                disabled={!imgSrc}
                className="px-2 py-1 border-gray-400 border-2"
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
              className="w-max"
              disabled={!imgSrc}
              onClick={handleSaveCropSettings}
            >
              Add Next
            </Button>
          </div>
        </div>
        <div className="flex flex-row space-x-4 relative">
          <div className="flex flex-row space-x-4">
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
            <Button
              onClick={handleBackToStart}
              variant={'secondary'}
              disabled={!initialUploadImage}
            >
              Back To Start
            </Button>
          </div>
          {cropPx && (
            <div className="absolute right-2 flex flex-col space-y-2">
              <div>
                Width: {cropPx?.width.toFixed(2)}, Height:
                {cropPx?.height.toFixed(2)}
              </div>
              <div>
                X: {cropPx?.x.toFixed(2)}, Y: {cropPx?.y.toFixed(2)}
              </div>
            </div>
          )}
        </div>
      </div>

      {Boolean(imgSrc) && (
        <div className="p-4 shadow-xl rounded-md w-[fit-content] mt-4">
          <ReactCrop
            ruleOfThirds
            crop={cropPx}
            keepSelection
            onChange={(pxCrop) => {
              setCropPx(pxCrop)
              // setCropPxSettings(pxCrop)
              setCompletedCrop(pxCrop)
            }}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
          >
            <img
              ref={imgRef}
              alt="Crop me"
              src={imgSrc}
              onLoad={handleImageLoad}
              className="w-full"
              style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
            />
          </ReactCrop>
        </div>
      )}
      {/* {previewSrc && <img alt="Crop preview" src={previewSrc} />} */}
      {imgSrc && (
        <>
          <p className="mx-2 my-4 text-lg">Crop Preview:</p>
          <canvas ref={previewCanvasRef} className="p-4 shadow-xl rounded-md" />
        </>
      )}
    </div>
  )
}

export default ImageCropEle
