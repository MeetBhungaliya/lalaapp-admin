import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CLOSE_ICON, SOUND_ICON, PAUSE_ICON, PLAY_ICON, DOWNLOAD_ICON } from '@/lib/images';
import React, { useRef, useState, useEffect } from 'react';

const BlendingLetterSoundDetail = ({ open, setOpen }) => {
    const [activeAudioIndex, setActiveAudioIndex] = useState(null); // Track the currently playing audio
    const audioRefs = useRef([]); // Store refs for each audio element
    const audioUrl = open?.data?.sound || "https://file-examples.com/storage/feba78aab06819c7996c057/2017/11/file_example_MP3_700KB.mp3";
    const letter = open?.data?.letter || "C";
    const soundLabel = open?.data?.soundLabel || "Sound 01";

    useEffect(() => {
        // Reset active audio when audioUrl changes
        setActiveAudioIndex(null);
    }, [audioUrl]);

    const handlePlay = (index) => {
        if (audioRefs.current[index]) {
            if (activeAudioIndex === index) {
                // If the same audio is clicked again, toggle play/pause
                const audio = audioRefs.current[index];
                if (audio.paused) {
                    audio.play().catch(() => { });
                } else {
                    audio.pause();
                }
            } else {
                // If a new audio is clicked, stop the currently playing audio and play the new one
                if (activeAudioIndex !== null && audioRefs.current[activeAudioIndex]) {
                    audioRefs.current[activeAudioIndex].pause();
                }
                audioRefs.current[index].play().catch(() => { });
                setActiveAudioIndex(index);
            }
        }
    };

    const handleClose = () => {
        setOpen({
            open: false,
            data: null,
        });
    };

    return (
        <Dialog open={open?.open} onOpenChange={handleClose}>
            <DialogContent className='sm:max-w-[550px]  max-w-[90%] px-8 max-h-[80vh] py-6 rounded-[24px]  '>
                <DialogHeader className="flex flex-row justify-between pb-4 border-b border-[#EDEDED]">
                    <DialogTitle className="text-xl font-semibold text-primary">
                        Detail
                    </DialogTitle>
                    <div onClick={handleClose} className="cursor-pointer">
                        <img src={CLOSE_ICON} alt="CLOSE_ICON" />
                    </div>
                </DialogHeader>
                <ScrollArea className="flex-1 flex flex-col">
                    <div className='flex flex-col gap-6 max-h-[60vh]'>
                        <div className=''>
                            <p className='text-2xl font-bold text-primary'>Cat</p>
                            <p className='text-sm text-[#7E808C] font-medium'>Level 01</p>
                        </div>
                        <div className="border-gradient-horizontal w-full h-[0.5px] mt-2.5"></div>
                        <div className='grid grid-cols-2 gap-6'>
                            {Array.from({ length: 3 }).map((_, index) => {
                                return (
                                    <div key={index} className='bg-[#F5F6FA] rounded-[8px] px-4 py-5 flex items-center justify-between'>
                                        <div className='flex items-center gap-2'>
                                            <div className='bg-white flex items-center justify-center size-[46px] rounded-full'>
                                                <img src={SOUND_ICON} alt="SOUND_ICON" />
                                            </div>
                                            <div>
                                                <p className='text-base font-semibold text-primary'>{letter}</p>
                                                <p className='text-[10px] font-normal text-[#1F1F24]'>{soundLabel}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <div onClick={() => handlePlay(index)} className="cursor-pointer mr-3">
                                                {activeAudioIndex === index && audioRefs.current[index] && !audioRefs.current[index].paused ? (
                                                    <img src={PAUSE_ICON} alt="PAUSE_ICON" className="size-7 shrink-0" />
                                                ) : (
                                                    <img src={PLAY_ICON} alt="PLAY_ICON" className="size-7 shrink-0" />
                                                )}
                                            </div>
                                            {audioUrl && (
                                                <a
                                                    href={audioUrl}
                                                    download={audioUrl.split("/").pop()}
                                                    className="cursor-pointer"
                                                    title="Download audio"
                                                >
                                                    <img src={DOWNLOAD_ICON} alt="DOWNLOAD_ICON" className="size-7" />
                                                </a>
                                            )}
                                            <audio
                                                ref={(el) => audioRefs.current[index] = el}
                                                controls={false}
                                                onEnded={() => setActiveAudioIndex(null)}
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
