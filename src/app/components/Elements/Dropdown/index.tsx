'use client';

import { DropdownOption } from "@/app/components/Elements/Dropdown/Option";
import { useState } from "react";

type DropdownStyleVariant = 'default';

type DropdownStyle = {
    button: string;
    list: string;
    item: string;
    header: string;
}

type DropdownProps = {
    label: string;
    header?: string;
    labelIcon?: string | React.ReactNode;
    options: DropdownOption[];
    styleVariant?: DropdownStyleVariant;
}

const StyleVariant: Record<DropdownStyleVariant, DropdownStyle> = {
    default: {
        button: "w-30 text-xs h-8 justify-between rounded-md px-2 py-2 text-left shadow-sm flex items-center gap-2 bg-neutral-900 text-white border border-zinc-600 cursor-pointer",
        list: "absolute z-1 mt-0.5 w-30 h-auto text-xs rounded-md overflow-auto bg-neutral-900 text-white border border-zinc-600",
        item: "h-5 px-2 py-2 cursor-pointer flex items-center gap-2 hover:bg-black",
        header: "font-roboto text-center w-30 text-m",
    },
};

const Dropdown: React.FC<DropdownProps> = ({ label, header, options, labelIcon, styleVariant = 'default' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<DropdownOption | null>(null);
    const styles = StyleVariant[styleVariant]

    const handleSelect = (option: DropdownOption) => {
        setSelected(option);
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block">
            <div className={`${styles.header}`}>
                {header}
            </div>
            <button onClick={() => setIsOpen(!isOpen)} className={`${styles.button}`}>
                <div className="flex gap-1">
                    {selected?.icon}
                    {selected?.label || label}
                </div>
                {labelIcon}
            </button>
            {isOpen && (
                <ul className={`${styles.list}`}>
                    {options.map((option) => (
                        <li key={option.value} onClick={() => handleSelect(option)} className={`${styles.item}`}>
                            {option.icon}
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Dropdown