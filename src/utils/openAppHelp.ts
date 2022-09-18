export const openAppHelp = () => {
  setTimeout(() => {
    const appHelpBtn = document.getElementById('appHelpModal')
    if (appHelpBtn) {
      appHelpBtn.click()
    } else {
      openAppHelp()
    }
  }, 1000)
}
