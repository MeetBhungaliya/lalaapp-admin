import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FormProvider from "@/form/FormProvider";
import { CLOSE_ICON, CLOSE_SECONDARY_ICON, LEVEL_ICON, WORD_ICON } from "@/lib/images";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LetterSoundsSchema, PronunciationSchema } from "@/lib/schema"; // You may want to create a new schema for WordPronounces
import React, { useEffect } from "react";
import Button from "@/components/custom/Button";
import TextField from "@/form/TextField";
import SoundField from "@/form/SoundField";
import { UploadImage } from "@/form/UploadImage";
import RichTextEditor from "@/form/RichTextEditor";
import { cn } from "@/lib/utils";

const WordPronouncesModal = ({ open, setOpen }) => {
  const defaultValues = {
    level: "",
    word: "",
    sound: "",
    image: "",
    script: "",
  };

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(PronunciationSchema),
  });
  const { handleSubmit, setValue, watch, reset } = methods;

  useEffect(() => {
    if (!open?.data) return;
    reset({
      level: open?.data?.row?.level ?? "",
      word: open?.data?.row?.name ?? "",
      sound: open?.data?.row?.sound ?? "",
      image: open?.data?.row?.image ?? "",
      script: open?.data?.row?.script ?? "",
    });
  }, [open?.data]);

  const soundValue = watch("sound");
  const imageValue = watch("image");
  const isAnySelected = !!soundValue || !!imageValue;
  const flexDirection = isAnySelected ? "flex-col-reverse" : "flex-col-reverse";

  const onSubmit = (values) => {
    setOpen({
      open: false,
      data: values,
    });
    reset(defaultValues);
  };

  const handleClose = () => {
    setOpen({
      open: false,
      data: null,
    });
    reset(defaultValues);
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
            <img src={CLOSE_SECONDARY_ICON} alt="CLOS" />
          </div>
        </DialogHeader>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <div className={`flex pt-3 flex-col gap-6 ${open?.data ? "px-12" : ""}`}>
            <div className={`${!open?.data ? "grid grid-cols-2 gap-4" : "grid grid-cols-1 gap-4"}`}>
              {!open?.data && <TextField
                name="word"
                prefix={<img src={WORD_ICON} alt="WORD_ICON" />}
                placeholder="Word name"
                className="rounded-[8px] w-full"
              />}
              <TextField
                name="level"
                prefix={<img src={LEVEL_ICON} alt="LEVEL_ICON" />}
                placeholder="Level"
                className="rounded-[8px] w-full"
              />
            </div>
            <RichTextEditor
              name="script"
              placeholder="Script"
              className={cn("rounded-[8px]  mt-0", open?.data ? "h-[200px]" : "h-[150px]")}
            />
            {open?.data ? (
              <div className="border-2 border-dashed border-[#7E808C33] rounded-[8px] p-3 space-y-3">
                <div className="text-[#04163C] text-lg underline text-end font-normal cursor-pointer">Edit</div>
                <div className={`flex ${flexDirection} gap-x-4 gap-y-3`}>
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
                  <TextField
                    name="word"
                    prefix={<img src={WORD_ICON} alt="WORD_ICON" />}
                    placeholder="Word Name"
                    className="rounded-[8px] flex-1"
                  />
                </div>
              </div>
            ) : (
              <div className={`flex ${flexDirection} gap-x-4 gap-y-3`}>
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
              className="text-base py-[12.5px] shadow-[0px_4px_6px_0px_#8FD5FF] font-semibold sm:text-lg w-fit px-20"
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

export default WordPronouncesModal;
