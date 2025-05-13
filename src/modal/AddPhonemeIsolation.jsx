import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import FormProvider from "@/form/FormProvider";
import { CLOSE_ICON, CLOSE_SECONDARY_ICON, LEVEL_ICON, QUESTION_ICON, WORD_ICON } from "@/lib/images";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useEffect } from "react";
import Button from "@/components/custom/Button";
import TextField from "@/form/TextField";
import SoundField from "@/form/SoundField";
import { UploadImage } from "@/form/UploadImage";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const PhonemeIsolationSchema = yup.object().shape({
    level: yup.string().required("Please enter level"),
    name: yup.string().required("Please enter word name"),
    question: yup.string().required("Please enter question"),
    image: yup
        .mixed()
        .required("Please select image")
        .test("fileExists", "Please select image", (value) => !!value),
    sound: yup
        .mixed()
        .required("Please select sound")
        .test("fileExists", "Please select sound", (value) => !!value),
});

const defaultValues = {
    level: "",
    name: "",
    image: null,
    sound: null,
};

const AddPhonemeIsolation = ({ open, setOpen }) => {
    const methods = useForm({
        defaultValues,
        resolver: yupResolver(PhonemeIsolationSchema),
    });
    const { handleSubmit, reset, setValue } = methods;

    useEffect(() => {
        if (open?.data) {
            reset({
                level: open.data.level || "",
                name: open.data.name || "",
                image: open.data.image || null,
                sound: open.data.sound || null,
            });
        } else {
            reset(defaultValues);
        }
    }, [open, reset]);

    const onSubmit = (values) => {
        setOpen({ open: false, data: values });
    };

    const handleClose = () => {
        setOpen({ open: false, data: null });
    };

    return (
        <Dialog open={open?.open} onOpenChange={handleClose}>
            <DialogContent className={cn(" max-h-[90vh] py-6 px-0 rounded-[24px]", open?.data ? "sm:max-w-[600px] max-w-[70%]" : "sm:max-w-[700px] max-w-[90%]")}>
                <DialogHeader className="flex flex-row justify-between  px-8 pb-4   border-b border-[#EDEDED]">
                    <DialogTitle className="text-2xl font-bold text-primary">
                        {open?.data ? "Edit Word" : "Add Words"}
                    </DialogTitle>
                    <div onClick={handleClose} className="cursor-pointer">
                        <img src={CLOSE_SECONDARY_ICON} alt="CLOSE_SECONDARY_ICON" />
                    </div>
                </DialogHeader>
                <ScrollArea className="flex-1 flex flex-col  px-8">
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} className="max-h-[65vh]">
                        <div className={cn("flex flex-col gap-6  rounded-[8px] pt-2.5 ", open?.data ? "sm:px-14 px-5" : "px-0.5")}>
                            <div className={cn(!open?.data ? "grid grid-cols-2 gap-6" : "flex flex-col gap-3.5")}>

                                {
                                    !open?.data && <TextField
                                        name="name"
                                        prefix={<img src={WORD_ICON} alt="WORD_ICON" />}
                                        placeholder="Word name"
                                        className="rounded-[8px] flex-1 w-full"
                                    />
                                }
                                <TextField
                                    name="level"
                                    prefix={<img src={LEVEL_ICON} alt="LEVEL_ICON" />}
                                    placeholder="Level"
                                    className={cn("rounded-[8px] flex-1 ")}
                                />


                            </div>
                            <TextField
                                name="question"
                                prefix={<img src={QUESTION_ICON} alt="QUESTION_ICON" />}
                                placeholder="Question"
                                className="rounded-[8px] flex-1"
                            />
                            <div className={cn(!open?.data ? "" : "border-2 border-dashed border-[#7E808C33] rounded-[8px] p-4 space-y-3.5")}>
                                {
                                    open?.data && <p className="text-base font-normal underline text-[#04163C]ml-auto text-end">Edit</p>
                                }
                                {
                                    open?.data && <TextField
                                        name="name"
                                        prefix={<img src={WORD_ICON} alt="WORD_ICON" />}
                                        placeholder="Word name"
                                        className="rounded-[8px] flex-1 w-full"
                                    />
                                }

                                <div className={cn(open?.data ? "flex flex-col gap-3.5" : "flex gap-6")}>
                                <SoundField
                                        name="sound"
                                        className="rounded-[8px] flex-1"
                                    />
                                    <UploadImage
                                        name="image"
                                        className="rounded-[8px] flex-1"
                                        onDrop={(acceptedFiles) => {
                                            setValue(
                                                "image",
                                                Object.assign(acceptedFiles[0], {
                                                    preview: URL.createObjectURL(acceptedFiles[0]),
                                                }),
                                                { shouldDirty: true, shouldValidate: true }
                                            );
                                        }}
                                    />
                                 
                                </div>
                            </div>
                        </div>
                        <DialogFooter className="flex sm:justify-center justify-center mt-8 mb-2">
                            <Button
                                className="text-base shadow-[0px_4px_6px_0px_#8FD5FF] py-[12.5px] mx-auto font-semibold sm:text-lg w-fit px-20"
                                type="submit"
                            >
                                {open?.data ? "Save" : "Add"}
                            </Button>
                        </DialogFooter>
                    </FormProvider>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};

export default AddPhonemeIsolation;