import { Fragment, ReactNode } from 'react'
import { Popover, Transition } from '@headlessui/react'
import styles from './AnimatedPopover.module.css'

interface AnimatedPopoverProps {
    buttonStyles: string
    children: ReactNode
    buttonText?: ReactNode
    buttonColor?: string
}

const AnimatedPopover = ({ buttonStyles, buttonText, children, buttonColor }: AnimatedPopoverProps) => {
    return (
        <Popover as={Fragment}>
            <Popover.Button className={buttonStyles} style={{ backgroundColor: buttonColor }}>{buttonText}</Popover.Button>
            <Transition enter={styles.transition} enterFrom={styles.transition_enter_from} enterTo={styles.transition_enter_to}>
                <Popover.Panel>
                    {children}
                </Popover.Panel>
            </Transition>
        </Popover>
    );
}

export default AnimatedPopover;