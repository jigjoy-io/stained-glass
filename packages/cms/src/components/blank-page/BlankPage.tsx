import React, { useEffect, useState } from "react"
import container from "../../util/container"
import BuildingBlock from "../../factories/BuildingBlock"
import { LazyMotion, m } from "framer-motion"


const animation = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            duration: 1,
            staggerChildren: 0.33
        }
    }
}

const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
}

const loadFeatures = () => import("../../util/animations").then(res => res.default)

export default function BlankPage(props: any) {

    const pageService = container.resolve('pageService')
    const [config, setConfig] = useState<null | any>(null)

    useEffect(() => {
        pageService.getPage(props.id).then((response: any) => {
            let config = response.data.body
            config.mode = props.mode
            setConfig(config)
        })
    }, [])



    return <>{ 
        (config && config.type && config.buildingBlocks) && <div className="bg-[white] rounded-lg h-[100%] overflow-y-auto overwflow-x-hidden p-4">
        <LazyMotion features={loadFeatures}>
            <m.div variants={animation} initial="hidden" animate="show">
                {
                    config.buildingBlocks.map((block: any) => (
                        <m.div className="mt-3" key={block.id} variants={item}>
                            <BuildingBlock {...block} mode={props.mode}/>
                        </m.div>
                    ))
                }
            </m.div>
        </LazyMotion>

    </div>}</>
}