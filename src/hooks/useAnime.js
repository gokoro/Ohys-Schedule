import useSWR, { cache } from "swr"

const useAnime = (id, configs = {}) => {
    const apiUrl = process.env.apiUrl
    const baseUrl = `${apiUrl}/anime?id=${id}`
    
    if (configs.initialData) {
        cache.set(baseUrl, configs.initialData)
    }

    const { data, error } = useSWR(baseUrl, fetcher, configs)
    
    return {
        data,
        isLoading: !error && !data,
        isError: error,
    }
}

const useAnimeName = (name, configs = {}) => {
    const apiUrl = process.env.apiUrl
    const baseUrl = `${apiUrl}/anime?name=${encodeURIComponent(name)}`
    
    if (configs.initialData) {
        cache.set(baseUrl, configs.initialData)
    }

    const { data, error } = useSWR(baseUrl, fetcher, configs)
    
    return {
        data,
        isLoading: !error && !data,
        isError: error,
    }
}
const fetcher = (...args) => fetch(...args).then((res) => res.json())

export {
    useAnime,
    useAnimeName
}
