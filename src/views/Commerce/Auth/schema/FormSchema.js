import * as yup from "yup"

const validationSchema = yup.object().shape({
  username: yup.string().required("Username Harus di isi"),
  password: yup.string().min(4, "Minimal 4 karakter").required("Password Harus di isi"),
})

export default validationSchema
