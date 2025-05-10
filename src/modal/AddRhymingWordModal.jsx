import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import FormProvider from "@/form/FormProvider";
import { CLOSE_ICON, LEVEL_ICON, WORD_ICON, EDIT_ICON, SOUND_ICON, GALLERY_ICON } from "@/lib/images";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useEffect } from "react";
import Button from "@/components/custom/Button";
import TextField from "@/form/TextField";
import SoundField from "@/form/SoundField";
import { UploadImage } from "@/form/UploadImage";
import { cn } from "@/lib/utils";

const RhymingWordSchema = yup.object().shape({
    level: yup.string().required("Please enter level"),
    words: yup.array().of(
        yup.object().shape({
            name: yup.string().required("Please enter word name"),
            sound: yup
                .mixed()
                .required("Please select sound")
                .test("fileExists", "Please select sound", (value) => !!value),
            image: yup
                .mixed()
                .required("Please select image")
                .test("fileExists", "Please select image", (value) => !!value),
        })
    ).min(2, "At least two words required"),
});

const defaultValues = {
    level: "",
    words: [
        { name: "", image: null, sound: null },
        { name: "", image: null, sound: null },
        { name: "", image: null, sound: null },
    ],
};

const AddRhymingWordModal = ({ open, setOpen }) => {
    const methods = useForm({
        defaultValues,
        resolver: yupResolver(RhymingWordSchema),
    });
    const { handleSubmit, reset, control, watch, setValue } = methods;
    const { fields, append, remove, update } = useFieldArray({
        control,
        name: "words",
    });

    console.log('fff', open?.data)

    useEffect(() => {
        if (open?.data) {
            reset({
                level: open.data.level || "",
                words: open.data.words || defaultValues.words,
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
            <DialogContent className="sm:max-w-[900px] max-w-[90%] px-8 max-h-[90vh] py-6 rounded-[24px] overflow-y-auto">
                <DialogHeader className="flex flex-row justify-between pb-4 -mx-6 px-6 border-b border-[#EDEDED]">
                    <DialogTitle className="text-2xl font-bold text-primary">
                        {open?.data ? "Edit Words" : "Add Words"}
                    </DialogTitle>
                    <div onClick={handleClose} className="cursor-pointer">
                        <img src={CLOSE_ICON} alt="CLOSE_ICON" />
                    </div>
                </DialogHeader>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-6  border-2 p-4 border-dashed border-[#7E808C33] rounded-[8px]">
                        <TextField
                            name="level"
                            prefix={<img src={LEVEL_ICON} alt="LEVEL_ICON" />}
                            placeholder="Level"
                            className="rounded-[8px] flex-1"
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-3 h-full gap-4">
                            {fields.map((field, idx) => (
                                <div key={field.id} className={cn("rounded-[8px] h-full  flex flex-col gap-3 relative", open?.data && "border-2 border-dashed border-[#7E808C33]", open?.data && "border-2 border-dashed border-[#7E808C33] px-3 pt-8 pb-4")}>
                                    {open?.data && (
                                        <div className="absolute top-2 right-2 flex items-center gap-1">
                                            <span className="text-base  text-[#04163C] underline font-normal flex items-center gap-1">
                                                Edit
                                            </span>
                                        </div>
                                    )}
                                    <div className={cn("space-y-3", open?.data && "pt-1.5 ")}>
                                        <TextField
                                            name={`words.${idx}.name`}
                                            prefix={<img src={WORD_ICON} alt="WORD_ICON" />}
                                            placeholder="Word name"
                                            className="rounded-[8px] flex-1"
                                        />
                                        <UploadImage
                                            name={`words.${idx}.image`}
                                            className="rounded-[8px] flex-1"
                                            onDrop={(acceptedFiles) => {
                                                setValue(
                                                    `words.${idx}.image`,
                                                    Object.assign(acceptedFiles[0], {
                                                        preview: URL.createObjectURL(acceptedFiles[0]),
                                                    }),
                                                    { shouldDirty: true, shouldValidate: true }
                                                );
                                            }}
                                        />
                                        <SoundField
                                            name={`words.${idx}.sound`}
                                            className="rounded-[8px] flex-1"
                                        />
                                        {open?.data > 2 && (
                                            <button
                                                type="button"
                                                className="absolute -top-2 -left-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow"
                                                onClick={() => remove(idx)}
                                            >
                                                &times;
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <DialogFooter className="flex sm:justify-center justify-center mt-8">
                        <Button
                            className="text-base max-sm:py-[13.5px] font-semibold sm:text-lg w-fit px-20"
                            type="submit"
                        >
                            {open?.data ? "Save" : "Add"}
                        </Button>
                    </DialogFooter>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
};

export default AddRhymingWordModal;