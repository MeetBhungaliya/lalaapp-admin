import Image from "@/components/common/Images";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { CLOSE_ICON } from "@/lib/images";
import { cn } from "@/lib/utils";
import React from "react";

const UserDetail = ({ open, setOpen }) => {
    const handleClose = () => {
        setOpen({ open: false, data: null });
    };

    const user = open?.data || {};

    return (
      <Dialog open={open?.open} onOpenChange={handleClose}>
        <DialogContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="sm:max-w-[560px] px-8 py-6 rounded-[30px]"
        >
          <DialogHeader className="flex flex-row justify-between pb-4 border-b border-[#EDEDED]">
            <DialogTitle className="text-xl font-semibold text-primary text-center w-full">
              User Detail
            </DialogTitle>
            <div onClick={handleClose} className="cursor-pointer">
              <img src={CLOSE_ICON} alt="CLOSE_ICON" />
            </div>
          </DialogHeader>

          <div className="flex flex-col items-center gap-5 py-6">
            <div className="flex items-center gap-4">
              <Image
                src={user?.userDtl?.profile || ""}
                alt={user?.fname || ""}
                className="w-[100px] h-[100px] rounded-[12px] object-cover bg-[#F2F2F3]"
              />
              <div className="space-y-1">
                <div className="sm:text-xl text-lg font-semibold mt-2 text-[#1E1614]">
                  {user?.fname} {user?.lname}
                </div>
                <div className="text-[#7E808C] sm:text-base text-sm font-normal">
                  craiggouse@gmail.com
                </div>
                <div className="text-[#2393FF] sm:text-base text-sm font-semibold  cursor-pointer">
                  {user?.planDtl?.planName}
                </div>
              </div>
            </div>
            <div className="border-gradient-horizontal w-full h-[0.5px] mt-4"></div>
            <div className="w-full flex flex-col gap-4 mt-2">
              <div>
                <div className="text-[#1F1F24] sm:text-lg text-base  font-medium">
                  Plan Start Date
                </div>
                <div className="sm:text-lg text-base font-medium text-[#7E808C]">
                  01 June, 2024
                </div>
              </div>
              <div>
                <div className="text-[#1F1F24] sm:text-lg text-base  font-medium">
                  Plan End Date
                </div>
                <div className="sm:text-lg text-base font-medium text-[#7E808C]">
                  30 June, 2024
                </div>
              </div>
              <div>
                <div className="text-[#1F1F24] sm:text-lg text-base  font-medium">
                  Plan Status
                </div>
                <div
                  className={cn(
                    "sm:text-lg text-base font-semibold",
                    user?.planStatus === "Active"
                      ? "text-[#32C605] font-semibold"
                      : "text-[#F62F20] font-semibold"
                  )}
                >
                  {user?.planStatus || "-"}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
};

export default UserDetail;