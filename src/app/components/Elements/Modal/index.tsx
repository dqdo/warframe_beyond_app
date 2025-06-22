'use client';

import React from 'react';

type ModalStyleVariant = 'default';

type ModalProps = {
    variant?: ModalStyleVariant;
    type?: string;
    children?: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
};

const variantStyles: Record<ModalStyleVariant, string> = {
    default: `fixed inset-0 z-50 flex items-center justify-center bg-black/50`,
};

export function Modal({ variant = 'default', children, isOpen, onClose, }: ModalProps) {
    if (!isOpen) return null;
    return (
        <div className={variantStyles[variant]} onClick={onClose}>
            <div className="bg-neutral-800 border border-neutral-300 h-180 w-200 rounded-md" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}
