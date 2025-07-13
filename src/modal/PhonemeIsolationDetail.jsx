import Image from "@/components/common/Images";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import ViewSoundField from "@/form/ViewSoundField";
import { CLOSE_ICON } from "@/lib/images";
import { useMemo } from "react";

const PhonemeIsolationDetail = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen({ open: false, data: null });
  };

  const totalSound = useMemo(() => {
    if (!open?.open) return 0;
    return open?.data?.wordsList?.filter((word) => word?.audio)?.length ?? 0;
  }, [open.open]);

  return (
    <Dialog open={open?.open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[560px] px-0 py-6 rounded-[30px]">
        <DialogHeader className="flex flex-row justify-between pb-4 mx-8 border-b border-[#EDEDED]">
          <DialogTitle className="text-xl font-semibold  text-primary  w-full">
            Detail
          </DialogTitle>
          <div onClick={handleClose} className="cursor-pointer">
            <img src={CLOSE_ICON} alt="CLOSE_ICON" />
          </div>
        </DialogHeader>
        <div className="flex flex-col  gap-5 pt-3 px-8">
          <div className="flex justify-center items-center gap-4">
            <Image
              src={open?.data?.wordsList?.[0]?.img}
              alt="Word"
              className="w-[100px] h-[100px] rounded-[12px] object-cover bg-[#F2F2F3]"
            />
            <div className="space-y-1">
              <p className="sm:text-2xl text-xl font-semibold mt-2">
                {open?.data?.levelName}
              </p>
              <p className="text-[#7E808C] text-sm font-medium">
                {open?.data?.level}
              </p>
              <p className="text-[#7E808C] text-sm font-medium">
                Total Sounds - {String(totalSound).padStart(2, "0")}
              </p>
            </div>
          </div>
          <div className="border-gradient-horizontal w-full h-[0.5px] mt-4"></div>
          <div className="flex flex-col gap-0.5">
            <p className="text-lg font-medium  text-primary">Question</p>
            <p className="text-base font-normal text-[#7E808C] text-wrap break-words">
              {open?.data?.question}
            </p>
          </div>
          {open?.data?.wordsList?.map((word) => {
            return (
              <ViewSoundField
                key={word?.wordsId}
                value={word?.audio}
                className="rounded-[8px] flex-1"
              />
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PhonemeIsolationDetail;
