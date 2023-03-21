import ModalDialog from "components/Widget/ModalDialog"
import {
  Image,
  Text,
  Box,
  Badge,
} from "@chakra-ui/react"


const ModalDetailCharacter = ({isOpen, character, toggleOpen}) => {
  return (
    <>
      {isOpen && (
        <ModalDialog
          toggleShow={isOpen}
          triggerClose={toggleOpen}
          size="lg"
          maxHeight="700"
        >
          <slot name="header">Detail Character</slot>
          <slot name="content">
            <div>
              <Image
                src={character.image}
                alt="Green double couch with wooden legs"
                borderRadius="md"
                objectFit="cover"
                fallbackSrc="https://via.placeholder.com/150"
                width={"full"}
                height={"auto"}
              />
            </div>
            <div className="tw-mt-2">
              <div className="fc tw-gap-2.5">
                <Text fontSize="xl" as={"b"}>
                  {character.name}
                </Text>
                <div>
                  <Badge
                    variant="solid"
                    fontSize="0.8em"
                    className="tw-tracking-wider"
                    colorScheme={
                      character.gender === "Female"
                        ? "pink"
                        : character.gender === "Male"
                        ? "blue"
                        : "gray"
                    }
                  >
                    {character.gender}
                  </Badge>
                </div>
              </div>
              <div className="fc tw-gap-2">
                <Box
                  bg={character.status === "Alive" ? "green" : "red"}
                  w={2}
                  h={2}
                  borderRadius={"full"}
                  color="white"
                ></Box>
                <div>
                  {character.status} - {character.species}
                </div>
              </div>

              <div className="tw-mt-3">
                <div className="tw-mb-1">
                  Location: {character.location.name}
                </div>
                <div>Origin: {character.origin.name}</div>
              </div>
            </div>
          </slot>
        </ModalDialog>
      )}
    </>
  )
}

export default ModalDetailCharacter
