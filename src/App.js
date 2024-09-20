import './App.css';
import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import SearchBar from './component/SearchBar';
import FilterDropdown from './component/FilterDropdown';
import MovieList from './component/MovieList';
import MovieDetail from './component/MovieDetail';
import { SearchMovie } from "./api"


function App() {
    const [movies, setMovies] = useState([]); // store the movies fetched from the API
    const [error, setError] = useState(null); // error messages during API
    const [loading, setLoading] = useState(true) // if data is still being loaded
    const [filter, setFilter] = useState(''); // filter applied to the movie list
    const [currentPage, setCurrentPage] = useState(1); // current page of movies being displayed 
    const moviesPerPage = 8; // defines how many movies to display per page

    // using handleSearch function fetch movie data and update the movies state
    // usecallback handleSearch to avoid unnecessary re-renders
    const handleSearch = useCallback(async (searchTerm) => {
        try {
            const data = await SearchMovie(searchTerm, filter);
            setMovies(data.Search || []);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [filter]); // Add filter as a dependency if it affects search results

    // Load default movies by calling handleSearch
    useEffect(() => {
        const loadDefaultMovies = async () => {
            await handleSearch("movies");
        };

        loadDefaultMovies();
    }, [handleSearch]); // Added handleSearch to the dependency array

    // filter the movies 
    const handleFilterChange = (filter) => {
        setFilter(filter);
    }

    // update the current page state 
    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    // Calculate the current movies to display
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie); // repersent what movies should be shown on the current page

    // display total page
    const totalPages = Math.ceil(movies.length / moviesPerPage);

    // contain all page numbers for the pagination button
    const paginationNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        paginationNumbers.push(i);
    }

    // condition if data loading
    if (loading)
        return <h1 className='text-4xl text-white font-bold text-center p-4'>Data is loading please wait.........................</h1>

    // condition if error
    if (error)
        return <h1 className='text-2xl font-bold text-red-700'>Error: {error}</h1>;

    return (
        <Router>
            <header className="sticky top-0 bg-gray-400 text-white items-center flex flex-wrap gap-5 justify-between p-5 mb-10 z-50">
                <h1 className="text-4xl font-extrabold">Movies</h1>
                <div className="flex flex-wrap gap-5 justify-between">
                    <SearchBar onSearch={handleSearch} />
                    <FilterDropdown onFilterChange={handleFilterChange} />
                </div>
            </header>

            <main>
                <div className="mx-10">
                    <Routes>
                        <Route path='/' element={
                            <>
                                <MovieList movies={currentMovies} />

                                {/* pagination  */}
                                <div className='flex justify-center'>
                                    {paginationNumbers.map((pageNumber) => (
                                        <button
                                            key={pageNumber}
                                            onClick={() => handlePagination(pageNumber)}
                                            className={`py-2 px-3 rounded my-4 mx-2 ${currentPage === pageNumber ? 'bg-blue-500' : 'bg-gray-500'}`}
                                        >
                                            {pageNumber}
                                        </button>
                                    ))}
                                </div>
                            </>

                        } />
                        <Route path='/movie/:id' element={<MovieDetail />} />
                    </Routes>
                </div>
            </main>
        </Router>
    );
}

export default App;
