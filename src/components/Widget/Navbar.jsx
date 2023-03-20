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
// import { useState } from "react"

const Navbar = () => {
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
                    <MenuItem>Random Cat</MenuItem>
                  </MenuList>
                </Menu>
              </div>
            </HStack>
          </div>
        </div>
        <div className="tw-col-span-2">
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Profile
            </MenuButton>
            <MenuList>
              <MenuItem>About Me</MenuItem>
              <MenuItem>Emerald</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
    </div>
  )
}

export default Navbar
