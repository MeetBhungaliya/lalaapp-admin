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
import { LetterSoundsSchema } from "@/lib/schema";
import { asyncResponseToaster } from "@/lib/toasts";
import { cn } from "@/lib/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toFormData } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const defaultValues = {
  wordsName: "",
  levelName: "",
  wordAudio: "",
  levelScript: "",
};

const LetterSoundsModal = ({ open, setOpen, tutorialId }) => {
  const queryClient = useQueryClient();

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(LetterSoundsSchema),
  });

  const { handleSubmit, watch, reset } = methods;

  useEffect(() => {
    if (!open?.data) return;

    reset({
      wordsName:
        open?.data?.row?.wordsList?.map((w) => w?.word).join(", ") ?? "",
      levelName: open?.data?.row?.levelName ?? "",
      wordAudio: open?.data?.row?.wordsList.map((e) => e.audio) ?? [],
      levelScript: open?.data?.row?.levelScript ?? "",
    });
  }, [open?.data]);

  const soundValue = watch("wordAudio");
  const imageValue = watch("image");

  const isAnySelected = !!soundValue || !!imageValue;
  const flexDirection = isAnySelected ? "flex-col-reverse" : "flex-row";

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

    if (open?.data?.row?.levelId && open?.data?.row?.wordsList?.[0]?.wordsId) {
      const newAudio = values.wordAudio.filter((file) => file instanceof File);

      if (
        open?.data?.row?.levelName !== values?.levelName ||
        open?.data?.row?.levelScript !== values?.levelScript
      ) {
        updateLevelMutation.mutateAsync(
          toFormData({
            tutorialId,
            levelScript: values?.levelScript,
            levelName: values?.levelName,
            levelId: open?.data?.row?.levelId,
          })
        );
      }

      payload = {
        wordId: open?.data?.row?.wordsList?.[0]?.wordsId,
        wordsName: values.wordsName,
        wordAudio: newAudio?.[0],
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
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="sm:max-w-[655px] px-8 py-6 rounded-[24px]  overflow-hidden"
      >
        <DialogHeader className="flex flex-row justify-between pb-4 -mx-6 px-6 border-b border-[#EDEDED]">
          <DialogTitle className="text-2xl font-bold text-primary">
            {open?.data ? "Edit" : "Add"} Word
          </DialogTitle>
          <div onClick={handleClose} className="cursor-pointer">
            <img src={CLOSE_SECONDARY_ICON} alt="CLOSE_ICON" />
          </div>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh] overflow-y-auto">
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <div
              className={`flex flex-col gap-6 pt-5 ${
                open?.data ? "px-12" : ""
              }`}
            >
              <div className="grid grid-cols-2 gap-4">
                <TextField
                  name="wordsName"
                  prefix={<img src={WORD_ICON} alt="WORD_ICON" />}
                  placeholder="Word name"
                  className="rounded-[8px] w-full"
                />
                <TextField
                  name="levelName"
                  prefix={<img src={LEVEL_ICON} alt="LEVEL_ICON" />}
                  placeholder="Level"
                  className="rounded-[8px]"
                />
              </div>
              <RichTextEditor
                name="levelScript"
                placeholder="Script"
                className={cn("rounded-[8px]  mt-0")}
                minHeight={open?.data ? "200px" : "150px"}
              />
              {open?.data ? (
                <div className="border-2 border-dashed border-[#7E808C33] rounded-[8px] p-3 space-y-3">
                  <div className="text-[#04163C] text-lg underline text-end font-normal">
                    Edit
                  </div>
                  <div className={`flex ${flexDirection} gap-x-8 gap-y-3`}>
                    {Array.isArray(soundValue) &&
                      soundValue.length &&
                      soundValue.map((sound, index) => {
                        return (
                          <SoundField
                            name={`wordAudio.${index}`}
                            placeholder="sound"
                            className="rounded-[8px] flex-1"
                            edit
                          />
                        );
                      })}
                  </div>
                </div>
              ) : (
                <div className={`flex ${flexDirection} gap-x-8 gap-y-3`}>
                  <SoundField
                    name="wordAudio"
                    placeholder="sound"
                    className="rounded-[8px] flex-1"
                  />
                </div>
              )}
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

export default LetterSoundsModal;
