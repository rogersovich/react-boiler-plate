import { Text } from "@chakra-ui/react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@chakra-ui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { CsInput } from "components/CsForm"
import validationSchema from "./schema/FormSchema"
import LoadingOverlay from "components/Widget/LoadingOverlay"
// api
// import { login } from "services/dummy-json/auth"
import { useDispatch, useSelector } from "react-redux"

import { login, unsetError } from "store/auth"

import { useNavigate } from "react-router-dom"

const Auth = () => {
  //dispatch
  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.auth.isLoading)
  const error = useSelector((state) => state.auth.error)
  const initLogin = {
    username: "kminchelle",
    password: "0lelplR",
    expiresInMins: 2
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initLogin,
    resolver: yupResolver(validationSchema),
  })

  const navigate = useNavigate()

  const onSubmit = async (body) => {
    await dispatch(login(body)).then((res) => {
      navigate("/commerce", { replace: true })
    })
  }

  useEffect(() => {
    if (error) {
      alert(error)
      dispatch(unsetError())
    }
  }, [error, dispatch])

  return (
    <>
      {isLoading && <LoadingOverlay isLoading={isLoading} />}
      <div className="grid-12">
        <div className="tw-col-start-4 tw-col-span-6">
          <div className="tw-border tw-border-gray-200 tw-rounded-md tw-mt-5">
            <div className="tw-p-4 tw-text-left">
              <Text as={"b"} fontSize={"xl"} color={"teal"}>
                Login E-Commerce
              </Text>
              <div className="tw-mt-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <CsInput
                    label="Username"
                    placeholder="Masukan Username"
                    errors={errors.username}
                    register={{ ...register("username") }}
                  ></CsInput>
                  <br />
                  <CsInput
                    label="Password"
                    placeholder="Masukan password"
                    errors={errors.password}
                    register={{ ...register("password") }}
                  ></CsInput>

                  <div>
                    <Button
                      mt={4}
                      colorScheme="teal"
                      isLoading={isSubmitting}
                      type="submit"
                      width={"full"}
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Auth
