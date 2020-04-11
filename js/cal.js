// Setup AnimeJSONList
let animeJSON = {}
let dayStatus = ''
let currentCountry = ''

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
        lang = lang.substr(0,2)
        switch (lang) {
            case 'ko':
                currentCountry = 'kor_'
                break
            case 'en':
                currentCountry = 'eng_'
                break
            case 'ja':
                currentCountry = 'ja_'
                break
            default:
                currentCountry = ''
                break
        }
    dropdown.active()

    // Set Default Day
    let today = moment().tz('Asia/Tokyo').day()
    const dayWord = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const dayButton = document.querySelectorAll('.c-day')
    dayStatus = dayWord[today]
    dayButton[today].setAttribute('class', 'c-day active')
}
function requestAPI() {
    const timetable = 'https://ohys-cacheapi.gokoro.me'
    let reqEpisodeJSON = requestForm(timetable, 'get', true)
    $.ajax(reqEpisodeJSON).done(function(data) {
        animeJSON = data
        animeList.create(dayStatus, currentCountry)
        $('#plzwait').remove()
        let minAgo = moment(data.created_at, 'YYYY-MM-DD HH:mm:ss').tz('Asia/Tokyo').fromNow()
        document.querySelector('.explain span.ago').innerHTML = minAgo
    })
}
  
let dropdown = {
    active() {
        $('.ui.selection.dropdown').dropdown()
        switch (currentCountry) {
            case 'eng_':
                document.querySelector('#lang .text').innerText = 'English'
                break;
            case 'kor_':
                document.querySelector('#lang .text').innerText = '한국어'
                break
            case 'ja_':
                document.querySelector('#lang .text').innerText = '日本語'
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
                currentCountry = 'eng_'
                animeList.resetList(dayStatus, currentCountry)
                break
            case '1':
                currentCountry = ''
                animeList.resetList(dayStatus, currentCountry)
                break
            case '2':
                currentCountry = 'kor_'
                animeList.resetList(dayStatus, currentCountry)
                break
            case '3':
                currentCountry = 'ja_'
                animeList.resetList(dayStatus, currentCountry)
                break    
        }
    }
}
let animeList = {
    clickedAnimeID: 0,

    create(day, lang) {    
        const animeLinksWrapper = document.querySelector('.c-animes')
        for (let i = 0, l = animeJSON[day].length; i < l; i++) {
            animeLinksWrapper.appendChild(document.querySelector('.template>a.item').cloneNode(true))
            const tableItem = animeLinksWrapper.querySelector('a.item:last-child')
            const tableItemRight = animeLinksWrapper.querySelector('a.item:last-child .right')
            tableItem.childNodes[1].innerHTML = animeJSON[day][i][lang+'title']
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
        document.querySelector('.c-animes').innerHTML = ''
    },
    resetList(day, lang) {
        this.remove()
        this.create(day, lang)
    },
    createTorrent(animeItem) {
        const fanmadeURL = 'https://ohys.seia.io/series/'
        const mirrorURL = 'https://cryental.dev/services/anime/?search='
        const nyaaURL = 'https://nyaa.si/user/ohys?f=0&c=0_0&q='

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
                        itemQuery.title.innerText = `${animeItem.title} - Single Episode`
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

    const ohys = 'https://ohys-api.gokoro.me'
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
        let srform = new FormData()
        srform.append('scope', 'series')
        srform.append('keyword', animeInfo.torrentName)
    
        let reqSearchForm = requestForm(ohys+'/search', 'post', false, srform)

        $.ajax(reqSearchForm)
            .done(function(data) {
                try {
                    JSONTarget.info.search = data
                } catch (err) {}
        })
    }
    animeInfo.title = JSONTarget[currentCountry+'title']
    animeInfo.info = JSONTarget.info
    JSONTarget.seriesCrawled = true

    animeList.createTorrent(animeInfo)
}
function replaceOriginalFileName(clickedAnimeName) {
    const animeLinksWrapper = document.querySelector('.ui.modal .description .ui.list')
    let asOriginalInputValue = document.querySelector('.ui.modal input#asoriginal').getAttribute('value')
    let JSONSearchTarget = animeJSON[dayStatus][clickedAnimeName].info.search
    let currentCountryTitle = animeJSON[dayStatus][clickedAnimeName][currentCountry+'title']

    if (asOriginalInputValue === 'true') {
        document.querySelector('.ui.modal input#asoriginal').setAttribute('value', 'false')
        for (let i = 0, l = JSONSearchTarget.length; i < l; i++) {
            if (JSONSearchTarget[i].episode != '-1' && JSONSearchTarget[i].videoFormat != 'torrent') {
                animeLinksWrapper.childNodes[i].childNodes[3].childNodes[1].text = `${currentCountryTitle} - ${JSONSearchTarget[i].episode}`
            } else if (JSONSearchTarget[i].episode == '-1' && JSONSearchTarget[i].videoFormat != 'torrent') {
                animeLinksWrapper.childNodes[i].childNodes[3].childNodes[1].text = `${currentCountryTitle} - Single Episode`
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
let requestForm = function (reqURL, reqType, reqAsync, reqData = {}) {
    let form = {}
    form.url = reqURL
    form.type = reqType
    form.dataType = 'json'
    form.async = reqAsync
    switch (reqType) {
        case 'get':
            break
        case 'post':
            form.data = reqData
            form.processData = false
            form.contentType = false
            form.crossDomain = true
    }
    return form
}