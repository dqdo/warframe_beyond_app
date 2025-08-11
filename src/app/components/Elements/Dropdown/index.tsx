'use client';

import { DropdownOption } from "@/app/components/Elements/Dropdown/Option";
import { useEffect, useRef, useState } from "react";

type DropdownStyleVariant = 'default' | 'buildSection' | "modSlot";

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
    onSelect?: (option: DropdownOption) => void;
    selectedOption?: DropdownOption | null;
}

const StyleVariant: Record<DropdownStyleVariant, DropdownStyle> = {
    default: {
        button: "select-none font-roboto w-30 sm:w-20 md:w-20 lg:w-30 text-xs sm: gap-0 md: gap-0 h-8 justify-between rounded-md px-2 py-2 text-left shadow-sm flex items-center gap-2 bg-neutral-900 text-white border border-zinc-600 cursor-pointer",
        list: "fixed z-10 mt-0.5 w-30 sm:w-10 md:w-20 lg:w-30 h-auto text-xs rounded-md overflow-auto bg-neutral-900 text-white border border-zinc-600",
        item: "select-none font-roboto h-5 px-2 py-2 cursor-pointer flex items-center gap-2 hover:bg-black",
        header: "select-none font-roboto text-center w-30 sm:w-10 md:w-20 lg:w-30 text-m",
    },
    buildSection: {
        button: "select-none font-roboto w-30 sm:w-20 md:w-20 lg:w-36 text-xs sm: gap-0 md: gap-0 h-8 justify-between rounded-md px-2 py-2 text-left shadow-sm flex items-center gap-2 bg-neutral-800 text-white border border-zinc-600 cursor-pointer",
        list: "fixed z-10 mt-0.5 w-35 sm:w-10 md:w-20 lg:w-36 h-auto text-xs rounded-md overflow-auto bg-neutral-800 text-white border border-zinc-600",
        item: "select-none font-roboto h-5 px-2 py-2 cursor-pointer flex items-center gap-2 hover:bg-black",
        header: "select-none font-roboto text-center w-30 sm:w-10 md:w-20 lg:w-30 text-m",
    },
    modSlot: {
        button: "select-none font-roboto sm:w-8 md:w-10 lg:w-13 text-xs h-8 justify-between rounded-md px-2 py-2 text-left shadow-sm flex items-center gap-2 bg-neutral-800 text-white border border-zinc-600 cursor-pointer",
        list: "absolute z-10 top-full sm:w-8 md:w-10 lg:w-13 text-xs rounded-md bg-neutral-800 text-white border border-zinc-600",
        item: "select-none font-roboto h-5 px-2 py-2 cursor-pointer flex items-center gap-2 hover:bg-black justify-center",
        header: "select-none font-roboto text-center sm:w-8 md:w-10 lg:w-13 text-m",
    }
};

const Dropdown: React.FC<DropdownProps> = ({
    label,
    header,
    options,
    labelIcon,
    styleVariant = "default",
    isOpen: externalIsOpen,
    onToggleOpen,
    onSelect,
    selectedOption,
}) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const [internalSelectedOption, setInternalSelectedOption] = useState<DropdownOption | null>(null);
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
        if (!selectedOption) {
            setInternalSelectedOption(option);
        }
        onSelect?.(option);
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
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onToggleOpen]);

    const displayedOption = selectedOption !== undefined ? selectedOption : internalSelectedOption;

    return (
        <div ref={ref}>
            {header && <div className={styles.header}>{header}</div>}
            <button onClick={toggleOpen} className={styles.button}>
                <div className="flex gap-1">
                    {displayedOption ? (
                        <>
                            {displayedOption.icon}
                            {displayedOption.label ?? label}
                        </>
                    ) : (
                        label
                    )}
                </div>
                {labelIcon}
            </button>
            {isOpen && (
                <ul className={styles.list}>
                    {options.map((option) => (
                        <li
                            key={option.value}
                            onClick={() => handleSelect(option)}
                            className={styles.item}
                        >
                            {option.icon}
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;