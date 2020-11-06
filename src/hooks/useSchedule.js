import useSWR from "swr"

const useSchedule = (day) => {
    const apiUrl = process.env.apiUrl

    const { data, error } = useSWR([`${apiUrl}/schedule`, day], (url, day) => fetcher({ url, day }))
    
    return {
        data,
        isLoading: !error && !data,
        isError: error,
    }
}
const fetcher = (args) => fetch(args.url + '?day=' + args.day).then((res) => res.json())

export { useSchedule }
