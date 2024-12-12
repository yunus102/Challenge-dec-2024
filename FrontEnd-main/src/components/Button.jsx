import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-buttonColor",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button className={`px-4 m-4 py-4 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    );
}