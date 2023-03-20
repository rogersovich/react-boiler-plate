import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"

import { useEffect, useState } from "react"
import { getCharaters, getLocations } from "services/rick-morty/general"
import TabCharacter from "./TabCharacter"
import TabLocation from "./TabLocation"

const RickAndMorty = () => {
  const [isLoading, setIsLoading] = useState(false)

  const [characters, setCharacters] = useState([])
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
    }else{
      setLocationParams((state) => ({
        ...state,
        page: props,
      }))
    }
  }

  const [tabIndex, setTabIndex] = useState(0)

  const tabs = [
    {
      label: "Karakter",
      content: (
        <TabCharacter
          isLoading={isLoading}
          characters={characters}
          characterParams={characterParams}
          onChangePagination={onChangePagination}
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
