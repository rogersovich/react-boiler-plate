import Pagination from "utils/Pagination"
import { Card, CardBody, Text } from "@chakra-ui/react"

const TabLocation = ({
  isLoading,
  locations,
  locationParams,
  onChangePagination,
}) => {
  return (
    <>
      <div className="grid-12 tw-gap-4">
        {!isLoading && locations.length > 0 ? (
          <div className="tw-col-span-12">
            <div className="grid-12 tw-gap-4">
              {locations.map((location, key) => (
                <div key={key} className="tw-col-span-3">
                  <Card
                    variant="outline"
                    backgroundColor={"gray.800"}
                    color={"white"}
                  >
                    <CardBody>
                      <div className="tw-mb-3">
                        <Text fontSize="xl" as={"b"}>
                          {location.name}
                        </Text>
                      </div>
                      <div>Type: {location.type}</div>
                      <div>Dimension: {location.dimension}</div>
                    </CardBody>
                  </Card>
                </div>
              ))}
            </div>
            <br />
            <div className="tw-text-center">
              <Pagination
                className="pagination-bar"
                currentPage={locationParams.page}
                totalCount={locationParams.count}
                pageSize={20}
                onPageChange={(page) => onChangePagination(page, 'location')}
              />
            </div>
          </div>
        ) : (
          <div className="tw-col-span-12">Tidak ada data</div>
        )}
      </div>
    </>
  )
}

export default TabLocation
