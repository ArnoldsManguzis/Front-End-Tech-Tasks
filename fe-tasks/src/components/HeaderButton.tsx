import React from "react";

interface HeaderButtonProps {
    selected: boolean;
    title: string;
    onClick: () => void;
}

const HeaderButton = ({ selected, title, onClick }: HeaderButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`${
                selected ? "text-slate-1000 underline" : "text-slate-500"
            }`}
        >
            {title}
        </button>
    );
};

export default HeaderButton;
