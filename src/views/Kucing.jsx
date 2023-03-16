import { useNavigate } from "react-router-dom"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Select from "react-select"
import { useForm, Controller } from "react-hook-form"
import { Button } from "@chakra-ui/react"
import {useState} from 'react'

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
]

const schema = yup.object().shape({
  kopi: yup.array().min(1, "Please select at least one option"),
})

const Kucing = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      kopi: [],
    },
  })

  const [fruits, setFruits] = useState([]);

  const handleFruitChange = (selectedFruits) => {
    setFruits(selectedFruits);
  };

  const onSubmit = (data) => {
    console.log(data)
  }

  const navigate = useNavigate()

  const routeBack = () => {
    navigate(-1)
  }

  return (
    <>
      <div>Kucing Page</div>
      <br />
      <button onClick={routeBack}>Go back</button>
      <p></p>
      <form onSubmit={handleSubmit(onSubmit)}>

        <Controller
          name="kopi"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Select
              isMulti
              options={options}
              onBlur={onBlur}
              onChange={(selectedOptions) => {
                const selectedValues = selectedOptions
                  ? selectedOptions.map((option) => option.value)
                  : []
                onChange(selectedValues)
                handleFruitChange(selectedOptions)
              }}
              value={fruits}
            />
          )}
        />

        {errors.kopi && <span role="alert">{errors.kopi.message}</span>}
        <Button mt={4} colorScheme="teal" type="submit">
          Submit
        </Button>
      </form>
    </>
  )
}

export default Kucing
