import Link from 'next/link'
import HeaderLinks from '../components/HeaderLinks'
import ClassNameLink from '../components/ClassNameLink'

const Header = () => {
    return (
        <div className="header">
            <div className="wrapper">
                <div className="container">
                    <div className="logo">
                        <Link href="/">
                            <a className="link">
                                <img className="link-img rounded" src="/images/logo.png" alt="Ohys"/>
                                <span className="link-text">Schedule</span>
                            </a>
                        </Link>
                    </div>
                    <div className="right-side">
                        <ClassNameLink activeClassName="actived" href="/about">
                            <a>About</a>
                        </ClassNameLink>
                    </div>
                </div>
                <HeaderLinks />
            </div>
            <style jsx>{`
                .header {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    background: #FFFFFF;
                    border-bottom: 1px solid #ecf0f1;
                    z-index: 5;
                    user-select: none;
                }
                .header a {
                    color: var(--sub-text-color);
                }
                .header .wrapper {
                    display: flex;
                    flex-direction: column;
                    margin: 0 auto;
                    width: var(--wrapper-size);
                }
                .header .container {
                    display: flex;
                    align-items: center;
                    padding: 14px;
                    width: 100%;
                    height: fit-content;
                }
                .header .logo .link {
                    display: flex;
                    align-items: center;
                    color: #000000;
                    font-weight: bold;
                    white-space: nowrap;
                }
                .header .logo .link .link-img {
                    width: 40px;
                    margin-right: 12px;
                }
                .header .container .right-side {
                    margin-left: auto;
                }
                .header .container .right-side .actived {
                    color: #000000;
                }
                @media screen and (max-width: 1080px) {
                    .header .wrapper {
                        width: var(--mobile-wrapper-size);
                    }
                }
                @media screen and (max-width: 768px) {
                    .header .logo .link .link-text {
                        display: none;
                    }
                    .header .logo .link .link-img {
                        margin: 0;
                    }
                }
            `}</style>
        </div>
    )
}
export default Header
