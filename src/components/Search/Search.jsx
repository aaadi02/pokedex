import './Search.css';

function Search() {
    return (
        <div className="search-wrapper">
            <input
            className="search"
            type="text"
            placeholder="Pokemon Name...."
        />
        </div>
    )
}

export default Search;