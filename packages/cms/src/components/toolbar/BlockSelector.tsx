import React, { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { v4 as uuid } from 'uuid'
import AudioEditingIcon from "../../icons/AudioEditingIcon"
import CarouselIcon from "../../icons/CarouselIcon"
import ImageEditingIcon from "../../icons/ImageEditingIcon"
import ProfileIcon from "../../icons/ProfileIcon"
import TextEditingIcon from "../../icons/TextEditingIcon"
import VideoEditingIcon from "../../icons/VideoEditingIcon"
import { blockingUpdated } from "../../reducers/toolbarReducer"
import Item from "../item/Item"
import ClickOutsideListener from "../popover/ClickOutsideListener"

export const selectorOptions = [

    {
        title: "Important",
        key: "important",
        commands: [
            {
                key: "profile",
                label: "Profile",
                description: "Showcase personal information and expertise.",
                icon: ProfileIcon
            },
            {
                key: "carousel",
                label: "Carousel",
                description: "Separate content into multiple connected pages.",
                icon: CarouselIcon
            }
        ]
    },
    {
        title: "Text",
        key: "text",
        commands: [
            {
                key: "paragraph",
                label: "Paragraph",
                description: "Begin writing with plain text",
                icon: TextEditingIcon
            },
            {
                key: "title",
                label: "Title",
                description: "Create a bold section heading",
                icon: TextEditingIcon
            },
            {
                key: "heading",
                label: "Heading",
                description: "Create a medium section heading",
                icon: TextEditingIcon
            }
        ]
    },
    {
        title: "Multimedia",
        key: "multimedia",
        commands: [
            {
                key: "image",
                label: "Image",
                description: "Upload an image or embed image link",
                icon: ImageEditingIcon
            },
            {
                key: "video",
                label: "Video",
                description: "Upload video file or embed video link",
                icon: VideoEditingIcon
            },
            {
                key: "audio",
                label: "Audio",
                description: "Upload an audio file or embed audio link",
                icon: AudioEditingIcon
            }
        ]
    },
    {
        title: "Advanced",
        key: "advanced",
        commands: [
            {
                key: "question",
                label: "Question",
                description: "Test user's knowledge by asking question.",
                icon: ImageEditingIcon
            },
            {
                key: "message",
                label: "Message",
                description: "Display message bubble.",
                icon: VideoEditingIcon
            }
        ]
    }

]

export default function BlockSelector(props: any) {


    const [option, setOption] = useState("")
    const [options, setOptions] = useState(selectorOptions)
    const [allOptions, setAllOptions] = useState(selectorOptions)
    const [showMenu, setShowMenu] = useState(false)
    const ref = useRef<HTMLInputElement>(null)
    
    const dispatch = useDispatch()

    useEffect(() => {
        ref.current?.focus()
    }, [])

    const filterCommands = (option: any, value: any, index: number) => {

        option.commands = allOptions[index].commands
            .filter((command: any) =>
                command.label.toLowerCase()
                    .includes(value.slice(1).toLowerCase()))
        return option
    }

    const handleChange = (event: any) => {

        setOption(event.target.value)


        dispatch(blockingUpdated(true))
        setShowMenu(true)

        let comm = JSON.parse(JSON.stringify(allOptions)) //deep copy
        let temp = comm.map((option: any, index: number) => filterCommands(option, event.target.value, index))

        let result = temp.filter((option) => option.commands.length > 0)

        setOptions(result)

    }

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            this.props.insertBlock({
                block: {
                    text: event.target.value.trim(),
                    type: 'paragraph',
                    insertType: 'direct-typing',
                    position: 'left',
                    id: uuid(),
                    builderVersion: this.builderVersion,
                    focus: false
                },
                id: props.id
            })
        }
    }

    const handleOutsideClick = () => {
        dispatch(blockingUpdated(false))
        setShowMenu(false)
    }

    const insertBlock = (type: string) => {
        alert(type)
    }

    return <ClickOutsideListener callback={handleOutsideClick}>
        <input
            ref={ref}
            type="text"
            value={option}
            className="w-[100%] h-[50px] bg-primary-light rounded-lg hover:bg-gray-300 cursor-pointer flex items-center pl-5 focus:outline-0 placeholder:text-[black]"
            placeholder="Click here to add element or type '/'"
            onChange={handleChange}
            onClick={handleChange}
            onKeyDown={handleKeyDown}
        />

        {
            showMenu && <div className="absolute w-[400px] min-w-[400px] max-h-[500px] h-auto overflow-y-auto z-40 bg-white p-2 border rounded-lg">
                {
                    options.map((option: any, index) => <div style={{ pointerEvents: 'auto', zIndex: 100 }}>
                        <>
                            {option.commands.map((command: any) => <>
                                <Item icon={command.icon} text={command.label} action={() => insertBlock(command.key)}><div className="mt-2 text-sm">{command.description}</div></Item>
                            </>)
                            }
                            {options.length!=index + 1 && <div className="py-2"><hr /></div>}
                        </>
                    </div>)
                }
            </div>
        }

    </ClickOutsideListener>
}