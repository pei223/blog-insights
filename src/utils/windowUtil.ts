export const scrollToTop = (window?: Window) => {
  window?.scroll({ top: 0, behavior: 'smooth' })
}
