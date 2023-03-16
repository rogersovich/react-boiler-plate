import * as yup from "yup"

const validationSchema = yup.object().shape({
  first_name: yup.string().required("Nama Depan Harus di isi"),
  verify: yup.bool().oneOf([true], "You must accept the terms and conditions"),
  ninja: yup
    .array()
    .min(1, "Please select at least one Ninja")
    .of(
      yup.string().oneOf(["Naruto", "Sasuke", "Sakura"], "Invalid fruit option")
    ),

  religion: yup.string().oneOf(["Islam", "Kristen"], "Invalid Religion option"),
  cities: yup.array().min(1, "Please select at least one option"),
  loading: yup.bool().oneOf([true], "harus bisa loading woi"),
  power: yup.string().required(),
})

export default validationSchema
