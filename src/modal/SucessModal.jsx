import Button from "@/components/custom/Button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { TICK_CIRCLE_ICON } from "@/lib/images";
import { useNavigate } from "react-router";

const SucessModal = ({ open, setOpen }) => {
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
        className="sm:max-w-[455px] p-6 rounded-[24px]"
      >
        <div className="flex flex-col justify-center items-center space-y-3 pt-3 px-5">
          <div className="flex items-center bg-ternary rounded-full justify-center sm:size-[120px] size-[100px]">
            <img src={TICK_CIRCLE_ICON} alt="TICK_CIRCLE_ICON" />
          </div>
          <h2 className="text-primary font-semibold text-[22px] md:text-[26px] pt-1">
            Successful!
          </h2>
          <p className="text-lg  text-center font-medium text-[#7E808C]">
            Your password has been changed successfully!
          </p>
          <div className="pt-7 w-full">
            <Button
              onClick={() => navigate("/login")}
              className="text-base max-sm:py-[13.5px] font-semibold sm:text-lg shadow-[0px_4px_6px_0px_#8FD5FF]"
            >
              Ok
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SucessModal;
