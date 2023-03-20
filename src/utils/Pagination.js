import React from "react"
import { usePagination, DOTS } from "./usePagination"

import { Button, IconButton } from "@chakra-ui/react"

import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  let lastPage = paginationRange[paginationRange.length - 1]
  return (
    <div>
      <IconButton
        icon={<ChevronLeftIcon />}
        variant={"ghost"}
        fontSize={20}
        isDisabled={currentPage === 1}
        onClick={onPrevious}
      />

      {paginationRange.map((pageNumber, key) => {
        if (pageNumber === DOTS) {
          return <Button isDisabled variant={"ghost"} key={key}>...</Button>
        }

        return (
          <Button
            key={key}
            variant={pageNumber === currentPage ? "solid" : "ghost"}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </Button>
        )
      })}

      <IconButton
        icon={<ChevronRightIcon />}
        variant={"ghost"}
        fontSize={20}
        isDisabled={currentPage === lastPage}
        onClick={onNext}
      />
    </div>
  )
}

export default Pagination
