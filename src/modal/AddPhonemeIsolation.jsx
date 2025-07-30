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
import { CREATE_LEVEL, UPDATE_LEVEL, UPDATE_WORD } from "@/constants/endpoints";
import FormProvider from "@/form/FormProvider";
import RichTextEditor from "@/form/RichTextEditor";
import SoundField from "@/form/SoundField";
import TextField from "@/form/TextField";
import { fetchApi } from "@/lib/api";
import {
  CLOSE_SECONDARY_ICON,
  LEVEL_ICON,
  QUESTION_ICON,
  WORD_ICON,
} from "@/lib/images";
import { asyncResponseToaster } from "@/lib/toasts";
import { cn } from "@/lib/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toFormData } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const PhonemeIsolationSchema = yup.object().shape({
  wordsName: yup.string().required("Please enter word name"),
  levelName: yup.string().required("Please enter level"),
  wordAudio: yup
    .mixed()
    .required("Please select sound")
    .test("Required", "Please select sound", (value) => {
      return value;
    }),
  image: yup.string().optional(),
  levelScript: yup.string().required("Please enter script"),
  question: yup.string().required("Please enter letter"),
});

const defaultValues = {
  wordsName: "",
  levelName: "",
  wordAudio: "",
  levelScript: "",
  question: "",
};

const AddPhonemeIsolation = ({ open, setOpen, tutorialId }) => {
  const queryClient = useQueryClient();

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(PhonemeIsolationSchema),
  });

  const { handleSubmit, reset, watch } = methods;

  useEffect(() => {
    if (open?.data) {
      reset({
        wordsName: open?.data?.wordsList?.map((w) => w?.word).join(", ") ?? "",
        levelName: open?.data?.levelName ?? "",
        wordAudio: open?.data?.wordsList.map((e) => e.audio) ?? [],
        levelScript: open?.data?.levelScript ?? "",
        question: open?.data?.question ?? "",
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

  const onSubmit = async (values) => {
    let payload = {};
    let result = {};

    if (open?.data?.levelId && open?.data?.wordsList?.[0]?.wordsId) {

      if (
        open?.data?.levelName !== values?.levelName ||
        open?.data?.levelScript !== values?.levelScript
      ) {
        updateLevelMutation.mutateAsync(
          toFormData({
            tutorialId,
            levelScript: values?.levelScript,
            levelName: values?.levelName,
            levelId: open?.data?.levelId,
          })
        );
      }

      payload = {
        wordId: open?.data?.wordsList?.[0]?.wordsId,
        wordsName: values.wordsName,
        wordAudio: values?.wordAudio,
      };

      result = await asyncResponseToaster(() =>
        updateWordMutation.mutateAsync(toFormData(payload))
      );
    } else {
      payload = {
        ...values,
        tutorialId,
        wordAudio: [values.wordAudio],
        wordsName: JSON.stringify([values.wordsName]),
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
    setOpen({
      open: false,
      data: null,
    });
    reset(defaultValues);
  };

  return (
    <Dialog open={open?.open} onOpenChange={handleClose}>
      <DialogContent className={cn(" max-h-[90vh] overflow-hidden sm:max-w-[700px] max-w-[90%] py-6 px-0 rounded-[24px]")}>
        <DialogHeader className="flex flex-row justify-between  px-8 pb-4   border-b border-[#EDEDED]">
          <DialogTitle className="text-2xl font-bold text-primary">
            {open?.data ? "Edit Word" : "Add Words"}
          </DialogTitle>
          <div onClick={handleClose} className="cursor-pointer">
            <img src={CLOSE_SECONDARY_ICON} alt="CLOSE_SECONDARY_ICON" />
          </div>
        </DialogHeader>
        <ScrollArea className={cn("flex-1 max-h-[80vh] overflow-y-auto flex flex-col", open?.data ? "px-0" : "px-8")}>
          <FormProvider
            methods={methods}
            onSubmit={handleSubmit(onSubmit)}
            className="max-h-[65vh]"
          >
            <div className={cn("flex flex-col gap-6  rounded-[8px] pt-2.5 ", open?.data ? "sm:px-14 px-5" : "px-1.5")}>
              <div className={cn(!open?.data ? "grid grid-cols-2 gap-6" : "flex flex-col gap-3.5")}>
                {!open?.data && (
                  <TextField
                    name="wordsName"
                    prefix={<img src={WORD_ICON} alt="WORD_ICON" />}
                    placeholder="Word name"
                    className="rounded-[8px] flex-1 w-full"
                  />
                )}
                <TextField
                  name="levelName"
                  prefix={<img src={LEVEL_ICON} alt="LEVEL_ICON" />}
                  placeholder="Level"
                  className={cn("rounded-[8px] flex-1 ")}
                />
              </div>
              <RichTextEditor
                name="levelScript"
                placeholder="Script"
                className={cn("rounded-[8px]  mt-0")}
                minHeight={open?.data ? "200px" : "150px"}
              />
              <TextField
                name="question"
                prefix={<img src={QUESTION_ICON} alt="QUESTION_ICON" />}
                placeholder="Letter"
                className="rounded-[8px] flex-1"
              />
              <div
                className={cn(
                  !open?.data
                    ? ""
                    : "border-2 border-dashed border-[#7E808C33] rounded-[8px] p-4 space-y-3.5"
                )}
              >
                {/* {open?.data && (
                  // <p className="text-base font-normal underline text-[#04163C]ml-auto text-end">
                  //   Edit
                  // </p>
                )} */}
                {open?.data && (
                  <TextField
                    name="wordsName"
                    prefix={<img src={WORD_ICON} alt="WORD_ICON" />}
                    placeholder="Word name"
                    className="rounded-[8px] flex-1 w-full"
                  />
                )}
                <div
                  className={cn(
                    open?.data
                      ? "flex flex-col gap-3.5"
                      : !watch("sound") && !watch("image")
                        ? "flex gap-6"
                        : "flex flex-col  gap-3.5"
                  )}
                >
                  <SoundField
                    name="wordAudio"
                    className="rounded-[8px] flex-1"
                    edit={Boolean(open?.data)}
                    audioNameClass="max-w-[300px] truncate text-ellipsis"
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
