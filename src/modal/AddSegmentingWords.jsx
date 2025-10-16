import { getLevels } from "@/api/query-option";
import Button from "@/components/custom/Button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { METHODS } from "@/constants/common";
import {
  CREATE_LEVEL,
  DELETE_LETTER,
  UPDATE_LETTER,
  UPDATE_LEVEL,
  UPDATE_WORD,
} from "@/constants/endpoints";
import FormProvider from "@/form/FormProvider";
import RichTextEditor from "@/form/RichTextEditor";
import SoundField from "@/form/SoundField";
import TextField from "@/form/TextField";
import { fetchApi } from "@/lib/api";
import {
  CLOSE_ICON2,
  CLOSE_SECONDARY_ICON,
  LEVEL_ICON,
  WORD_ICON,
} from "@/lib/images";
import { asyncResponseToaster } from "@/lib/toasts";
import { cn } from "@/lib/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toFormData } from "axios";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FaCircleCheck } from "react-icons/fa6";
import * as yup from "yup";

const Step1Schema = yup.object().shape({
  wordsName: yup.string().required("Please enter word name"),
  levelName: yup.string().required("Please enter level"),
  // wordAudio: yup
  //   .mixed()
  //   .required("Please select sound")
  //   .test("Required", "Please select sound", (value) => {
  //     return value;
  //   }),
  image: yup.string().optional(),
  levelScript: yup.string().required("Please enter script"),
  // removeLetter: yup.string().required("Please enter word name"),
  // afterRemoveAudio: yup
  //   .mixed()
  //   .required("Please select sound")
  //   .test("Required", "Please select sound", (value) => {
  //     return value;
  //   }),
});

const Step2Schema = yup.object().shape({
  letters: yup
    .array()
    .of(
      yup.object().shape({
        letter: yup.string().required("Please enter letter name"),
        audio: yup
          .mixed()
          .required("Please select sound")
          .test("fileExists", "Please select sound", (value) => !!value),
      })
    )
    .min(1, "At least one letter required"),
});

const defaultValues = {
  wordsName: "",
  levelName: "",
  wordAudio: "",
  levelScript: "",
  levelScriptPlain: "",
  removeLetter: "",
  afterRemoveAudio: "",
  letters: [
    { letter: "", audio: null },
    { letter: "", audio: null },
  ],
};

