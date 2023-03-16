import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Checkbox,
} from "@chakra-ui/react"

const CsCheckbox = ({
  errors,
  register,
  label = "Label",
  isLabeled = true,
  title = null,
}) => {
  return (
    <>
      <FormControl isInvalid={errors}>
        {isLabeled === true ? (
          <FormLabel htmlFor={register.name}>{label}</FormLabel>
        ) : null}
        <Checkbox {...register}>{title && title}</Checkbox>
        <FormErrorMessage>{errors && errors.message}</FormErrorMessage>
      </FormControl>
    </>
  )
}

export default CsCheckbox