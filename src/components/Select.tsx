import { Listbox, Transition } from '@headlessui/react';
import styles from './Select.module.css'
import unfold from '../assets/unfold.svg'

interface SelectProps {
    spaces: any,
    selectedSpace: any,
    setSelectedSpace: any,
}

const Select = ({ spaces, selectedSpace, setSelectedSpace }: SelectProps) => {
    return (
        <Listbox as='div' className={styles.container} value={selectedSpace} onChange={setSelectedSpace} >
            <Listbox.Button className={styles.select_button}>{selectedSpace.spaceName} <img src={unfold} alt="" /></Listbox.Button>
            <Transition enter={styles.transition} enterFrom={styles['transition-enter-from']} enterTo={styles['transition-enter-to']}>
                <Listbox.Options>
                    {spaces.map((space: any) => (
                        <Listbox.Option
                            key={space.spaceName}
                            value={space}
                        >
                            {space.spaceName}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Transition>
        </Listbox>
    );
}

export default Select;