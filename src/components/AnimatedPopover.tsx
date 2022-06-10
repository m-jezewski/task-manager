import { Fragment, ReactNode } from 'react'
import { Popover, Transition } from '@headlessui/react'
import styles from './AnimatedPopover.module.css'

interface AnimatedPopoverProps {
    buttonStyles: string
    children: ReactNode
    buttonText?: ReactNode
}

const AnimatedPopover = ({ buttonStyles, buttonText, children }: AnimatedPopoverProps) => {
    return (
        <Popover as={Fragment}>
            <Popover.Button className={buttonStyles}>{buttonText}</Popover.Button>
            <Transition enter={styles.transition} enterFrom={styles['transition-enter-from']} enterTo={styles['transition-enter-to']}>
                <Popover.Panel>
                    {children}
                </Popover.Panel>
            </Transition>
        </Popover>
    );
}

export default AnimatedPopover;