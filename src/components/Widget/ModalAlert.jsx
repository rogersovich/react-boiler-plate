import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  AlertDialogCloseButton,
} from "@chakra-ui/react"
import { useRef, useEffect } from "react"

const ModalAlert = ({
  toggleShow,
  triggerClose,
  title,
  children,
}) => {
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
    if(title && header === null){
      return title
    }else if(title && header !== null){
      return title
    }else if(!title && header !== null){
      return header
    }else{
      return 'Title here'
    }
  }

  const body = checkChild(children, "body")

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
    }
  }, [toggleShow, onOpen])

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
          <AlertDialogHeader>
            {headerComp()}
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            {body === null ? <div>this is body content</div> : body}
          </AlertDialogBody>
          <AlertDialogFooter>
            {footer === null ? (
              <div>
                <Button ref={cancelRef} onClick={onClose}>
                  No
                </Button>
                <Button colorScheme="red" ml={3}>
                  Yes
                </Button>
              </div>
            ) : footer}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default ModalAlert
