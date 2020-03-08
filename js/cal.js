// Setup URLs for search & AnimeJSONList (/releaseJSON)
let nyaaURL = 'https://nyaa.si/user/ohys?f=0&c=0_0&q='
let seiaURL = 'https://ohys.seia.io/series/'
let mirrorURL = 'https://cryental.dev/services/anime/?search='
let dayStatus = ''
let animeJSON = ''
let currentCountry = ''

// Setup baseURL
let baseURL = seiaURL

// Setup API Location or URL
let timetableAPI = 'api/listAPI.php'

window.onload = function() {
    requestAPI()

    // Set Default Language
    let lang = String(navigator.language).toLowerCase()
    
    if (lang.includes('ko')) {
        currentCountry = 'ko'
    } else if (lang.includes('en')) {
        currentCountry = 'en'
    } else {
        currentCountry = lang
    }
    dropdown.active()

    // Set Default Day
    let date = moment()
    let today = date.tz('Asia/Tokyo').day()
    const dayWord = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const dayButton = document.querySelectorAll('.c-day')
    dayButton[today].classList.add('active')
    dayStatus = dayWord[today]
}
function requestAPI() {
    $.ajax({
        url: timetableAPI,
        type: "GET",
        dataType: "json",
        async: true
    }).done(function(data) {
        animeJSON = data.database
        animeList.create(dayStatus, currentCountry)
        document.querySelector('.plzwait').remove()
    });
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
    change(name) {
        if (name == 'search') {
            const dropdownValue = $('input[name=search]').val()
            if (dropdownValue == 0) {
                baseURL = seiaURL
                animeList.resetList(dayStatus, currentCountry)
            }
            if (dropdownValue == 1) {
                baseURL = mirrorURL
                animeList.resetList(dayStatus, currentCountry)
            }
            if (dropdownValue == 2) {
                baseURL = nyaaURL
                animeList.resetList(dayStatus, currentCountry)
            }
        }
        if (name == 'lang') {
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
}
let animeList = {
    template: document.querySelector('.templete>.item'),
    create(day, lang) {
        const animeLinksWrapper = document.querySelector('.c-animes')
        for (let i = 0; i < animeJSON[day].length; i++) {
            animeLinksWrapper.appendChild(this.template.cloneNode(true))
            if (lang == 'en') {
                document.querySelector('.c-animes a.item:last-child div.title').innerHTML = animeJSON[day][i]['eng_title']
            } else if (lang == 'ko') {
                document.querySelector('.c-animes a.item:last-child div.title').innerHTML = animeJSON[day][i]['kor_title']
            } else {
                document.querySelector('.c-animes a.item:last-child div.title').innerHTML = animeJSON[day][i]['title']
            }
            if (baseURL == seiaURL) {
                document.querySelector('.c-animes a.item:last-child div.link').innerHTML = 'Ohys Fanmade'
            } else if (baseURL == mirrorURL) {
                document.querySelector('.c-animes a.item:last-child div.link').innerHTML = 'Cryental Mirror'
            } else {
                document.querySelector('.c-animes a.item:last-child div.link').innerHTML = 'Nyaa.si'
            }
            document.querySelector('.c-animes a.item:last-child div.time').innerHTML = animeJSON[day][i]['time']
            document.querySelector('.c-animes a.item:last-child').setAttribute('href', baseURL+animeJSON[day][i]['title'])
        }
    },
    remove() {
        const animeListLength = document.querySelectorAll('a.item').length

        for (let i = 0; i < animeListLength; i++) {
            document.querySelector('a.item').remove()
        }
    },
    resetList(day, lang) {
        this.remove()
        this.create(day, lang)
    }
}
function dayClicked(clickedDay) {
    const clickedDayButton = document.getElementById(clickedDay)
    const activedDayButton = document.querySelector('.c-day.active')
    dayStatus = clickedDay

    animeList.resetList(dayStatus, currentCountry)
    activedDayButton.classList.remove('active')
    clickedDayButton.classList.add('active')
}