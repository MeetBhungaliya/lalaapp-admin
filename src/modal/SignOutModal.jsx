import Button from "@/components/custom/Button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { LOGOUT_PRIMARY_ICON } from "@/lib/images";
import React from "react";
import { useNavigate } from "react-router";

const SignOutModal = ({ open, setOpen }) => {
  const navigate = useNavigate();

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
        className="max-w-xl p-6 rounded-[28px]"
      >
        <div className="flex flex-col justify-center items-center space-y-3">
          <div className="flex items-center bg-ternary rounded-full justify-center sm:size-[120px] size-[100px]">
            <img src={LOGOUT_PRIMARY_ICON} alt="LOGOUT_PRIMARY_ICON" />
          </div>
          <h2 className="text-primary font-bold text-[26px]">Logout?</h2>
          <p className="text-[18px] text-center font-normal text-[#3D4152]">
            Are you sure you want to logout?
          </p>
          <div className="flex items-center justify-center gap-4 pt-3 w-full">
            <Button
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
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

export default SignOutModal;
