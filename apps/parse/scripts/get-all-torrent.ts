import * as anime from '../src/animes'
import {
  getNyaa,
  getRaws,
  getRawsEndPage,
} from '../src/animes/libs/get-torrents'
import logger from '../src/libs/logger'

async function updateRaws() {
  const endPage = await getRawsEndPage()

  for (let i = endPage; i > 0; i--) {
    logger.info(`Adding ${i} page of raws...`)
    await anime.updateTorrent({ provider: 'raws', fetcher: () => getRaws(i) })
  }
}

async function updateNyaa() {
  for (let i = 100; i > 0; i--) {
    logger.info(`Adding ${i} page of nyaa...`)
    await anime.updateTorrent({ provider: 'nyaa', fetcher: () => getNyaa(i) })
  }
}

async function getAllTorrent(): Promise<void> {
  logger.info(`Initializing animes started!`)
  await updateRaws()
  await updateNyaa()
}

getAllTorrent()
