import Head from "next/head"
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'

const Layout = (props) => {
    return (
        <>
            <Head>
                <title>Ohys-Schedule</title>
                <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Noto+Sans+JP:wght@400;700&family=Noto+Sans+KR:wght@400;700&display=swap" rel="stylesheet" />
                <meta name="description" content="The Schedule of the animes that Ohys releases." />
                <link rel="shortcut icon" href="/images/logo.png" />
                <meta name="og:title" content="Ohys-Schedule" />
                <meta name="og:description" content="The Schedule of the animes that Ohys releases." />
                <meta name="og:url" content="https://ohys.gokoro.me"/>
                <link rel="canonical" href="https://ohys.gokoro.me" />
            </Head>
            <Header />
                <div className="wrapper">
                    <div className="content">
                        <div className="container">
                            <aside className="side-section">
                                <Sidebar />
                            </aside>
                            <main className="main-section">
                                <div className="main-wrapper">
                                    {props.children}
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            {/* <Footer /> */}
            <style jsx>{`
                .wrapper {
                    margin-top: var(--header-height);
                }
                .content {
                    width: var(--wrapper-size);
                    margin: 0 auto;
                    padding: 0 14px;
                }
                .container {
                    display: flex;
                }
                .container .main-section {
                    flex: 1 1 0%;
                }
                .container .main-section .main-wrapper {
                    margin-top: 48px;
                }
                .container .side-section {
                    width: 20%;
                    margin-right: 28px;
                    z-index: 0;
                }
                @media screen and (max-width: 1080px) {
                    .content {
                        width: var(--mobile-wrapper-size);
                    }
                    .container .side-section {
                        display: none;
                    }
                }
                @media screen and (max-width: 568px) {
                    .container .main-section .main-wrapper {
                        margin-top: 30px;
                    }
                }
            `}</style>
        </>
    )
}
export default Layout
