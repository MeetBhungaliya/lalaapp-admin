import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CLOSE_ICON } from "@/lib/images";
import React, { useMemo } from "react";
import ViewSoundField from "@/form/ViewSoundField";

const ViewWordPronouncesModal = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen({
      open: false,
      data: null,
    });
  };

  const totalSound = useMemo(() => {
    if (!open?.open) return 0;
    return (
      open?.data?.row?.wordsList?.filter((word) => word?.audio)?.length ?? 0
    );
  }, [open.open]);

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
              src={open?.data?.row?.wordsList?.[0]?.img}
              alt="Word"
              className="w-20 h-20"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-2xl font-bold capitalize">
              {open?.data?.row?.levelName}
            </div>
            <div className="text-[#7E808C] text-sm font-medium">
              {open?.data?.row?.level}
            </div>
            <div className="text-[#7E808C] text-sm font-medium">
              Total Sounds - {String(totalSound).padStart(2, "0")}
            </div>
          </div>
        </div>
        <div className="border-gradient-horizontal w-full h-[0.5px] mt-1 mb-4"></div>
        <div className="flex flex-col gap-1 pb-3">
          <p className="sm:text-lg text-base font-semibold text-primary">Script</p>
          <p className="sm:text-sm text-xs font-normal text-[#7E808C]" dangerouslySetInnerHTML={{ __html: open?.data?.row?.levelScript }} ></p>
          {/* <p className="sm:text-sm text-xs font-normal text-[#7E808C]">
          Let’s say a simple word first — say apple!We’ll try harder words later.
          </p> */}
        </div>
        {open?.data?.row?.wordsList?.map((word) => {
          return (
            <ViewSoundField
              key={word?.wordsId}
              value={word?.audio}
              className="rounded-[8px] flex-1"
              audioNameClass="max-w-[300px]"
            />
          );
        })}
      </DialogContent>
    </Dialog>
  );
};

export default ViewWordPronouncesModal;
