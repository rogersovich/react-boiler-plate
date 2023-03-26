import {
  Box,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from "@chakra-ui/react"
import { ChevronDownIcon } from "@chakra-ui/icons"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { unsetToken, unsetProfile, unsetError } from "store/auth"
import { useNavigate } from "react-router-dom"
import { fetchCartUser, updateCartUser } from "services/dummy-json/cart"
import MenuCart from "./MenuCart"


const Navbar = () => {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(unsetToken())
    dispatch(unsetProfile())
    dispatch(unsetError())

    navigate("/commerce/auth")
  }

  const [carts, setCarts] = useState([])
  const [cartId, setCartId] = useState([])
  const [totalCart, setTotalCart] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()

  const onUpdateCart = async (body) => {
    await updateCartUser(body).then((res) => {
      console.log(res.data)
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
    })
  }

  useEffect(() => {
    const handleFetchCart = async () => {
      setIsLoading(true)
      await fetchCartUser({ user_id: 5 }).then((res) => {
        if (res.status === 200) {
          const { data } = res
          const dataCart = data.carts[0]
          setCarts(dataCart.products)
          setCartId(dataCart.id)
          setTotalCart(dataCart.totalProducts)
        }

        setIsLoading(false)
      })
    }

    handleFetchCart()
  }, [])

  return (
    <div>
      <Box
        bg="white"
        w="100%"
        py={4}
        px={6}
        color="blackAlpha.800"
        className="grid-12 tw-gap-4 tw-shadow"
      >
        <div className="tw-col-span-2 fc">
          <Link to={"/"}>
            <div className="bold tw-text-xl">Tutorial React JS</div>
          </Link>
        </div>
        <div className="tw-col-span-8 fcc">
          <div>
            <HStack spacing="24px">
              <Link to={"form"}>
                <Button colorScheme="messenger" variant="ghost">
                  Form
                </Button>
              </Link>
              <Link to={"widget"}>
                <Button colorScheme="messenger" variant="ghost">
                  Widget
                </Button>
              </Link>
              <Link to={"kucing/2"}>
                <Button colorScheme="messenger" variant="ghost">
                  Params
                </Button>
              </Link>

              <div>
                <Menu>
                  <MenuButton
                    as={Button}
                    color="messenger.600"
                    variant="ghost"
                    rightIcon={<ChevronDownIcon />}
                  >
                    Apps
                  </MenuButton>
                  <MenuList>
                    <Link to={"rick-and-morty"}>
                      <MenuItem>Rick & Morty</MenuItem>
                    </Link>
                    <Link to={"commerce"}>
                      <MenuItem>E-Commerce</MenuItem>
                    </Link>
                  </MenuList>
                </Menu>
              </div>
            </HStack>
          </div>
        </div>
        <div className="tw-col-span-2">
          <div className="fcr tw-gap-3">
            <div>
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  I am
                </MenuButton>
                <MenuList>
                  <MenuItem>Profile</MenuItem>
                  {token && <MenuItem onClick={handleLogout}>Logout</MenuItem>}
                </MenuList>
              </Menu>
            </div>
            <MenuCart
              totalCart={totalCart}
              carts={carts}
              cart_id={cartId}
              isLoading={isLoading}
              onUpdateCart={onUpdateCart}
            />
          </div>
        </div>
      </Box>
    </div>
  )
}

export default Navbar
