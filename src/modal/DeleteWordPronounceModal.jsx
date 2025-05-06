import Button from "@/components/custom/Button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DELETE_ICON2 } from "@/lib/images";
import React from "react";

const DeleteWordPronounceModal = ({ open, setOpen }) => {
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
        className="sm:max-w-[455px] p-6 rounded-[24px]"
      >
        <div className="flex flex-col justify-center items-center space-y-3">
          <div className="flex items-center bg-ternary rounded-full justify-center sm:size-[120px] size-[100px]">
            <img src={DELETE_ICON2} alt="DELETE_ICON2" />
          </div>
          <h2 className="text-primary font-bold text-[26px]">Delete Word?</h2>
          <p className="text-[18px] text-center font-normal text-[#3D4152]">
            Are you sure you want to delete <br />
            <span className="font-semibold text-[18px] text-main">
              “{open?.data?.row?.name}”
            </span>
            ?
          </p>
          <div className="flex items-center justify-center gap-4 pt-3 w-full">
            <Button
              onClick={handleClose}
              className="text-base max-sm:py-[13.5px] font-semibold sm:text-lg bg-[#F2F2F3] text-[#7E808C] shadow-[0px_4px_6px_0px_#F2F2F3]"
            >
              Yes
            </Button>
            <Button
              onClick={handleClose}
              className="text-base max-sm:py-[13.5px] font-semibold sm:text-lg shadow-[0px_4px_6px_0px_#8FD5FF]"
            >
              No
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteWordPronounceModal;
