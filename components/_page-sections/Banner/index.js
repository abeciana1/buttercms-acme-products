import Image from 'next/image'

const Banner = ({
    bannerImage,
    bannerImageAlt,
    bannerImageWidth,
    bannerImageHeight,
    bannerImagePriorityLoading
}) => {
    return (
        <div className='py-10'>
            <Image
                src={bannerImage}
                alt={bannerImageAlt}
                width={bannerImageWidth}
                height={bannerImageHeight}
                priority={bannerImagePriorityLoading}
                className='mx-auto'
            />
        </div>
    )
}

export default Banner