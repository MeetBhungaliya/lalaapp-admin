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

const blendTypes = ["Initial Blend", "Final Blend"];

const Step1Schema = yup.object().shape({
    name: yup.string().required("Please enter word name"),
    level: yup.string().required("Please enter level"),
    blendType: yup.string().required("Please select blend type"),
    sound: yup
        .mixed()
        .required("Please select sound")
        .test("fileExists", "Please select sound", (value) => !!value),
});

const Step2Schema = yup.object().shape({
    blends: yup.array().of(
        yup.object().shape({
            name: yup.string().required("Please enter blend name"),
            sound: yup
                .mixed()
                .required("Please select sound")
                .test("fileExists", "Please select sound", (value) => !!value),
        })
    ).min(1, "At least one blend required"),
});

const defaultValues = {
    level: "",
    blendType: blendTypes[0],
    sound: null,
    blends: [
        { name: "", image: null, sound: null },
        { name: "", image: null, sound: null },
    ],
};

const AddBlendingLetter = ({ open, setOpen }) => {
    const [step, setStep] = useState(1);
    const [selectedBlendType, setSelectedBlendType] = useState(blendTypes[0]);
    const methods = useForm({
        defaultValues,
        resolver: yupResolver(step === 1 ? Step1Schema : Step2Schema),
        mode: "onTouched",
    });
    const { handleSubmit, reset, control, setValue, trigger } = methods;
    const { fields, append, remove } = useFieldArray({
        control,
        name: "blends",
    });

    useEffect(() => {
        if (open?.data) {
            reset({
                level: open.data.level || "",
                name: open.data.name || "",
                sound: open.data.sound || null,
                blendType: open.data.blendType || blendTypes[0],
                blends: open.data.blends || defaultValues.blends,
            });
            setSelectedBlendType(open.data.blendType || blendTypes[0]);
            setStep(2);
        } else {
            reset(defaultValues);
            setSelectedBlendType(blendTypes[0]);
            setStep(1);
        }
    }, [open, reset]);

    const handleClose = () => {
        setOpen({ open: false, data: null });
        setStep(1);
    };

    const handleBlendTypeChange = (type) => {
        setSelectedBlendType(type);
        setValue("blendType", type, { shouldDirty: true, shouldValidate: true });
    };

    const handleNext = async () => {
        const valid = await trigger(["level", "blendType"]);
        if (valid) setStep(2);
    };

    const onSubmit = (values) => {
        setOpen({ open: false, data: values });
        setStep(1);
    };

    return (
        <Dialog open={open?.open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[700px] max-w-[90%]  max-h-[90vh] px-0 py-6 rounded-[24px]">
                <DialogHeader className="flex flex-row justify-between pb-4  px-6 border-b border-[#EDEDED]px-8">
                    <DialogTitle className="text-2xl font-bold text-primary">
                        {open?.data ? "Edit Word" : step === 1 ? "Add Words" : "Add Word"}
                    </DialogTitle>
                    <div onClick={handleClose} className="cursor-pointer">
                        <img src={CLOSE_ICON} alt="CLOSE_ICON" />
                    </div>
                </DialogHeader>
                <ScrollArea className="flex-1 flex flex-col ">
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} className="max-h-[60vh] px-8">
                        {step === 1 ? (
                            <div className="flex flex-col">
                                {/* Blend Type Stepper */}
                                <div className="flex items-center gap-6 justify-center mb-6">
                                    {blendTypes.map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            className={cn(
                                                "px-6 py-2 rounded-full font-semibold border",
                                                selectedBlendType === type
                                                    ? "bg-primary text-white border-primary"
                                                    : "bg-white text-primary border-[#EDEDED]"
                                            )}
                                            onClick={() => handleBlendTypeChange(type)}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div >
                                <div className="flex flex-col gap-3 space-y-3">
                                    <div className="flex items-start gap-6">
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
                                    </div>
                                    <SoundField
                                        name="sound"
                                        className="rounded-[8px] flex-1"
                                    />
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
                                {/* Blend Type Stepper */}
                                <div className="flex items-center gap-6 justify-center mb-2">
                                    {blendTypes.map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            className={cn(
                                                "px-6 py-2 rounded-full font-semibold border",
                                                selectedBlendType === type
                                                    ? "bg-primary text-white border-primary"
                                                    : "bg-white text-primary border-[#EDEDED]"
                                            )}
                                            onClick={() => handleBlendTypeChange(type)}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>

                                {/* Dynamic Blend List */}
                                <div className="flex flex-col gap-6">
                                    {fields.map((field, idx) => (
                                        <div key={field.id} className={cn("rounded-[8px] flex flex-col gap-3 relative border-2 border-dashed border-[#7E808C33] px-3 pt-8 pb-4")}>
                                            {open?.data && (
                                                <div className="absolute top-2 right-2 flex items-center gap-1">
                                                    <span className="text-base text-[#04163C] underline font-normal flex items-center gap-1">
                                                        Edit
                                                    </span>
                                                </div>
                                            )}
                                            <div className="space-y-3 pt-1.5">
                                                <TextField
                                                    name={`blends.${idx}.name`}
                                                    prefix={<img src={WORD_ICON} alt="WORD_ICON" />}
                                                    placeholder="Blend name"
                                                    className="rounded-[8px] flex-1"
                                                />

                                                <SoundField
                                                    name={`blends.${idx}.sound`}
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

                                    <p className="sm:text-lg text-base font-semibold text-[#04163C]" onClick={() => append({ name: "", image: null, sound: null })}> + Add Letter</p>
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

export default AddBlendingLetter;