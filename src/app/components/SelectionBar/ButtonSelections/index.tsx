'use client'

import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import Button from '@/app/components/Elements/Button'
import AnyPolarityIcon from '@/app/components/SelectionBar/ButtonSelections/AnyPolarityIcon'
import styles from './ButtonSelections.module.css'

const arcaneIcons = [
    '/images/arcanes/arcane_icon_inactive.png',
    '/images/arcanes/arcane_icon_active1.png',
    '/images/arcanes/arcane_icon_active2.png',
    '/images/arcanes/arcane_icon_active3.png',
    '/images/arcanes/arcane_icon_activefull.png',
]

type ButtonSelectionsProps = {
    selectedButton: string | null
    setSelectedButton: React.Dispatch<React.SetStateAction<string | null>>
}

export default function ButtonSelections({ selectedButton, setSelectedButton }: ButtonSelectionsProps) {
    const [arcaneIconIndex, setArcaneIconIndex] = useState(0)
    const [archonHover, setArchonHover] = useState(false)
    const [archonActive, setArchonActive] = useState(false)

    const arcaneInterval = useRef<NodeJS.Timeout | null>(null)

    const toggleButton = useCallback((button: string) => {
        if (selectedButton === button) {
            setArchonActive(false)
            setSelectedButton(null)
        } else {
            if (button === 'archon') setArchonActive(true)
            else if (selectedButton === 'archon') setArchonActive(false)
            setSelectedButton(button)
        }
    }, [selectedButton, setSelectedButton])


    useEffect(() => {
        if (arcaneInterval.current) {
            clearInterval(arcaneInterval.current)
            arcaneInterval.current = null
        }

        const isArcane = selectedButton === 'arcanes'
        const direction = isArcane ? 1 : -1

        arcaneInterval.current = setInterval(() => {
            setArcaneIconIndex(prev => {
                const next = prev + direction
                if (next < 0 || next >= arcaneIcons.length) {
                    clearInterval(arcaneInterval.current!)
                    return isArcane ? arcaneIcons.length - 1 : 0
                }
                return next
            })
        }, 70)

        return () => {
            if (arcaneInterval.current) {
                clearInterval(arcaneInterval.current)
                arcaneInterval.current = null
            }
        }
    }, [selectedButton])

    const archonImage = useMemo(() => (
        archonHover || archonActive
            ? '/images/archon_shards/archon_shard_glow.png'
            : '/images/archon_shards/archon_shard.png'
    ), [archonHover, archonActive])

    return (
        <div className="flex space-x-4">
            <div className="flex items-center" onMouseEnter={() => setArchonHover(true)} onMouseLeave={() => setArchonHover(false)}>
                <Button
                    text="Archon Shards"
                    icon={<img src={archonImage} className={`w-11 h-11 ${styles.archonIcon} ${archonHover || archonActive ? styles.archonIconActive : styles.archonIconEnter}`} />}
                    iconSize="w-11 h-11"
                    onClick={() => toggleButton('archon')}
                />
            </div>
            <Button
                text="Arcanes"
                icon={<img src={arcaneIcons[arcaneIconIndex]} className="w-18 h-18 transition-opacity duration-200 ease-in-out" />}
                iconSize="w-14 h-14"
                onClick={() => toggleButton('arcanes')}
            />
            <Button
                text="Mods"
                icon={<AnyPolarityIcon className={`w-7 h-7 transition-transform duration-300 ${selectedButton === 'mods' ? 'text-green-500 rotate-180' : 'text-red-500'}`} />}
                onClick={() => toggleButton('mods')}
            />
        </div>
    )
}
