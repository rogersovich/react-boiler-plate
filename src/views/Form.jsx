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
  CsSelect
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

  const powerOptions = [
    { value: "Fire", label: "Fire" },
    { value: "Water", label: "Water" },
    { value: "Thunder", label: "Thunder" },
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
        <div className="tw-text-2xl tw-font-bold">
          Example Form 
        </div>
        <br />
        <form onSubmit={handleSubmit(onSubmit)}>
          <CsInput
            label="Input"
            placeholder="Masukan Nama Depan"
            errors={errors.first_name}
            register={{ ...register("first_name") }}
          ></CsInput>
          <br />
          <CsRadioButton
            label="Radio Button"
            errors={errors.religion}
            register={{ ...register("religion") }}
            options={religionOptions}
          ></CsRadioButton>
          <br />
          <CsCheckbox
            label="Check Box"
            title={"Check Me Please"}
            errors={errors.verify}
            register={{ ...register("verify") }}
          ></CsCheckbox>
          <br />
          <CsCheckboxGroup
            label="Check Box Group"
            options={ninjaOptions}
            errors={errors.ninja}
            register={{ ...register("ninja") }}
          ></CsCheckboxGroup>
          <br />
          <CsSwitch
            label="Switch"
            errors={errors.loading}
            register={{ ...register("loading") }}
          ></CsSwitch>
          <br />
          <CsSelectMultiple
            label="Select Multiple"
            errors={errors.cities}
            control={control}
            name={'cities'}
            options={cityOptions}
            value={cities}
            onChange={handleCitiesChange}
          ></CsSelectMultiple>
          <br />
          <CsSelect label="Select One"
            errors={errors.power}
            control={control}
            name={'power'}
            options={powerOptions}
            ></CsSelect>
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
