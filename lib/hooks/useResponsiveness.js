import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'

const useResponsiveness = () => {
    const [ isClient, setIsClient ] = useState(false)

    const isSmallMobile = useMediaQuery({
        minWidth: 320,
        maxWidth: 375
    })

    const isLargeMobile = useMediaQuery({
        minWidth: 376,
        maxWidth: 480
    })

    const isTablet = useMediaQuery({
        minWidth: 481,
        maxWidth: 768
    })

    const isSmallLaptop = useMediaQuery({
        minWidth: 769,
        maxWidth: 1024
    })

    const isLaptop = useMediaQuery({
        minWidth: 1025,
        maxWidth: 1440
    })

    const isXl = useMediaQuery({
        minWidth: 1441
    })

    useEffect(() => {
        setIsClient(true)
    }, [isClient])

    if (isClient) {
        return {
            isSmallMobile,
            isLargeMobile,
            isTablet,
            isSmallLaptop,
            isLaptop,
            isXl,
            isMobile: (isSmallMobile || isLargeMobile),
            isDesktop: (isSmallLaptop || isLaptop || isXl)
        }
    }
}

export default useResponsiveness