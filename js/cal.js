// Setup AnimeJSONList
let animeJSON = {}
let dayStatus = ''
let currentCountry = ''

let apiURL = {
    timetable: './api/listAPI.php',
    ohys: 'https://ohys-api.gokoro.me',
    ohysSearch: '/search',
    ohysSeries: '/series'
}

window.onload = function() {
    requestAPI()

    // Fix not scrolling modal problem on mobile (https://github.com/Semantic-Org/Semantic-UI/issues/6656)
    $('.ui.modal').on('touchmove', function(event) {
        event.stopImmediatePropagation()
    })

    document.querySelector('.c-day#Sunday').addEventListener('click', dayClicked)
    document.querySelector('.c-day#Monday').addEventListener('click', dayClicked)
    document.querySelector('.c-day#Tuesday').addEventListener('click', dayClicked)
    document.querySelector('.c-day#Wednesday').addEventListener('click', dayClicked)
    document.querySelector('.c-day#Thursday').addEventListener('click', dayClicked)
    document.querySelector('.c-day#Friday').addEventListener('click', dayClicked)
    document.querySelector('.c-day#Saturday').addEventListener('click', dayClicked)

    document.getElementById('asoriginal').addEventListener('change', function() {
        replaceOriginalFileName(animeList.clickedAnimeID)
    })

    document.querySelector('.sidebar-button').onclick = function() {
        $('.ui.sidebar').sidebar('toggle')
    }
    document.querySelector('.dropdown#lang').onchange = function() {
        dropdown.change()
    }
    
    // Set Default Language
    let lang = String(navigator.language).toLowerCase()
    if (lang.includes('ko') || lang.includes('en')) {
        lang = lang.substr(0,2)
        currentCountry = lang
    } else {
        currentCountry = 'rom'
    }
    dropdown.active()

    // Set Default Day
    let date = moment()
    let today = date.tz('Asia/Tokyo').day()
    const dayWord = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const dayButton = document.querySelectorAll('.c-day')
    dayStatus = dayWord[today]
    dayButton[today].setAttribute('class', 'c-day active')
}
function requestAPI() {
    let reqTimetableForm = new RequestForm(apiURL.timetable, 'get', true)
    $.ajax(reqTimetableForm.form).done(function(data) {
        animeJSON = data.database

        animeList.create(dayStatus, currentCountry)
        document.querySelector('.plzwait').remove()

        let reqEpisodeJSON = new RequestForm('api/episode.json', 'get', true)
        $.ajax(reqEpisodeJSON.form).done(function(data) {
            let episodeJSON = data
            let minAgo = moment(data.created_at, 'YYYY-MM-DD HH:mm:ss').tz('Asia/Tokyo').fromNow()
        
            for (let i = 0, aj = animeJSON[dayStatus].length; i < aj; i++) {
                let episodeElement = document.querySelector('.c-animes').children[i].children[2].children[0]
                if (episodeJSON[dayStatus][i].result != '-1') {
                    episodeElement.innerText = 'Ep. '+ episodeJSON[dayStatus][i].result
                } else {
                    episodeElement.innerText = 'Finished'
                }
            }
            for (dayProperty in animeJSON) {
                for (let i = 0, l = animeJSON[dayProperty].length; i < l; i++) {
                    animeJSON[dayProperty][i].episode = episodeJSON[dayProperty][i].result
                }
            }
            document.querySelector('.explain').innerText = `Episode info was updated ${minAgo}`
        })
    })
}
  
