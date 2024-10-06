import AudioEditingIcon from "../icons/audio-editing-icon"
import CarouselIcon from "../icons/carousel-icon"
import ImageEditingIcon from "../icons/image-editing-icon"
import ProfileIcon from "../icons/profile-icon"
import { RenameIcon } from "../icons/rename-icon"
import VideoEditingIcon from "../icons/video-editing-icon"


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
                key: "page-configurer",
                label: "Page",
                description: "Create a sub-page inside this page",
                icon: CarouselIcon
            },
            {
                key: "carousel-configurer",
                label: "Page Carousel",
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
                key: "text",
                label: "Text",
                description: "Begin writing with plain text",
                icon: RenameIcon
            },
            {
                key: "title",
                label: "Title",
                description: "Create a bold section heading",
                icon: RenameIcon
            },
            {
                key: "heading",
                label: "Heading",
                description: "Create a medium section heading",
                icon: RenameIcon
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
                // description: "Upload an image or embed image link",
                description: "Embed image link",
                icon: ImageEditingIcon
            },
            {
                key: "reel",
                label: "Reel",
                // description: "Upload video file or embed video link",
                description: "Embed video link",
                icon: VideoEditingIcon
            },
            {
                key: "audio",
                label: "Audio",
                // description: "Upload an audio file or embed audio link",
                description: "Embed audio link",
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