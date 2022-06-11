import * as anime from '../src/animes'
import {
  getRaws,
  getNyaa,
  getRawsEndPage,
} from '../src/animes/libs/get-torrents'

async function updateRaws() {
  const endPage = await getRawsEndPage()

  for (let i = endPage; i > 0; i--) {
    await anime.updateTorrent({ provider: 'raws', fetcher: () => getRaws(i) })
  }
}

async function updateNyaa() {
  for (let i = 100; i > 0; i--) {
    await anime.updateTorrent({ provider: 'nyaa', fetcher: () => getNyaa(i) })
  }
}

async function getAllTorrent(): Promise<void> {
  await updateRaws()
  await updateNyaa()
}

getAllTorrent()