let dropdown = {
    active() {
        $('.ui.selection.dropdown').dropdown()
        switch (currentCountry) {
            case 'en':
                document.querySelector('#lang .text').innerText = 'English'
                break;
            case 'ko':
                document.querySelector('#lang .text').innerText = '한국어'
                break
            default:
                document.querySelector('#lang .text').innerText = 'English (Romaji)'
                break;
        }
    },
    change() {
        const dropdownValueLang = $('input[name=lang]').val()
        switch (dropdownValueLang) {
            case '0':
                currentCountry = 'en'
                animeList.resetList(dayStatus, currentCountry)
                break
            case '1':
                currentCountry = 'rom'
                animeList.resetList(dayStatus, currentCountry)
                break
            case '2':
                currentCountry = 'ko'
                animeList.resetList(dayStatus, currentCountry)
                break
        }
    }
}
let animeList = {
    clickedAnimeID: 0,

    create(day, lang) {    
        const animeLinksWrapper = document.querySelector('.c-animes')
        let currentTitleLang = ''
        switch (lang) {
            case 'ko':
                currentTitleLang = 'kor_title'
                break;
            case 'en':
                currentTitleLang = 'eng_title'
                break;
            default:
                currentTitleLang = 'title'
                break;
        }
        for (let i = 0, l = animeJSON[day].length; i < l; i++) {
            animeLinksWrapper.appendChild(document.querySelector('.template>a.item').cloneNode(true))
            const tableItem = animeLinksWrapper.querySelector('a.item:last-child')
            const tableItemRight = animeLinksWrapper.querySelector('a.item:last-child .right')
            tableItem.childNodes[1].innerHTML = animeJSON[day][i][currentTitleLang]
            if (animeJSON[day][i].episode != '-1') {
                tableItemRight.childNodes[1].innerHTML = 'Ep. '+animeJSON[day][i].episode
            } else {
                tableItemRight.childNodes[1].innerHTML = 'Finished'
            }
            tableItemRight.childNodes[3].innerHTML = animeJSON[day][i].time
            tableItem.setAttribute('id', i)
            tableItem.addEventListener('click', clickedItem)
        }
    },
    remove() {
        document.querySelector('.c-animes').innerHTML = null
    },
    resetList(day, lang) {
        this.remove()
        this.create(day, lang)
    },
    createTorrent(animeItem) {
        let fanmadeURL = 'https://ohys.seia.io/series/'
        let mirrorURL = 'https://cryental.dev/services/anime/?search='
        let nyaaURL = 'https://nyaa.si/user/ohys?f=0&c=0_0&q='

        const animeLinksWrapper = document.querySelector('.ui.modal .description .ui.list')
        let asOriginalInputValue = document.querySelector('.ui.modal input#asoriginal').getAttribute('value')

        let itemQuery = {
            header: document.querySelector('.ui.modal .description .header'),
            title: '',
            broadcastInfo: document.querySelector('.ui.modal .cast-info'),
            image: document.querySelector('.modal img'),
            format: '',
            button: {
                fanmade: document.querySelector('.ui.modal a.button.fanmade'),
                mirror: document.querySelector('.ui.modal a.button.mirror'),
                nyaa: document.querySelector('.ui.modal a.button.nyaa')
            }
        }
        itemQuery.header.innerText = animeItem.title
        itemQuery.broadcastInfo.innerText = animeItem.time
        for (let i = 0, l = animeItem.info.search.length; i < l; i++) {
            if (animeItem.info.search[i].series.includes(animeItem.torrentName)) {
                animeLinksWrapper.appendChild(document.querySelector('.template div.torrent').cloneNode(true))
                
                itemQuery.title = animeLinksWrapper.querySelector('.torrent:last-child .title')
                itemQuery.format = animeLinksWrapper.querySelector('.torrent:last-child .format')
                if (asOriginalInputValue === 'false') {
                    if (animeItem.info.search[i].episode != '-1' && animeItem.info.search[i].videoFormat != 'torrent') {
                        itemQuery.title.innerText = `${animeItem.title} - ${animeItem.info.search[i].episode}`
                    } else if (animeItem.info.search[i].episode == '-1' && animeItem.info.search[i].videoFormat != 'torrent') {
                        itemQuery.title.innerText = `${animeItem.title} - (Single Episode)`
                    } else {
                        itemQuery.title.innerText = `${animeItem.title} - All the episode`
                    }
                } else {
                    itemQuery.title.innerText = animeItem.info.search[i].original
                }
                itemQuery.format.innerText = `${animeItem.info.search[i].resolution} ${animeItem.info.search[i].audioFormat} ${animeItem.info.search[i].videoFormat} ${animeItem.info.search[i].broadcaster}`
                itemQuery.title.setAttribute('href', animeItem.info.search[i].link)
            }
        }

        itemQuery.button.fanmade.setAttribute('href', fanmadeURL+animeItem.torrentName)
        itemQuery.button.mirror.setAttribute('href', mirrorURL+animeItem.torrentName)
        itemQuery.button.nyaa.setAttribute('href', nyaaURL+animeItem.torrentName)

        itemQuery.image.setAttribute('src', animeItem.info.series.coverImageURL)
    }
}

