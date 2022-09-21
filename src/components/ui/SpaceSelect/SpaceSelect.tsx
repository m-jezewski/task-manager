import { Listbox, Transition } from "@headlessui/react";
import { Space } from "../../../interfaces";
import { ComponentPropsWithoutRef, Fragment } from 'react'
import styles from './SpaceSelect.module.scss'
import unfold from '../../../assets/icons/unfold.svg'
import useDataContext from "../../../hooks/useDataContext";

interface SpaceSelectProps {
    space: Space | null
    setSpace: React.Dispatch<React.SetStateAction<Space | null>>
    className?: string
}

const SpaceSelect = ({ space, setSpace, className, ...props }: SpaceSelectProps & ComponentPropsWithoutRef<'div'>) => {
    const { spaces } = useDataContext()

    return (
        <Listbox as='div' className={`${styles.spaceSelect} ${className}`} {...props} value={space} onChange={setSpace} >
            {space && <>
                <Listbox.Button
                    className={styles.selectButton}
                    aria-label='Click to open list of available spaces'
                >
                    {space.name}
                    <img src={unfold} alt="Two arrows pointing up and down" />
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    enter={styles.transition}
                    enterFrom={styles.transitionEnterFrom}
                    enterTo={styles.transitionEnterTo}
                >
                    <Listbox.Options>
                        {spaces?.map((space: Space) => (
                            <Listbox.Option
                                key={space.id}
                                value={space}
                            >
                                {space.name}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition></>}
        </Listbox>
    );
}

export default SpaceSelect;