import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FormProvider from "@/form/FormProvider";
import { CLOSE_ICON, LEVEL_ICON } from "@/lib/images";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LetterSoundsSchema } from "@/lib/schema";
import React, { useEffect } from "react";
import Button from "@/components/custom/Button";
import TextField from "@/form/TextField";
import SoundField from "@/form/SoundField";
import { UploadImage } from "@/form/UploadImage";
import ViewSoundField from "@/form/ViewSoundField";

const ViewLetterSoundsModal = ({ open, setOpen, data }) => {
  const handleClose = () => {
    setOpen({
      open: false,
      data: null,
    });
  };

  return (
    <Dialog open={open?.open} onOpenChange={handleClose}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="sm:max-w-[655px] px-8 py-6 rounded-[24px]"
      >
        <DialogHeader className="flex flex-row justify-between pb-4 border-b border-[#EDEDED]">
          <DialogTitle className="text-xl font-semibold text-primary">
            Detail
          </DialogTitle>
          <div onClick={handleClose} className="cursor-pointer">
            <img src={CLOSE_ICON} alt="CLOSE_ICON" />
          </div>
        </DialogHeader>

        {/* Main Content */}
        <div className="flex  items-center justify-center gap-6 py-4">
          <div className="bg-[#F2F2F3] rounded-[12px] p-8">
            <img
              src={open?.data?.row?.image}
              alt="Level Icon"
              className="w-20 h-20"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-2xl font-bold">{open?.data?.row?.level}</div>
            <div className="text-[#7E808C] text-sm font-medium">
              Total Sounds - 01
            </div>
          </div>
        </div>

        <ViewSoundField
          value="https://file-examples.com/storage/feba78aab06819c7996c057/2017/11/file_example_MP3_700KB.mp3"
          className="rounded-[8px] flex-1"
        />
      </DialogContent>
    </Dialog>
  );
};

export default ViewLetterSoundsModal;
