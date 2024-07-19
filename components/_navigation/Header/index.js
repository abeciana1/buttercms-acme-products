import { useState } from 'react'
import useResponsiveness from '@/lib/hooks/useResponsiveness'
import Hamburger from 'hamburger-react'
import cx from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { FaCircleUser } from "react-icons/fa6";
import Cart from '@/components/_navigation/Cart'

const Header = ({ mainMenu }) => {
    const [expanded, setExpanded] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { isMobile, isTablet, isDesktop } = useResponsiveness() || {}
    
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
        <header className={cx('flex justify-between pt-5 px-5',{
            ['flex-row items-center']: isDesktop,
            ['flex-col items-start']: isMobile,
            ['flex-col items-center']: isTablet
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
                />
            </Link>
            <nav
                className={cx({
                    ['bg-yellow-50 h-screen w-full']: ((isMobile || isTablet) && mobileMenuOpen)
                })}
            >
                {(mobileMenuOpen || isDesktop) &&
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
                                            ['absolute bg-white shadow-md p-4 w-60 rounded-md mt-2']: expanded
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
                }
                {(isMobile || isTablet) &&
                    <div className='absolute top-5 right-5 z-50'>
                        <Hamburger
                            toggled={mobileMenuOpen}
                            toggle={setMobileMenuOpen}
                            color='#101820'
                        />
                    </div>
                }
            </nav>
            <div className='flex flex-row gap-10 items-center'>
                <Cart cartItems={5} cartTotal={35.46} />
                <Link title='My Account' href='/my-account'>
                    <FaCircleUser size={35} />
                </Link>
            </div>
        </header>
    )
}

export default Header