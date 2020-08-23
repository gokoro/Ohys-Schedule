import Section from '../components/Section'
import SectionTitle from '../components/SectionTitle'

export default function about() {
    return (
        <>
            <Section>
                <SectionTitle size="1.5rem">Repository</SectionTitle>
                <div className="content">
                    <a href="https://github.com/gokoro/Ohys-Schedule" title="Ohys-Schedule"><img style={{width: '24px'}} src="/svg/github-logo.svg" /></a>
                </div>
            </Section>
            <Section>
                <SectionTitle size="1.5rem">Contact</SectionTitle>
                <div className="content">
                    <ul>
                        <li><a href="https://discord.gg/EUvzwzx">Ohys-Raws Discord</a></li>
                        <li><a href="https://github.com/gokoro">Gokoro</a></li>
                    </ul>
                </div>
            </Section>
            <Section>
                <SectionTitle size="1.5rem">Copyright</SectionTitle>
                <div className="content">
                    <p>Copyright 2020 Gokoro. All rights reserved.</p>
                    <p>Files are provided by Ohys-Raws.</p>
                </div>
            </Section>
        </>
    )
}