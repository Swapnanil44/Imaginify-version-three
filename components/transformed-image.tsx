"use client"
import { dataUrl, debounce, download, getImageSize } from '@/lib/utils'
import { CldImage, getCldImageUrl } from 'next-cloudinary'
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import React from 'react'

const TransformedImage = ({
    image,
    type,
    title,
    isTransforming,
    setIsTransforming,
    transformationConfig,
    hasDownload = false
}: TransformedImageProps) => {
    const downloadHandler =(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=> {
       e.preventDefault();
       
       download(getCldImageUrl({
        width: image?.width,
        height: image?.height,
        src: image?.publicId,
        ...transformationConfig
       }), title)
    }

  return (
    <div className='flex flex-col gap-4'>
        <div className='flex justify-between items-center'>
            <h3 className='font-bold text-[30px] leading-[140%]'>
                Transformed
            </h3>


            {hasDownload && (
                <button 
                    className='p-14-medium mt-2 flex items-center gap-2 px-2'
                    onClick={downloadHandler}
                >
                <Image
                    src="/assets/icons/download.svg"
                    alt="download"
                    width={24}
                    height={24}
                    className='pb-1.5'
                />
                </button>
            )}
        </div>

        {image?.publicId && transformationConfig ? (
            <div className='relative'>
                <CldImage
                  width={getImageSize(type, image, "width")}
                  height={getImageSize(type,image,"height")}
                  src={image?.publicId}
                  alt={image.title || "Transformed Image"}
                  sizes={"(max-width: 767px) 100vw, 50vw"}
                  placeholder={dataUrl as PlaceholderValue}
                  className='h-fit min-h-72 w-full rounded-[10px] border border-dashed bg-purple-100/20 object-cover p-2 z-0'
                  onLoad={() => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    setIsTransforming && setIsTransforming(false);
                  }}
                  onError={() => {
                    debounce(()=>{
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                     setIsTransforming && setIsTransforming(false);
                    },8000)()
                  }}
                  {...transformationConfig}
                />

                {isTransforming && (
                    <div className='flex justify-center items-center absolute left-[50%] top-[50%] size-full -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded-[10px] border'>
                        <Image
                            src="/assets/icons/spinner.svg"
                            width={50}
                            height={50}
                            alt="Transforming"
                        />
                        <p className='text-white/80'>Please wait...</p>
                    </div>
                )}
            </div>
        ):(
            <div className='flex justify-center items-center p-14-medium h-full min-h-72 flex-col gap-5 rounded-2xl border border-dashed  shadow-inner'>
                Transformed Image
            </div>
        )}
    </div>
  )
}

export default TransformedImage