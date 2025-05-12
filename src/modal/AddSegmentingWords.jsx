import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import FormProvider from "@/form/FormProvider";
import { CLOSE_ICON, CLOSE_ICON2, LEVEL_ICON, WORD_ICON } from "@/lib/images";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import Button from "@/components/custom/Button";
import TextField from "@/form/TextField";
import SoundField from "@/form/SoundField";
import { UploadImage } from "@/form/UploadImage";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaCircleCheck } from "react-icons/fa6";

const Step1Schema = yup.object().shape({
    name: yup.string().required("Please enter word name"),
    level: yup.string().required("Please enter level"),
    sound: yup
        .mixed()
        .required("Please select sound")
        .test("fileExists", "Please select sound", (value) => !!value),
    image: yup
        .mixed()
        .required("Please select image")
        .test("fileExists", "Please select image", (value) => !!value),
});

const Step2Schema = yup.object().shape({
    letters: yup.array().of(
        yup.object().shape({
            name: yup.string().required("Please enter letter name"),
            sound: yup
                .mixed()
                .required("Please select sound")
                .test("fileExists", "Please select sound", (value) => !!value),
        })
    ).min(1, "At least one letter required"),
});

const defaultValues = {
    name: "",
    level: "",
    sound: null,
    image: null,
    letters: [
        { name: "", sound: null },
        { name: "", sound: null },
    ],
};

