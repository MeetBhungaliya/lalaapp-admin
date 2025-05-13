import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CLOSE_ICON } from "@/lib/images";
import React from "react";
import ViewSoundField from "@/form/ViewSoundField";

const ViewWordPronouncesModal = ({ open, setOpen }) => {
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
        className="sm:max-w-[600px] px-8 py-6 rounded-[24px]"
      >
        <DialogHeader className="flex flex-row justify-between pb-4 border-b border-[#EDEDED]">
          <DialogTitle className="text-xl font-semibold text-primary">
            Detail
          </DialogTitle>
          <div onClick={handleClose} className="cursor-pointer">
            <img src={CLOSE_ICON} alt="CLOSE_ICON" />
          </div>
        </DialogHeader>

        <div className="flex items-center justify-center gap-6 py-4">
          <div className="bg-[#F2F2F3] rounded-[12px] size-[110px] flex flex-col items-center justify-center">
            <img
              src={open?.data?.row?.image}
              alt="Word"
              className="w-20 h-20"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-2xl font-bold capitalize">
              {open?.data?.row?.name}
            </div>
            <div className="text-[#7E808C] text-sm font-medium">{open?.data?.row?.level}</div>
            <div className="text-[#7E808C] text-sm font-medium">
              Total Sounds - 01
            </div>
          </div>
        </div>
        <div className="border-gradient-horizontal w-full h-[0.5px] mt-1 mb-4"></div>
        <ViewSoundField
          value={open?.data?.row?.sound}
          className="rounded-[8px] flex-1"
        />
      </DialogContent>
    </Dialog>
  );
};

export default ViewWordPronouncesModal;
