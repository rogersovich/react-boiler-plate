import { Outlet } from "react-router-dom"
import Navbar from "../../components/Widget/Navbar"

const LayoutHome = () => {
  return (
    <>
      <Navbar/>
      <div id="body-content" className="tw-py-6 tw-px-6">
        <Outlet />
      </div>
    </>
  )
}

export default LayoutHome
