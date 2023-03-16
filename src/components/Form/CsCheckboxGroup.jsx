import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Checkbox,
  CheckboxGroup,
  Stack,
} from "@chakra-ui/react"

const CsCheckbox = ({
  errors,
  register,
  label = "Label",
  isLabeled = true,
  options = [],
}) => {
  return (
    <>
      <FormControl isInvalid={errors}>
        {isLabeled === true ? (
          <FormLabel htmlFor={register.name}>{label}</FormLabel>
        ) : null}

        <CheckboxGroup colorScheme="green">
          <Stack spacing={[1, 5]} direction={["column", "row"]}>
            {options.map((val, key) => (
              <Checkbox key={key} value={val.value} {...register}>
                {val.label}
              </Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>
        <FormErrorMessage>{errors && errors.message}</FormErrorMessage>
      </FormControl>
    </>
  )
}

export default CsCheckbox
