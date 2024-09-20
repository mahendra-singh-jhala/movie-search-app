import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MovieDetails } from "../api"


const MovieDetail = () => {

    const { id } = useParams();
    const [movie, setMovie] = useState(null); // store fetched moviedetaile
    const [error, setError] = useState(null); // handle error when fetched data

    // fetch the moviedetaile from API
    useEffect(() => {
        const MovieDetail = async () => {
            try {
                const data = await MovieDetails(id);
                setMovie(data)
            } catch (error) {
                setError('Failed to fetch movie details');
            }
        }
        MovieDetail()
    }, [id]);

    // condition if data loading
    if (!movie)
        return <h1 className='text-4xl font-bold text-center p-4 text-white'>Data is loading please wait.........................</h1>
    // condition if error
    if (error)
        return <h1 className='text-2xl font-bold text-red-700'>Error: {error}</h1>;


    return (
        <div className="text-white flex p-4">
            <img src={movie.Poster} alt={movie.Title} className="mr-8" />
            <div className="mt-4 ms-4">
                <h1 className="text-4xl">{movie.Title}</h1>
                <h3 className="text-2xl mt-4">Year : <span className="text-gray-300">{movie.Year}</span></h3>
                <p className="text-lg mt-4">Genre : <span className="text-gray-300">{movie.Genre}</span></p>
                <p className="text-lg mt-4">Plot : <span className="text-gray-300">{movie.Plot}</span></p>
                <p className="text-lg mt-4">Ratings : {movie.Ratings.map(rate => (
                    <span key={rate.Source} className="text-gray-300"> {rate.Source} : {rate.Value} , </span>
                ))}</p>
                <p className="text-lg mt-4">Cast : <span className="text-gray-300">{movie.Actors}</span></p>
            </div>
        </div>
    )
}

export default MovieDetail