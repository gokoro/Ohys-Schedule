import { LocaleMessageState } from '../states/preferredLanguage'

import { useRecoilValue } from 'recoil'

import { IoLogoDiscord } from 'react-icons/io5'

const Sidebar = props => {
    const { 
        components: {
            sidebar
        }
    } = useRecoilValue(LocaleMessageState)

    return (
        <div className="sidebar">
            <div className="ctx">
                <div className="head bold size-18">{sidebar.ohysFamily}</div>
                <div className="box">
                    <div>
                        <a href="https://ohys.seia.io/" className="item">Fanmade</a>
                    </div>
                    <div>
                        <a href="https://cryental.dev/services/anime/" className="item">Mirror</a>
                    </div>
                    <div>
                        <a href="https://nyaa.si/user/ohys?f=0&c=0_0&q=" className="item">Nyaa.si</a>
                    </div>
                    <div>
                        <a href="https://eu.ohys.net/t/rss.php?dir=disk" className="item">RSS</a>
                    </div>
                </div>
            </div>
            <div className="ctx">
                <div className="head bold size-18">{sidebar.contact}</div>
                <div className="box">
                    <a style={{display: 'inline'}} href="https://discord.gg/EUvzwzx" title="Ohys-Raws Discord" className="item">
                        <IoLogoDiscord 
                            size={30}
                            color='black'
                        />
                    </a>
                </div>
            </div>
            <style jsx>{`
                .sidebar {
                    position: fixed;
                    min-width: 130px;
                    padding-top: 6rem;
                }
                .sidebar .head {
                    margin-bottom: 8px;
                    padding-bottom: 4px;
                }
                .sidebar .ctx {
                    margin-bottom: 32px;
                    letter-spacing: 0;
                }
                .sidebar .ctx > .box a.item {
                    display: inline;
                    margin-bottom: 4px;
                    font-size: 14px;
                    font-weight: bold;
                }
                .sidebar .ctx > .box a.item:hover {
                    color: #6c5ce7;
                }
            `}</style>
        </div>
    )
}
export default Sidebar