import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Image,
  Text,
  Box,
  Badge,
} from "@chakra-ui/react"

import { useEffect, useState, useCallback } from "react"
import {
  getCharaters,
  getCharater,
  getLocations,
} from "services/rick-morty/general"
import TabCharacter from "./TabCharacter"
import TabLocation from "./TabLocation"
import ModalDialog from "components/Widget/ModalDialog"

const RickAndMorty = () => {
  const [isLoading, setIsLoading] = useState(false)

  const [characters, setCharacters] = useState([])
  const [character, setCharacter] = useState(null)
  const [characterParams, setCharacterParams] = useState({
    page: 1,
    count: 0,
    lastPage: 0,
    showPage: 5,
    isNext: null,
    isPrev: null,
  })

  const [locations, setLocations] = useState([])
  const [locationParams, setLocationParams] = useState({
    page: 1,
    count: 0,
    lastPage: 0,
    showPage: 5,
    isNext: null,
    isPrev: null,
  })

  const onChangePagination = (props, type) => {
    if (type === "character") {
      setCharacterParams((state) => ({
        ...state,
        page: props,
      }))
    } else {
      setLocationParams((state) => ({
        ...state,
        page: props,
      }))
    }
  }

  const [tabIndex, setTabIndex] = useState(0)
  const [modal, setModal] = useState(false)
  const toggleModal = useCallback(() => {
    setModal(!modal)
  }, [modal])

  const toggleDetail = useCallback(
    async (ID) => {
      await getCharater(ID).then((res) => {
        if (res.status === 200) {
          const { data } = res
          setCharacter(data)
        }
      })

      setModal(!modal)
    },
    [modal]
  )

  const tabs = [
    {
      label: "Karakter",
      content: (
        <TabCharacter
          isLoading={isLoading}
          characters={characters}
          characterParams={characterParams}
          onChangePagination={onChangePagination}
          onShowDetail={toggleDetail}
        />
      ),
    },
    {
      label: "Location",
      content: (
        <TabLocation
          isLoading={isLoading}
          locations={locations}
          locationParams={locationParams}
          onChangePagination={onChangePagination}
        />
      ),
    },
  ]

  useEffect(() => {
    const fetchCharacters = async () => {
      setIsLoading(true)
      await getCharaters({ page: characterParams.page }).then((res) => {
        if (res.status === 200) {
          const { data } = res
          setCharacters(data.results)

          setCharacterParams((state) => ({
            ...state,
            count: data.info.count,
            isNext: data.info.next,
            isPrev: data.info.prev,
            lastPage: data.info.pages,
          }))

          setIsLoading(false)
        } else {
          setIsLoading(false)
        }
      })
    }

    const fetchLocations = async () => {
      setIsLoading(true)
      await getLocations({ page: locationParams.page }).then((res) => {
        if (res.status === 200) {
          const { data } = res

          setLocations(data.results)

          setLocationParams((state) => ({
            ...state,
            count: data.info.count,
            isNext: data.info.next,
            isPrev: data.info.prev,
            lastPage: data.info.pages,
          }))

          setIsLoading(false)
        } else {
          setIsLoading(false)
        }
      })
    }

    if (tabIndex === 0) {
      fetchCharacters()
    } else {
      fetchLocations()
    }
  }, [characterParams.page, locationParams.page, tabIndex])

  return (
    <>
      <div>
        {modal && (
          <ModalDialog
            toggleShow={modal}
            triggerClose={toggleModal}
            size="lg"
            maxHeight="700"
          >
            <slot name="header">Detail Character</slot>
            <slot name="content">
              <div>
                <Image
                  src={character.image}
                  alt="Green double couch with wooden legs"
                  borderRadius="md"
                  objectFit="cover"
                  fallbackSrc="https://via.placeholder.com/150"
                  width={"full"}
                  height={300}
                />
              </div>
              <div className="tw-mt-2">
                <div className="fc tw-gap-2.5">
                  <Text fontSize="xl" as={"b"}>
                    {character.name}
                  </Text>
                  <div>
                    <Badge
                      variant="solid"
                      fontSize="0.8em"
                      className="tw-tracking-wider"
                      colorScheme={
                        character.gender === "Female"
                          ? "pink"
                          : character.gender === "Male"
                          ? "blue"
                          : "gray"
                      }
                    >
                      {character.gender}
                    </Badge>
                  </div>
                </div>
                <div className="fc tw-gap-2">
                  <Box
                    bg={character.status === "Alive" ? "green" : "red"}
                    w={2}
                    h={2}
                    borderRadius={"full"}
                    color="white"
                  ></Box>
                  <div>
                    {character.status} - {character.species}
                  </div>
                </div>

                <div className="tw-mt-3">
                  <div className="tw-mb-1">
                    Location: {character.location.name}
                  </div>
                  <div>Origin: {character.origin.name}</div>
                </div>
              </div>
            </slot>
          </ModalDialog>
        )}
        <Tabs
          defaultIndex={tabIndex}
          variant="soft-rounded"
          colorScheme="blue"
          onChange={(i) => setTabIndex(i)}
        >
          <TabList>
            {tabs.map((tab, key) => (
              <Tab key={key}>{tab.label}</Tab>
            ))}
          </TabList>
          <TabPanels>
            {tabs.map((tab, key) => (
              <TabPanel key={key}>{tab.content}</TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </div>
    </>
  )
}

export default RickAndMorty
