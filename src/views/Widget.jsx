import SkeletonCard from "../components/Widget/SkeletonCard"
import SkeletonText from "../components/Widget/SkeletonText"
import SkeletonTable from "../components/Widget/SkeletonTable"
import ModalAlert from "../components/Widget/ModalAlert"
import { Text, Button } from "@chakra-ui/react"
import { useState } from "react"

const Widget = () => {
  const [modal, setModal] = useState(false)

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
        <div className="tw-col-span-6">
          <div>
            <Text fontSize="lg" as="b">
              Modal Alert
            </Text>

            <div className="tw-mt-2">
              <Button onClick={() => setModal(!modal)}>Open Alert Modal</Button>

              <ModalAlert
                toggleShow={modal}
                triggerClose={() => setModal(false)}
              >
                <slot name="header">
                  <div>Header slot</div>
                </slot>

                <slot name="body">Helooww</slot>

                <slot name="footer">
                  <div>ini footer</div>
                </slot>
              </ModalAlert>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Widget
