import Button from "@/components/custom/Button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAuthStore } from "@/hooks/use-auth";
import { LOGOUT_PRIMARY_ICON } from "@/lib/images";
import React from "react";
import { useNavigate } from "react-router";

const SignOutModal = ({ open, setOpen }) => {
  const { removeuser } = useAuthStore();
  const navigate = useNavigate();

  const onLogout = () => {
    removeuser();
    navigate("/login");
    handleClose();
  };

  const handleClose = () => {
    setOpen({
      open: false,
      data: null,
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="sm:max-w-[455px] p-6 rounded-[28px]"
      >
        <div className="flex flex-col justify-center items-center space-y-3">
          <div className="flex items-center bg-ternary rounded-full justify-center sm:size-[120px] size-[100px] mt-2">
            <img src={LOGOUT_PRIMARY_ICON} alt="LOGOUT_PRIMARY_ICON" />
          </div>
          <div className="space-y-0 mx-auto">
            <h2 className="text-primary font-bold text-[26px] pt-3 text-center">
              Logout?
            </h2>
            <p className="text-[18px]  font-normal text-[#3D4152] text-center">
              Are you sure you want to logout?
            </p>
          </div>
          <div className="flex items-center justify-center gap-4 pt-5 w-full">
            <Button
              onClick={handleClose}
              className="text-base max-sm:py-[13.5px] font-semibold sm:text-lg bg-[#F2F2F3] text-[#7E808C] shadow-[0px_4px_6px_0px_#F2F2F3]"
            >
              No
            </Button>
            <Button
              onClick={onLogout}
              className="text-base max-sm:py-[13.5px] font-semibold sm:text-lg shadow-[0px_4px_6px_0px_#8FD5FF]"
            >
              Yes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignOutModal;
