import ModalDialog from "components/Widget/ModalDialog"
import { Image, Text, Tag, Box, Button } from "@chakra-ui/react"

const ModalProduct = ({ isOpen, product, toggleOpen }) => {
  return (
    <>
      {isOpen && (
        <ModalDialog
          toggleShow={isOpen}
          triggerClose={toggleOpen}
          size="lg"
          maxHeight="700"
        >
          <slot name="header">Detail product</slot>
          <slot name="content">
            <div className="tw-relative tw-pb-16">
              <div>
                <Image
                  src={product.thumbnail}
                  alt="Green double couch with wooden legs"
                  borderRadius="md"
                  objectFit="cover"
                  fallbackSrc="https://via.placeholder.com/150"
                  width={"full"}
                  height={"auto"}
                />
              </div>
              <div className="tw-mt-2">
                <Text fontSize="xl" as={"b"} color={"black"}>
                  {product.title}
                </Text>
                <div className="fcb tw-mb-3">
                  <div className="fc tw-gap-4">
                    <div className="fc tw-gap-2">
                      <Text
                        fontSize="base"
                        as={"s"}
                        color={"gray.400"}
                        fontWeight={"medium"}
                      >
                        ${product.price}
                      </Text>
                      <Text
                        fontSize="base"
                        as={"div"}
                        color={"red.500"}
                        fontWeight={"medium"}
                      >
                        ${product.discountPercentage}
                      </Text>
                    </div>
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
                <p>{product.description}</p>
                <div>
                  <p className="medium tw-text-gray-600">Gambar lainnya :</p>
                  <div className="grid-12 tw-gap-4">
                    {product.images.map((image, key) => (
                      <div className="tw-col-span-4" key={key}>
                        <Box
                          border={"1px"}
                          borderColor={"gray.200"}
                          borderRadius={"md"}
                          p={"2"}
                        >
                          <Image
                            src={image}
                            alt="Green double couch with wooden legs"
                            borderRadius="md"
                            objectFit="contain"
                            fallbackSrc="https://via.placeholder.com/150"
                            width={"full"}
                            height={100}
                          />
                        </Box>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="tw-absolute tw-z-10 tw-bottom-0 tw-left-0 tw-px-4 tw-py-3 tw-bg-white tw-w-full tw-border tw-border-gray-200">
              <div>
                <Button colorScheme={'whatsapp'} variant={'solid'} width={'full'}>
                  Add to Cart
                </Button>
              </div>
            </div>
          </slot>
        </ModalDialog>
      )}
    </>
  )
}

export default ModalProduct
