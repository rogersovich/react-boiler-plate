import { FormErrorMessage, FormLabel, FormControl } from "@chakra-ui/react"
import { Controller } from "react-hook-form"
import Select from "react-select"

const CsInput = ({
  name,
  errors,
  control,
  label = "Label",
  isLabeled = true,
  placeholder = "Please input here",
  options = [],
  customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: errors ? "#e53e3e" : "#E2E8F0",
      borderWidth: errors ? "2px" : "1px",
      height: "2.5rem",
      minHeight: "2.5rem",
      borderRadius: "0.375rem",
      ":hover": {
        borderColor: "#CDD5E0",
      },
    }),
  },
  value = null,
  onChange,
}) => {
  const handleCitiesChange = (selected) => {
    onChange(selected)
  }

  return (
    <>
      <FormControl isInvalid={errors}>
        {isLabeled === true ? (
          <FormLabel htmlFor={name}>{label}</FormLabel>
        ) : null}
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, onBlur } }) => (
            <Select
              isMulti
              placeholder={placeholder}
              options={options}
              onBlur={onBlur}
              onChange={(selectedOptions) => {
                const selectedValues = selectedOptions
                  ? selectedOptions.map((option) => option.value)
                  : []
                onChange(selectedValues)
                handleCitiesChange(selectedOptions)
              }}
              value={value}
              styles={customStyles}
            />
          )}
        />
        <FormErrorMessage>{errors && errors.message}</FormErrorMessage>
      </FormControl>
    </>
  )
}

export default CsInput
