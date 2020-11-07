import useSWR from "swr"

const useSchedule = (day) => {
    const apiUrl = process.env.apiUrl

    const { data, error } = useSWR(`${apiUrl}/schedule?day=${day}`, fetcher, {
        revalidateOnFocus: false,
        revalidateOnMount:false,
        revalidateOnReconnect: false,
        refreshWhenOffline: false,
        refreshWhenHidden: false,
        refreshInterval: 0
    })
    
    return {
        data,
        isLoading: !error && !data,
        isError: error,
    }
}
const fetcher = (...url) => fetch(...url).then((res) => res.json())

export { useSchedule }
