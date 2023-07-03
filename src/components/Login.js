import { Button, Container, TextField } from "@mui/material";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(uname, password);

    try {
      // const response = await axios.post(
      //   "/login",
      //   JSON.stringify({ username: uname, password }),
      //   {
      //     headers: {
      //       accept: "application/json",
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      // console.log(JSON.stringify(response?.data));
      // console.log(response);
      // const accessToken = response?.data?.token;
      // setAuth({ uname, password, accessToken });
      setAuth({ uname, password });
      setUname("");
      setPassword("");
      navigate("/admin");
    } catch (err) {
      console.log("error found ", err);
      alert("ERROR while logging-in");
    }
    // setLogin(true);
  };

  // JSX code for login form
  const renderForm = (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <TextField
        name="uname"
        id="outlined-required"
        label="Username"
        value={uname}
        onChange={(e) => setUname(e.target.value)}
        required
      />
      <FormControl sx={{ margin: "0.5rem 0" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </FormControl>

      <p
        style={{
          fontFamily:
            'Cambria, Cochin, Georgia, Times, "Times New Roman", serif',
          color: "#6c6763",
          paddingRight: "1rem",
        }}
      >
        New User ? Create a new account !{" "}
        <Link
          to={"./register"}
          style={{ color: "blue", textDecoration: "underline" }}
        >
          Register
        </Link>
      </p>
      <Button onClick={(e) => handleSubmit(e)} variant="contained">
        Login
      </Button>
    </form>
  );
  return (
    <section>
      <Container
        sx={{
          margin: "7rem auto",
          paddingTop: "1rem",
          paddingBottom: "2rem",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
        maxWidth="sm"
      >
        <div style={{ paddingLeft: "3rem", paddingRight: "3rem" }}>
          <h2
            style={{
              fontFamily:
                'Cambria, Cochin, Georgia, Times, "Times New Roman", serif',
              color: "#6c6763",
              paddingRight: "1rem",
            }}
          >
            Login
          </h2>
          {renderForm}
        </div>
      </Container>
    </section>
  );
};
export default Login;
