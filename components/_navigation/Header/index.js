import { useEffect, useState, useRef } from 'react'
import useResponsiveness from '@/lib/hooks/useResponsiveness'
import Hamburger from 'hamburger-react'
import cx from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { FaCircleUser } from "react-icons/fa6";
import Cart from '@/components/_navigation/Cart'
import Cookies from 'js-cookie'
import axios from 'axios'

const Header = ({ mainMenu }) => {
    const isEffectRun = useRef(false);
    const [expanded, setExpanded] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { isMobile, isTablet, isDesktop } = useResponsiveness() || {}

    
    useEffect(() => {
        if (isEffectRun.current) return;
        isEffectRun.current = true;

        const cartCookie = Cookies.get('ACMEcart')

        const getOrCreateCart = async (sessionId) => {
            try {
                const { data: response } = await axios.post('/api/cart/getOrCreateCart', {}, {
                    headers: {
                        'x-session-id': sessionId,
                    }
                })
            } catch (error) {
                console.error('Error creating cart:', error)
            }
        }

        const setCartCookieAndCreateCart = async () => {
            try {
                const { data: response} = await axios.get('/api/cart/setCartCookie')
                await getOrCreateCart(response.sessionId)
            } catch (error) {
                console.error('Error setting cart cookie:', error)
            }
        }
        
        if (!cartCookie) {
            setCartCookieAndCreateCart()
        } else {
            const sessionObj = JSON.parse(cartCookie);
            getOrCreateCart(sessionObj.sessionId);
        }
    }, [])
    
    const toggleExpand = () => {
        if (isDesktop) {
            setExpanded(true)
        }
    }

    const toggleCollapse = () => {
        if (isDesktop) {
            setExpanded(false)
        }
    }

    return (
        <header className={cx('relative flex items-center justify-between py-5 px-5',{
            ['flex-row']: isDesktop,
            ['flex-col justify-center']: isMobile,
            ['flex-col']: isTablet
        })}>
            <Link
                href='/'
                title='Homepage'
            >
                <Image
                    src={mainMenu.logo}
                    width={200}
                    height={106}
                    alt="ACME logo"
                    className={cx({
                        ['h-10 w-auto']: isMobile
                    })}
                />
            </Link>
            <nav
                className={cx({
                    ['bg-yellow-50 h-screen w-full']: ((isMobile || isTablet) && mobileMenuOpen)
                })}
            >
                {(mobileMenuOpen || isDesktop) &&
                    <>
                        <ul
                            className={cx('flex', {
                                ['items-center justify-between gap-10']: isDesktop,
                                ['flex-col pt-5 gap-5']: isMobile || isTablet
                            })}
                        >
                            {mainMenu?.menu_items_first?.map((menuItem) => {
                                return (
                                    <li
                                        onMouseEnter={toggleCollapse}
                                        key={menuItem.meta.id}
                                        className={cx('w-full', {
                                        ['text-xl']: isDesktop,
                                        ['text-2xl']: isMobile || isTablet
                                    })}>
                                        <Link
                                            href={'/' + menuItem.url}
                                        >
                                            {menuItem.label}
                                        </Link>
                                    </li>
                                )
                            })}
                            {mainMenu?.menu_items_dd &&
                                <li
                                    className={cx('relative', {
                                        ['text-xl']: isDesktop,
                                        ['text-2xl']: isMobile || isTablet
                                    })}
                                    onMouseEnter={toggleExpand}
                                >
                                    <div>Categories</div>
                                    {(expanded || isMobile || isTablet) &&
                                        <ul
                                            onMouseLeave={toggleCollapse}
                                            className={cx('', {
                                                ['absolute bg-white shadow-md p-4 w-60 rounded-md mt-2 z-50']: expanded
                                            })}
                                        >
                                            {mainMenu?.menu_items_dd?.map((menuItem) => {
                                                return(
                                                    <li key={menuItem.meta.id} className='ml-5 pt-2'>
                                                        <Link
                                                            title={menuItem.category_name}
                                                            href={'/' + menuItem.category_slug}
                                                        >
                                                            {menuItem.category_name}
                                                        </Link>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    }
                                </li>
                            }
                        </ul>
                    </>
                }
                {(isMobile || isTablet) &&
                    <div className='absolute top-3 left-5 z-50'>
                        <Hamburger
                            toggled={mobileMenuOpen}
                            toggle={setMobileMenuOpen}
                            color='#101820'
                        />
                    </div>
                }
            </nav>
            <div className={cx('flex flex-row gap-10 items-center', {
                ['absolute right-2 gap-5 top-6']: (isMobile || isTablet)
            })}>
                <Cart size={(isMobile || isTablet) ? 30 : 35} cartItems={5} cartTotal={35.46} />
                <Link title='My Account' href='/my-account'>
                    <FaCircleUser size={(isMobile || isTablet) ? 30 : 35} />
                </Link>
            </div>
        </header>
    )
}

export default Header