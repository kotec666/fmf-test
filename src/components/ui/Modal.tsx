import React, { PropsWithChildren, useEffect } from "react"
import {createPortal} from "react-dom";
import classNames from "classnames";

interface Props extends PropsWithChildren {
    className?: string
    modalName?: string
    onClose?: () => void
    isVisible: boolean
}
const Modal = (props: Props) => {

    useEffect(() => {
        if (props.isVisible) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [props.isVisible])

    return createPortal(<div>
        <div className="fixed inset-0 z-[3] bg-black bg-opacity-25 backdrop-blur-[2px]"  onClick={() => props.onClose?.()} />
        <div className={classNames("text-black bg-grey-f1 z-[4] p-[20px] rounded-[12px] fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]", props?.className)}>
            <div className="flex flex-col">
                <div className="flex justify-center">
                    <span className="font-semibold text-base">{props.modalName}</span>
                </div>
                <div>{props.children}</div>
            </div>
        </div>
    </div>, document.body)
};

export default Modal;