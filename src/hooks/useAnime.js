import useSWR from "swr"

const useAnime = (id) => {
    const apiUrl = process.env.apiUrl

    const { data, error } = useSWR([`${apiUrl}/anime`, id], (url, id) => fetcher({ url, id }))
    
    return {
        data,
        isLoading: !error && !data,
        isError: error,
    }
}
const fetcher = (args) => fetch(args.url + '?id=' + args.id).then((res) => res.json())

export { useAnime }
