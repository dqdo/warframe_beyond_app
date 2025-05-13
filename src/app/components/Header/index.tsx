'use client';

import Logo from '@/app/components/Header/Logo'
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className='flex justify items-center'>
            <Logo />
            <div className={`${styles.headerTitle} text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl select-none`}>
                Warframe Beyond
            </div>
        </header>
    );
}