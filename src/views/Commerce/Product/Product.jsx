import { fetchProducts } from "services/dummy-json/product"
import { useEffect, useState } from "react"
import SkeletonImage from "components/Widget/SkeletonImage"
import ProductList from "./components/ProductList"

const Product = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState([])
  const [params, setparams] = useState({
    page: 1,
    skip: 0,
    count: 0,
    limit: 12,
  })

  const onChangePagination = (props) => {
    setparams((state) => ({
      ...state,
      skip: (props - 1) * state.limit,
      page: props,
    }))
  }

  useEffect(() => {
    const handleFetchProduct = async () => {
      setIsLoading(true)
      const bodyParams = {
        limit: params.limit,
        skip: params.skip
      }
      await fetchProducts(bodyParams).then((res) => {
        if (res.status === 200) {
          const { data } = res
          setProducts(data.products)

          setparams((state) => ({
            ...state,
            count: data.total,
          }))

          setIsLoading(false)
        } else {
          setIsLoading(false)
        }
      })
    }

    handleFetchProduct()
  }, [params.skip, params.limit])

  return (
    <>
      {!isLoading && products.length > 0 ? (
        <ProductList
          products={products}
          onChangePagination={onChangePagination}
          params={params}
        />
      ) : !isLoading && products.length === 0 ? (
        <div>Tidak ada data</div>
      ) : (
        <div>
          <div className="grid-12 tw-gap-4">
            {[...Array(8)].map((x, i) => (
              <div key={i} className="tw-col-span-3">
                <SkeletonImage />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Product
