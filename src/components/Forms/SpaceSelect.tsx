import { Listbox, Transition } from "@headlessui/react";
import { useState } from "react";
import { Space } from "../../interfaces";
import styles from './InputStyles.module.scss'
import transitionStyles from '../AnimatedPopover/AnimatedPopover.module.scss'
import unfold from '../../assets/unfold.svg'
import useDataContext from "../../hooks/useDataContext";

interface SpaceSelectProps {
    space: Space | null
    setSpace: React.Dispatch<React.SetStateAction<Space | null>>
    buttonStyles?: React.CSSProperties
    usage: 'form' | 'header'
}

const SpaceSelect = ({ space, setSpace, buttonStyles, usage }: SpaceSelectProps) => {

    const { spaces } = useDataContext()
    return (
        <Listbox as='div' className={styles.spaceSelect} value={space} onChange={setSpace} >
            {space && <>
                <Listbox.Button style={buttonStyles} className={`${styles.select_button} ${styles[usage]} lighten_border_hover text-button`}>{space.name} <img src={unfold} alt="" /></Listbox.Button>
                <Transition enter={transitionStyles.transition} enterFrom={transitionStyles.transition_enter_from} enterTo={transitionStyles.transition_enter_to}>
                    <Listbox.Options>
                        {spaces && spaces.map((space: Space) => (
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