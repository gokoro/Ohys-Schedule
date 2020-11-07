import useSWR, { cache } from "swr"

const useSchedule = (day, configs = {}) => {
    const apiUrl = process.env.apiUrl

    const baseUrl = `${apiUrl}/schedule?day=${day}`

    if (configs.initialData) {
        cache.set(baseUrl, configs.initialData)
    }

    const { data, error } = useSWR(baseUrl, fetcher, {
        ...configs,
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
