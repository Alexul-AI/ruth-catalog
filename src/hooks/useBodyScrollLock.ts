import { useEffect } from 'react'

/**
 * Locks the page's background scroll for as long as the calling component
 * is mounted - for a modal/panel overlay so a swipe that reaches the end of
 * the panel's own scrollable content doesn't chain into scrolling the page
 * behind it.
 *
 * `overflow: hidden` on `document.body` alone is not enough: in a standards-
 * mode document (this app's `<!doctype html>` included) the real scrolling
 * root is `document.documentElement` (`<html>`), not `<body>` - confirmed by
 * a real wheel-scroll test that still moved the background page with only
 * `body` locked. Both are locked here.
 *
 * iOS Safari additionally ignores plain `overflow: hidden` on the scrolling
 * root in some cases (rubber-band overscroll, the on-screen keyboard), so
 * `body` is also pinned with `position: fixed` at its current scroll offset
 * - the standard cross-browser-safe modal-scroll-lock pattern. The offset is
 * restored via `window.scrollTo` on cleanup so closing the modal leaves the
 * page exactly where it was, not jumped to the top.
 */
export function useBodyScrollLock() {
  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    const scrollY = window.scrollY

    const previous = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
    }

    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = '0'
    body.style.right = '0'
    body.style.width = '100%'

    return () => {
      html.style.overflow = previous.htmlOverflow
      body.style.overflow = previous.bodyOverflow
      body.style.position = previous.bodyPosition
      body.style.top = previous.bodyTop
      body.style.left = previous.bodyLeft
      body.style.right = previous.bodyRight
      body.style.width = previous.bodyWidth
      window.scrollTo(0, scrollY)
    }
  }, [])
}
