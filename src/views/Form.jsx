import { useForm } from "react-hook-form"
import { useState } from "react"
import {
  Button,
} from "@chakra-ui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  CsInput,
  CsRadioButton,
  CsCheckbox,
  CsCheckboxGroup,
  CsSwitch,
  CsSelectMultiple,
} from "../components/CsForm"
import validationSchema from './schema/FormSchema'

const Form = () => {
  const initialValues = {
    verify: false,
    ninja: [],
    religion: null,
    cities: [],
    loading: false,
    first_name: null,
  }

  const cityOptions = [
    { value: "Bogor", label: "Bogor" },
    { value: "Sumedang", label: "Sumedang" },
    { value: "Bandung", label: "Bandung" },
  ]

  const [cities, setCities] = useState([])

  const handleCitiesChange = (selected) => {
    setCities(selected)
  }

  const religionOptions = [
    { value: "Islam", label: "Islam" },
    { value: "Kristen", label: "Kristen" },
  ]

  const ninjaOptions = [
    { value: "Naruto", label: "Naruto" },
    { value: "Sasuke", label: "Sasuke" },
    { value: "Sakura", label: "Sakura" },
  ]

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <>
      <div className="tw-p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CsInput
            label="First Name"
            placeholder="Masukan Nama Depan"
            errors={errors.first_name}
            register={{ ...register("first_name") }}
          ></CsInput>
          <br />
          <CsRadioButton
            label="Agama"
            errors={errors.religion}
            register={{ ...register("religion") }}
            options={religionOptions}
          ></CsRadioButton>
          <br />
          <CsCheckbox
            label="Security Check"
            title={"Check Me Please"}
            errors={errors.verify}
            register={{ ...register("verify") }}
          ></CsCheckbox>
          <br />
          <CsCheckboxGroup
            label="Choose Ninja"
            options={ninjaOptions}
            errors={errors.ninja}
            register={{ ...register("ninja") }}
          ></CsCheckboxGroup>
          <br />
          <CsSwitch
            label="Turn On Loading"
            errors={errors.loading}
            register={{ ...register("loading") }}
          ></CsSwitch>
          <br />
          <CsSelectMultiple
            label="Choose ur cities"
            errors={errors.cities}
            control={control}
            name={'cities'}
            options={cityOptions}
            value={cities}
            onChange={handleCitiesChange}
          ></CsSelectMultiple>
          <br />

          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  )
}

export default Form
