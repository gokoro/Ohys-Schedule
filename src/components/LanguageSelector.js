import { useRecoilState } from 'recoil'
import { PreferredLanguageState } from '../states/preferredLanguage'

const LanguageSelector = (props) => {
  const [lang, setLang] = useRecoilState(PreferredLanguageState)

  const handleChange = (e) => {
    const value = e.target.value

    setLang(value)
    localStorage.setItem('lang', value)
  }

  return (
    <div className="langSelector">
      <select value={lang} onChange={handleChange} className="rounded-small">
        <option value="english">English</option>
        <option value="romaji">Romaji</option>
        <option value="korean">한국어</option>
        <option value="japanese">日本語</option>
      </select>
      <style jsx>{`
        select {
          border: 1px solid #95a5a6;
          width: 100%;
          height: 35px;
          padding: 7px 2px;
          font-size: 15px;
          letter-spacing: 0.3px;
        }
      `}</style>
    </div>
  )
}

export default LanguageSelector
