import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Card,
  CardBody,
  Text,
  Image,
  Box,
} from "@chakra-ui/react"

import Pagination from "utils/Pagination"

import { useEffect, useState } from "react"
import { getCharaters } from "services/rick-morty/character"

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

  const onChangePagination = (props) => {
    setCharacterParams((state) => ({
      ...state,
      page: props,
    }))
  }

  const onChangeTab = (index) => {
    console.log("test")
    console.log(index)
  }

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
        }
        setIsLoading(false)
      })
    }
    
    fetchCharacters()
  }, [characterParams.page])

  return (
    <>
      <div>
        <Tabs
          variant="soft-rounded"
          colorScheme="blue"
          onChange={(i) => onChangeTab(i)}
        >
          <TabList>
            <Tab>Karakter</Tab>
            <Tab>Location</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <div className="grid-12 tw-gap-4">
                {!isLoading && characters.length > 0 ? (
                  <div className="tw-col-span-12">
                    <div className="grid-12 tw-gap-4">
                      {characters.map((character, keyC) => (
                        <div key={keyC} className="tw-col-span-3">
                          <Card
                            variant="outline"
                            backgroundColor={"gray.800"}
                            color={"white"}
                          >
                            <CardBody>
                              <div>
                                <Image
                                  src={character.image}
                                  alt="Green double couch with wooden legs"
                                  borderRadius="md"
                                  objectFit="cover"
                                  fallbackSrc="https://via.placeholder.com/150"
                                  width={"full"}
                                  height={200}
                                />
                              </div>
                              <div className="tw-mt-2">
                                <Text fontSize="xl" as={"b"}>
                                  {character.name}
                                </Text>
                                <div className="fc tw-gap-2.5">
                                  <Box
                                    bg={
                                      character.status === "Alive"
                                        ? "green"
                                        : "red"
                                    }
                                    w={2}
                                    h={2}
                                    borderRadius={"full"}
                                    color="white"
                                  ></Box>
                                  <div>
                                    {character.status} - {character.species}
                                  </div>
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
                        currentPage={characterParams.page}
                        totalCount={characterParams.count}
                        pageSize={20}
                        onPageChange={(page) => onChangePagination(page)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="tw-col-span-12">Tidak ada data</div>
                )}
              </div>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </>
  )
}

export default RickAndMorty
