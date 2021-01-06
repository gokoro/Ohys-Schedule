import LanguageContext from '../context/LanguageContext'

const LanguageSelector = props => {
    return (
        <div className="langSelector">
            <select value={props.defaultLang} onChange={(e) => props.setLang(e.target.value)} className="rounded-small">
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
const ContextWrapper = () => {
    return (
        <LanguageContext.Consumer>
            {({setLang, lang}) => (
                <LanguageSelector 
                    setLang={setLang}
                    defaultLang={lang}
                />
            )}
        </LanguageContext.Consumer>
    )
}
export default ContextWrapper