const AddSegmentingWords = ({ open, setOpen }) => {
    const [step, setStep] = useState(1);
    const methods = useForm({
        defaultValues,
        resolver: yupResolver(step === 1 ? Step1Schema : Step2Schema),
        mode: "onTouched",
    });
    const { handleSubmit, reset, control, trigger, setValue, formState: { errors } } = methods;
    const { fields, append, remove } = useFieldArray({
        control,
        name: "letters",
    });

    useEffect(() => {
        if (open?.data) {
            reset({
                name: open.data.name || "",
                level: open.data.level || "",
                sound: open.data.sound || null,
                image: open.data.image || null,
                letters: open.data.letters || defaultValues.letters,
            });
        } else {
            reset(defaultValues);
        }
    }, [open, reset]);

    const handleClose = () => {
        setOpen({ open: false, data: null });
        setStep(1);
    };

    const handleNext = async () => {
        const valid = await trigger(["name", "level", "sound", "image"]);
        if (valid) setStep(2);
    };

    const onSubmit = (values) => {
        setOpen({ open: false, data: values });
        setStep(1);
    };

    // Stepper state logic
    const isStep1Active = step === 1;
    const isStep2Active = step === 2;
    const isStep1Completed = step === 2;

    return (
        <Dialog open={open?.open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[600px] max-w-[90%] max-h-[90vh] px-0 py-6 rounded-[24px]">
                <DialogHeader className="flex flex-row justify-between pb-4 px-6 border-b border-[#EDEDED]">
                    <DialogTitle className="text-2xl font-bold text-primary">
                        {open?.data ? "Edit Word" : step === 1 ? "Add Word" : "Add Word"}
                    </DialogTitle>
                    <div onClick={handleClose} className="cursor-pointer">
                        <img src={CLOSE_ICON} alt="CLOSE_ICON" />
                    </div>
                </DialogHeader>
                <ScrollArea className="flex-1 flex flex-col ">
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} className="max-h-[60vh] px-8">
                        {/* Stepper Component */}
                        <div className="flex items-center justify-center w-full mb-8 mt-4">
                            {/* Step 1 */}
                            <div className="flex items-center">
                                <div className={cn(
                                    "flex items-center justify-center size-[28px]",
                                    (isStep1Active || isStep1Completed) ? "bg-[#2196F3]" : "bg-[#F2F4F7]"
                                )} style={{ borderRadius: '50%' }}>
                                    <FaCircleCheck className={cn(
                                        "size-4",
                                        (isStep1Active || isStep1Completed) ? "text-white" : "text-[#6B7280]"
                                    )} />
                                </div>
                                <span className={cn(
                                    "ml-3 text-xl",
                                    (isStep1Active || isStep1Completed) ? "font-medium text-[#2196F3] text-sm" : "font-normal text-[#6B7280] text-sm"
                                )}>
                                    Word Detail
                                </span>
                            </div>
                            {/* Line */}
                            <div className="w-[30%] h-px bg-[#E5E7EB] mx-4" />
                            {/* Step 2 */}
                            <div className="flex items-center">
                                <div className={cn(
                                    "flex items-center justify-center size-[28px]",
                                    isStep2Active ? "bg-[#2196F3]" : "bg-[#F2F4F7]"
                                )} style={{ borderRadius: '50%' }}>
                                    <FaCircleCheck className={cn(
                                        "size-4",
                                        isStep2Active ? "text-white" : "text-[#6B7280]"
                                    )} />
                                </div>
                                <span className={cn(
                                    "ml-3 text-xl",
                                    isStep2Active ? "font-medium text-[#2196F3] text-sm" : "font-normal text-[#6B7280] text-sm"
                                )}>
                                    Letter Detail
                                </span>
                            </div>
                        </div>

                        {step === 1 ? (
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-3">
                                    <div className="grid grid-cols-2 gap-4">
                                        <TextField
                                            name="name"
                                            prefix={<img src={WORD_ICON} alt="WORD_ICON" />}
                                            placeholder="Word name"
                                            className="rounded-[8px] flex-1 w-full"
                                        />
                                        <TextField
                                            name="level"
                                            prefix={<img src={LEVEL_ICON} alt="LEVEL_ICON" />}
                                            placeholder="Level"
                                            className="rounded-[8px] flex-1"
                                        />

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
                                <DialogFooter className="flex sm:justify-center justify-center mt-8">
                                    <Button
                                        className="text-base max-sm:py-[13.5px] font-semibold sm:text-lg w-fit px-20"
                                        type="button"
                                        onClick={handleNext}
                                    >
                                        Next
                                    </Button>
                                </DialogFooter>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-6">
                                {/* Dynamic Letter List */}
                                <div className="flex flex-col gap-6">
                                    {fields.map((field, idx) => (
                                        <div key={field.id} className={cn("rounded-[8px] flex flex-col gap-3 relative border-2 border-dashed border-[#7E808C33] px-3 pt-8 pb-4")}>
                                            <div className="space-y-3 pt-1.5">
                                                <TextField
                                                    name={`letters.${idx}.name`}
                                                    prefix={<img src={WORD_ICON} alt="WORD_ICON" />}
                                                    placeholder="Letter"
                                                    className="rounded-[8px] flex-1"
                                                />
                                                <SoundField
                                                    name={`letters.${idx}.sound`}
                                                    className="rounded-[8px] flex-1"
                                                />
                                                {fields.length > 1 && (
                                                    <button
                                                        type="button"
                                                        className="absolute -top-4 -right-3 "
                                                        onClick={() => remove(idx)}
                                                    >
                                                        <img
                                                            src={CLOSE_ICON2}
                                                            alt="CLOSE_ICON2"
                                                            className="size-8 cursor-pointer"
                                                        />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-center mt-2">
                                    <p className="sm:text-lg text-base font-semibold text-[#04163C] cursor-pointer" onClick={() => append({ name: "", sound: null })}> + Add Letter</p>
                                </div>
                                <DialogFooter className="flex sm:justify-center justify-center ">
                                    <Button
                                        className="text-base max-sm:py-[13.5px] font-semibold sm:text-lg w-fit px-20"
                                        type="submit"
                                    >
                                        {open?.data ? "Save" : "Add"}
                                    </Button>
                                </DialogFooter>
                            </div>
                        )}
                    </FormProvider>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};

export default AddSegmentingWords;