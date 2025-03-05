import { Outlet } from "react-router";

function BaseLayout() {
  console.log("BaseLayout Rendered !!");
  return (
    <>
      <h1>Header</h1>
      <Outlet />
      <h1>Footer</h1>
    </>
  );
}

export default BaseLayout;
