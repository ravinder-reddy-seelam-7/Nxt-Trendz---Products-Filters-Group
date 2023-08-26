import {BsSearch} from 'react-icons/bs'
import './index.css'

let searchInput = ''
const Category = props => {
  const {eachItem, changeCategory} = props
  const {name, categoryId} = eachItem

  const clickingCategoryBtn = () => {
    changeCategory(categoryId)
  }

  return (
    <p className="category-button" onClick={clickingCategoryBtn}>
      {name}
    </p>
  )
}

const Rating = props => {
  const {eachItem, changeRating} = props
  const {ratingId, imageUrl} = eachItem

  const clickingRatingBtn = () => {
    changeRating(ratingId)
  }

  return (
    <button type="button" className="rating-button" onClick={clickingRatingBtn}>
      <img src={imageUrl} alt={`rating ${ratingId}`} className="rating-image" />
      <p className="rating-text"> & up</p>
    </button>
  )
}

const FiltersGroup = props => {
  const {
    categoryOptions,
    ratingsList,
    changeRating,
    changeCategory,
    searchProducts,
    clearFilters,
  } = props
  const changingSearch = event => {
    searchInput = event.target.value
  }
  const enterSearchInput = event => {
    if (event.key === 'Enter') {
      searchProducts(searchInput)
    }
  }
  const clickingClearFiltersBtn = () => {
    clearFilters()
  }
  return (
    <div className="filters-group-container">
      <div className="search-container">
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={changingSearch}
          onKeyDown={enterSearchInput}
        />
        <BsSearch className="search-icon" />
      </div>
      <div className="category-container">
        <h1 className="category-heading">Category</h1>
        {categoryOptions.map(eachItem => (
          <Category
            eachItem={eachItem}
            key={eachItem.categoryId}
            changeCategory={changeCategory}
          />
        ))}
      </div>
      <div className="category-container">
        <h1 className="category-heading">Rating</h1>
        {ratingsList.map(eachItem => (
          <Rating
            eachItem={eachItem}
            changeRating={changeRating}
            key={eachItem.ratingId}
          />
        ))}
      </div>
      <button
        type="button"
        className="clear-filters-button"
        onClick={clickingClearFiltersBtn}
      >
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
