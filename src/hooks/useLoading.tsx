import React from 'react'
import { useRouter } from 'next/router'

export const useLoading = () => {
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()
  const routeChangeEvents = router.events

  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleStart = () => {
      setLoading(true)
    }

    const handleComplete = () => {
      timeoutId = setTimeout(() => {
        setLoading(false)
      }, 950)

      return () => {
        clearTimeout(timeoutId)
      }
    }

    routeChangeEvents.on('routeChangeStart', handleStart)
    routeChangeEvents.on('routeChangeComplete', handleComplete)
    routeChangeEvents.on('routeChangeError', handleComplete)

    return () => {
      routeChangeEvents.off('routeChangeStart', handleStart)
      routeChangeEvents.off('routeChangeComplete', handleComplete)
      routeChangeEvents.off('routeChangeError', handleComplete)
    }
  }, [routeChangeEvents])

  return loading
}
