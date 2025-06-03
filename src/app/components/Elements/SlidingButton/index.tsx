import React, { useState } from 'react';

type ButtonStyleVariant = 'default';

type SlidingButtonProps = {
    isOn?: boolean;
    onToggle?: (state: boolean) => void;
    className?: string;
    variant?: ButtonStyleVariant;
};

type VariantStyle = {
    on: string;
    off: string;
    track: string;
    knob: string;
    knobTranslateOn: string;
    knobTranslateOff: string;
};

const variantStyles: Record<ButtonStyleVariant, VariantStyle> = {
    default: {
        on: 'bg-green-500',
        off: 'bg-neutral-700',
        track: 'w-10 h-6 p-0.5 rounded-full',
        knob: 'w-5 h-5 rounded-full bg-white',
        knobTranslateOn: 'translate-x-4',
        knobTranslateOff: 'translate-x-0',
    },
};


export default function SlidingButton({ isOn: controlledIsOn, onToggle, className = '', variant = 'default', }: SlidingButtonProps) {
    const [internalIsOn, setInternalIsOn] = useState(false);
    const isControlled = controlledIsOn !== undefined;
    const isOn = isControlled ? controlledIsOn : internalIsOn;

    const toggle = () => {
        const newState = !isOn;
        if (!isControlled) setInternalIsOn(newState);
        onToggle?.(newState);
    };

    const styles = variantStyles[variant];
    const trackColor = isOn ? styles.on : styles.off;
    const knobTranslate = isOn ? styles.knobTranslateOn : styles.knobTranslateOff;

    return (
        <div onClick={toggle} className={`flex items-center cursor-pointer transition-colors duration-100 ${styles.track} ${trackColor} ${className}`}>
            <div className={`transform transition-transform duration-100 ${styles.knob} ${knobTranslate}`} />
        </div>
    );
}
