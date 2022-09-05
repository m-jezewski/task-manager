import { Fragment, ReactNode, createContext, useRef, ComponentPropsWithoutRef, CSSProperties } from 'react'
//components
import { Popover, Transition } from '@headlessui/react'
//styles
import styles from './AnimatedPopover.module.scss'

interface AnimatedPopoverProps {
    panelStyles?: CSSProperties
    children: ReactNode
    buttonText?: ReactNode
}

export const ClosePopoverContext = createContext<(() => void) | null>(null)

const AnimatedPopover = ({ buttonText, children, panelStyles, ...props }: AnimatedPopoverProps & ComponentPropsWithoutRef<'button'>) => {

    const closeButtonRef = useRef<HTMLButtonElement>(null)

    const closePopover = () => {
        closeButtonRef.current?.click()
    }

    return (
        <Popover as={Fragment}>
            <Popover.Button
                ref={closeButtonRef}
                {...props}
            >
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