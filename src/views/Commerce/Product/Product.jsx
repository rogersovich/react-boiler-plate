import {
  fetchProducts,
  fetchProduct,
  searchProducts,
} from "services/dummy-json/product"
import { createCartUser } from "services/dummy-json/cart"
import { useEffect, useState, useCallback } from "react"
import { useToast, Input } from "@chakra-ui/react"
import LoadingOverlay from "components/Widget/LoadingOverlay"
import SkeletonImage from "components/Widget/SkeletonImage"
import ProductList from "./components/ProductList"
import ModalProduct from "./components/ModalProduct"

const Product = () => {
  const toast = useToast()

  const [products, setProducts] = useState([])
  const [product, setProduct] = useState([])
  const [productSearch, setProductSearch] = useState("")
  const [querySearch, setQuerySearch] = useState("")
  const [isSearch, setIsSearch] = useState("")
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
      await fetchProduct(ID).then((res) => {
        if (res.status === 200) {
          const { data } = res
          setProduct(data)
        }
      })
      setIsLoadingDetail(false)

      setModal(!modal)
    },
    [modal]
  )

  const onAddCart = async (body) => {
    toggleModal()
    const createBody = {
      userId: 1,
      products: body,
    }
    setIsLoadingDetail(true)
    await createCartUser(createBody).then((res) => {
      if (res.status === 200) {
        toast({
          title: "Berhasil Menambakan Item Keranjang",
          status: "success",
          position: "top",
          duration: 3000,
          isClosable: true,
        })
      } else {
        toast({
          title: "Gagal Menambakan Item Keranjang",
          status: "errorr",
          position: "top",
          duration: 3000,
          isClosable: true,
        })
      }
      setIsLoadingDetail(false)
    })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setProductSearch(e.target.value)
    setTimeout(() => {
      setQuerySearch(e.target.value)
    }, 1500)
  }

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

    const handleSearch = async () => {
      setIsLoading(true)
      const bodyParams = {
        q: querySearch,
      }
      await searchProducts(bodyParams).then((res) => {
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

    if (querySearch !== "") {
      setIsSearch(true)
      setparams((state) => ({
        ...state,
        skip: 0,
        page: 1,
      }))
      handleSearch()
    } else {
      setIsSearch(false)
      handleFetchProduct()
    }
  }, [params.skip, params.limit, querySearch])

  return (
    <>
      {isLoadingDetail && <LoadingOverlay isLoading={isLoadingDetail} />}
      {!isLoadingDetail && (
        <ModalProduct
          isOpen={modal}
          product={product}
          toggleOpen={toggleModal}
          onAddCart={onAddCart}
        />
      )}
      {!isLoading && products.length > 0 ? (
        <div>
          <div>
            <Input
              placeholder="Search By Name"
              onChange={handleSearch}
              value={productSearch}
            />
          </div>
          <br />
          <ProductList
            products={products}
            onChangePagination={onChangePagination}
            params={params}
            onShowDetail={toggleDetail}
            isSearch={isSearch}
          />
        </div>
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
