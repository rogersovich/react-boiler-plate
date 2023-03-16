import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Switch
} from "@chakra-ui/react"

const CsCheckbox = ({
  errors,
  register,
  label = "Label",
  isLabeled = true,
}) => {
  return (
    <>
      <FormControl isInvalid={errors}>
        {isLabeled === true ? (
          <FormLabel htmlFor={register.name}>{label}</FormLabel>
        ) : null}
        <Switch {...register} />
        <FormErrorMessage>{errors && errors.message}</FormErrorMessage>
      </FormControl>
    </>
  )
}

export default CsCheckbox