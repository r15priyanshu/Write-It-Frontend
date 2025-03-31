import { Outlet } from "react-router";
import MyNavbar from "../components/MyNavbar";
import MyFooter from "../components/MyFooter";

function BaseLayout() {
  console.log("BaseLayout Rendered !!");
  return (
    <>
      <MyNavbar />
      <Outlet />
      <MyFooter/>
    </>
  );
}

export default BaseLayout;