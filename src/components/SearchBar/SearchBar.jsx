import { useState } from 'react'
import { search } from '../../services/geoapify'

import SearchResult from '../SearchResult/SearchResult'

import './SearchBar.css'

export default function SearchBar() {
  const [ searchResults, setSearchResults ] = useState([])


  const handleChange = (e) => {
    searchQuery(e.target.value)
  }

  const searchQuery = async (query) => {
    const result = await search(query)
    setSearchResults(result.features)
  }

  const displayResults = () => {
    return searchResults.map(result => {
      return (
        <SearchResult key={result.properties.place_id} data={ result } />
      )
    })
  }

  return (
    <>
      <input
        className="search-bar"
        placeholder="search address..."
        onChange={handleChange}
      />
      <ul className='result-list'>
        { displayResults() }
      </ul>
      {/* <GeoapifyContext apiKey="3aed3ab3be72482e8519c5b007bf5d46">
        <GeoapifyGeocoderAutocomplete
          placeSelect={onPlaceSelect}
          suggestionsChange={onSuggectionChange}
        />
      </GeoapifyContext> */}
    </>
  );
}