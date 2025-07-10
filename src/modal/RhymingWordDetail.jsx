import Image from '@/components/common/Images';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import ViewSoundField from '@/form/ViewSoundField';
import { CLOSE_ICON } from '@/lib/images';

const RhymingWordDetail = ({ open, setOpen }) => {
    const handleClose = () => {
        setOpen({
            open: false,
            data: null,
        });
    };
    
    return (
      <Dialog open={open?.open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[650px]  max-w-[90%] px-0  max-h-[80vh] py-6 rounded-[24px]  ">
          <DialogHeader className="flex flex-row  mx-8 justify-between pb-4 border-b border-[#EDEDED]">
            <DialogTitle className="text-xl font-semibold text-primary">
              Detail
            </DialogTitle>
            <div onClick={handleClose} className="cursor-pointer">
              <img src={CLOSE_ICON} alt="CLOSE_ICON" />
            </div>
          </DialogHeader>
          <ScrollArea className="flex-1 flex flex-col px-8 pt-2">
            <div className="flex flex-col gap-6 max-h-[60vh]">
              {open?.data?.wordsList.map((data) => {
                return (
                  <div
                    key={data?.wordsId}
                    className="flex sm:flex-row flex-col justify-between  items-center gap-4 "
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-[#F2F2F3] rounded-[12px] my-auto mx-auto size-[110px] flex justify-center items-center">
                        <Image src={data?.img} className="w-[70px] h-[80px]" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-primary">
                          {data?.word}
                        </p>
                        <p className="text-sm text-[#7E808C] font-medium">
                          {open?.data?.levelName}
                        </p>
                      </div>
                    </div>
                    <div className="border-gradient-horizontal h-[60px] w-[0.5px] sm:block hidden"></div>
                    <ViewSoundField
                      value={data?.audio}
                      className="rounded-[8px] flex-1"
                    />
                    <div className="border-gradient-horizontal w-full h-[3px] sm:hidden block"></div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
}

export default RhymingWordDetail