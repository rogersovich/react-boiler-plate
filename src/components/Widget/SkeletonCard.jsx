import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react"

const SkeletonCard = () => {
  return (
    <Box
      padding="4"
      border="1px"
      borderColor={"gray.100"}
      borderRadius={"md"}
      bg="transparent"
    >
      <div className="grid-10">
        <div className="tw-col-span-1">
          <SkeletonCircle height="40px" width="40px" />
        </div>
        <div className="tw-col-span-9 fcc">
          <SkeletonText width="full" skeletonHeight="3" noOfLines={1} />
        </div>
      </div>
      <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="3" />
    </Box>
  )
}

export default SkeletonCard
