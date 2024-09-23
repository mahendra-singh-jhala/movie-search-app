const Favourite = ({ favourite, removeFromFavourite }) => {
    return (
        <>
            <div className="text-center text-white">
                {favourite.length === 0 ? (
                    <p className="text-xl uppercase">No movies in favourite</p>
                ) : (
                    <div className="flex flex-wrap gap-10">
                        {favourite.map(movie => (
                            <div className="mb-8 w-80 text-center transform transition duration-500 hover:scale-90 rounded-md overflow-hidden" key={movie.imdbID}>
                                <img src={movie.Poster} alt={movie.Title} className="w-full h-96" />
                                <div className="bg-slate-500 py-4">
                                    <h1 className="text-2xl">{movie.Title}</h1>
                                    <h3 className="text-2xl">{movie.Year}</h3>
                                    <p className="text-xl">{movie.Type}</p>
                                    <button onClick={() => removeFromFavourite(movie.imdbID)} className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-4 mt-4"> Remove </button>
                                </div>
                            </div>
                        ))}

                    </div>
                )}
            </div>
        </>
    )
}

export default Favourite