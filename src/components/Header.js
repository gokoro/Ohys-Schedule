import * as React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BsGearFill } from 'react-icons/bs'
import HeaderLinks from '../components/HeaderLinks'
import ClassNameLink from '../components/ClassNameLink'

const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const isScrollDown = scrollPosition > 70

  const handleScroll = () => {
    setScrollPosition(window.pageYOffset)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <div className="header b-default">
        <div className="wrapper">
          <div className="container">
            <div className="logo">
              <Link href="/">
                <a className="link">
                  <img
                    className="link-img rounded"
                    src="/images/logo.jpg"
                    alt="Ohys"
                  />
                  <span className="link-text">Schedule</span>
                </a>
              </Link>
            </div>
            <div className="right-side">
              <ClassNameLink activeClassName="actived" href="/setting">
                <a>
                  <BsGearFill color="black" />
                </a>
              </ClassNameLink>
            </div>
          </div>
        </div>
      </div>
      <div className={`dayLinks b-default ${isScrollDown ? 'shadow' : ''}`}>
        <div className="wrapper">
          <HeaderLinks />
        </div>
      </div>
      <style jsx>{`
        .b-default {
          background: #ffffff;
          z-index: 5;
          user-select: none;
        }
        .wrapper {
          width: var(--wrapper-size);
          margin: 0 auto;
        }
        .dayLinks {
          border-bottom: 1px solid #ecf0f1;
          box-shadow: none;
          transition: box-shadow 0.3s;
        }
        .dayLinks.shadow {
          box-shadow: var(--shadow-small);
        }
        .header a {
          color: var(--sub-text-color);
        }
        .header .wrapper {
          display: flex;
          flex-direction: column;
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
        .dayLinks {
          position: sticky;
          top: 0;
        }
        @media screen and (max-width: 1080px) {
          .wrapper {
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
    </>
  )
}
export default Header
