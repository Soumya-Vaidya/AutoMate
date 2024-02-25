import { Link } from "react-router-dom";
import { RegisterForm } from "@/components/RegisterForm";

export default function Landing() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col-md-6"
          style={{
            backgroundColor: "#B5EECB",
            backgroundImage: "url(/bg_landing_transparent.png)",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            position: "relative",
            height: "100vh", // Set a minimum height for the image column
          }}
        >
          <h1
            className="display-4 fw-bold text-body-emphasis"
            style={{
              fontSize: "2.5rem",
              position: "absolute",
              top: "10%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            AutoMate
          </h1>
          <p
            className="lead fw-bold text-body-emphasis"
            style={{
              fontSize: "1.5rem",
              fontStyle: "italic",
              position: "absolute",
              top: "20%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            Find a Mate for every Auto ride!
          </p>
        </div>
        <div className="col-md-6 p-4">
          <div className="text-center">
            <h1
              className="fw-bold text-body-emphasis"
              style={{ fontSize: "2rem" }}
            >
              Create an account
            </h1>
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
