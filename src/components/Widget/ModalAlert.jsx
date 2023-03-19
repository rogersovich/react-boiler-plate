import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  AlertDialogCloseButton,
} from "@chakra-ui/react"
import { useRef, useEffect } from "react"

const ModalAlert = ({ toggleShow, triggerClose, title, children }) => {
  const checkChild = (el, type) => {
    if (typeof el.find((child) => child.props.name === type) !== "undefined") {
      const element = el.find((child) => {
        return child.props.name === type
      })
      return element
    } else {
      return null
    }
  }

  const header = checkChild(children, "header")
  const headerComp = () => {
    if (title && header === null) {
      return title
    } else if (title && header !== null) {
      return title
    } else if (!title && header !== null) {
      return header
    } else {
      return "Title here"
    }
  }

  const content = checkChild(children, "content")

  const footer = checkChild(children, "footer")

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

  const handleClose = () => {
    onClose()
    triggerClose()
  }

  useEffect(() => {
    if (toggleShow) {
      onOpen()
    } else {
      onClose()
    }
  }, [toggleShow, onOpen, onClose])

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={handleClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{headerComp()}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody className={`${!footer && "tw-pb-5"}`}>
            {content && content}
          </AlertDialogBody>

          {footer && <AlertDialogFooter>{footer}</AlertDialogFooter>}
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default ModalAlert
