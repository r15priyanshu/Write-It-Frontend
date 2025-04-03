import defaultProfilePicture from "../assets/public-images/default.png";
import { Card, CardBody, Table } from "reactstrap";
import { useSelector } from "react-redux";
import { RootState } from "../redux-toolkit/store";

function Profile() {
  console.log("Profile Page Rendered !!");
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const loggedInUserDetails = useSelector(
    (state: RootState) => state.auth.loggedInUserDetails
  );

  return (
    <div className="Profile container mt-4 mb-4" style={{ minHeight: "500px" }}>
      <div className="row">
        <div className="col-md-8 offset-2">
          <Card>
            <CardBody>
              <h3 style={{ textAlign: "center" }}>PROFILE DETAILS</h3>
              <div className="container text-center mb-3">
                {isLoggedIn && (
                  <img
                    src={defaultProfilePicture}
                    alt="Profile Picture"
                    height={"150px"}
                    width={"150px"}
                    className="img-fluid rounded-5"
                  />
                )}
              </div>
              {isLoggedIn && (
                <Table bordered striped className="text-center">
                  <tbody>
                    <tr>
                      <td>USER ID</td>
                      <td>USER{loggedInUserDetails?.userId}</td>
                    </tr>
                    <tr>
                      <td>FULL NAME</td>
                      <td>{loggedInUserDetails?.name}</td>
                    </tr>
                    <tr>
                      <td>USERNAME</td>
                      <td>{loggedInUserDetails?.username}</td>
                    </tr>
                    <tr>
                      <td>ABOUT</td>
                      <td>{loggedInUserDetails?.about}</td>
                    </tr>
                  </tbody>
                </Table>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Profile;
