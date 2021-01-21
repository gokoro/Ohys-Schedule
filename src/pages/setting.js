import { IoLogoGithub } from 'react-icons/io5'
import Section from '../components/Section'
import SectionTitle from '../components/SectionTitle'
import LanguageSelector from '../components/LanguageSelector'

import { useRecoilValue } from 'recoil'

import { LocaleMessageState } from '../states/preferredLanguage'

export default function setting() {
  const locale = useRecoilValue(LocaleMessageState)

  return (
    <>
      <Section>
        <SectionTitle size="1.5rem">{locale.setting.language}</SectionTitle>
        <div className="content lang">
          <LanguageSelector />
        </div>
      </Section>
      <Section>
        <SectionTitle size="1.5rem">{locale.setting.repository}</SectionTitle>
        <div className="content">
          <a
            href="https://github.com/gokoro/Ohys-Schedule"
            title="Ohys-Schedule"
          >
            <IoLogoGithub size={24} color="black" />
          </a>
        </div>
      </Section>
      <Section>
        <SectionTitle size="1.5rem">{locale.setting.contact}</SectionTitle>
        <div className="content">
          <ul>
            <li>
              <a href="https://discord.gg/EUvzwzx">
                {locale.setting.contactDiscord}
              </a>
            </li>
            <li>
              <a href="https://github.com/gokoro">Gokoro</a>
            </li>
          </ul>
        </div>
      </Section>
      <Section>
        <SectionTitle size="1.5rem">{locale.setting.copyright}</SectionTitle>
        <div className="content">
          <p>
            Copyright {new Date().getFullYear()} Gokoro. All rights reserved.
          </p>
          <p>{locale.setting.copyArticle}</p>
        </div>
      </Section>
      <style jsx>{`
        .lang {
          width: fit-content;
          min-width: 120px;
        }
      `}</style>
    </>
  )
}
