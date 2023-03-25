import { Button, Stack } from "@chakra-ui/react"
import { useSelector, useDispatch } from "react-redux"
import { decrement, increment, incrementFoodByAmount } from "../store/counter"
import { setToken, unsetToken, setProfile, unsetProfile } from "../store/auth"


const Home = () => {
  //count
  const count = useSelector((state) => state.counter.value)
  const food = useSelector((state) => {
    return state.counter.food
  })

  //auth
  const { token, profile } = useSelector((state) => state.auth)

  //dispatch
  const dispatch = useDispatch()

  const handleLogin = () => {
    dispatch(setToken("ini-token"))
    dispatch(setProfile({
      username: 'rogersovich'
    }))
    
  }
  const handleLogout = () => {
    dispatch(unsetToken())
    dispatch(unsetProfile())
  }

  const ls = JSON.parse(localStorage.getItem("persist:rogersovich")).auth

  const tokenBearer =  JSON.parse(ls).token
  console.log(tokenBearer, "testing")

  return (
    <>
      <div>This is Home Page</div>
      <br />
      <h2 className="tw-text-xl bold">Using Redux</h2>
      <div>
        <div className="tw-my-2">Count: {count}</div>
        <Stack direction={["row"]} spacing="16px">
          <Button colorScheme="blue" onClick={() => dispatch(increment())}>
            Plus
          </Button>
          <Button colorScheme="blue" onClick={() => dispatch(decrement())}>
            Minus
          </Button>
        </Stack>
      </div>
      <br />
      <div>
        <div>food count: {food}</div>
        <p></p>
        <div>
          <Button
            colorScheme="blue"
            onClick={() => dispatch(incrementFoodByAmount(10))}
          >
            Plus Food
          </Button>
        </div>
      </div>
      <br />
      <div>
        <div className="bold tw-text-xl">Auth Redux Persist</div>
        <p></p>
        <div>
          <div>{token}</div>
          <p></p>
          {profile.username !== null && (
            <div>
              <div>Username {profile.username}</div>
            </div>
          )}
          <p></p>
          <Stack direction={["row"]} spacing="16px">
            <Button colorScheme="orange" onClick={handleLogin}>
              Login
            </Button>
            <Button colorScheme="orange" onClick={handleLogout}>
              Logout
            </Button>
          </Stack>
        </div>
      </div>
    </>
  )
}

export default Home
