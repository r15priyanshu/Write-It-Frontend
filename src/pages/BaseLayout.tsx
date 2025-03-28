import { Outlet } from "react-router";
import MyNavbar from "../components/MyNavbar";

function BaseLayout() {
  console.log("BaseLayout Rendered !!");
  return (
    <>
      <MyNavbar />
      <Outlet />
      <h1>Footer</h1>
    </>
  );
}

export default BaseLayout;
