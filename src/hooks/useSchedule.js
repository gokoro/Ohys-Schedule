import useSWR, { cache } from "swr"
import { api } from '../lib/api'
    
const useSchedule = (day, configs = {}, customConfigs = {}) => {
    const baseUrl = `/schedule`

    let customed = {}

    if (configs.initialData) {
        cache.set([baseUrl, day], configs.initialData)
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

    const { data, error } = useSWR([baseUrl, day], (url, day) => fetcher(url, { day }), {
        ...configs,
        ...customed
    })
    
    return {
        data,
        isLoading: !error && !data,
        isError: error,
    }
}
const fetcher = (url, params) => api.get(url, { params }).then(res => res.data)

export { useSchedule }
