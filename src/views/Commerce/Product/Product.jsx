import { fetchProducts } from "services/dummy-json/product"
import { useEffect } from "react"

const Product = () => {
  useEffect(() => {
    const handleFetchProduct = async () => {
      await fetchProducts().then((res) => {
        if (res.status === 200) {
          const { data } = res
          console.log(data)
        }
      })
    }

    handleFetchProduct()
  }, [])

  return (
    <>
      <div>Product</div>
    </>
  )
}

export default Product
