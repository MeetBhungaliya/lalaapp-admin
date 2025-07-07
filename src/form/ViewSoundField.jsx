import { PAUSE_ICON, PLAY_ICON, SOUND_ICON, DOWNLOAD_ICON } from "@/lib/images";
import { asyncResponseToaster } from "@/lib/toasts";
import { downloadAudio } from "@/lib/utils";
import React, { useRef, useState, useEffect, useMemo } from "react";

const ViewSoundField = ({ className, value }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current && value) {
      audioRef.current.src = value;
    }
  }, [value]);

  const audioName = useMemo(() => {
    if (!value) return "No Audio";
    return value.split("/").pop();
  }, [value]);

  const handlePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current
          .play()
          .catch((err) => console.error("Playback failed", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const onDownloadAudio = async () => {
    await asyncResponseToaster(() => downloadAudio(value, audioName), {
      loading: "Downloading audio...",
    });
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between bg-ternary h-[52px] sm:h-[58px] px-4.5 rounded-[8px]">
        <div className="flex items-center gap-2">
          <span className=" rounded-full flex shrink-0 items-center justify-center">
            <img src={SOUND_ICON} alt="SOUND_ICON" />
          </span>
          <span className="text-primary font-normal text-base line-clamp-1">
            {audioName}
          </span>
        </div>
        <div className="flex items-center">
          <div onClick={handlePlay} className="cursor-pointer mr-3">
            {isPlaying ? (
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
          {value && (
            <button className="cursor-pointer" onClick={onDownloadAudio}>
              <img src={DOWNLOAD_ICON} alt="DOWNLOAD_ICON" className="size-7" />
            </button>
          )}
        </div>
        <audio
          ref={audioRef}
          controls={false}
          onEnded={() => setIsPlaying(false)}
        />
      </div>
    </div>
  );
};

export default ViewSoundField;
