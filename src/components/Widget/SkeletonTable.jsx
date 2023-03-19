import { Box, Skeleton } from "@chakra-ui/react"

const SkeletonTable = ({ row = 4, col = 4 }) => {
  const colSpan = 'tw-col-span-'+(12 / row).toString()

  return (
    <Box padding="6" boxShadow="lg" bg="transparent">
      {Array.apply(null, { length: col }).map((item, key) => (
        <div
          key={key}
          className={`${
            key === 0 ? "tw-pt-0" : ""
          } tw-border-b tw-border-gray-200 tw-py-4`}
        >
          <div className=" tw-grid tw-grid-cols-12 tw-gap-4">
            {Array.apply(null, { length: row }).map((x, rowKey) => (
              <div className={colSpan} key={rowKey}>
                <Skeleton width="full" height="3" borderRadius={"lg"} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </Box>
  )
}

export default SkeletonTable
