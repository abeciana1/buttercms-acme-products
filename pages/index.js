import { getPageData } from '@/lib/api'

const Home = (props) => {
    // console.log('props', props)
    return (
        <></>
    )
}

export const getStaticProps = async () => {
    let pageData = await getPageData('homepage')
    console.log('page data', pageData)
    return {
        props: {}
    }
}


export default Home