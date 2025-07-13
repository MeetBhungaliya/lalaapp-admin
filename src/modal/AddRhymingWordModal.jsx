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
import { CLOSE_SECONDARY_ICON, LEVEL_ICON, WORD_ICON } from "@/lib/images";
import { asyncResponseToaster } from "@/lib/toasts";
import { cn } from "@/lib/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toFormData } from "axios";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";

const RhymingWordSchema = yup.object().shape({
  levelName: yup.string().required("Please enter level"),
  words: yup
    .array()
    .of(
      yup.object().shape({
        word: yup.string().required("Please enter word name"),
        audio: yup
          .mixed()
          .required("Please select sound")
          .test("fileExists", "Please select sound", (value) => !!value),
      })
    )
    .min(2, "At least two words required"),
  levelScript: yup.string().required("Please enter script"),
});

const defaultValues = {
  levelName: "",
  words: [
    { word: "", audio: null },
    { word: "", audio: null },
    { word: "", audio: null },
  ],
  levelScript: "",
};

const AddRhymingWordModal = ({ open, setOpen, tutorialId }) => {
  const queryClient = useQueryClient();

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(RhymingWordSchema),
  });

  const { handleSubmit, reset, control } = methods;

  const { fields, remove } = useFieldArray({
    control,
    name: "words",
  });

  useEffect(() => {
    if (open?.data) {
      reset({
        levelName: open?.data?.levelName || "",
        levelScript: open?.data?.levelScript || "",
        words: open.data.wordsList || defaultValues.words,
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
      let updatedWords = [];

      values.words?.forEach((word) => {
        const prevWord = open?.data?.wordsList?.find(
          (w) => w?.wordsId === word?.wordsId
        );

        if (JSON.stringify(prevWord) !== JSON.stringify(word)) {
          updatedWords.push(word);
        }
      });

      if (
        open?.data?.levelName !== values?.levelName ||
        open?.data?.levelScript !== values?.levelScript
      ) {
        result = await asyncResponseToaster(() =>
          updateLevelMutation.mutateAsync(
            toFormData({
              tutorialId,
              levelScript: values?.levelScript,
              levelName: values?.levelName,
              levelId: open?.data?.levelId,
            })
          )
        );
      }

      if (updatedWords?.length) {
        const res = await Promise.all(
          updatedWords.map(async (w) => {
            return await updateWordMutation.mutateAsync(
              toFormData({
                wordId: w?.wordsId,
                wordsName: w?.word,
                wordAudio: w?.audio,
              })
            );
          })
        );

        result = await asyncResponseToaster(() => res?.[0]);
      }
    } else {
      payload = {
        tutorialId,
        levelName: values?.levelName,
        levelScript: values?.levelScript,
        wordsName: JSON.stringify(values?.words?.map((w) => w?.word)),
        wordAudio: values?.words?.map((w) => w?.audio),
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
  };

  return (
    <Dialog open={open?.open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[900px] max-w-[90%] px-8 max-h-[90vh] py-6 rounded-[24px] overflow-hidden">
        <DialogHeader className="flex flex-row justify-between pb-4 -mx-6 px-6 border-b border-[#EDEDED]">
          <DialogTitle className="text-2xl font-bold text-primary">
            {open?.data ? "Edit Words" : "Add Words"}
          </DialogTitle>
          <div onClick={handleClose} className="cursor-pointer">
            <img src={CLOSE_SECONDARY_ICON} alt="CLOSE_SECONDARY_ICON" />
          </div>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh] overflow-y-auto">
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6  border-2 p-4 mt-4 border-dashed border-[#7E808C33] rounded-[8px]">
              <TextField
                name="levelName"
                prefix={<img src={LEVEL_ICON} alt="LEVEL_ICON" />}
                placeholder="Level"
                className="rounded-[8px] flex-1"
              />
              <RichTextEditor
                name="levelScript"
                placeholder="Script"
                className={cn("rounded-[8px]  mt-0")}
                minHeight={open?.data ? "200px" : "150px"}
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 h-full gap-6">
                {fields.map((field, idx) => (
                  <div
                    key={field.id}
                    className={cn(
                      "rounded-[8px] h-full  flex flex-col gap-3 relative",
                      open?.data && "border-2 border-dashed border-[#7E808C33]",
                      open?.data &&
                        "border-2 border-dashed border-[#7E808C33] px-3 pt-8 pb-4"
                    )}
                  >
                    {open?.data && (
                      <div className="absolute top-2 right-2 flex items-center gap-1">
                        <span className="text-base  text-[#04163C] underline font-normal flex items-center gap-1 cursor-pointer">
                          Edit
                        </span>
                      </div>
                    )}
                    <div className={cn("space-y-5", open?.data && "pt-1.5 ")}>
                      <TextField
                        name={`words.${idx}.word`}
                        prefix={<img src={WORD_ICON} alt="WORD_ICON" />}
                        placeholder="Word name"
                        className="rounded-[8px] flex-1"
                      />
                      <SoundField
                        name={`words.${idx}.audio`}
                        className="rounded-[8px] flex-1"
                        edit={Boolean(open?.data)}
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
                className="text-base shadow-[0px_4px_6px_0px_#8FD5FF] py-[12.5px] font-semibold sm:text-lg w-fit px-20"
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

export default AddRhymingWordModal;
