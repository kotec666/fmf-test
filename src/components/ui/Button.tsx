import React, {PropsWithChildren} from 'react';
import classNames from "classnames";

interface Props extends PropsWithChildren {
    onClick?: () => void
    className?: string
}
const Button = (props: Props) => {
    return (
            <button className={classNames("bg-blue-main rounded-[12px] px-[40px] py-[12px] font-normal text-sm ", props?.className)} onClick={props.onClick}>
                {props.children}
            </button>
    );
};

export default Button;