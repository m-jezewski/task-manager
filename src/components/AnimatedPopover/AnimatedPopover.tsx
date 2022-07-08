import { Fragment, ReactNode, createContext, useRef, MutableRefObject } from 'react'
import { Popover, Transition } from '@headlessui/react'
import styles from './AnimatedPopover.module.css'

interface AnimatedPopoverProps {
    buttonClass: string
    panelStyles?: {}
    children: ReactNode
    buttonText?: ReactNode
    buttonColor?: string
}

export const ClosePopoverContext = createContext<Function | null>(null)

const AnimatedPopover = ({ buttonClass, buttonText, children, buttonColor, panelStyles }: AnimatedPopoverProps) => {

    const closeButtonRef = useRef<HTMLButtonElement>(null)

    const closePopover = () => {
        closeButtonRef.current?.click()
    }

    return (
        <Popover as={Fragment}>
            <Popover.Button
                ref={closeButtonRef}
                className={buttonClass}
                style={{
                    backgroundColor: buttonColor,
                }}>
                {buttonText}
            </Popover.Button>
            <Transition enter={styles.transition} enterFrom={styles.transition_enter_from} enterTo={styles.transition_enter_to}>
                <Popover.Panel style={{ ...panelStyles }}>
                    <ClosePopoverContext.Provider value={closePopover}>
                        {children}
                    </ClosePopoverContext.Provider>
                </Popover.Panel>
            </Transition>
        </Popover>
    );
}

export default AnimatedPopover;