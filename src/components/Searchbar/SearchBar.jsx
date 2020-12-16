import React from 'react'
import "./SearchBar.css"

const SearchBar = (props) => {
    const { search, handleChange } = props

    return (
        <div className='searchbar'>
            <input
                value={search}
                name='search'
                type='text'
                className='search-input'
                onChange={handleChange}
                placeholder = 'Search your plant'
            />
        </div>
    )
}

export default SearchBar
