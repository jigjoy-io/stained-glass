import React from "react"

export class Tooltip extends React.Component<any> {

    state = {
        on: false
    }

    turnOnTooltip = (e: any) => {


        this.setState({
            on: true
        })

    }

    turnOffTooltip = (e: any) => {

        this.setState({
            on: false
        })
    }

    render() {
        return <div className="w-fit">
            {
                this.state.on &&
                <div className="absolute -translate-x-[100%] w-max">
                    <div className=" -translate-y-[120%] translate-x-[100%] p-1 px-3 rounded-md bg-[black] !text-[white] shadow">
                        <div>{this.props.message}</div>
                    </div>
                </div>

            }

            <div onMouseEnter={this.turnOnTooltip} onMouseLeave={this.turnOffTooltip}>{this.props.children}</div>
        </div>

    }

}

