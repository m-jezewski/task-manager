import { Dialog, Tab } from "@headlessui/react";
import styles from './HelpModal.module.scss'
import arrowRight from '../../../assets/icons/arrowRight.svg'
import arrowLeft from '../../../assets/icons/arrowLeft.svg'
import { useState, ComponentPropsWithoutRef } from 'react'
import help from '../../../assets/icons/help.svg'
import close from '../../../assets/icons/close.svg'

interface HelpModalProps {
    slidesContent: { title: string, description: string, img: { src: string, alt: string } }[]
    buttonStyles?: string
}

const HelpModal = ({ slidesContent, buttonStyles, ...buttonProps }: HelpModalProps & ComponentPropsWithoutRef<'button'>) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <button
                className={`${styles.openHelp} ${buttonStyles}`}
                {...buttonProps}
                onClick={() => { setIsOpen(true) }}>
                <img src={help} alt='Open help' />
            </button>
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className={styles.modalContainer}
            >
                <Dialog.Panel className={styles.panel}>
                    <button className={styles.closeButton} onClick={() => { setIsOpen(false) }}>
                        <img src={close} alt='close modal' />
                    </button>
                    <Tab.Group
                        selectedIndex={selectedIndex}
                        onChange={setSelectedIndex}
                    >
                        <Tab.Panels>
                            {slidesContent.map(({ title, description, img }) => (
                                <Tab.Panel key={description}>
                                    <Dialog.Title className={styles.title}>{title}</Dialog.Title>
                                    <img
                                        className={styles.presentation}
                                        src={img.src}
                                        alt={img.alt}
                                    />
                                    <Dialog.Description className={styles.description}>{description}</Dialog.Description>
                                </Tab.Panel>
                            ))}
                        </Tab.Panels>
                        <Tab.List className={styles.tabList}>
                            <button onClick={() => { selectedIndex > 0 && setSelectedIndex(selectedIndex - 1) }}>
                                <img src={arrowLeft} alt=''></img>
                            </button>
                            {slidesContent.map((i, index) =>
                                <Tab key={i.description} className={`${selectedIndex === index && styles.tabActive} ${styles.tab}`}></Tab>
                            )}
                            <button onClick={() => { selectedIndex < slidesContent.length - 1 && setSelectedIndex(selectedIndex + 1) }}>
                                <img src={arrowRight} alt=''></img>
                            </button>
                        </Tab.List>
                    </Tab.Group>
                </Dialog.Panel>
            </Dialog>
        </>
    )
}

export default HelpModal;