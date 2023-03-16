import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Stack,
  Radio,
  RadioGroup,
} from "@chakra-ui/react"

const CsRadioButton = ({
  errors,
  register,
  label = "Label",
  isLabeled = true,
  options = [
    {
      label: "One",
      value: "One",
    },
    {
      label: "Two",
      value: "Two",
    },
  ],
}) => {
  return (
    <>
      <FormControl isInvalid={errors}>
        {isLabeled === true ? (
          <FormLabel htmlFor={register.name}>{label}</FormLabel>
        ) : null}
        <RadioGroup>
          <Stack direction="row">
            {options.map((val, key) => (
              <Radio key={key} value={val.value} {...register}>
                {val.label}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
        <FormErrorMessage>{errors && errors.message}</FormErrorMessage>
      </FormControl>
    </>
  )
}

export default CsRadioButton
