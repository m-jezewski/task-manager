import { Fragment, ReactNode, createContext, useRef } from 'react'
//components
import { Popover, Transition } from '@headlessui/react'
//styles
import styles from './AnimatedPopover.module.scss'

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
            <Transition enter={styles.transition} enterFrom={styles.transitionEnterFrom} enterTo={styles.transitionEnterTo}>
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