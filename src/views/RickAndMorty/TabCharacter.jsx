import Pagination from "utils/Pagination"
import { Card, CardBody, Text, Image, Box } from "@chakra-ui/react"
import SkeletonImage from "components/Widget/SkeletonImage"

const TabCharacter = ({
  isLoading,
  characters,
  characterParams,
  onChangePagination,
}) => {
  return (
    <>
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
