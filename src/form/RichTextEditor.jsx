import React, { useState, useEffect, useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { get } from 'lodash'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Strikethrough,
    List,
    ListOrdered,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Highlighter,
    Palette,
    ChevronDown,
    Image as ImageIcon,
    Heading1,
    Heading2,
    Heading3,
    Type
} from 'lucide-react'

const ImagePicker = ({ onImageSelect }) => {
    const fileInputRef = useRef(null)

    const handleFileUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file')
                return
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size should be less than 5MB')
                return
            }

            const reader = new FileReader()
            reader.onload = (e) => {
                const url = e.target.result
                onImageSelect(url)
            }
            reader.readAsDataURL(file)
        }

        // Reset the input so the same file can be selected again
        e.target.value = ''
    }

    return (
        <div className="relative">
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="image-upload"
            />
            <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 rounded hover:bg-gray-200 transition-colors text-gray-600 flex items-center gap-1"
                title="Add Image"
            >
                <ImageIcon size={16} />
            </button>
        </div>
    )
}

const ColorPicker = ({ onColorSelect, currentColor, title, colors }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [dropdownPosition, setDropdownPosition] = useState({ top: 100, left: 100 })
    const pickerRef = useRef(null)
    const buttonRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        const handleResize = () => {
            if (isOpen && buttonRef.current) {
                const rect = buttonRef.current.getBoundingClientRect()
                if (rect) {
                    const viewportWidth = window.innerWidth
                    const dropdownWidth = 200
                    
                    let left = rect.left
                    let top = rect.bottom + 4
                    
                    // Check if dropdown would overflow on the right
                    if (left + dropdownWidth > viewportWidth - 20) {
                        left = rect.right - dropdownWidth
                    }
                    
                    // Ensure it doesn't go off the left edge
                    if (left < 20) {
                        left = 20
                    }
                    
                    setDropdownPosition({ top, left })
                }
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
            window.addEventListener('resize', handleResize)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            window.removeEventListener('resize', handleResize)
        }
    }, [isOpen])

    return (
        <div className="relative" ref={pickerRef}>
            <button
                ref={buttonRef}
                type="button"
                onClick={() => {
                    if (!isOpen) {
                        // Simple positioning logic
                        const rect = buttonRef.current?.getBoundingClientRect()
                        if (rect) {
                            const viewportWidth = window.innerWidth
                            const dropdownWidth = 200
                            
                            // Check if dropdown would overflow on the right
                            if (rect.right + dropdownWidth > viewportWidth - 20) {
                                setDropdownPosition({ top: 0, left: 0 }) // Use right positioning
                            } else {
                                setDropdownPosition({ top: 0, left: rect.left }) // Use left positioning
                            }
                        }
                    }
                    setIsOpen(!isOpen)
                }}
                className="p-2 rounded hover:bg-gray-200 transition-colors text-gray-600 flex items-center gap-1"
                title={title}
            >
                <Palette size={16} />
                <ChevronDown size={12} />
            </button>

            {isOpen && (
                <div 
                    className="absolute top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-[9999] min-w-[200px]"
                    style={{
                        left: dropdownPosition.left === 0 ? 'auto' : `${dropdownPosition.left}px`,
                        right: dropdownPosition.left === 0 ? '0' : 'auto',
                        maxWidth: 'calc(100vw - 40px)',
                        transform: dropdownPosition.left === 0 ? 'translateX(0)' : 'none'
                    }}
                >
                    <div className="grid grid-cols-7 gap-2">
                        {colors.map((color) => (
                            <button
                                key={color}
                                type="button"
                                onClick={() => {
                                    onColorSelect(color)
                                    setIsOpen(false)
                                }}
                                className={cn(
                                    "w-6 h-6 rounded border-2 transition-all hover:scale-110",
                                    currentColor === color ? "border-gray-800" : "border-gray-300"
                                )}
                                style={{ backgroundColor: color }}
                                title={`Color: ${color}`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

const HighlightPicker = ({ onColorSelect, currentColor, title, colors }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [dropdownPosition, setDropdownPosition] = useState({ top: 100, left: 100 })
    const pickerRef = useRef(null)
    const buttonRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        const handleResize = () => {
            if (isOpen && buttonRef.current) {
                const rect = buttonRef.current.getBoundingClientRect()
                if (rect) {
                    const viewportWidth = window.innerWidth
                    const dropdownWidth = 200
                    
                    let left = rect.left
                    let top = rect.bottom + 4
                    
                    // Check if dropdown would overflow on the right
                    if (left + dropdownWidth > viewportWidth - 20) {
                        left = rect.right - dropdownWidth
                    }
                    
                    // Ensure it doesn't go off the left edge
                    if (left < 20) {
                        left = 20
                    }
                    
                    setDropdownPosition({ top, left })
                }
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
            window.addEventListener('resize', handleResize)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            window.removeEventListener('resize', handleResize)
        }
    }, [isOpen])

    return (
        <div className="relative" ref={pickerRef}>
            <button
                ref={buttonRef}
                type="button"
                onClick={() => {
                    if (!isOpen) {
                        // Simple positioning logic
                        const rect = buttonRef.current?.getBoundingClientRect()
                        if (rect) {
                            const viewportWidth = window.innerWidth
                            const dropdownWidth = 200
                            
                            // Check if dropdown would overflow on the right
                            if (rect.right + dropdownWidth > viewportWidth - 20) {
                                setDropdownPosition({ top: 0, left: 0 }) // Use right positioning
                            } else {
                                setDropdownPosition({ top: 0, left: rect.left }) // Use left positioning
                            }
                        }
                    }
                    setIsOpen(!isOpen)
                }}
                className="p-2 rounded hover:bg-gray-200 transition-colors text-gray-600 flex items-center gap-1"
                title={title}
            >
                <Highlighter size={16} />
                <ChevronDown size={12} />
            </button>

            {isOpen && (
                <div 
                    className="absolute top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-[9999] min-w-[200px]"
                    style={{
                        left: dropdownPosition.left === 0 ? 'auto' : `${dropdownPosition.left}px`,
                        right: dropdownPosition.left === 0 ? '0' : 'auto',
                        maxWidth: 'calc(100vw - 40px)',
                        transform: dropdownPosition.left === 0 ? 'translateX(0)' : 'none'
                    }}
                >
                    <div className="grid grid-cols-5 gap-2">
                        {colors.map((color) => (
                            <button
                                key={color}
                                type="button"
                                onClick={() => {
                                    onColorSelect(color)
                                    setIsOpen(false)
                                }}
                                className={cn(
                                    "w-6 h-6 rounded border-2 transition-all hover:scale-110",
                                    currentColor === color ? "border-gray-800" : "border-gray-300"
                                )}
                                style={{ backgroundColor: color }}
                                title={`Highlight: ${color}`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

const MenuBar = ({ editor }) => {
    const [textColor, setTextColor] = useState('#000000')
    const [highlightColor, setHighlightColor] = useState('#FFEB3B')

    if (!editor) {
        return null
    }

    const toggleColor = (color) => {
        setTextColor(color)
        editor.chain().focus().setColor(color).run()
    }

    const toggleHighlight = (color) => {
        setHighlightColor(color)
        editor.chain().focus().toggleHighlight({ color }).run()
    }

    const addImage = (url) => {
        editor.chain().focus().setImage({ src: url }).run()
    }

    const textColors = [
        '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
        '#FFA500', '#800080', '#008000', '#FFC0CB', '#A52A2A', '#808080', '#FFFFFF'
    ]

    const highlightColors = [
        '#FFEB3B', '#FF9800', '#4CAF50', '#2196F3', '#9C27B0',
        '#FF5722', '#795548', '#607D8B', '#E91E63', '#3F51B5'
    ]

    return (
        <div className="border-b border-gray-200 p-3 bg-gray-50 rounded-t-lg">
            <div className="flex flex-wrap gap-2">
                {/* Text Formatting */}
                <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={cn(
                            "p-2 rounded hover:bg-gray-200 transition-colors",
                            editor.isActive('bold') ? "bg-gray-200 text-primary" : "text-gray-600"
                        )}
                        title="Bold"
                    >
                        <Bold size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={cn(
                            "p-2 rounded hover:bg-gray-200 transition-colors",
                            editor.isActive('italic') ? "bg-gray-200 text-primary" : "text-gray-600"
                        )}
                        title="Italic"
                    >
                        <Italic size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={cn(
                            "p-2 rounded hover:bg-gray-200 transition-colors",
                            editor.isActive('underline') ? "bg-gray-200 text-primary" : "text-gray-600"
                        )}
                        title="Underline"
                    >
                        <UnderlineIcon size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={cn(
                            "p-2 rounded hover:bg-gray-200 transition-colors",
                            editor.isActive('strike') ? "bg-gray-200 text-primary" : "text-gray-600"
                        )}
                        title="Strikethrough"
                    >
                        <Strikethrough size={16} />
                    </button>
                </div>

                {/* Lists */}
                <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={cn(
                            "p-2 rounded hover:bg-gray-200 transition-colors",
                            editor.isActive('bulletList') ? "bg-gray-200 text-primary" : "text-gray-600"
                        )}
                        title="Bullet List"
                    >
                        <List size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={cn(
                            "p-2 rounded hover:bg-gray-200 transition-colors",
                            editor.isActive('orderedList') ? "bg-gray-200 text-primary" : "text-gray-600"
                        )}
                        title="Numbered List"
                    >
                        <ListOrdered size={16} />
                    </button>
                </div>

                {/* Text Alignment */}
                <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        className={cn(
                            "p-2 rounded hover:bg-gray-200 transition-colors",
                            editor.isActive({ textAlign: 'left' }) ? "bg-gray-200 text-primary" : "text-gray-600"
                        )}
                        title="Align Left"
                    >
                        <AlignLeft size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        className={cn(
                            "p-2 rounded hover:bg-gray-200 transition-colors",
                            editor.isActive({ textAlign: 'center' }) ? "bg-gray-200 text-primary" : "text-gray-600"
                        )}
                        title="Align Center"
                    >
                        <AlignCenter size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        className={cn(
                            "p-2 rounded hover:bg-gray-200 transition-colors",
                            editor.isActive({ textAlign: 'right' }) ? "bg-gray-200 text-primary" : "text-gray-600"
                        )}
                        title="Align Right"
                    >
                        <AlignRight size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                        className={cn(
                            "p-2 rounded hover:bg-gray-200 transition-colors",
                            editor.isActive({ textAlign: 'justify' }) ? "bg-gray-200 text-primary" : "text-gray-600"
                        )}
                        title="Justify"
                    >
                        <AlignJustify size={16} />
                    </button>
                </div>

                {/* Image */}
                <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
                    <ImagePicker onImageSelect={addImage} />
                </div>

                {/* Text Color - Native Input */}
                <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
                    <label className="flex items-center gap-1 cursor-pointer">
                        <Palette size={16} className="text-gray-600" />
                        <input
                            type="color"
                            value={textColor}
                            onChange={(e) => toggleColor(e.target.value)}
                            className="w-6 h-6 border border-gray-300 rounded cursor-pointer"
                            title="Text Color"
                        />
                    </label>
                </div>

                {/* Background Color - Native Input */}
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        <Highlighter size={14} className="text-gray-600" />
                        <input
                            type="color"
                            value={highlightColor}
                            onChange={(e) => toggleHighlight(e.target.value)}
                            className="w-5 h-5 border border-gray-300 rounded cursor-pointer"
                            title="Background Color"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

const RichTextEditor = ({
    name,
    placeholder = 'Start typing...',
    label,
    className,
    minHeight = '200px',
    ...other
}) => {
    const { control, setValue, watch } = useFormContext()
    const currentValue = watch(name)

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
                bulletList: {
                    HTMLAttributes: {
                        class: 'list-disc list-outside ml-6',
                    },
                },
                orderedList: {
                    HTMLAttributes: {
                        class: 'list-decimal list-outside ml-6',
                    },
                },
            }),
            Placeholder.configure({
                placeholder,
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Underline,
            TextStyle,
            Color,
            Highlight.configure({
                multicolor: true,
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'inline-image',
                },
                inline: true,
                allowBase64: true,
            }),
        ],
        content: currentValue || '',
        onUpdate: ({ editor }) => {
            setValue(name, editor.getHTML())
            // Also set the plain text version
            const plainText = editor.getText()
            setValue(`${name}Plain`, plainText)
            console.log(`RichTextEditor ${name}Plain:`, plainText) // Debug log
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
            },
        },
    })

    return (
        <FormField
            control={control}
            name={name}
            render={({ field, formState: { errors } }) => {
                const fieldError = get(errors, name)
                return (
                    <div className='space-y-1.5 sm:space-y-2.5'>
                        {label && (
                            <label className="text-primary pb-2 font-medium text-sm sm:text-base md:text-lg">
                                {label}
                            </label>
                        )}
                        <div className='space-y-0.5'>
                            <FormItem className="relative">
                                <FormControl>
                                    <div className={cn(
                                        'bg-ternary border-none rounded-[16px] mt-2 overflow-hidden',
                                        fieldError?.message ? "ring-1 ring-red-500" : "ring-1 ring-gray-200 focus-within:ring-main",
                                        className
                                    )}>
                                        <MenuBar editor={editor} />
                                        <div
                                            className="p-4 min-h-[200px] max-h-[400px] overflow-y-auto"
                                            style={{ minHeight }}
                                            onClick={() => {
                                                if (!editor?.isFocused) {
                                                    editor?.chain().focus().run()
                                                }
                                            }}
                                        >
                                            <EditorContent
                                                editor={editor}
                                                className="focus:outline-none"
                                                {...other}
                                            />
                                        </div>
                                    </div>
                                </FormControl>
                            </FormItem>
                            {fieldError?.message && (
                                <div className='pl-3 text-xs sm:text-sm font-normal text-red-500'>
                                    {fieldError?.message}
                                </div>
                            )}
                        </div>
                    </div>
                )
            }}
        />
    )
}

export default RichTextEditor