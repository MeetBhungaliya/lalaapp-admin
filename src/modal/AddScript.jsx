import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { CLOSE_SECONDARY_ICON } from '@/lib/images'
import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import RichTextEditor from '@/form/RichTextEditor'
import { useForm } from 'react-hook-form'
import FormProvider from '@/form/FormProvider'
import Button from '@/components/custom/Button'
import { ScrollArea } from '@/components/ui/scroll-area'

const schema = yup.object({
    script: yup.string().required('Script content is required'),
    title: yup.string().required('Title is required'),
}).required()

const AddScript = ({ open, setOpen }) => {
    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            script: '',
            title: ''
        }
    })

    const { handleSubmit, reset } = methods

    const handleClose = () => {
        setOpen({ open: false, data: null })
        reset()
    }

    const onSubmit = (data) => {
        console.log('Form data:', data)
        // Handle form submission here
        handleClose()
    }

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
            <ScrollArea  className='max-h-[80vh] overflow-y-auto'>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} className="px-6 py-4 space-y-6">
                    <RichTextEditor
                        name="script"
                        label="Script Content"
                        placeholder="Enter your script content here..."
                        minHeight="200px"
                    />

                    <div className="flex justify-center gap-3 pt-4">
                        <Button
                            className="text-base shadow-[0px_4px_6px_0px_#8FD5FF] py-[12.5px] font-semibold sm:text-lg w-fit px-20"
                            type="submit"
                        // onClick={handleNext}
                        >
                            Save
                        </Button>
                    </div>
                </FormProvider>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

export default AddScript