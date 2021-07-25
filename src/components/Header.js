import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { BsGearFill, BsSearch } from 'react-icons/bs'
import { useRecoilState } from 'recoil'
import { styled } from '../lib/stitches'
import { SearchInput, SearchResult } from './Search'
import { animeSearchActiveState } from '../states/animeSearch'
import HeaderLinks from './HeaderLinks'
import ClassNameLink from './ClassNameLink'

const RightSideButton = styled('button', { all: 'unset', cursor: 'pointer' })
const RightSideLink = styled('a', {
  marginLeft: '24px',
  cursor: 'pointer',
})

const SearchContainer = styled('div', {
  position: 'relative',
  width: 300,
})

const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const isScrollDown = scrollPosition > 70

  const [isSearchActive, setSearchActive] = useRecoilState(
    animeSearchActiveState
  )

  const clickRef = useRef(null)

  const handleScroll = () => {
    setScrollPosition(window.pageYOffset)
  }

  const handleSearchClick = () => {
    setSearchActive(!isSearchActive)
  }

  const handleOutsideClick = (e) => {
    if (!clickRef.current.contains(e.target)) {
      setSearchActive(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousedown', handleOutsideClick)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousedown', handleOutsideClick)
    }
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
              <SearchContainer
                ref={clickRef}
                css={{ width: isSearchActive ? 300 : 'initial' }}
              >
                {!isSearchActive && (
                  <RightSideButton onClick={handleSearchClick}>
                    <BsSearch color="black" />
                  </RightSideButton>
                )}
                {isSearchActive && (
                  <>
                    <SearchInput />
                    <SearchResult css={{ marginTop: 8 }} />
                  </>
                )}
              </SearchContainer>
              <div>
                <ClassNameLink activeClassName="actived" href="/setting">
                  <RightSideLink>
                    <BsGearFill color="black" />
                  </RightSideLink>
                </ClassNameLink>
              </div>
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
          display: flex;
          align-items: center;
          margin-left: auto;
        }
        .header .container .right-side .rightSideButton {
          margin-left: 4px;
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
