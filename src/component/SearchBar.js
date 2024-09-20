import { useState } from "react"

const SearchBar = ({onSearch}) => {

    const[searchTerm, setSearchTerm] = useState('');

    const handlSearch = (e) => {
        e.preventDefault();
        onSearch(searchTerm)
    }
    return (
        <form onSubmit={handlSearch}>
            <input 
                type="text"
                placeholder="Search your Movie...."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border outline-none rounded px-4 py-2 text-black w-60 md:w-96"
            />
            <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-md text-center text-xl px-4 py-2 ms-2"> Search </button>
        </form>
    )
}

export default SearchBar
