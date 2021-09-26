import { useState, useEffect } from 'react'

const getWindowDimensions = () => {
  if (process.browser) {
    const { innerWidth: width, innerHeight: height } = window
    return {
      width,
      height,
    }
  }

  return {}
}

const useWindowSize = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}

export default useWindowSize
