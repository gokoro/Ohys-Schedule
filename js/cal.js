// Setup AnimeJSONList
let animeJSON = {}
let dayStatus = ''
let currentCountry = ''

let timetableAPI = 'api/listAPI.php'
let ohysAPI = 'https://ohys-api.gokoro.me'
let ohysAPISearch = '/search'
let ohysAPISeries = '/series'

window.onload = function() {
    requestAPI()

    document.querySelector('.c-day#Sunday').addEventListener('click', dayClicked)
    document.querySelector('.c-day#Monday').addEventListener('click', dayClicked)
    document.querySelector('.c-day#Tuesday').addEventListener('click', dayClicked)
    document.querySelector('.c-day#Wednesday').addEventListener('click', dayClicked)
    document.querySelector('.c-day#Thursday').addEventListener('click', dayClicked)
    document.querySelector('.c-day#Friday').addEventListener('click', dayClicked)
    document.querySelector('.c-day#Saturday').addEventListener('click', dayClicked)


    // Set Default Language
    let lang = String(navigator.language).toLowerCase()

    if (lang == 'ko_kr' || lang == 'en_us' || lang == 'ko-kr' || lang == 'en-us') {
        lang = lang.substr(0,2)
        currentCountry = lang
    } else {
        currentCountry = lang
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
document.querySelector('.sidebar-button').onclick = function() {
    $('.ui.sidebar').sidebar('toggle')
}
document.querySelector('.dropdown#lang').onchange = function() {
    dropdown.change('lang')
}
function requestAPI() {
    let reqTimetableForm = new RequestForm(timetableAPI, 'get', true)

    $.ajax(reqTimetableForm.form).done(function(data) {
        animeJSON = data.database
        for (let i = 0, aj = animeJSON[dayStatus].length; i < aj; i++) {
            let form = new FormData()
            let reqForm = new RequestForm(ohysAPI+ohysAPISearch, 'post', false, form)

            form.append('scope', 'series')
            form.append('keyword', animeJSON[dayStatus][i].title)

            $.ajax(reqForm.form).done(function(data) {
                animeJSON[dayStatus][i].episode = data[0].episode
            })
        }
        animeList.create(dayStatus, currentCountry)
        document.querySelector('.plzwait').remove()
        for (let dayProperty in animeJSON) {
            for (let i = 0, aj = animeJSON[dayProperty].length; i < aj; i++) {
                let form = new FormData()
                let reqForm = new RequestForm(ohysAPI+ohysAPISearch, 'post', true, form)
                
                form.append('scope', 'series')
                form.append('keyword', animeJSON[dayProperty][i].title)
                
                $.ajax(reqForm.form)
                    .done(function(data) {
                        try {
                            animeJSON[dayProperty][i].episode = data[0].episode
                            animeJSON[dayProperty][i].info = {}
                            animeJSON[dayProperty][i].info.search = data
                            animeJSON[dayProperty][i].seriesCrawled = false
                        } catch (err) {}
                })
            }
        }    
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
    create(day, lang) {    
        const animeLinksWrapper = document.querySelector('.c-animes')
        for (let i = 0; i < animeJSON[day].length; i++) {
            animeLinksWrapper.appendChild(document.querySelector('.template>a.item').cloneNode(true))
            const tableItem = document.querySelector('.c-animes a.item:last-child')
            const tableItemRight = document.querySelector('.c-animes a.item:last-child .right')
            switch (lang) {
                case 'ko':
                    tableItem.childNodes[1].innerHTML = animeJSON[day][i].kor_title
                    break;
                case 'en':
                    tableItem.childNodes[1].innerHTML = animeJSON[day][i].eng_title
                    break;
                default:
                    tableItem.childNodes[1].innerHTML = animeJSON[day][i].title
                    break;
            }
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
        const animeListLength = document.querySelectorAll('.c-animes a.item').length

        for (let i = 0; i < animeListLength; i++) {
            document.querySelector('.c-animes a.item').remove()
        }
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
        let itemQuery = {
            header: document.querySelector('.ui.modal .description .header'),
            title: '',
            format: '',
            button: {
                fanmade: document.querySelector('.ui.modal a.button.fanmade'),
                mirror: document.querySelector('.ui.modal a.button.mirror'),
                nyaa: document.querySelector('.ui.modal a.button.nyaa')
            }
        }
        document.querySelector('.modal img').setAttribute('src', animeItem.info.series.coverImageURL)
        for (let i = 0; i < animeItem.info.search.length; i++) {
            animeLinksWrapper.appendChild(document.querySelector('.template div.torrent').cloneNode(true))

            itemQuery.title = document.querySelector('.ui.modal .torrent:last-child .title')
            itemQuery.format = document.querySelector('.ui.modal .torrent:last-child .format')

            itemQuery.header.innerText = animeItem.title
            if (animeItem.info.search[i].episode != '-1' && animeItem.info.search[i].videoFormat != 'torrent') {
                itemQuery.title.innerText = `${animeItem.title} - ${animeItem.info.search[i].episode}`
            } else if (animeItem.info.search[i].episode == '-1' && animeItem.info.search[i].videoFormat != 'torrent') {
                itemQuery.title.innerText = `${animeItem.title} - ${animeItem.info.search[i].series} (Single Episode)`
            } else {
                itemQuery.title.innerText = `${animeItem.title} - All the episode`
            }
            itemQuery.format.innerText = `${animeItem.info.search[i].resolution} ${animeItem.info.search[i].audioFormat} ${animeItem.info.search[i].videoFormat} ${animeItem.info.search[i].broadcaster}`
            itemQuery.title.setAttribute('href', animeItem.info.search[i].link)
        }
        itemQuery.button.fanmade.setAttribute('href', fanmadeURL+animeItem.torrentName)
        itemQuery.button.mirror.setAttribute('href', mirrorURL+animeItem.torrentName)
        itemQuery.button.nyaa.setAttribute('href', nyaaURL+animeItem.torrentName)
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
    document.querySelector('.modal img').setAttribute('src', '')
    document.querySelector('.ui.modal .description .ui.list').innerHTML = null
    $('.ui.modal').modal('show')
    let clickedName = event.currentTarget.id
    let JSONTarget = animeJSON[dayStatus][clickedName]
    let animeInfo = {
        title: '',
        torrentName: '',
        id: clickedName,
        info: JSONTarget.info
    }

    animeInfo.torrentName = JSONTarget.title

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

    if (!JSONTarget.seriesCrawled) {
        let form = new FormData()
        form.append('series', JSONTarget.title)
    
        let reqForm = new RequestForm(ohysAPI+ohysAPISeries, 'post', false, form)
    
        $.ajax(reqForm.form)
            .done(function(data) {
                JSONTarget.info.series = data[0]
                JSONTarget.seriesCrawled = true
            })
    }
    animeList.createTorrent(animeInfo)
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