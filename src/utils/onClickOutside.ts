export const onClickOutside = (element: HTMLElement, callback: () => void) => {
  const outsideClickListener = (event: MouseEvent) => {
    if (!element.contains(event.target as any)) {
      callback()
      removeClickListener()
    }
  }

  const removeClickListener = () => {
    document.removeEventListener('click', outsideClickListener)
  }

  document.addEventListener('click', outsideClickListener)
}
