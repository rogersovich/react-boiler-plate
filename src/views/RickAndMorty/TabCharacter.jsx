import Pagination from "utils/Pagination"
import { Card, CardBody, Text, Image, Box, Input } from "@chakra-ui/react"
import Select from "react-select"
import SkeletonImage from "components/Widget/SkeletonImage"
import { useState } from "react"

const TabCharacter = ({
  isLoading,
  characters,
  characterParams,
  onChangePagination,
  onShowDetail,
  onSearch,
  changeFilterStatus,
  changeFilterGender,
}) => {
  const showDetail = (ID) => {
    onShowDetail(ID)
  }

  // search
  const [querySearch, setQuerySearch] = useState("")
  const handleSearch = (e) => {
    e.preventDefault()
    setQuerySearch(e.target.value)
    setTimeout(() => {
      onSearch(e.target.value)
    }, 1500)
  }

  const styleSelect = {
    control: (provided, state) => ({
      ...provided,
      borderColor: "#E2E8F0",
      borderWidth: "1px",
      height: "2.5rem",
      minHeight: "2.5rem",
      borderRadius: "0.375rem",
      ":focus": {
        borderWidth: "2px",
      },
    }),
  }

  //filter status
  const [filterStatus, setFilterStatus] = useState("all")
  const statusOptions = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Alive",
      value: "alive",
    },
    {
      label: "Dead",
      value: "dead",
    },
    {
      label: "Unknown",
      value: "unknown",
    },
  ]

  const handleChangeStatus = (selectedOption) => {
    changeFilterStatus(selectedOption.value)
    setFilterStatus(selectedOption.value)
  }

  //filter gender
  const [filterGender, setFilterGender] = useState("all")
  const genderOptions = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Female",
      value: "female",
    },
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Genderless ",
      value: "genderless ",
    },
    {
      label: "Unknown",
      value: "unknown",
    },
  ]

  const handleChangeGender = (selectedOption) => {
    changeFilterGender(selectedOption.value)
    setFilterGender(selectedOption.value)
  }

  return (
    <>
      <div className="grid-12 tw-gap-4">
        {!isLoading && (
          <div className="tw-col-span-12">
            <div className="grid-12 tw-gap-4">
              <div className="tw-col-span-8">
                <div className="tw-mb-2 medium">Search here</div>
                <Input
                  placeholder="Search By Name"
                  onChange={handleSearch}
                  value={querySearch}
                />
              </div>
              <div className="tw-col-span-2">
                <div className="tw-mb-2 medium">Gender</div>
                <Select
                  placeholder="Choose Gender"
                  options={genderOptions}
                  onChange={handleChangeGender}
                  value={genderOptions.find(
                    (option) => option.value === filterGender
                  )}
                  styles={styleSelect}
                />
              </div>
              <div className="tw-col-span-2">
                <div className="tw-mb-2 medium">Status</div>
                <Select
                  placeholder="Choose Status"
                  options={statusOptions}
                  onChange={handleChangeStatus}
                  value={statusOptions.find(
                    (option) => option.value === filterStatus
                  )}
                  styles={styleSelect}
                />
              </div>
            </div>
          </div>
        )}
        {!isLoading && characters.length > 0 ? (
          <div className="tw-col-span-12">
            <div className="grid-12 tw-gap-4">
              {characters.map((character, keyC) => (
                <div key={keyC} className="tw-col-span-3">
                  <Card
                    variant="outline"
                    backgroundColor={"gray.800"}
                    color={"white"}
                    onClick={() => showDetail(character.id)}
                    className="tw-cursor-pointer"
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
                onPageChange={(page) => onChangePagination(page, "character")}
              />
            </div>
          </div>
        ) : !isLoading && characters.length === 0 ? (
          <div className="tw-col-span-12">Tidak ada data</div>
        ) : (
          <div className="tw-col-span-12">
            <div className="grid-12 tw-gap-4">
              {[...Array(8)].map((x, i) => (
                <div key={i} className="tw-col-span-3">
                  <SkeletonImage />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default TabCharacter
