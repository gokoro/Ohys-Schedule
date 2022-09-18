import * as React from 'react'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import * as AspectRatio from '@radix-ui/react-aspect-ratio'

import Placeholder from './Placeholder'

import { useRecoilValue } from 'recoil'

import { LocaleMessageState } from '../states/preferredLanguage'

const AnimeCardForm = (props) => {
  const animated = {
    hidden: {
      opacity: 0.2,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
    },
  }
  return (
    <Link href={props.href}>
      <motion.a
        href={props.href}
        className="animecard"
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        variants={animated}
      >
        <div className="top">{props.top}</div>
        <div className="bottom">{props.bottom}</div>
        <style jsx>{`
          :global(.animecard) {
            display: flex;
            flex-direction: column;
            position: relative;
            transition: box-shadow 0.15s;
            cursor: pointer;
          }
          :global(.animecard) .top :global(.imgContainer) {
            transition: box-shadow 0.15s;
          }
          :global(.animecard:hover) .top :global(.imgContainer) {
            box-shadow: 4px 8px 16px rgba(0, 0, 0, 0.16);
          }
          .bottom {
            margin-top: 10px;
            background-color: transparent;
            width: 100%;
            border-radius: 4px 4px 5px 5px;
          }
        `}</style>
      </motion.a>
    </Link>
  )
}
const AnimeCard = (props) => {
  const locale = useRecoilValue(LocaleMessageState)
  return (
    <AnimeCardForm
      href={props.href}
      top={
        <>
          <motion.div
            className="imgContainer rounded"
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3, delay: 0.1 }}
            variants={{
              hidden: {
                opacity: 0,
              },
              visible: {
                opacity: 1,
              },
            }}
          >
            <AspectRatio.Root ratio={4 / 5}>
              <Image
                className="animeCardImg rounded"
                loading="eager"
                src={props.imageUrl || '/'}
                layout="fill"
              />
            </AspectRatio.Root>
          </motion.div>
          <style jsx>{`
            :global(.animeCardImg) {
              object-fit: cover;
            }
            :global(.imgContainer) {
              box-shadow: var(--shadow-small);
              transition: box-shadow 0.3s;
            }
          `}</style>
        </>
      }
      bottom={
        <>
          {props.day && props.time && (
            <div className="sub bold">
              {locale.common.day[props.day]} {props.time}
            </div>
          )}
          <div className="title bold">{props.name}</div>
          <style jsx>{`
            .title {
              font-size: 14px;
              color: #000000;
              line-height: 20px;
            }
            .sub {
              color: var(--sub-text-color);
              font-size: 12px;
              letter-spacing: 0;
              line-height: 16px;
              margin-bottom: 2px;
            }
            @media screen and (max-width: 568px) {
              .title {
                font-size: 14px;
              }
              .sub {
                font-size: 10px;
              }
            }
          `}</style>
        </>
      }
    />
  )
}
const AnimeCardPlaceholder = () => {
  return (
    <AnimeCardForm
      top={
        <>
          <div className="ui placeholder">
            <div className="image"></div>
          </div>
          <style jsx>{`
            .image {
              width: 100%;
              min-height: 230px;
            }
          `}</style>
        </>
      }
      bottom={
        <>
          <Placeholder lineCountFor={2} />
        </>
      }
    />
  )
}
export { AnimeCard, AnimeCardPlaceholder }
