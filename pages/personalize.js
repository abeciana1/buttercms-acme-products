import { NextSeo } from 'next-seo'
import { PageLayoutWrapper } from '@/components/_layouts'

const Personalize = () => {
    return (
        <>
            <NextSeo
                title='ACME | Personalization example'
                description='This page shows how personalization can be powered by Butter'
                noindex={true}
                canonical={typeof window!== 'undefined'? window.location.href : ''}
            />
            <PageLayoutWrapper>
                <h1>Personalization content powered by Butter</h1>
                <section>
                    <h2>Personalization on a user level</h2>
                    
                </section>
                <section>
                    <h2>Promotional popups</h2>
                </section>
            </PageLayoutWrapper>
        </>
    )
}

export default Personalize