"use client";

import React from "react";

import { CldImage, CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { dataUrl, getImageSize } from "@/lib/utils";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import { toast } from "sonner";

type MediaUploaderProps = {
  onValueChange: (value: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setImage: React.Dispatch<any>;
  publicId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
  type: string;
};

const MediaUploader = ({
  onValueChange,
  setImage,
  image,
  publicId,
  type,
}: MediaUploaderProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onUploadSucessHandler = (result: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setImage((prevState: any) => ({
      ...prevState,
      publicId: result?.info?.public_id,
      width: result?.info?.width,
      height: result?.info?.height,
      secureURL: result?.info?.secure_url,
    }));

    onValueChange(result?.info?.public_id);

    toast("Image uploaded successfully");
  };

  const onUploadErrorHandler = () => {
    toast("Something went wrong while uploading");
  };
  return (
    <CldUploadWidget
      uploadPreset="sm_imaginify"
      options={{
        multiple: false,
        resourceType: "image",
      }}
      onSuccess={onUploadSucessHandler}
      onError={onUploadErrorHandler}
    >
      {({ open }) => (
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-[30px] leading-[140%]">Original</h3>

          {publicId ? (
            <>
              <div
                className="cursor-pointer overflow-hidden 
              rounded-[10px]"
              >
                <CldImage
                  width={getImageSize(type, image, "width")}
                  height={getImageSize(type, image, "height")}
                  src={publicId}
                  alt="image"
                  sizes={"(max-width: 767px) 100vw, 50vw"}
                  placeholder={dataUrl as PlaceholderValue}
                  className="h-fit min-h-72 w-full rounded-[10px] border border-dashed  object-cover p-2"
                />
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-72 cursor-pointer flex-col gap-5 rounded-2xl border border-dashed  shadow-inner" onClick={() => open()}>
              <div className="rounded-2xl  p-5 shadow-sm shadow-purple-200/50">
                <Image
                  src="/assets/icons/add.svg"
                  alt="Add Image"
                  width={24}
                  height={24}
                />
              </div>
              <p className="font-medium text-[14px] leading-[120%]">Click here to upload image</p>
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default MediaUploader;
