import { useState } from "react"


export function useMovies({ search }) {
    const [responseMovies, setResponseMovies] = useState([])

    const getMovies = () => {
        if (search) {
            fetch(`https://www.omdbapi.com/?apikey=6a4d1f59&s=${search}`)
            .then(res => res.json())
            .then(json => {
                setResponseMovies(json)
            })
        } else {
            ('nomovies')
        }
    }
    return { getMovies }
}
