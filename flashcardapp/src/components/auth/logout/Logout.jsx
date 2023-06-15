import React from "react";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

export default function Logout({ setToken }) {
  const navigate = useNavigate();

  // Build a sign out function
  const signout = () => {
    locatStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const style = {
    float: "right",
    margin: ".5em",
  };

  return (
    <>
      <Button style={style} onClick={signout} color="danger" outline>
        Signout
      </Button>
    </>
  );
}
