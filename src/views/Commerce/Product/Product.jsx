import { fetchProducts, fetchProduct } from "services/dummy-json/product"
import { useEffect, useState, useCallback } from "react"
import LoadingOverlay from "components/Widget/LoadingOverlay"
import SkeletonImage from "components/Widget/SkeletonImage"
import ProductList from "./components/ProductList"
import ModalProduct from "./components/ModalProduct"

const Product = () => {
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState([])
  const [isLoading, setIsLoading] = useState([])
  const [isLoadingDetail, setIsLoadingDetail] = useState(false)
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

  // modal detail
  const [modal, setModal] = useState(false)
  const toggleModal = useCallback(() => {
    setModal(!modal)
  }, [modal])
  const toggleDetail = useCallback(
    async (ID) => {
      setIsLoadingDetail(true)

      setTimeout(async () => {
        await fetchProduct(ID).then((res) => {
          if (res.status === 200) {
            const { data } = res
            setProduct(data)
          }
        })
        setIsLoadingDetail(false)

        setModal(!modal)
      }, 250)
    },
    [modal]
  )

  useEffect(() => {
    const handleFetchProduct = async () => {
      setIsLoading(true)
      const bodyParams = {
        limit: params.limit,
        skip: params.skip,
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
      {isLoadingDetail && <LoadingOverlay isLoading={isLoadingDetail} />}
      {!isLoadingDetail && (
        <ModalProduct
          isOpen={modal}
          product={product}
          toggleOpen={toggleModal}
        />
      )}
      {!isLoading && products.length > 0 ? (
        <ProductList
          products={products}
          onChangePagination={onChangePagination}
          params={params}
          onShowDetail={toggleDetail}
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
