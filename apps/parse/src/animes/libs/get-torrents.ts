import * as cheerio from 'cheerio'
import crypto from 'crypto'
import got from 'got'
import type { IAnimeTorrent, IRawsDTO } from '../interfaces'

const OHYS_URL = 'https://ohys.nl/tt/'
const NYAA_URL = 'https://nyaa.si'

// The page number should be placed at the end of the string.
const OHYS_POST_URL = 'https://ohys.nl/tt/json.php?dir=disk&q&p='
const NYAA_POST_URL = 'https://nyaa.si/user/ohys?f=0&c=1_4&q=&p='

const regex =
  /(?:\[([^\r\n]*)\][\W]?)?(?:(?:([^\r\n]+?)(?: - ([0-9\-.]+?(?: END)?|SP))?)[\W]?[(|[]([^\r\n(]+)? (\d+x\d+|\d{3,}[^\r\n ]*)? ([^\r\n]+)?[)\]][^.\r\n]*(?:\.([^\r\n.]*)(?:\.[\w]+)?)?)$/

function createHash(str: string) {
  return crypto.createHash('md5').update(str).digest('hex')
}

function sanitizeTitle(title: string) {
  const [
    ,
    ,
    fileName,
    rawEpisode,
    broadcaster,
    resolution,
    audioFormat,
    videoFormat,
  ] = title.split(regex)

  let episode = rawEpisode ? parseInt(rawEpisode) : -1

  if (isNaN(episode)) {
    episode = -2
  }

  return {
    fileName: fileName ?? '',
    episode,
    broadcaster: broadcaster ?? '',
    resolution: resolution ?? '',
    audioFormat: audioFormat ?? '',
    videoFormat: videoFormat ?? '',
  }
}

export const formatRawsJson = (text: string): IRawsDTO[] =>
  JSON.parse(text.slice(1))

export async function getRawsData(page: number): Promise<IRawsDTO[]> {
  const getUrl = OHYS_POST_URL + (page - 1)

  const data = await got.get(getUrl).text()
  return formatRawsJson(data)
}

export const isFalseTitle = (title: string): boolean => !title.trim()

export async function getRaws(page = 1): Promise<IAnimeTorrent[]> {
  const torrents = await getRawsData(page)

  return torrents
    .map(
      ({ a, t }): IAnimeTorrent => ({
        ...sanitizeTitle(t),
        link: OHYS_URL + a,
        originalFileName: t,
        hash: createHash(t + a),
      })
    )
    .filter(({ fileName }) => !isFalseTitle(fileName))
}

export async function getRawsEndPage(initialPage = 1): Promise<number> {
  const data = await getRawsData(initialPage)

  return data.length > 0
    ? await getRawsEndPage(initialPage + 1)
    : initialPage - 1
}

export async function getNyaa(page = 1): Promise<IAnimeTorrent[]> {
  const getUrl = NYAA_POST_URL + page

  const pageData = await got.get(getUrl).text()
  const $ = cheerio.load(pageData)

  const torrents = $('table.torrent-list tbody tr')
    .map((_i, element): IAnimeTorrent => {
      const $ = cheerio.load(element)

      const name = $('td[colspan="2"] a:not(.comments)').text()
      const link = $('td.text-center a').attr('href') ?? ''

      return {
        ...sanitizeTitle(name),
        link: NYAA_URL + link,
        originalFileName: name,
        hash: createHash(name + link),
      }
    })
    .toArray()
    .filter(({ fileName }) => !isFalseTitle(fileName))

  return torrents
}
