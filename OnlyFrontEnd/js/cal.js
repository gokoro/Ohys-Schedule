const animeElementsTitles = document.querySelectorAll('.c-animes>a.item>div.title')
const animeLinks = document.querySelectorAll('.c-animes>a.item')
const animeLink = document.querySelector('.c-animes>a.item:last-child')
const animeLinksWrapper = document.querySelector('.c-animes')
const animeLinkTemplete = document.querySelector('.templete>.item')
const dayButton = document.querySelectorAll('.c-day')
const activedDayButton = document.querySelector('.c-day.active')

let nyaaLink = 'https://nyaa.si/user/ohys?f=0&c=0_0&q='
let jsonRequestURL = 'https://gist.githubusercontent.com/Gokoro/c9aca9a8c2a431ae8b60bbd57b201d54/raw/175b786044efcc84509637db9bfe631d3542a4a1/2020@1.json';
// let jsonRequestURL = 'https://ohys.gokoro.me/releaseJSON/2020@1.json';
let jsonRequest = new XMLHttpRequest()
let date = new Date()

let today = date.getDay()

let animeJSON = new Array()
let animeTitleList = new Array()

function initial() {
    let dayWord = new Array('sun', 'mon', 'tue', 'wed', 'thu','fri', 'sat')
    jsonRequest.open('GET', jsonRequestURL)
    jsonRequest.responseType = 'json'
    jsonRequest.send(null)
    jsonRequest.onload = function() {
        animeJSON = jsonRequest.response;
    }
    dayButton[today].setAttribute('class', 'c-day active')
        window.onload = (function() {
            setTimeout(function() {
                if (animeJSON['sun'].length > 0) {
                    animeList.create(dayWord[today])
                } else {
                    setTimeout(function() {
                        animeList.create(dayWord[today])    
                    }, 100);
                }
            }, 100); 
        })
    
}
let animeList = {
    create(day) {
        let dayUpper = day.charAt(0).toUpperCase()
        let dayOther = day.slice(1)
        for (var i = 0; i < animeJSON[day].length; i++) {
            animeLinksWrapper.appendChild(animeLinkTemplete.cloneNode(true))
            document.querySelector('.c-animes>a.item:last-child>div.title').innerHTML = animeJSON[day][i]['title']
            document.querySelector('.c-animes>a.item:last-child>div.time').innerHTML = dayUpper+dayOther+' '+animeJSON[day][i]['time']
            document.querySelector('.c-animes>a.item:last-child').setAttribute('href', nyaaLink+animeJSON[day][i]['title'])
        }
    },
    remove() {
        let animeListLength = document.querySelectorAll('a.item').length
        for (var i = 0; i < animeListLength; i++) {
            document.querySelector('a.item').remove()
        }
    }
}
function dayClicked(clickedDay) {
    const clickedDayButton = document.querySelector('#'+clickedDay)
    animeList.remove()
    animeList.create(clickedDay)
    document.querySelector('.c-day.active').setAttribute('class', 'c-day')
    clickedDayButton.setAttribute('class', 'c-day active')
}
initial()