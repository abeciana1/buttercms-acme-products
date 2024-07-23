import Link from 'next/link'

const Breadcrumbs = ({
    categoryName,
    categorySlug,
    productName
}) => {
    return (
        <nav aria-label="Breadcrumb">
            <ol className="flex flex-row items-center">
                <Breadcrumb text='ACME' href='/' />
                <Breadcrumb text={categoryName} href={categorySlug} />
                <Breadcrumb text={productName} />
            </ol>
        </nav>
    )
}

export default Breadcrumbs

const Breadcrumb = ({
    href,
    text
}) => {
    return (
        <li className="text-sm">
            {href ?
                <Link href={href} title={text} className="ml-2">
                    {text} /
                </Link>
                :
                <div className="ml-2 font-bold">{text}</div>
            }
        </li>
    )
}