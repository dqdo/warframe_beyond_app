'use client';

import { DropdownOption } from "@/app/components/Elements/Dropdown/Option";
import { useEffect, useRef, useState } from "react";

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
    isOpen?: boolean;
    onToggleOpen?: (open: boolean) => void;
}

const StyleVariant: Record<DropdownStyleVariant, DropdownStyle> = {
    default: {
        button: "select-none w-30 sm:w-20 md:w-20 lg:w-30 text-xs sm: gap-0 md: gap-0 h-8 justify-between rounded-md px-2 py-2 text-left shadow-sm flex items-center gap-2 bg-neutral-900 text-white border border-zinc-600 cursor-pointer",
        list: "select-none z-1 mt-0.5 w-30 sm:w-10 md:w-20 lg:w-30 h-auto text-xs rounded-md overflow-auto bg-neutral-900 text-white border border-zinc-600",
        item: "select-none h-5 px-2 py-2 cursor-pointer flex items-center gap-2 hover:bg-black",
        header: "select-none font-roboto text-center w-30 sm:w-10 md:w-20 lg:w-30 text-m",
    },
};

const Dropdown: React.FC<DropdownProps> = ({ label, header, options, labelIcon, styleVariant = 'default', isOpen: externalIsOpen, onToggleOpen }) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const [selected, setSelected] = useState<DropdownOption | null>(null);
    const styles = StyleVariant[styleVariant];
    const ref = useRef<HTMLDivElement>(null);

    const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalOpen;

    const toggleOpen = () => {
        const newState = !isOpen;
        if (onToggleOpen) {
            onToggleOpen(newState);
        } else {
            setInternalOpen(newState);
        }
    };


    const handleSelect = (option: DropdownOption) => {
        setSelected(option);
        if (onToggleOpen) {
            onToggleOpen(false);
        } else {
            setInternalOpen(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                if (onToggleOpen) {
                    onToggleOpen(false);
                } else {
                    setInternalOpen(false);
                }
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            if (isOpen) {
                document.removeEventListener("mousedown", handleClickOutside);
            }
        };
    }, [isOpen, onToggleOpen]);

    return (
        <div ref={ref}>
            <div className={`${styles.header}`}>
                {header}
            </div>
            <button onClick={toggleOpen} className={`${styles.button}`}>
                <div className="flex gap-1">
                    {selected?.icon}
                    {selected?.label ? selected.label : label}
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