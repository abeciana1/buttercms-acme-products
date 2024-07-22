import Link from 'next/link'
import cx from 'classnames'

9
export const LinkLookLikeButton = ({
    linkText,
    linkHref,
    color
}) => {
    return (
        <Link
            title={linkText}
            href={linkHref}
            className={cx('font-bold py-2 px-4 rounded-md text-lg', {
                ['bg-utilityGreen text-white']: color === 'Green',
                ['bg-altRed text-white']: color === 'Red',
                ['bg-orange text-white']: color === 'Orange',
                ['bg-skyBlue text-black']: color === 'SkyBlue',
            })}
        >
            {linkText}
        </Link>
    )
}

export const LinkLookLikeButtonOutline = ({
    linkText,
    linkHref,
    color
}) => {
    return (
        <Link
            title={linkText}
            href={linkHref}
            className={cx('w-full h-10 min-w-44 text-nowrap font-bold flex items-center justify-center rounded-md border-2 text-lg', {
                ['border-utilityGreen text-utilityGreen']: color === 'Green',
                ['border-altRed text-altRed']: color === 'Red',
                ['border-altOrange text-altOrange']: color === 'Orange',
                ['border-skyBlue text-skyBlue']: color === 'SkyBlue',
            })}
        >
            {linkText}
        </Link>
    )
}