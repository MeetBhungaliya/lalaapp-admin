import { FormField } from "@/components/ui/form";
import { CLOSE_ICON2, PAUSE_ICON, PLAY_ICON, SOUND_ICON } from "@/lib/images";
import { cn } from "@/lib/utils";
import { get } from "lodash";
import React, { useRef, useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

const SoundField = ({ label, className, name }) => {
  const { control, getValues, setValue } = useFormContext();
  const fieldValue = getValues(name); // Get value from form state

  const [audioFile, setAudioFile] = useState(null); // holds uploaded File object
  const [audioUrl, setAudioUrl] = useState(fieldValue || null); // holds remote or local URL
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Update audio source when audioFile or audioUrl changes
  useEffect(() => {
    if (audioRef.current) {
      if (audioFile) {
        audioRef.current.src = URL.createObjectURL(audioFile);
      } else if (audioUrl) {
        audioRef.current.src = audioUrl;
      }
    }

    return () => {
      if (audioRef.current?.src && audioFile) {
        URL.revokeObjectURL(audioRef.current.src);
      }
    };
  }, [audioFile, audioUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("audio/")) {
      setAudioFile(file);
      setAudioUrl(null); // Clear URL since new file is selected
      setValue(name, file, { shouldDirty: true, shouldValidate: true });
    }
  };

  const handleRemove = () => {
    setAudioFile(null);
    setAudioUrl(null);
    setIsPlaying(false);
  };

  const handlePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) =>
          console.error("Playback failed", err)
        );
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, formState: { errors } }) => {
        const fieldError = get(errors, name);

        // If a new file is selected, preview it
        const displayFileName = audioFile ? audioFile.name : "Existing Audio";

        return (
          <div className={className}>
            {label && (
              <label className="text-primary font-semibold text-sm sm:text-base md:text-lg">
                {label}
              </label>
            )}

            {!audioFile && !audioUrl ? (
              <div
                className={cn(
                  "flex flex-col items-center justify-center bg-ternary rounded-[8px] py-6 cursor-pointer",
                  fieldError?.message
                    ? "border border-red-500"
                    : "focus-visible:ring-main"
                )}
                onClick={() =>
                  document.getElementById(`audio-input-${name}`).click()
                }
              >
                <div>
                  <span className=" rounded-full flex items-center justify-center">
                    <img src={SOUND_ICON} alt="SOUND_ICON" />
                  </span>
                </div>
                <div className="text-secondary text-lg mt-1 sm:text-base font-normal">
                  Add Sounds
                </div>
                <input
                  id={`audio-input-${name}`}
                  {...field}
                  type="file"
                  accept="audio/*"
                  className="hidden"
                  onChange={(e) => {
                    handleFileChange(e);
                    field.onChange(e);
                  }}
                />
              </div>
            ) : (
              <div
                className={cn(
                  "flex items-center justify-between bg-[#D0ECFF] h-[52px] sm:h-[58px] px-4.5 rounded-[8px]",
                  fieldError?.message
                    ? "border border-red-500"
                    : "focus-visible:ring-main"
                )}
              >
                <div className="flex items-center gap-3 ">
                  <span className=" rounded-full flex items-center justify-center shrink-0">
                    <img src={SOUND_ICON} alt="SOUND_ICON" />
                  </span>
                  <span className="text-primary font-normal text-base line-clamp-1">
                    {displayFileName}
                  </span>
                </div>
                <div className="flex items-center w-fit shrink-0">
                  <div onClick={handlePlay} className="cursor-pointer">
                    {isPlaying ? (
                      <img
                        src={PAUSE_ICON}
                        alt="PAUSE_ICON"
                        className="size-7 shrink-0"
                      />
                    ) : (
                      <img src={PLAY_ICON} alt="PLAY_ICON" className="size-7 shrink-0" />
                    )}
                  </div>
                  <div
                    onClick={() => {
                      handleRemove();
                      field.onChange(null);
                    }}
                    className="cursor-pointer ml-3"
                  >
                    <img
                      src={CLOSE_ICON2}
                      alt="CLOSE_ICON2"
                      className="size-7 shrink-0"
                    />
                  </div>
                </div>

                <audio
                  ref={audioRef}
                  controls={false}
                  onEnded={() => setIsPlaying(false)}
                />
              </div>
            )}

            {fieldError?.message && (
              <div className="pl-3 text-xs sm:text-sm font-normal text-red-500">
                {fieldError.message}
              </div>
            )}
          </div>
        );
      }}
    />
  );
};

export default SoundField;