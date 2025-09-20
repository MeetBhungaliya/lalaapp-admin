import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CLOSE_ICON,
  DOWNLOAD_ICON,
  PAUSE_ICON,
  PLAY_ICON,
  SOUND_ICON,
} from "@/lib/images";
import { asyncResponseToaster } from "@/lib/toasts";
import { downloadAudio } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

const BlendingLetterSoundDetail = ({ open, setOpen }) => {
  const [activeAudioIndex, setActiveAudioIndex] = useState(null);
  const audioRefs = useRef([]);

  useEffect(() => {
    setActiveAudioIndex(null);
    audioRefs.current.forEach((audio) => {
      if (audio && !audio.paused) audio.pause();
    });
  }, [open?.open]);

  const handlePlay = (index) => {
    const currentAudio = audioRefs.current[index];
    if (!currentAudio || !open?.data?.letterList?.[index]?.audio) return;

    audioRefs.current.forEach((audio, i) => {
      if (i !== index && audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    if (activeAudioIndex === index && !currentAudio.paused) {
      currentAudio.pause();
    } else {
      currentAudio
        .play()
        .then(() => setActiveAudioIndex(index))
        .catch((e) => console.error("Playback failed:", e));
    }
  };

  const handleClose = () => {
    setOpen({ open: false, data: null });
  };

  const onDownloadAudio = async (audio, name) => {
    await asyncResponseToaster(() => downloadAudio(audio, name), {
      loading: "Downloading audio...",
    });
  };

  return (
    <Dialog open={open?.open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[550px]  max-w-[90%] px-8 max-h-[80vh] py-6 rounded-[24px]  ">
        <DialogHeader className="flex flex-row justify-between pb-4 border-b border-[#EDEDED]">
          <DialogTitle className="text-xl font-semibold text-primary">
            Detail
          </DialogTitle>
          <div onClick={handleClose} className="cursor-pointer">
            <img src={CLOSE_ICON} alt="CLOSE_ICON" />
          </div>
        </DialogHeader>
        <ScrollArea className="flex-1 flex flex-col">
          <div className="flex flex-col gap-6 max-h-[60vh]">
            <div className="">
              <p className="text-2xl font-bold text-primary">
                {open?.data?.wordsList?.[0]?.word}
              </p>
              <p className="text-sm text-[#7E808C] font-medium">
                {open?.data?.levelName}
              </p>
            </div>
            <div className="border-gradient-horizontal w-full h-[0.5px] mt-2.5"></div>
            <div className="flex flex-col gap-1 pb-2">
              <p className="sm:text-lg text-base font-semibold text-primary">Script</p>
              <p className="sm:text-sm text-xs font-normal text-[#7E808C]" dangerouslySetInnerHTML={{ __html: open?.data?.levelScript }} >
                {/* Here is our first word: C–A–T. Now you say it! What word did we make? */}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {open?.data?.letterList?.map((letter, index) => {
                return (
                  <div
                    key={index}
                    className="bg-[#F5F6FA] rounded-[8px] px-4 py-5 flex flex-wrap items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div className="bg-white flex items-center justify-center size-[46px] rounded-full">
                        <img src={SOUND_ICON} alt="SOUND_ICON" />
                      </div>
                      <div className="flex-1 w-full">
                        <p className="text-base font-semibold text-primary">
                          {letter?.letter}
                        </p>
                        <p className="text-[10px] max-w-[150px] font-normal flex-1 w-full truncate text-[#1F1F24]">
                          {letter?.audio}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center ml-auto">
                      <div
                        onClick={() => handlePlay(index)}
                        className="cursor-pointer mr-3"
                      >
                        {activeAudioIndex === index &&
                          audioRefs.current[index] &&
                          !audioRefs.current[index].paused ? (
                          <img
                            src={PAUSE_ICON}
                            alt="PAUSE_ICON"
                            className="size-7 shrink-0"
                          />
                        ) : (
                          <img
                            src={PLAY_ICON}
                            alt="PLAY_ICON"
                            className="size-7 shrink-0"
                          />
                        )}
                      </div>
                      {letter?.audio && (
                        <button
                          className="cursor-pointer"
                          onClick={() =>
                            onDownloadAudio(
                              letter?.audio,
                              letter?.audio.split("/").pop()
                            )
                          }
                        >
                          <img
                            src={DOWNLOAD_ICON}
                            alt="DOWNLOAD_ICON"
                            className="size-7"
                          />
                        </button>
                      )}
                      <audio
                        ref={(el) => (audioRefs.current[index] = el)}
                        src={letter?.audio || ""}
                        onEnded={() => setActiveAudioIndex(null)}
                        preload="none"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default BlendingLetterSoundDetail;
