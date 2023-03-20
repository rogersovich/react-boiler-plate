import SkeletonCard from "components/Widget/SkeletonCard"
import SkeletonText from "components/Widget/SkeletonParagraph"
import SkeletonTable from "components/Widget/SkeletonTable"
import SkeletonImage from "components/Widget/SkeletonImage"
import ModalAlert from "components/Widget/ModalAlert"
import ModalDialog from "components/Widget/ModalDialog"
import { Text, Button } from "@chakra-ui/react"
import { useState, useCallback } from "react"

const Widget = () => {
  const [modalAlert, setModalAlert] = useState(false)
  const [modalDialog, setModalDialog] = useState(false)
  const toggleModal = useCallback(() => {
    setModalDialog(!modalDialog)
  }, [modalDialog])

  const [modalDialog2, setModalDialog2] = useState(false)
  const toggleModal2 = useCallback(() => {
    setModalDialog2(!modalDialog2)
  }, [modalDialog2])
  return (
    <>
      <div className="grid-12 tw-gap-4">
        <div className="tw-col-span-6">
          <div>
            <Text fontSize="lg" as="b">
              Skelton Card
            </Text>
            <p></p>
            <SkeletonCard />
          </div>
        </div>
        <div className="tw-col-span-6">
          <div>
            <Text fontSize="lg" as="b">
              Skelton Text
            </Text>
            <p></p>
            <SkeletonText />
          </div>
        </div>
        <div className="tw-col-span-4">
          <div>
            <Text fontSize="lg" as="b">
              Skelton Image
            </Text>
            <p></p>
            <SkeletonImage/>
          </div>
        </div>
        <div className="tw-col-span-12">
          <div>
            <Text fontSize="lg" as="b">
              Skelton Table
            </Text>
            <SkeletonTable row={4} col={4} />
          </div>
        </div>
        <div className="tw-col-span-3">
          <div>
            <Text fontSize="lg" as="b">
              Modal Alert
            </Text>

            <div className="tw-mt-2">
              <Button onClick={() => setModalAlert(!modalAlert)}>
                Open Alert Modal
              </Button>

              <ModalAlert
                toggleShow={modalAlert}
                triggerClose={() => setModalAlert(false)}
              >
                <slot name="header">
                  <div>Header slot</div>
                </slot>

                <slot name="content">Helooww</slot>

                <slot name="footer">
                  <div>
                    <Button onClick={() => setModalAlert(!modalAlert)}>
                      No
                    </Button>
                    <Button colorScheme="red" ml={3}>
                      Yes
                    </Button>
                  </div>
                </slot>
              </ModalAlert>
            </div>
          </div>
        </div>
        <div className="tw-col-span-3">
          <div>
            <Text fontSize="lg" as="b">
              Modal Dialog
            </Text>

            <div className="tw-mt-2">
              <Button onClick={toggleModal}>
                Open Dialog Modal
              </Button>

              <ModalDialog
                toggleShow={modalDialog}
                triggerClose={toggleModal}
                size="lg"
                maxHeight="600"
                isCentered={true}
                closeOnOverlayClick={true}
                title="Dialog 1"
              >
                <slot name="header">
                  <div>Header slot</div>
                </slot>

                <slot name="content">
                  <div>Lorem Ipsum is simply dummy text of the printing</div>
                </slot>

                <slot name="footer">
                  <div>
                    <Button onClick={toggleModal}>
                      Terima
                    </Button>
                    <Button colorScheme="red" ml={3}>
                      Tolak
                    </Button>
                  </div>
                </slot>
              </ModalDialog>
            </div>
          </div>
        </div>
        <div className="tw-col-span-3">
          <div>
            <Text fontSize="lg" as="b">
              Modal Dialog
            </Text>

            <div className="tw-mt-2">
              <Button onClick={toggleModal2}>
                Open Dialog Modal 2
              </Button>

              <ModalDialog
                toggleShow={modalDialog2}
                triggerClose={toggleModal2}
                size="lg"
                maxHeight="600"
                isCentered={true}
                closeOnOverlayClick={true}
                title="Dialog 2"
              >
                <slot name="header">
                  <div>Header slot</div>
                </slot>

                <slot name="content">
                  <div>Lorem Ipsum is simply dummy text of the printing</div>
                </slot>

                <slot name="footer">
                  <div>
                    <Button onClick={toggleModal2}>
                      Terima
                    </Button>
                    <Button colorScheme="red" ml={3}>
                      Tolak
                    </Button>
                  </div>
                </slot>
              </ModalDialog>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Widget
