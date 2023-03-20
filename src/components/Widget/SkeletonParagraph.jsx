import { Box, SkeletonText } from "@chakra-ui/react"

const SkeletonParagraph = () => {
  return (
    <Box
      padding="4"
      border="1px"
      borderColor={"gray.100"}
      borderRadius={"md"}
      bg="transparent"
    >
      <SkeletonText noOfLines={4} spacing="4" skeletonHeight="3" />
    </Box>
  )
}

export default SkeletonParagraph
