export interface IRawsDTO {
  a: string
  t: string
}

export interface IAnimeTorrent {
  fileName: string
  link: string
  episode: number
  broadcaster: string
  resolution: string
  audioFormat: string
  videoFormat: string
  hash: string
}

export interface IAnimeTitle {
  language: string
  title: string
}

export interface IAnimeDescription {
  language: string
  description: string
}

export interface IAnimeRetrieveMetadata {
  titles: IAnimeTitle[]
  descriptions: IAnimeDescription[]
  season: number
  posterImage: string
  bannerImage: string
}

// export interface IAnimeMetadata {}

export interface ITMDBSearchDataResponse {
  page: number
  total_results: number
  total_pages: number
  results: ITMDBSearchData[]
}

export interface ITMDBSearchData {
  poster_path: string
  popularity: number
  id: number
  backdrop_path: string
  vote_average: number
  overview: string
  first_air_date: string
  origin_country: string[]
  genre_ids: number[]
  original_language: string
  vote_count: number
  name: string
  original_name: string
}

export interface ITMDBTVShowCreatedBy {
  id: number
  credit_id: string
  name: string
  gender: number
  profile_path: string
}

export interface ITMDBTVShowGenre {
  id: number
  name: string
}

export interface ITMDBTVShowLastEpisodeToAir {
  air_date: string
  episode_number: number
  id: number
  name: string
  overview: string
  production_code: string
  season_number: number
  still_path: string
  vote_average: number
  vote_count: number
}

export interface ITMDBTVShowNetwork {
  name: string
  id: number
  logo_path: string
  origin_country: string
}

export interface ITMDBTVShowProductionCompany {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

export interface ITMDBTVShowProductionCountry {
  iso_3166_1: string
  name: string
}

export interface ITMDBTVShowSeason {
  air_date: string
  episode_count: number
  id: number
  name: string
  overview: string
  poster_path: string
  season_number: number
}

export interface ITMDBTVShowSpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}

export interface ITMDBTVShowResponse {
  backdrop_path: string
  created_by: ITMDBTVShowCreatedBy[]
  episode_run_time: number[]
  first_air_date: string
  genres: ITMDBTVShowGenre[]
  homepage: string
  id: number
  in_production: boolean
  languages: string[]
  last_air_date: string
  last_episode_to_air: ITMDBTVShowLastEpisodeToAir
  name: string
  next_episode_to_air: null
  networks: ITMDBTVShowNetwork[]
  number_of_episodes: number
  number_of_seasons: number
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: ITMDBTVShowProductionCompany[]
  production_countries: ITMDBTVShowProductionCountry[]
  seasons: ITMDBTVShowSeason[]
  spoken_languages: ITMDBTVShowSpokenLanguage[]
  status: string
  tagline: string
  type: string
  vote_average: number
  vote_count: number
}

export interface ITMDBTVShowImageBackdrop {
  aspect_ratio: number
  file_path: string
  height: number
  iso_639_1: string | null
  vote_average: number
  vote_count: number
  width: number
}

export interface ITMDBTVShowImagePoster {
  aspect_ratio: number
  file_path: string
  height: number
  iso_639_1: string | null
  vote_average: number
  vote_count: number
  width: number
}

export interface ITMDBTVShowImageResponse {
  id: number
  backdrops: ITMDBTVShowImageBackdrop[]
  posters: ITMDBTVShowImagePoster[]
}

export interface ITMDBTVShowTranslationBackdrop {
  aspect_ratio: number
  file_path: string
  height: number
  iso_639_1: string
  vote_average: number
  vote_count: number
  width: number
}

export interface ITMDBTVShowTranslationPoster {
  aspect_ratio: number
  file_path: string
  height: number
  iso_639_1: string
  vote_average: number
  vote_count: number
  width: number
}

export interface ITMDBTVShowTranslationResponse {
  id: number
  backdrops: ITMDBTVShowTranslationBackdrop[]
  posters: ITMDBTVShowTranslationPoster[]
}

export interface ITMDBTVShowTranslationData {
  name: string
  overview: string
  homepage: string
}

export interface ITMDBTVShowTranslationTranslation {
  iso_3166_1: string
  iso_639_1: string
  name: string
  english_name: string
  data: ITMDBTVShowTranslationData
}

export interface ITMDBTVShowTranslationResponse {
  id: number
  translations: ITMDBTVShowTranslationTranslation[]
}
