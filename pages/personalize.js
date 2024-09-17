import { useState } from 'react'
import { NextSeo } from 'next-seo'
import { PageLayoutWrapper } from '@/components/_layouts'
import OnClickButton from '@/components/_inputs/Buttons/OnClickButton'
import Cookies from 'js-cookie'


const Personalize = () => {
    const [ coyotePersona, setCoyotePersona ] = useState(Cookies.get('coyote-promo') ? true : false)
    const [ roadrunnerPersona, setRoadrunnerPersona ] = useState(Cookies.get('roadrunner-promo') ? true : false)
    console.log('Coyote cookies', Cookies.get('coyote-promo'))
    console.log('Roadrunner cookies', Cookies.get('roadrunner-promo'))

    // Personalization functions
    const setPersonaCookie = (persona) => {
        if (persona === 'coyote') {
            if (Cookies.get('roadrunner-promo')) {
                Cookies.remove('roadrunner-promo')
                setRoadrunnerPersona(false)
            }
            if (Cookies.get('coyote-promo')) {
                Cookies.remove('coyote-promo')
                setCoyotePersona(false)
            } else {
                Cookies.set('coyote-promo', true, { expires: 1 })
                setCoyotePersona(true)
            }
        } else {
            if (Cookies.get('coyote-promo')) {
                Cookies.remove('coyote-promo')
                setCoyotePersona(false)
            }
            if (Cookies.get('roadrunner-promo')) {
                Cookies.remove('roadrunner-promo')
                setRoadrunnerPersona(false)
            } else {
                Cookies.set('roadrunner-promo', true, { expires: 1 })
                setRoadrunnerPersona(true)
            }
        }
    }

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
                <div>You are currently using {(!coyotePersona && !roadrunnerPersona) ? <b>no</b> : 'the '}{coyotePersona && <b>Coyote</b>}{roadrunnerPersona && <b>Roadrunner</b>} persona</div>
                <section className='py-10'>
                    <h2>Personalization on a user level</h2>
                    <div className='space-y-5 max-w-fit'>
                        <OnClickButton
                            buttonText={`${coyotePersona ? 'Disable' : 'Enable'} Coyote persona`}
                            color={coyotePersona ? 'Red': 'Green'}
                            onClick={() => setPersonaCookie('coyote')}
                        />
                        <OnClickButton
                            buttonText={`${roadrunnerPersona ? 'Disable' : 'Enable'} Roadrunner persona`}
                            color={roadrunnerPersona ? 'Red': 'Green'}
                            onClick={() => setPersonaCookie('roadrunner')}
                        />
                    </div>
                </section>
                <section>
                    <h2>Promotional popups</h2>
                </section>
            </PageLayoutWrapper>
        </>
    )
}

export default Personalize