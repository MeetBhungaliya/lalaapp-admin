import Button from "@/components/custom/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { METHODS } from "@/constants/common";
import { ADD_UPDATE_TUTORIAL_SCRIPT } from "@/constants/endpoints";
import FormProvider from "@/form/FormProvider";
import RichTextEditor from "@/form/RichTextEditor";
import { fetchApi } from "@/lib/api";
import { CLOSE_SECONDARY_ICON } from "@/lib/images";
import { asyncResponseToaster } from "@/lib/toasts";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  tutorialScript: yup.string().required("Script content is required"),
});

const AddScript = ({ open, setOpen, tutorialId, refechQuery }) => {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      tutorialScript: "",
    },
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (!open?.data) return;

    reset({
      tutorialScript: open?.data?.tutorialScript ?? "",
    });
  }, [open?.data]);

  const addUpdateScriptMutation = useMutation({
    mutationFn: async (data) =>
      fetchApi({ url: ADD_UPDATE_TUTORIAL_SCRIPT, method: METHODS.POST, data }),
  });

  const handleClose = () => {
    setOpen({ open: false, data: null });
    reset();
  };

  const onSubmit = async (values) => {
    const result = await asyncResponseToaster(() =>
      addUpdateScriptMutation.mutateAsync({
        tutorialId,
        tutorialScript: values.tutorialScript,
      })
    );

    if (result.success && result.value && result.value.isSuccess) {
      refechQuery();
      reset();
      handleClose();
    }
  };

  return (
    <Dialog open={open?.open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[800px] max-w-[90%] max-h-[90vh] px-0 py-6 rounded-[24px] overflow-hidden">
        <DialogHeader className="flex flex-row justify-between pb-4 px-6 border-b border-[#EDEDED]">
          <DialogTitle className="text-2xl font-bold text-primary">
            Add Script
          </DialogTitle>
          <div onClick={handleClose} className="cursor-pointer">
            <img src={CLOSE_SECONDARY_ICON} alt="CLOSE_SECONDARY_ICON" />
          </div>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh] overflow-y-auto">
          <FormProvider
            methods={methods}
            onSubmit={handleSubmit(onSubmit)}
            className="px-6 py-4 space-y-6"
          >
            <RichTextEditor
              name="tutorialScript"
              label="Script Content"
              placeholder="Enter your script content here..."
              minHeight="200px"
            />

            <div className="flex justify-center gap-3 pt-4">
              <Button
                disabled={addUpdateScriptMutation.isPending}
                loader={addUpdateScriptMutation.isPending}
                className="text-base shadow-[0px_4px_6px_0px_#8FD5FF] py-[12.5px] font-semibold sm:text-lg w-fit px-20"
                type="submit"
              >
                Save
              </Button>
            </div>
          </FormProvider>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AddScript;
