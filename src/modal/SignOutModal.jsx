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
          <div className="flex items-center bg-ternary rounded-full justify-center sm:size-[120px] size-[100px] border border-border">
            <img src={LOGOUT_PRIMARY_ICON} alt="LOGOUT_PRIMARY_ICON" />
          </div>
          <p className="sm:text-[28px] text-2xl font-semibold text-primary pt-4">
            Sign Out
          </p>
          <p className="sm:text-lg text-base font-normal text-secondary ">
            Are you sure you want to sign out?
          </p>
          <div className="flex items-center justify-center gap-4 pt-3 w-full">
            <Button
              onClick={handleClose}
              className="font-medium bg-[#E9E9E9] text-secondary"
            >
              No
            </Button>
            <Button
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
              className="font-medium text-white"
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
