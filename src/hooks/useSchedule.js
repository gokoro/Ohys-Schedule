import useSWR, { cache } from "swr"

const useSchedule = (day, configs = {}, customConfigs = {}) => {
    const apiUrl = process.env.apiUrl
    const baseUrl = `${apiUrl}/schedule?day=${day}`

    let customed = {}

    if (configs.initialData) {
        cache.set(baseUrl, configs.initialData)
    }

    if (!customConfigs.enableRevalidate) {
        customed = {
            ...customed,
            revalidateOnFocus: false,
            revalidateOnMount:false,
            revalidateOnReconnect: false,
            refreshWhenOffline: false,
            refreshWhenHidden: false,
            refreshInterval: 0    
        }
    }

    const { data, error } = useSWR(baseUrl, fetcher, {
        ...configs,
        ...customed
    })
    
    return {
        data,
        isLoading: !error && !data,
        isError: error,
    }
}
const fetcher = (...url) => fetch(...url).then((res) => res.json())

export { useSchedule }
