import './App.css'
import { useEffect, useState, useRef } from 'react'
import { useMovies } from './hooks/moviesHooks'

function userSearch() {
  const [search, setSearch] = useState('');
  const [error, setError] = useState();
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current){
      isFirstInput.current = search == ''
      return
    }
    if (search == '') {
      setError('Insert a movie title')
      return
    }
    setError(null)
  }, [search])

  return { search, setSearch, error }
}

function App() {
  const { search, setSearch, error} = userSearch();
  const { movies, getMovies } = useMovies({ search })

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies()
    console.log({ search })
  }

  const handleChange = (event) => {
    setSearch(event.target.value)
  }


  return (
    <>
      {/* -Necesita mostrar un input para buscar la película y un botón para buscar. */}
      <header>
        <h1>Movie challenge</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} name="search" placeholder="The godfather, Reservoir dogs..." type="text" />
          <button type="submit">Search</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
      <main>
      <ul className='movies'>
      {
        movies.map((movie) => (
          <li className='movie' key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <img src={movie.image} alt={movie.title} />
          </li>
        ))
      }
    </ul>
      </main>
    </>
  )
}

export default App
