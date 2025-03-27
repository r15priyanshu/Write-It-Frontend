import { Link } from "react-router";
import { Card } from "reactstrap";

import writeItImage from "../assets/public-images/write-it-image.jpg";

function Home() {
  return (
      <div className="Home container" style={{ minHeight: "500px" }}>
        <Card
          className="p-3 m-3"
          style={{ backgroundColor: "rgb(255,255,255,0.9)" }}
        >
        <h3 style={{
              textAlign: "center",
              color: "#BB2D3B",
              fontStyle:"italic"
            }}>Hey There..</h3>
          <h1
            style={{
              textAlign: "center",
              color: "#212529",
              fontStyle:"italic"
            }}
            className="m-2 rounded-5"
          >
          </h1>
          <div className="container text-center">
            <img
              src={writeItImage}
              alt="Blog Image"
              height={"250px"}
              width={"300px"}
              className="rounded-5"
            />
            <br />
            <Link to="/signup" className="btn btn-sm btn-danger mt-2 mb-4">
              SignUp Now
            </Link>
            <h3>Why Us ??</h3>
            <ul style={{listStyle:"none"}}>
              <li>Ease of Use...</li>
              <li>Support from Real People...</li>
              <li>A Really Good Content Editor...</li>
              <li>Ability to Manage Many Bloggers...</li>
              <li>Share Share Share...</li>
            </ul>
          </div>
        </Card>
      </div>
  );
}

export default Home;
