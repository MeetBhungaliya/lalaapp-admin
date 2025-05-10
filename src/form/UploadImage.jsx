import { CLOSE_ICON2, GALLERY_ICON } from "@/lib/images";
import { cn } from "@/lib/utils";
import { get } from "lodash";
import React from "react";
import { useDropzone } from "react-dropzone";
import { Controller, useFormContext } from "react-hook-form";

export const UploadImage = ({ name, label, className, ...other }) => {
  const { control } = useFormContext();
  const { getInputProps } = useDropzone({
    multiple: false,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
    },
    ...other,
  });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState: { errors } }) => {
        console.log('field: ', field?.value);
        const fieldError = get(errors, name);
        return (
          <div className={className}>
            {label && (
              <label className="text-primary font-semibold text-sm sm:text-base md:text-lg">
                {label}
              </label>
            )}
            {!field.value ? (
              <div
                className={cn(
                  "flex flex-col items-center justify-center bg-ternary rounded-[8px] py-6 cursor-pointer",
                  fieldError?.message
                    ? "border border-red-500"
                    : "focus-visible:ring-main"
                )}
                onClick={() =>
                  document.getElementById(`upload-${name}`).click()
                }
              >
                <div>
                  <span className=" rounded-full flex items-center justify-center">
                    <img src={GALLERY_ICON} alt="GALLERY_ICON" />
                  </span>
                </div>
                <div className="text-secondary text-base sm:text-lg font-normal">
                  Add Image
                </div>
                <input
                  {...getInputProps()}
                  className="hidden"
                  id={`upload-${name}`}
                />
              </div>
            ) : (
              <div
                className={cn(
                  "flex items-center justify-center bg-[#F5F6FA] h-[120px] px-4.5 rounded-[8px] relative",
                  fieldError?.message
                    ? "border border-red-500"
                    : "focus-visible:ring-main"
                )}
              >
                <div className="flex items-center gap-2">
                  <span className=" rounded-full flex items-center justify-center ">
                    <img
                      src={
                        typeof field.value === "string"
                          ? field.value
                          : field.value?.preview || URL.createObjectURL(field.value)
                      }
                      alt="image"
                      className="object-cover max-w-[64px] max-h-[82px]"
                    />
                  </span>
                </div>
                <div
                  className="absolute -top-2 -right-2"
                  onClick={() => field.onChange(null)}
                >
                  <img
                    src={CLOSE_ICON2}
                    alt="CLOSE_ICON2"
                    className="size-8 cursor-pointer"
                  />
                </div>
              </div>
            )}
            {fieldError?.message && (
              <div className="pt-1 pl-3 text-xs sm:text-sm font-normal text-red-500">
                {fieldError.message}
              </div>
            )}
          </div>
        );
      }}
    />
  );
};
