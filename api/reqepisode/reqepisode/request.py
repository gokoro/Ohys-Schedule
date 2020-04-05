# import modules
import requests
import json
import time
import threading

def main():
    nowTime = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time()))
    # Set API urls
    timetableURL = 'your_timetable_api_url'
    searchURL = 'your_ohys-api_url'

    # It'll be main JSON file.
    timetableJSON = {'created_at':nowTime, 'Sunday': [], 'Monday':[], 'Tuesday':[], 'Wednesday':[], 'Thursday':[], 'Friday':[], 'Saturday':[] }

    # Request Timetable API
    timetableRes = requests.get(timetableURL)
    timetableGetJSON = json.loads(timetableRes.text)['database']

    # Loop!
    for dayProperty in timetableGetJSON:
        for item in timetableGetJSON[dayProperty]:
            # Set request form
            data = {
                'scope': 'series',
                'keyword': item['title']
            }
            # Request Search API
            originalRes = requests.post(searchURL, data).text
            response = json.loads(originalRes)

            # Get Episode Number
            try:
                epNum = {'title': item['title'], 'result': response[0]['episode']}
                pass
            except:
                epNum = {'title': item['title'], 'result': '0'}
                pass

            # Append to Main JSON Object
            timetableJSON[dayProperty].append(epNum)

    # Make the main JSON object as file
    with open('api/episode.json', 'w', encoding='utf-8') as make_file:
        json.dump(timetableJSON, make_file, indent="\t")

    print('Created JSON file! '+ nowTime)

    # Execute every 10minutes(600sec)
    threading.Timer(600,main).start()


main()