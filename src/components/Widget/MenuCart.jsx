import {
  Box,
  Button,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Text,
  Card,
  CardBody,
  Image,
  InputGroup,
  Input,
  InputRightElement,
  InputLeftElement,
  useToast,
} from "@chakra-ui/react"
import { TbShoppingCart, TbPlus, TbMinus, TbX } from "react-icons/tb"
import { useState, useCallback, useEffect } from "react"
import { updateCartUser, deleteCartUser } from "services/dummy-json/cart"
import ModalAlert from "components/Widget/ModalAlert"
import LoadingOverlay from "components/Widget/LoadingOverlay"

const MenuCart = ({ totalCart, carts, cart_id, isLoading }) => {
  const [alertDelete, setAlertDelete] = useState(false)

  const toggleAlert = useCallback(() => {
    setAlertDelete(!alertDelete)
  }, [alertDelete])

  const BadgeNumber = (props) => (
    <Box
      bg={"red.500"}
      color={"white"}
      h={"23px"}
      w={"23px"}
      borderRadius={"full"}
      fontSize={"11px"}
      className="fcc tw-absolute tw-z-10 tw--top-2 tw--right-2"
      px={props.px}
    >
      {props.number}
    </Box>
  )

  const toast = useToast()

  const [inputs, setInputs] = useState([])
  const [inputFilled, setInputFilled] = useState(false)
  const [isLoadingEdit, setIsLoadingEdit] = useState(false)

  const plusCart = async (index, val) => {
    const newInput = parseInt(val) + 1

    const bodyUpdate = {
      cart_id: 1,
      data: {
        merge: true,
        products: [
          {
            id: cart_id,
            quantity: newInput,
          },
        ],
      },
    }
    await onUpdateCart(bodyUpdate)

    setInputs((state) => ({
      ...state,
      [index]: { ...state, quantity: newInput },
    }))
  }
  const minusCart = async (index, val) => {
    const newInput = parseInt(val) - 1

    const bodyUpdate = {
      cart_id: 1,
      data: {
        merge: true,
        products: [
          {
            id: cart_id,
            quantity: newInput,
          },
        ],
      },
    }
    await onUpdateCart(bodyUpdate)

    if (newInput >= 1) {
      setInputs((state) => ({
        ...state,
        [index]: { ...state, quantity: newInput },
      }))
    }
  }
  const changeInputCart = (index, event) => {
    const { value } = event.target

    setInputs((state) => ({
      ...state,
      [index]: { ...state, quantity: parseInt(value) },
    }))

    // const bodyUpdate = {
    //   cart_id: 1,
    //   data: {
    //     merge: true,
    //     products: [
    //       {
    //         id: cart_id,
    //         quantity: parseInt(value),
    //       },
    //     ],
    //   },
    // }
  }

  const onUpdateCart = async (body) => {
    setIsLoadingEdit(true)
    await updateCartUser(body).then((res) => {
      if (res.status === 200) {
        toast({
          title: "Berhasil Update Keranjang",
          status: "success",
          position: "top",
          duration: 3000,
          isClosable: true,
        })
      } else {
        toast({
          title: "Gagal Update Keranjang",
          status: "errorr",
          position: "top",
          duration: 3000,
          isClosable: true,
        })
      }

      setIsLoadingEdit(false)
    })
  }

  const handleDelete = async (cartId) => {
    toggleAlert()
    setIsLoadingEdit(true)
    await deleteCartUser(cartId).then((res) => {
      if (res.status === 200) {
        toast({
          title: "Berhasil Delete Item Keranjang",
          status: "success",
          position: "top",
          duration: 3000,
          isClosable: true,
        })
      } else {
        toast({
          title: "Gagal Delete Item Keranjang",
          status: "errorr",
          position: "top",
          duration: 3000,
          isClosable: true,
        })
      }
      setIsLoadingEdit(false)
    })
  }

  useEffect(() => {
    if (!isLoading && carts.length > 0) {
      setInputFilled(false)
      for (const [keyCart, cart] of carts.entries()) {
        setInputs((state) => ({
          ...state,
          [keyCart]: {
            id: cart.id,
            quantity: cart.quantity,
          },
        }))
      }
      setInputFilled(true)
    }
  }, [carts, isLoading])

  return (
    <>
      {isLoadingEdit && <LoadingOverlay isLoading={isLoadingEdit} />}
      <Popover offset={[-200, 0]}>
        <PopoverTrigger>
          <div className="tw-relative">
            <IconButton
              aria-label="Cart Icon"
              icon={<TbShoppingCart size={"22px"} />}
            />
            <BadgeNumber
              number={`${totalCart > 99 ? "99+" : totalCart}`}
              px={`${totalCart > 99 ? "4" : "2"}`}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent color="black" boxShadow={"md"} width={"450px"}>
          <PopoverArrow />

          <PopoverBody>
            <Text fontSize={"lg"} fontWeight={"bold"}>
              List My Cart
            </Text>
            {!isLoading && carts.length > 0 ? (
              <div>
                <div className="grid-1 tw-gap-4 tw-h-[600px] tw-overflow-y-auto">
                  {carts.map((product, key) => (
                    <div key={key}>
                      <Card variant="outline" color={"black"}>
                        <CardBody p={3}>
                          <div className="grid-12 tw-gap-3">
                            <div className="tw-col-span-4">
                              <Image
                                src={"https://via.placeholder.com/120"}
                                alt="Green double couch with wooden legs"
                                borderRadius="md"
                                objectFit="cover"
                                fallbackSrc="https://via.placeholder.com/120"
                                width={"full"}
                                height={"120px"}
                              />
                            </div>
                            <div className="tw-col-span-6">
                              <div>
                                <div className="tw-mb-1">
                                  <Text
                                    as={"div"}
                                    fontWeight="bold"
                                    fontSize="base"
                                    className="capital"
                                  >
                                    {product.title}
                                  </Text>
                                </div>
                                <Text
                                  fontSize="sm"
                                  as={"div"}
                                  color={"red.500"}
                                >
                                  Price ${product.price}
                                </Text>
                                <Text fontSize="sm" as={"div"} color={"black"}>
                                  Total : ${product.discountedPrice}
                                </Text>

                                <div className="tw-mt-3">
                                  {inputFilled && (
                                    <InputGroup size="sm">
                                      <InputLeftElement>
                                        <IconButton
                                          colorScheme="blue"
                                          size={"sm"}
                                          onClick={() =>
                                            minusCart(key, inputs[key].quantity)
                                          }
                                          isDisabled={
                                            inputs[key].quantity === 1
                                          }
                                          icon={<TbMinus />}
                                        />
                                      </InputLeftElement>
                                      <Input
                                        placeholder="12"
                                        textAlign="center"
                                        value={inputs[key].quantity}
                                        onChange={(event) =>
                                          changeInputCart(key, event)
                                        }
                                      />

                                      <InputRightElement>
                                        <IconButton
                                          colorScheme="blue"
                                          size={"sm"}
                                          onClick={() =>
                                            plusCart(
                                              key,
                                              inputs[key].quantity,
                                              product.id
                                            )
                                          }
                                          icon={<TbPlus />}
                                        />
                                      </InputRightElement>
                                    </InputGroup>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="tw-col-span-2">
                              <div className="tw-text-center">
                                <IconButton
                                  onClick={toggleAlert}
                                  isRound
                                  variant={"ghost"}
                                  colorScheme={"red"}
                                  fontSize={25}
                                  icon={<TbX />}
                                />
                              </div>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                  ))}
                </div>

                <div className="tw-pt-3">
                  <Button colorScheme={"blue"} width={"full"}>
                    Checkout
                  </Button>
                </div>
              </div>
            ) : !isLoading && carts.length === 0 ? (
              <div>Keranjang kosong</div>
            ) : (
              <div>Loading....</div>
            )}

            <ModalAlert toggleShow={alertDelete} triggerClose={toggleAlert}>
              <slot name="header">
                <div>Delete Cart</div>
              </slot>

              <slot name="content">
                <div>Do you want to delete this cart item ?</div>
              </slot>

              <slot name="footer">
                <div>
                  <Button onClick={toggleAlert}>No</Button>
                  <Button colorScheme="red" ml={3} onClick={() => handleDelete(cart_id)}>
                    Yes
                  </Button>
                </div>
              </slot>
            </ModalAlert>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default MenuCart
