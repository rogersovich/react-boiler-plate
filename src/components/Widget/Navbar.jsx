import {
  Box,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react"
import { ChevronDownIcon } from "@chakra-ui/icons"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { unsetToken, unsetProfile, unsetError } from "store/auth"
import { useNavigate } from "react-router-dom"

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
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Rogersovich
            </MenuButton>
            <MenuList>
              <MenuItem>Profile</MenuItem>
              {token && <MenuItem onClick={handleLogout}>Logout</MenuItem>}
            </MenuList>
          </Menu>
        </div>
      </Box>
    </div>
  )
}

export default Navbar
