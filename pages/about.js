import Section from '../components/Section'
import SectionTitle from '../components/SectionTitle'

import { useContext } from 'react'

import LanguageContext from '../context/LanguageContext'

export default function about() {
    const { locale } = useContext(LanguageContext.Original)

    return (
        <>
            <Section>
                <SectionTitle size="1.5rem">{locale.about.repository}</SectionTitle>
                <div className="content">
                    <a href="https://github.com/gokoro/Ohys-Schedule" title="Ohys-Schedule"><img style={{width: '24px'}} src="/svg/github-logo.svg" /></a>
                </div>
            </Section>
            <Section>
                <SectionTitle size="1.5rem">{locale.about.contact}</SectionTitle>
                <div className="content">
                    <ul>
                        <li><a href="https://discord.gg/EUvzwzx">{locale.about.contactDiscord}</a></li>
                        <li><a href="https://github.com/gokoro">Gokoro</a></li>
                    </ul>
                </div>
            </Section>
            <Section>
                <SectionTitle size="1.5rem">{locale.about.copyright}</SectionTitle>
                <div className="content">
                    <p>Copyright 2020 Gokoro. All rights reserved.</p>
                    <p>{locale.about.copyArticle}</p>
                </div>
            </Section>
        </>
    )
}