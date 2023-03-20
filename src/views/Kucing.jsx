import { useNavigate } from "react-router-dom"

import { useState, useCallback, memo } from "react"

const Kucing = () => {
  const navigate = useNavigate()

  const routeBack = () => {
    navigate(-1)
  }

  const [number, setNumber] = useState(0)
  const [count, setCount] = useState(0)
  const [food, setFood] = useState(0)
  const incrementNumber = useCallback(() => {
    setNumber(number + 1)
  }, [number])
  const incrementCount = useCallback(() => {
    setCount(count + 1)
  }, [count])
  const incrementFood = () => {
    setFood(food + 1)
  }

  return (
    <>
      <div>Kucing Page</div>
      <br />
      <button onClick={routeBack}>Go back</button>
      <p></p>
      <div>
        <Show label="number" val={number} />
        <Button label="number" action={incrementNumber} />
        <Show label="count" val={count} />
        <Button label="count" action={incrementCount} />
        <Show label="food" val={food} />
        <Button label="food" action={incrementFood} />
      </div>
    </>
  )
}

const Show = memo(({ label, val }) => {
  console.log(`${label} inside show render`)
  return (
    <div>
      <div>
        {label} {val}
      </div>
    </div>
  )
})

const Button = memo(({ label, action }) => {
  console.log(`${label} inside button render`)
  return (
    <div>
      <button onClick={action}>add {label}</button>
    </div>
  )
})

export default Kucing
