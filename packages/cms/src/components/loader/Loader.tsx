import React from 'react';
import Text from "../text/Text";
import Spinner from "./Spinner";
import AnimatedDots from "./AnimatedDots";

const Loader = (props: any) => {
    return (
        <>
            <div className="w-full h-[50px]"><Spinner /></div>
            <div className="py-2 flex flex-row justify-center items-end">
                <Text position="center" text={props.message} /><AnimatedDots />
            </div>
        </>
    )
}

export default Loader