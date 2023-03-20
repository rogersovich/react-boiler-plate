import { Box, Skeleton, SkeletonText } from "@chakra-ui/react"

const SkeletonImage = () => {
  return (
    <>
      <Box
        padding="4"
        border="1px"
        borderColor={"gray.100"}
        borderRadius={"md"}
        bg="transparent"
      >
        <Skeleton height={44} width="full" borderRadius={"md"} />
        <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="3" />
      </Box>
    </>
  )
}

export default SkeletonImage
