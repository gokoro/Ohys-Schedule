// Setup AnimeJSONList
let dayStatus = ''
let animeJSON = ''
let currentCountry = ''

let fanmadeURL = 'https://ohys.seia.io/series/'
let mirrorURL = 'https://cryental.dev/services/anime/?search='
let nyaaURL = 'https://nyaa.si/user/ohys?f=0&c=0_0&q='

let timetableAPI = 'api/listAPI.php'
let ohysAPI = 'https://ohys-api.gokoro.me'
let ohysAPISearch = '/search'
let ohysAPISeries = '/series'

const animeTemplate = document.querySelector('.template>a.item')

window.onload = function() {
    requestAPI()

    let dayButtonSun = document.querySelector('.c-day#Sunday')
    let dayButtonMon = document.querySelector('.c-day#Monday')
    let dayButtonTue = document.querySelector('.c-day#Tuesday')
    let dayButtonWed = document.querySelector('.c-day#Wednesday')
    let dayButtonThu = document.querySelector('.c-day#Thursday')
    let dayButtonFri = document.querySelector('.c-day#Friday')
    let dayButtonSat = document.querySelector('.c-day#Saturday')

    dayButtonSun.addEventListener('click', dayClicked)
    dayButtonMon.addEventListener('click', dayClicked)
    dayButtonTue.addEventListener('click', dayClicked)
    dayButtonWed.addEventListener('click', dayClicked)
    dayButtonThu.addEventListener('click', dayClicked)
    dayButtonFri.addEventListener('click', dayClicked)
    dayButtonSat.addEventListener('click', dayClicked)


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
var a = 'Sunday'
function requestAPI() {
    $.ajax({
        url: timetableAPI,
        type: "GET",
        dataType: "json",
        async: true,
    }).done(function(data) {
        animeJSON = data.database
        for (let i = 0; i < animeJSON[dayStatus].length; i++) {
            let form = new FormData()
            form.append('scope', 'series')
            form.append('keyword', animeJSON[dayStatus][i].title)
            $.ajax({
                url: ohysAPI+ohysAPISearch,
                type: "post",
                data: form,
                dataType: "json",
                async: false,
                processData: false,
                contentType: false,
                crossDomain : true,
            }).done(function(data) {
                animeJSON[dayStatus][i].episode = data[0].episode
            })
        }
        animeList.create(dayStatus, currentCountry)
        document.querySelector('.plzwait').remove()
        for (let dayProperty in animeJSON) {
            for (let i = 0; i < animeJSON[dayProperty].length; i++) {
                let form = new FormData()
                form.append('scope', 'series')
                form.append('keyword', animeJSON[dayProperty][i].title)
                $.ajax({
                    url: ohysAPI+ohysAPISearch,
                    type: "post",
                    data: form,
                    dataType: "json",
                    async: true,
                    processData: false,
                    contentType: false,
                    crossDomain : true,
                }).done(function(data) {
                    if (dayProperty !== 'Non-Specify') {
                        animeJSON[dayProperty][i].episode = data[0].episode
                    } else {
                        animeJSON[dayProperty][i].episode = '0'
                    }
                })
            }
        }    
    })
}
let dropdown = {
    active() {
        $('.ui.selection.dropdown').dropdown()
        if (currentCountry == 'en') {
            document.querySelector('#lang .text').innerText = 'English'
        } else if (currentCountry == 'ko') {
            document.querySelector('#lang .text').innerText = '한국어'
        } else {
            document.querySelector('#lang .text').innerText = 'English (Romaji)'
        }
    },
    change() {
        const dropdownValueLang = $('input[name=lang]').val()
            if (dropdownValueLang == 0) {
                currentCountry = 'en'
                animeList.resetList(dayStatus, currentCountry)
            }
            if (dropdownValueLang == 1) {
                currentCountry = 'rom'
                animeList.resetList(dayStatus, currentCountry)
            }
            if (dropdownValueLang == 2) {
                currentCountry = 'ko'
                animeList.resetList(dayStatus, currentCountry)
            }
    }
}
let animeList = {
    create(day, lang) {
        const animeLinksWrapper = document.querySelector('.c-animes')
        for (let i = 0; i < animeJSON[day].length; i++) {
            animeLinksWrapper.appendChild(document.querySelector('.template>a.item').cloneNode(true))
            if (lang == 'en') {
                document.querySelector('.c-animes a.item:last-child div.title').innerHTML = animeJSON[day][i].eng_title
            } else if (lang == 'ko') {
                document.querySelector('.c-animes a.item:last-child div.title').innerHTML = animeJSON[day][i].kor_title
            } else {
                document.querySelector('.c-animes a.item:last-child div.title').innerHTML = animeJSON[day][i].title
            }
            document.querySelector('.c-animes a.item:last-child div.time').innerHTML = animeJSON[day][i].time
            document.querySelector('.c-animes a.item:last-child div.release').innerHTML = 'Ep. '+animeJSON[day][i].episode
            document.querySelector('.c-animes a.item:last-child').setAttribute('id', i)
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
    createTorrent(info) {
        console.log(info)
        const animeLinksWrapper = document.querySelector('.ui.modal .description .ui.list')
        document.querySelector('.modal img').setAttribute('src', info.info.series[0].coverImageURL)
        for (let i = 0; i < info.info.search.length; i++) {
            animeLinksWrapper.appendChild(document.querySelector('.template div.torrent').cloneNode(true))
            document.querySelector('.ui.modal .description .header').innerText = info.title
            document.querySelector('.ui.modal .torrent:last-child .title').innerText = `${info.title} - ${info.info.search[i].episode}`
            document.querySelector('.ui.modal .torrent:last-child .format').innerText = `${info.info.search[i].resolution} ${info.info.search[i].audioFormat} ${info.info.search[i].videoFormat} ${info.info.search[i].broadcaster}`
            document.querySelector('.ui.modal .torrent:last-child .title').setAttribute('href', info.info.search[i].link)
        }
        document.querySelector('.ui.modal a.button.fanmade').setAttribute('href', fanmadeURL+info.torrentTitle)
        document.querySelector('.ui.modal a.button.mirror').setAttribute('href', mirrorURL+info.torrentTitle)
        document.querySelector('.ui.modal a.button.nyaa').setAttribute('href', nyaaURL+info.torrentTitle)
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
function clickedItem(id) {
    document.querySelector('.ui.modal .description .ui.list').innerHTML = null
    let clickedTitle = document.getElementById(id.getAttribute('id')).getAttribute('id')
    let animeInfo = {
        info: {}
    }
    if (currentCountry == 'ko') {
        animeInfo.title = animeJSON[dayStatus][clickedTitle].kor_title
    } else if (currentCountry == 'en') {
        animeInfo.title = animeJSON[dayStatus][clickedTitle].eng_title
    } else {
        animeInfo.title = animeJSON[dayStatus][clickedTitle].title
    }
    animeInfo.torrentTitle = animeJSON[dayStatus][clickedTitle].title
    $('.ui.modal').modal('show')

    let seriesForm = new FormData()
    seriesForm.append('series', animeJSON[dayStatus][clickedTitle].title)
    $.ajax({
        url: ohysAPI+ohysAPISeries,
        type: "post",
        data: seriesForm,
        dataType: "json",
        async: false,
        processData: false,
        contentType: false,
        crossDomain : true,
    }).done(function(data) {
        animeInfo.info.series = data
    })
    let searchForm = new FormData()
    searchForm.append('scope', 'series')
    searchForm.append('keyword', animeJSON[dayStatus][clickedTitle].title)
    $.ajax({
        url: ohysAPI+ohysAPISearch,
        type: "post",
        data: searchForm,
        dataType: "json",
        async: false,
        processData: false,
        contentType: false,
        crossDomain : true,
    }).done(function(data) {
        animeInfo.info.search = data
        animeList.createTorrent(animeInfo)
    })
}