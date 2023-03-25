import { Card, CardBody, Text, Image, Tag } from "@chakra-ui/react"
import Pagination from "utils/Pagination"

const ProductList = ({ products,  onChangePagination, params }) => {
  console.log(params)
  return (
    <>
      <div>
        <div className="grid-12 tw-gap-4">
          {products.map((product, key) => (
            <div className="tw-col-span-3" key={key}>
              <Card
                variant="outline"
                backgroundColor={"gray.100"}
                color={"white"}
                className="tw-cursor-pointer"
              >
                <CardBody p={3}>
                  <div>
                    <Image
                      src={product.thumbnail}
                      alt="Green double couch with wooden legs"
                      borderRadius="md"
                      objectFit="cover"
                      fallbackSrc="https://via.placeholder.com/150"
                      width={"full"}
                      height={200}
                    />
                  </div>
                  <div className="tw-mt-2">
                    <Text fontSize="xl" as={"b"} color={"black"}>
                      {product.title}
                    </Text>
                    <div className="fc tw-gap-3 tw-mb-2.5">
                      <Text
                        fontSize="base"
                        as={"div"}
                        color={"red.500"}
                        fontWeight={"medium"}
                      >
                        $ {product.price}
                      </Text>
                      <Text
                        fontSize="base"
                        as={"div"}
                        color={"orange.400"}
                        fontWeight={"medium"}
                      >
                        Rating: {product.rating}
                      </Text>
                    </div>
                    <div className="fc tw-gap-3 tw-text-black">
                      <Tag
                        variant="solid"
                        colorScheme="blue"
                        borderRadius={"sm"}
                        className="capital"
                      >
                        {product.brand}
                      </Tag>

                      <Tag
                        variant="solid"
                        colorScheme="teal"
                        borderRadius={"sm"}
                        className="capital"
                      >
                        {product.category}
                      </Tag>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
        <br />
        <div className="tw-text-center">
          <Pagination
            className="pagination-bar"
            currentPage={params.page}
            totalCount={params.count}
            pageSize={params.limit}
            onPageChange={(page) => onChangePagination(page)}
          />
        </div>
      </div>
    </>
  )
}

export default ProductList
