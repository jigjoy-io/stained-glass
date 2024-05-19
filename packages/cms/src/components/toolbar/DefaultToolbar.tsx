import React from 'react'
import { Tooltip } from '../building-blocks/Tooltip'
import { AddBlockButton } from './AddBlockButton'
import { OpenMenuButton } from './OpenMenuButton'

export default class DefaultToolbar extends React.Component<any> {

    state = {
        on: false
    }

    constructor(props: any) {
        super(props)

    }

    turnOnToolbar = (e: any) => {


        this.setState({
            on: true
        })

    }

    turnOffToolbar = (e: any) => {

        this.setState({
            on: false
        })
    }

    render() {
        return (
            <div onMouseEnter={this.turnOnToolbar} onMouseLeave={this.turnOffToolbar} className="flex">
                {this.state.on &&
                    <div className="absolute -translate-x-[100%]">
                        <div className='flex'>
                            <Tooltip message="add block">
                                <AddBlockButton />
                            </Tooltip>
                            <Tooltip message="open menu">
                                <OpenMenuButton />
                            </Tooltip>
                        </div>

                    </div>
                }

                {this.props.children}
            </div>
        )

    }


}
