import './App.css'
import { useEffect, useState, useRef } from 'react'
import { useMovies } from './hooks/moviesHooks'
import { Movies } from './components/moviesComponent'

function userSearch() {
  const [search, setSearch] = useState('');
  const [error, setError] = useState();
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
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
  const { search, setSearch, error } = userSearch();
  const { movies, loading, getMovies } = useMovies({ search })

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies()
    console.log({ search })
  }

  const handleChange = (event) => {
    setSearch(event.target.value)
  }


  return (
    <div className="page">
      <header>
        <h1>Movie challenge</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            value={search} name="search"
            placeholder="The godfather, Reservoir dogs..."
            type="text" />
          <button type="submit">Search</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {
          loading ? <p>Cargando...</p> : <Movies movies={movies} />
        }

      </main>
    </div>
  )
}

export default App
