import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FormProvider from "@/form/FormProvider";
import { CLOSE_ICON, CLOSE_SECONDARY_ICON, LEVEL_ICON } from "@/lib/images";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LetterSoundsSchema } from "@/lib/schema";
import React, { useEffect } from "react";
import Button from "@/components/custom/Button";
import TextField from "@/form/TextField";
import SoundField from "@/form/SoundField";
import { UploadImage } from "@/form/UploadImage";
import RichTextEditor from "@/form/RichTextEditor";
import { cn } from "@/lib/utils";

const LetterSoundsModal = ({ open, setOpen }) => {
  const defaultValues = {
    level: "",
    sound: "",
    image: "",
    script: "",
  };

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(LetterSoundsSchema),
  });
  const { handleSubmit, setValue, watch, reset } = methods;

  useEffect(() => {
    if (!open?.data) return;
    console.log("open?.data: ", open?.data);

    reset({
      level: open?.data?.row?.level ?? "",
      sound: "https://file-examples.com/storage/feba78aab06819c7996c057/2017/11/file_example_MP3_700KB.mp3" ?? "",
      image: open?.data?.row?.image ?? "",
      script: open?.data?.row?.script ?? "",
    });
  }, [open?.data]);

  // Watch the values of sound and image
  const soundValue = watch("sound");
  const imageValue = watch("image");

  // Determine flex direction
  const isAnySelected = !!soundValue || !!imageValue;
  const flexDirection = isAnySelected ? "flex-col-reverse" : "flex-row";

  const onSubmit = (values) => {
    console.log(values);

    setOpen({
      open: false,
      data: null,
    });

  };

  const handleClose = () => {
    setOpen({
      open: false,
      data: null,
    });
    reset(defaultValues)
  };

  const onDrop = (acceptedFiles) => {
    setValue(
      "image",
      Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      }),
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );
  };

  return (
    <Dialog open={open?.open} onOpenChange={handleClose}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="sm:max-w-[655px] px-8 py-6 rounded-[24px]"
      >
        <DialogHeader className="flex flex-row justify-between pb-4 -mx-6 px-6 border-b border-[#EDEDED]">
          <DialogTitle className="text-2xl font-bold text-primary">
            {open?.data ? "Edit" : "Add"} Word
          </DialogTitle>
          <div onClick={handleClose} className="cursor-pointer">
            <img src={CLOSE_SECONDARY_ICON} alt="CLOSE_ICON" />
          </div>
        </DialogHeader>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <div className={`flex flex-col gap-6 pt-5 ${open?.data ? "px-12" : ""}`}>
            <TextField
              name="level"
              prefix={<img src={LEVEL_ICON} alt="LEVEL_ICON" />}
              placeholder="Level"
              className="rounded-[8px]"
            />
            <RichTextEditor
              name="script"
              placeholder="Script"
              className={cn("rounded-[8px]  mt-0" , open?.data ? "h-[200px]" : "h-[150px]")}
            />
            {open?.data ? (
              <div className="border-2 border-dashed border-[#7E808C33] rounded-[8px] p-3 space-y-3">
                <div className="text-[#04163C] text-lg underline text-end font-normal">Edit</div>
                <div className={`flex ${flexDirection} gap-x-8 gap-y-3`}>
                  <SoundField
                    name="sound"
                    placeholder="sound"
                    className="rounded-[8px] flex-1"
                  />
                  <UploadImage
                    name="image"
                    onDrop={onDrop}
                    className="rounded-[8px] flex-1"
                  />
                </div>
              </div>
            ) : (
              <div className={`flex ${flexDirection} gap-x-8 gap-y-3`}>
                <SoundField
                  name="sound"
                  placeholder="sound"
                  className="rounded-[8px] flex-1"
                />
                <UploadImage
                  name="image"
                  onDrop={onDrop}
                  className="rounded-[8px] flex-1"
                />
              </div>
            )}
          </div>
          <DialogFooter className="flex sm:justify-center justify-center mt-8">
            <Button
              className="text-base shadow-[0px_4px_6px_0px_#8FD5FF] py-[12.5px] font-semibold sm:text-lg w-fit px-20"
              type="submit"
            >
              {open?.data ? "Save" : "Add"}
            </Button>
          </DialogFooter>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default LetterSoundsModal;
