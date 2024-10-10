import ProfileIcon from "../../../icons/profile-icon"
import CarouselIcon from "../../../icons/carousel-icon"
import RenameIcon from "../../../icons/rename-icon"
import ImageEditingIcon from "../../../icons/image-editing-icon"
import AudioEditingIcon from "../../../icons/audio-editing-icon"
import VideoEditingIcon from "../../../icons/video-editing-icon"
import localization from "./selector-options.localization"

export class SelectorOptions {

    static getOptions(language) {
        localization.setLanguage(language)

        let options = [
            {
                key: "profile",
                commands: [
                    {
                        key: "profile",
                        label: localization.profile,
                        description: localization.profileDescription,
                        icon: ProfileIcon
                    }
                ]
            },
    
            {
                key: "pages",
                commands: [
                    {
                        key: "page-configurer",
                        label: localization.blankPage,
                        description: localization.blankPageDescription,
                        icon: CarouselIcon
                    },
                    {
                        key: "carousel-configurer",
                        label: localization.carousel,
                        description: localization.carouselDescription,
                        icon: CarouselIcon
                    }
                ]
            },
            {
                key: "text",
                commands: [
                    {
                        key: "title",
                        label: localization.title,
                        description: localization.titleDescription,
                        icon: RenameIcon
                    },
                    {
                        key: "heading",
                        label: localization.heading,
                        description: localization.headingDescription,
                        icon: RenameIcon
                    },
                    {
                        key: "text",
                        label: localization.text,
                        description: localization.textDescription,
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
                        label: localization.image,
                        // description: "Upload an image or embed image link",
                        description: localization.imageDescription,
                        icon: ImageEditingIcon
                    },
                    {
                        key: "reel",
                        label: localization.video,
                        // description: "Upload video file or embed video link",
                        description: localization.videoDescription,
                        icon: VideoEditingIcon
                    },
                    {
                        key: "audio",
                        label: localization.audio,
                        // description: "Upload an audio file or embed audio link",
                        description: localization.audioDescription,
                        icon: AudioEditingIcon
                    }
                ]
            },
            {
                key: "advanced",
                commands: [
                    {
                        key: "question",
                        label: localization.question,
                        description: localization.questionDescription,
                        icon: ImageEditingIcon
                    },
                    {
                        key: "message",
                        label: localization.message,
                        description: localization.messageDescription,
                        icon: VideoEditingIcon
                    }
                ]
            }
    
        ]

        return options
    }
}
