import {
  Box,
  SkeletonText,
} from "@chakra-ui/react"

const SkeletonCard = () => {
  return (
    <Box padding="6" boxShadow="lg" bg="transparent">
      <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="4" />
    </Box>
  )
}

export default SkeletonCard
