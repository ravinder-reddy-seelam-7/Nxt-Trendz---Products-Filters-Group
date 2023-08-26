import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: false,
    activeOptionId: sortbyOptions[0].optionId,
    titleSearch: '',
    category: '',
    rating: '',
    noProductsState: false,
    failureView: false,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      isLoading: true,
      failureView: false,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {activeOptionId, rating, category, titleSearch} = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${category}&title_search=${titleSearch}&rating=${rating}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      if (updatedData.length === 0) {
        this.setState({isLoading: false, noProductsState: true})
      } else {
        this.setState({
          noProductsState: false,
          productsList: updatedData,
          isLoading: false,
        })
      }
    } else {
      this.setState({
        failureView: true,
        isLoading: false,
        noProductsState: false,
      })
    }
  }

  changeRating = ratingId => {
    this.setState({rating: ratingId}, this.getProducts)
  }

  changeCategory = categoryId => {
    this.setState({category: categoryId}, this.getProducts)
  }

  searchProducts = value => {
    this.setState({titleSearch: value}, this.getProducts)
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  clearFilters = () => {
    this.setState(
      {
        rating: '',
        category: '',
        titleSearch: '',
      },
      this.getProducts,
    )
  }

  renderProductsList = () => {
    const {
      productsList,
      activeOptionId,
      noProductsState,
      failureView,
    } = this.state

    if (failureView) {
      return this.showFailureView()
    }

    // TODO: Add No Products View
    if (noProductsState) {
      return (
        <div className="no-products-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
            alt="no products"
            className="no-products"
          />
          <h1 className="no-products-heading">No Products Found</h1>
          <p className="no-products-text">
            We could not find any products. Try other filters.
          </p>
        </div>
      )
    }

    return (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // TODO: Add failure view
  showFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
        className="failure-view-image"
      />
      <h1 className="failure-products-heading">Oops! Something Went Wrong</h1>
      <p className="failure-products-text">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  render() {
    const {isLoading} = this.state

    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}
        <FiltersGroup
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          changeRating={this.changeRating}
          changeCategory={this.changeCategory}
          searchProducts={this.searchProducts}
          clearFilters={this.clearFilters}
        />

        {isLoading ? this.renderLoader() : this.renderProductsList()}
      </div>
    )
  }
}

export default AllProductsSection
