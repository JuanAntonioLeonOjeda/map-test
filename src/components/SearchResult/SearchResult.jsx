import PropTypes from 'prop-types'
import { useContext } from 'react'

import searchContext from '../../context/searchContext'

import './SearchResult.css'

export default function SearchResult ({data}) {
  const { setSearchQuery } = useContext(searchContext)

  const handleClick = () => {
    setSearchQuery(data.properties)
  }

  return (
    <li className='search-item' onClick={ handleClick }>
      <h3>
        { data.properties.formatted }
      </h3>
    </li>
  )
}

SearchResult.propTypes = {
  data: PropTypes.object
}