function dayClicked(event) {
    const clickedDayButton = document.getElementById(event.target.id)
    const activedDayButton = document.querySelector('.c-day.active')
    dayStatus = event.target.id

    animeList.resetList(dayStatus, currentCountry)
    activedDayButton.classList.remove('active')
    clickedDayButton.classList.add('active')
}
function clickedItem(event) {
    $('.ui.modal').modal('show')
    document.querySelector('.modal img').setAttribute('src', '')
    document.querySelector('.ui.modal .description .ui.list').innerHTML = null

    let clickedName = event.currentTarget.id
    let JSONTarget = animeJSON[dayStatus][clickedName]
    let animeInfo = {
        title: '',
        torrentName: JSONTarget.title,
        id: clickedName,
        info: '',
        time: `${dayStatus} ${JSONTarget.time}`
    }

    animeList.clickedAnimeID = animeInfo.id
    
    if (!JSONTarget.seriesCrawled) {
        JSONTarget.info = {}

        let srform = new FormData()
    
        srform.append('scope', 'series')
        srform.append('keyword', animeInfo.torrentName)
    
        let reqSearchForm = new RequestForm(apiURL.ohys+apiURL.ohysSearch, 'post', false, srform)
    
        $.ajax(reqSearchForm.form)
            .done(function(data) {
                try {
                    JSONTarget.info.search = data
                } catch (err) {}
        })

        let seform = new FormData()
        seform.append('series', JSONTarget.title)
    
        let reqSeriesForm = new RequestForm(apiURL.ohys+apiURL.ohysSeries, 'post', false, seform)
    
        $.ajax(reqSeriesForm.form)
            .done(function(data) {
                JSONTarget.info.series = data[0]
            })
        }
    animeInfo.info = JSONTarget.info
    JSONTarget.seriesCrawled = true

    switch (currentCountry) {
        case 'ko':
            animeInfo.title = JSONTarget.kor_title
            break;
        case 'en':
            animeInfo.title = JSONTarget.eng_title
            break;
        default:
            animeInfo.title = JSONTarget.title
            break;
    }
    animeList.createTorrent(animeInfo)
}
function replaceOriginalFileName(clickedAnimeName) {
    const animeLinksWrapper = document.querySelector('.ui.modal .description .ui.list')
    let asOriginalInputValue = document.querySelector('.ui.modal input#asoriginal').getAttribute('value')
    let JSONSearchTarget = animeJSON[dayStatus][clickedAnimeName].info.search
    let currentCountryTitle = ''
    switch (currentCountry) {
        case 'ko':
            currentCountryTitle = animeJSON[dayStatus][clickedAnimeName].kor_title
            break;
        case 'en':
            currentCountryTitle = animeJSON[dayStatus][clickedAnimeName].eng_title
            break;
        default:
            currentCountryTitle = animeJSON[dayStatus][clickedAnimeName].title
            break;
    }
    if (asOriginalInputValue === 'true') {
        document.querySelector('.ui.modal input#asoriginal').setAttribute('value', 'false')
        for (let i = 0, l = JSONSearchTarget.length; i < l; i++) {
            if (JSONSearchTarget[i].episode != '-1' && JSONSearchTarget[i].videoFormat != 'torrent') {
                animeLinksWrapper.childNodes[i].childNodes[3].childNodes[1].text = `${currentCountryTitle} - ${JSONSearchTarget[i].episode}`
            } else if (JSONSearchTarget[i].episode == '-1' && JSONSearchTarget[i].videoFormat != 'torrent') {
                animeLinksWrapper.childNodes[i].childNodes[3].childNodes[1].text = `${currentCountryTitle} - (Single Episode)`
            } else {
                animeLinksWrapper.childNodes[i].childNodes[3].childNodes[1].text = `${currentCountryTitle} - All the episode`
            }
        }
    } else {
        document.querySelector('.ui.modal input#asoriginal').setAttribute('value', 'true')
        for (let i = 0, l = JSONSearchTarget.length; i < l; i++) {
            animeLinksWrapper.childNodes[i].childNodes[3].childNodes[1].text = JSONSearchTarget[i].original
        }    
    }
}
let RequestForm = class {
    constructor(reqURL, reqType, reqAsync, reqData = {} ) {
        this.form = {}

        this.form.url = reqURL
        this.form.type = reqType
        this.form.dataType = 'json'
        this.form.async = reqAsync
        switch (reqType) {
            case 'get':
                break
            case 'post':
                this.form.data = reqData
                this.form.processData = false
                this.form.contentType = false
                this.form.crossDomain = true
        }
    }
}