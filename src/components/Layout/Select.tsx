import { Listbox, Transition } from '@headlessui/react'
import styles from './Select.module.scss'
import transitionStyles from '../AnimatedPopover/AnimatedPopover.module.scss'
import unfold from '../../assets/unfold.svg'
import useDataContext from '../../hooks/useDataContext';
import { Space } from '../../interfaces';

const Select = () => {
    const { spaces, selectedSpace, setSelectedSpace } = useDataContext()

    return (
        <>{selectedSpace &&
            <Listbox as='div' className={styles.container} value={selectedSpace} onChange={setSelectedSpace} >
                <Listbox.Button className={`${styles.select_button} lighten_border_hover text-button`}>{selectedSpace.name} <img src={unfold} alt="" /></Listbox.Button>
                <Transition enter={transitionStyles.transition} enterFrom={transitionStyles.transition_enter_from} enterTo={transitionStyles.transition_enter_to}>
                    <Listbox.Options>
                        {spaces.map((space: Space) => (
                            <Listbox.Option
                                key={space.id}
                                value={space}
                            >
                                {space.name}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </Listbox>
        }</>

    );
}

export default Select;