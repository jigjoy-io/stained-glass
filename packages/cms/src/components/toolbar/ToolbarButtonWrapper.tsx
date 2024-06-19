import React from 'react'
import Tooltip from '../tooltip/Tooltip'

export default class ToolbarButtonWrapper extends React.Component<any> {

    render() {
        return (<Tooltip message={this.props.tooltip}>
            <div className='w-full bg-[white] hover:bg-primary-light border-2 border-[white] rounded-md cursor-pointer'>
                {this.props.children}
            </div>
        </Tooltip>)

    }


}
