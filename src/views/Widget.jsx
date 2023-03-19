import SkeletonCard from "components/Widget/SkeletonCard"
import SkeletonText from "components/Widget/SkeletonText"
import SkeletonTable from "components/Widget/SkeletonTable"
import ModalAlert from "components/Widget/ModalAlert"
import ModalDialog from "components/Widget/ModalDialog"
import { Text, Button } from "@chakra-ui/react"
import { useState } from "react"

const Widget = () => {
  const [modalAlert, setModalAlert] = useState(false)
  const [modalDialog, setModalDialog] = useState(false)

  return (
    <>
      <div className="grid-12 tw-gap-4">
        <div className="tw-col-span-6">
          <div>
            <Text fontSize="lg" as="b">
              Skelton Card
            </Text>
            <SkeletonCard />
          </div>
        </div>
        <div className="tw-col-span-6">
          <div>
            <Text fontSize="lg" as="b">
              Skelton Text
            </Text>
            <SkeletonText />
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
              <Button onClick={() => setModalDialog(!modalDialog)}>
                Open Dialog Modal
              </Button>

              <ModalDialog
                toggleShow={modalDialog}
                triggerClose={() => setModalDialog(false)}
                size="lg"
                maxHeight="600"
                isCentered={true}
                closeOnOverlayClick={true}
              >
                <slot name="header">
                  <div>Header slot</div>
                </slot>

                <slot name="content">
                  <div>Lorem Ipsum is simply dummy text of the printing</div>
                </slot>

                <slot name="footer">
                  <div>
                    <Button onClick={() => setModalDialog(!modalDialog)}>
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
