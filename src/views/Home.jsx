import {  Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, incrementFoodByAmount } from '../store/counter'

const Home = () => {
  const count = useSelector((state) => state.counter.value)
  const food = useSelector((state) => {
   
    return state.counter.food
  })
  const dispacth = useDispatch()

  return ( 
    <>
      <div>
        This is Home Page
      </div>
      <br />
      <Link to={`kucing/1`}>Link to Kucing</Link>
      <div></div>
      <Link to={`form`}>Link to Form</Link>
      <p></p>
      <h2>
        Using Redux
      </h2>
      <div>
        {count}
      </div>
      <div>
        food count: {food}
      </div>
      <p></p>
      <div>
        <button onClick={() => dispacth(increment())}>Plus</button>
        <button onClick={() => dispacth(decrement())}>Minus</button>
        <button onClick={() => dispacth(incrementFoodByAmount(10))}>Plus Food</button>
      </div>
    </>
   );
}
 
export default Home;