const AddSegmentingWords = ({ open, setOpen, tutorialId }) => {
  const queryClient = useQueryClient();

  const [deletedLetterIds, setDeletedLetterIds] = useState([]);
  const [step, setStep] = useState(1);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(step === 1 ? Step1Schema : Step2Schema),
    reValidateMode: "onBlur",
    mode: "onChange",
  });

  const { handleSubmit, reset, control, trigger } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "letters",
  });

  useEffect(() => {
    if (open?.data) {
      reset({
        wordsName: open?.data?.wordsList?.map((w) => w?.word).join(", ") ?? "",
        levelName: open?.data?.levelName ?? "",
        wordAudio: open?.data?.wordsList.map((e) => e.audio) ?? [],
        levelScript: open?.data?.levelScript ?? "",
        levelScriptPlain: open?.data?.levelScriptPlain ?? "",
        question: open?.data?.question ?? "",
        afterRemoveAudio:
          open?.data?.wordsList?.map((w) => w?.afterRemoveAudio).join(", ") ??
          "",
        removeLetter:
          open?.data?.wordsList?.map((w) => w?.removeLetter)?.[0] ?? "",
        letters: open?.data?.letterList || defaultValues.letters,
      });
    } else {
      reset(defaultValues);
    }
  }, [open, reset]);

  const createLevelMutation = useMutation({
    mutationFn: async (data) =>
      fetchApi({ url: CREATE_LEVEL, method: METHODS.POST, data }),
  });

  const updateLevelMutation = useMutation({
    mutationFn: async (data) =>
      fetchApi({ url: UPDATE_LEVEL, method: METHODS.POST, data }),
  });

  const updateWordMutation = useMutation({
    mutationFn: async (data) =>
      fetchApi({ url: UPDATE_WORD, method: METHODS.POST, data }),
  });

  const updateLetterMutation = useMutation({
    mutationFn: async (data) =>
      fetchApi({ url: UPDATE_LETTER, method: METHODS.POST, data }),
  });

  const deleteLetterMutation = useMutation({
    mutationFn: async (data) =>
      fetchApi({ url: DELETE_LETTER, method: METHODS.DELETE, data }),
  });

  const handleNext = async () => {
    const valid = await trigger([
      "wordsName",
      "levelName",
      "blendType",
      "wordAudio",
    ]);
    if (valid) setStep(2);
  };

  const onSubmit = async (values) => {
    let payload = {};
    let result = {};

    const letter = values?.letters?.map((b) => b?.letter);
    const audio = values?.letters?.map((b) => b?.audio);

    if (open?.data?.levelId && open?.data?.letterList?.[0]?.letterId) {
      const newLetters = values?.letters?.filter((l) => !l?.letterId);
      const newAudio = newLetters?.map((l) => l?.audio);
      const newLetter = newLetters?.map((l) => l?.letter);

      let updatedLetters = [];

      values.letters?.forEach((letter) => {
        const prevLetter = open?.data?.letterList?.find(
          (w) => w?.letterId === letter?.letterId
        );

        if (
          letter?.letterId &&
          JSON.stringify(prevLetter) !== JSON.stringify(letter) &&
          !deletedLetterIds?.includes?.(letter?.letterId)
        ) {
          updatedLetters.push(letter);
        }
      });

      if (open?.data?.wordsList?.[0]?.word !== values?.wordsName) {
        const payload = {
          wordId: open?.data?.wordsList?.[0]?.wordsId,
          wordsName: values.wordsName,
          wordAudio: values?.wordAudio,
        };

        result = await asyncResponseToaster(() =>
          updateWordMutation.mutateAsync(toFormData(payload))
        );
      }

      if (
        open?.data?.levelName !== values?.levelName ||
        open?.data?.levelScript !== values?.levelScript ||
        open?.data?.levelScriptPlain !== values?.levelScriptPlain ||
        (newLetter?.length && newAudio?.length)
      ) {
        const payload = {
          tutorialId,
          levelScript: values?.levelScript,
          levelScriptPlain: values?.levelScriptPlain,
          levelName: values?.levelName,
          levelId: open?.data?.levelId,
        };

        if (newLetter?.length) {
          payload.letter = JSON.stringify(newLetter);
        }

        if (newAudio?.length) {
          payload.audio = newAudio;
        }

        result = await asyncResponseToaster(() =>
          updateLevelMutation.mutateAsync(toFormData(payload))
        );
      }

      if (deletedLetterIds?.length) {
        const res = await Promise.all(
          deletedLetterIds.map(async (letterId) => {
            return await deleteLetterMutation.mutateAsync({ letterId });
          })
        );

        result = await asyncResponseToaster(() => res?.[0]);
      }

      if (updatedLetters?.length) {
        const res = await Promise.all(
          updatedLetters.map(async (l) => {
            return await updateLetterMutation.mutateAsync(
              toFormData({
                letterId: l?.letterId,
                letter: l?.letter,
                audio: l?.audio,
              })
            );
          })
        );

        result = await asyncResponseToaster(() => res?.[0]);
      }
    } else {
      payload = {
        tutorialId,
        audio,
        levelName: values?.levelName,
        levelScript: values?.levelScript,
        levelScriptPlain: values?.levelScriptPlain,
        wordsName: JSON.stringify([values.wordsName]),
        wordAudio: [values.wordAudio],
        // letter: JSON.stringify(letter),
        afterRemoveAudio: [values.afterRemoveAudio],
        removeLetter: JSON.stringify([values.removeLetter]),
      };

      result = await asyncResponseToaster(() =>
        createLevelMutation.mutateAsync(toFormData(payload))
      );
    }

    if (result.success && result.value && result.value.isSuccess) {
      queryClient.refetchQueries(() => getLevels({ tutorialId }));
      handleClose();
    }
  };

  const handleClose = () => {
    setOpen({ open: false, data: null });
    setStep(1);
    setDeletedLetterIds([]);
  };

  const isStep1Active = step === 1;
  const isStep2Active = step === 2;
  const isStep1Completed = step === 2;

  return (
    <Dialog open={open?.open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] max-w-[90%] max-h-[90vh] px-0 py-6 rounded-[24px]">
        <DialogHeader className="flex flex-row justify-between pb-4 px-6 border-b border-[#EDEDED]">
          <DialogTitle className="text-2xl font-bold text-primary">
            {open?.data ? "Edit Words" : step === 1 ? "Add Word" : "Add Word"}
          </DialogTitle>
          <div onClick={handleClose} className="cursor-pointer">
            <img src={CLOSE_SECONDARY_ICON} alt="CLOSE_SECONDARY_ICON" />
          </div>
        </DialogHeader>
        <ScrollArea className="flex-1 flex flex-col ">
          <FormProvider
            methods={methods}
            onSubmit={handleSubmit(onSubmit)}
            className="max-h-[60vh] px-8"
          >
            {/* <div className="flex items-center justify-center w-full mb-8 mt-4">
              <div className="flex items-center">
                <div
                  className={cn(
                    "flex items-center justify-center size-[28px]",
                    isStep1Active || isStep1Completed
                      ? "bg-[#2196F3]"
                      : "bg-[#F2F4F7]"
                  )}
                  style={{ borderRadius: "50%" }}
                >
                  <FaCircleCheck
                    className={cn(
                      "size-4",
                      isStep1Active || isStep1Completed
                        ? "text-white"
                        : "text-[#6B7280]"
                    )}
                  />
                </div>
                <span
                  className={cn(
                    "ml-3 text-xl",
                    isStep1Active || isStep1Completed
                      ? "font-medium text-[#2196F3] text-sm"
                      : "font-normal text-[#6B7280] text-sm"
                  )}
                >
                  Word Detail
                </span>
              </div>
              <div className="w-[30%] h-px bg-[#E5E7EB] mx-4" />
              <div className="flex items-center">
                <div
                  className={cn(
                    "flex items-center justify-center size-[28px]",
                    isStep2Active ? "bg-[#2196F3]" : "bg-[#F2F4F7]"
                  )}
                  style={{ borderRadius: "50%" }}
                >
                  <FaCircleCheck
                    className={cn(
                      "size-4",
                      isStep2Active ? "text-white" : "text-[#6B7280]"
                    )}
                  />
                </div>
                <span
                  className={cn(
                    "ml-3 text-xl",
                    isStep2Active
                      ? "font-medium text-[#2196F3] text-sm"
                      : "font-normal text-[#6B7280] text-sm"
                  )}
                >
                  Letter Detail
                </span>
              </div>
            </div> */}

            {step === 1 ? (
              <div className="flex flex-col gap-3 mt-5">
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-4">
                    <TextField
                      name="wordsName"
                      prefix={<img src={WORD_ICON} alt="WORD_ICON" />}
                      placeholder="Word name"
                      className="rounded-[8px] flex-1 w-full"
                    />
                    <TextField
                      name="levelName"
                      prefix={<img src={LEVEL_ICON} alt="LEVEL_ICON" />}
                      placeholder="Level"
                      className="rounded-[8px] flex-1"
                    />
                    <div className="col-span-2">
                      <RichTextEditor
                        name="levelScript"
                        placeholder="Script"
                        className={cn("rounded-[8px]  mt-0")}
                        minHeight={open?.data ? "200px" : "150px"}
                      />
                    </div>
                    <div className="col-span-2">
                      {/* <SoundField
                        name="wordAudio"
                        className="rounded-[8px] flex-1"
                        audioNameClass="max-w-[300px] truncate text-ellipsis"
                        edit={Boolean(open?.data)}
                      /> */}
                    </div>
                    {/* <div className="col-span-2 flex flex-col gap-4">
                      <TextField
                        name="removeLetter"
                        prefix={<img src={WORD_ICON} alt="WORD_ICON" />}
                        placeholder="Remove word name"
                        className="rounded-[8px] flex-1 w-full"
                      />
                      <SoundField
                        name="afterRemoveAudio"
                        className="rounded-[8px] flex-1"
                        audioNameClass="max-w-[300px] truncate text-ellipsis"
                        edit={Boolean(open?.data)}
                      />
                    </div> */}
                  </div>
                </div>
                <DialogFooter className="flex sm:justify-center justify-center mt-8 mb-2">
                  {/* <Button
                    className="text-base max-sm:py-[13.5px] font-semibold sm:text-lg w-fit px-20 shadow-[0px_4px_6px_0px_#8FD5FF]"
                    type="button"
                    onClick={handleNext}
                  >
                    Next
                  </Button> */}
                  <Button
                    className="text-base max-sm:py-[13.5px] font-semibold sm:text-lg w-fit px-20 shadow-[0px_4px_6px_0px_#8FD5FF]"
                    type="submit"
                  >
                    {open?.data ? "Save" : "Add"}
                  </Button>
                </DialogFooter>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-6">
                  {fields.map((field, idx) => (
                    <div
                      key={field.id}
                      className={cn(
                        "rounded-[8px] flex flex-col gap-3 relative border-2 border-dashed border-[#7E808C33] px-3 pt-8 pb-4"
                      )}
                    >
                      <div className="space-y-3 pt-1.5">
                        <TextField
                          name={`letters.${idx}.letter`}
                          prefix={<img src={WORD_ICON} alt="WORD_ICON" />}
                          placeholder="Letter"
                          className="rounded-[8px] flex-1"
                        />
                        <SoundField
                          name={`letters.${idx}.audio`}
                          className="rounded-[8px] flex-1"
                          edit={Boolean(open?.data)}
                        />
                        {fields.length > 1 && (
                          <button
                            type="button"
                            className="absolute -top-4 -right-3 "
                            onClick={() => {
                              if (field?.letterId) {
                                setDeletedLetterIds((prev) => [
                                  ...prev,
                                  field?.letterId,
                                ]);
                              }
                              remove(idx);
                            }}
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
                  <p
                    className="sm:text-lg text-base font-semibold text-[#04163C] cursor-pointer"
                    onClick={() => append({ letter: "", audio: null })}
                  >
                    + Add Letter
                  </p>
                </div>
                <DialogFooter className="flex sm:justify-center justify-center mb-2">
                  <Button
                    className="text-base max-sm:py-[13.5px] font-semibold sm:text-lg w-fit px-20 shadow-[0px_4px_6px_0px_#8FD5FF]"
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
