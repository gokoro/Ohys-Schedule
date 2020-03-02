// Setup URLs for search & AnimeJSONList (/releaseJSON)
let nyaaURL = 'https://nyaa.si/user/ohys?f=0&c=0_0&q='
let seiaURL = 'https://ohys.seia.io/series/'
let mirrorURL = 'https://cryental.dev/services/anime/?search='
let dayStatus = ''
let animeJSON = ''
let currentCountry = ''

// Setup baseURL
let baseURL = seiaURL

window.onload = function() {
    requestAPI()

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
function requestAPI() {
    $.ajax({
        url: "api/listAPI.php",
        type: "GET",
        dataType: "json",
        async: true
    }).done(function(data) {
        animeJSON = Object.entries(data.database)
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
    animeLinkTemplete: document.querySelector('.templete>.item'),
    create(day, lang) {
        let dayNumber = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Non-Specify']
        const animeLinksWrapper = document.querySelector('.c-animes')
        const animeJSONList = animeJSON[dayNumber.indexOf(day)][1]

        for (let i = 0; i < animeJSONList.length; i++) {
            animeLinksWrapper.appendChild(this.animeLinkTemplete.cloneNode(true))
            if (lang == 'en') {
                document.querySelector('.c-animes a.item:last-child div.title').innerHTML = animeJSONList[i]['eng_title']
            } else if (lang == 'ko') {
                document.querySelector('.c-animes a.item:last-child div.title').innerHTML = animeJSONList[i]['kor_title']
            } else {
                document.querySelector('.c-animes a.item:last-child div.title').innerHTML = animeJSONList[i]['title']
            }
            if (baseURL == seiaURL) {
                document.querySelector('.c-animes a.item:last-child div.link').innerHTML = 'Ohys Fanmade'
            } else if (baseURL == mirrorURL) {
                document.querySelector('.c-animes a.item:last-child div.link').innerHTML = 'Cryental Mirror'
            } else {
                document.querySelector('.c-animes a.item:last-child div.link').innerHTML = 'Nyaa.si'
            }
            document.querySelector('.c-animes a.item:last-child div.time').innerHTML = animeJSONList[i]['time']
            document.querySelector('.c-animes a.item:last-child').setAttribute('href', baseURL+animeJSONList[i]['title'])
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
    const clickedDayButton = document.querySelector('#'+clickedDay)
    const activedDayButton = document.querySelector('.c-day.active')
    dayStatus = clickedDay

    animeList.resetList(dayStatus, currentCountry)
    activedDayButton.classList.remove('active')
    clickedDayButton.classList.add('active')
}
