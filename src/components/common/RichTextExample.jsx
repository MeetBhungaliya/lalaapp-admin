import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import RichTextEditor from '@/form/RichTextEditor'
import { Button } from '@/components/ui/button'

const schema = yup.object({
    content: yup.string().required('Content is required'),
    title: yup.string().required('Title is required'),
}).required()

const RichTextExample = () => {
    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            content: '',
            title: ''
        }
    })

    const { handleSubmit, watch } = methods
    const content = watch('content')

    const onSubmit = (data) => {
        console.log('Form submitted:', data)
        console.log('HTML Content:', data.content)
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-primary mb-6">Rich Text Editor Example</h1>
            
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <RichTextEditor
                        name="content"
                        label="Content"
                        placeholder="Start writing your content here..."
                        minHeight="400px"
                    />
                    
                    <div className="flex gap-4">
                        <Button type="submit" className="px-6 py-2">
                            Submit
                        </Button>
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => methods.reset()}
                            className="px-6 py-2"
                        >
                            Reset
                        </Button>
                    </div>
                </form>
            </FormProvider>

            {/* Preview Section */}
            {content && (
                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                    <h2 className="text-xl font-semibold text-primary mb-4">Preview:</h2>
                    <div 
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                </div>
            )}
        </div>
    )
}

export default RichTextExample 