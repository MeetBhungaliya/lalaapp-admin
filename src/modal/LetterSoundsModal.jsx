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
import { CREATE_LEVEL } from "@/constants/endpoints";
import FormProvider from "@/form/FormProvider";
import RichTextEditor from "@/form/RichTextEditor";
import SoundField from "@/form/SoundField";
import TextField from "@/form/TextField";
import { fetchApi } from "@/lib/api";
import { CLOSE_SECONDARY_ICON, LEVEL_ICON } from "@/lib/images";
import { LetterSoundsSchema } from "@/lib/schema";
import { asyncResponseToaster } from "@/lib/toasts";
import { cn } from "@/lib/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toFormData } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const defaultValues = {
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

  const onSubmit = async (values) => {
    const prevAudio = open?.data?.row?.wordsList;

    const updatedAudio = values.wordAudio;

    let removedAudio = [];
    prevAudio.forEach((e) => {
      if (!updatedAudio.includes(e.audio)) {
        removedAudio.push(e.wordsId);
      }
    });

    const payload = {
      ...values,
      // wordAudio: Array.isArray(values.wordAudio)
      //   ? values.wordAudio
      //   : [values.wordAudio],
    };
    const result = await asyncResponseToaster(() =>
      createLevelMutation.mutateAsync(
        toFormData({
          ...payload,
          tutorialId,
        })
      )
    );

    if (result.success && result.value && result.value.isSuccess) {
      queryClient.refetchQueries(getLevels());
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

  // const onDrop = (acceptedFiles) => {
  //   setValue(
  //     "image",
  //     Object.assign(acceptedFiles[0], {
  //       preview: URL.createObjectURL(acceptedFiles[0]),
  //     }),
  //     {
  //       shouldDirty: true,
  //       shouldValidate: true,
  //     }
  //   );
  // };

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
              <TextField
                name="levelName"
                prefix={<img src={LEVEL_ICON} alt="LEVEL_ICON" />}
                placeholder="Level"
                className="rounded-[8px]"
              />
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

                    {/* <UploadImage
                      name="image"
                      onDrop={onDrop}
                      className="rounded-[8px] flex-1"
                    /> */}
                  </div>
                </div>
              ) : (
                <div className={`flex ${flexDirection} gap-x-8 gap-y-3`}>
                  <SoundField
                    name="wordAudio"
                    placeholder="sound"
                    className="rounded-[8px] flex-1"
                  />
                  {/* <UploadImage
                    name="image"
                    onDrop={onDrop}
                    className="rounded-[8px] flex-1"
                  /> */}
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
