import React, { lazy, Suspense } from "react"
import packageInfo from '../../package.json'
import { v4 as uuidv4 } from 'uuid'

const Heading = lazy(() => import('../components/heading/Heading'))
const Title = lazy(() => import('../components/title/Title'))
const Button = lazy(() => import('../components/button/Button'))
const Question = lazy(() => import('../components/question/Question'))
const CarouselTile = lazy(() => import('../components/CarouselTile'))
const Message = lazy(() => import('../components/message/Message'))
const Reel = lazy(() => import('../components/reel/Reel'))
const Profile = lazy(() => import('../components/profile/Profile'))
const Cta = lazy(() => import('../components/cta/Cta'))

export default class TemplateFactory extends React.Component {

    static templates: any = {
        "audio": {

        },
        "text": {
            type: "text",
            text: "a",
            position: "left",
            builderVersion: packageInfo.version
        },
        "heading": {
            component: Heading
        },
        "title": {
            component: Title
        },
        "image": {
            type: "image",
            source: "https://jigjoy.io/assets/placeholderimage.jpg",
            position: "left",
            size: 'large',
            builderVersion: packageInfo.version
        },
        "button": {
            component: Button
        },
        "question": {
            component: Question
        },
        "carousel": {
            component: CarouselTile
        },
        "message": {
            component: Message
        },
        "reel": {
            component: Reel
        },
        "profile": {
            component: Profile
        },
        "cta": {
            component: Cta
        },
        "block-selector": {
            type: "block-selector",
            builderVersion: packageInfo.version
        }
    }

    static get(type: string) {
        let block: any = this.templates[type]
        let template = JSON.parse(JSON.stringify(block))
        template.id = uuidv4()
        return template
    }
}