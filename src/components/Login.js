import React from "react";
import * as con from "../constants";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ollp from "../images/online learning login.png";
import { useTranslation } from "react-i18next";
import LangChgDropDown from "./common/LangChgDropDown";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  // useEffect(()=>{
  //   const lCode = localStorage.getItem('i18nextLng') || 'en'
  //   i18next.changeLanguage(lCode);
  // },[])

  const handleSubmit = (event) => {
    console.log(event);
    event.preventDefault();
    var data = {
      emailId: event.target.email.value,
      password: event.target.password.value,
    };

    axios
      .post(con.BASE_URI + "/user/validate", data)
      .then((response) => {
        if (response.data.isValid && !response.data.isAdmin) {
          localStorage.setItem("userId", response.data["info"]);
          navigate("/home");
        } else if (response.data.isValid && response.data.isAdmin) {
          localStorage.setItem("userId", response.data["info"]);
          navigate("/adminhome");
        } else alert("Invalid credentials");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="Login">
      <LangChgDropDown></LangChgDropDown>
      <div className="container-fluid">
        <div className="row m-0">
          <div className="d-none d-lg-block col-lg-6 col-md-0 col-sm-0 col-xs-0 d-flex align-items-center justify-content-content">
            <img src={ollp} className="img-fluid w-100" alt="" />
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 pt-5">
            <div className="d-flex flex-column gap-4 justify-content-center align-items-center h-100">
              <h1 className="font-weight-bold">{t("Welcome")}</h1>
              <form
                onSubmit={handleSubmit}
                className="d-flex flex-column gap-3 w-75"
              >
                <TextField
                  // style={{ width: '80%' }}
                  // margin="normal"
                  required
                  id="email"
                  label={t("Email")}
                  name="email"
                />
                <FormControl
                  required
                  name="password"
                  fullWidth
                  variant="outlined"
                >
                  <InputLabel htmlFor="password" id="password-label">
                    {t("Password")}
                  </InputLabel>
                  <OutlinedInput
                    id="password"
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
                    label={t("Password")}
                  />
                </FormControl>
                {/*<TextField
                  // style={{ width: '80%' }}
                  // margin="normal"
                  required
                  fullWidth
                  name="password"
                  label={t("Password")}
                  type="password"
                  id="password"
                />*/}

                <i
                  class="fa fa-eye"
                  id="togglePassword"
                  style={{ marginLeft: `-30px`, cursor: `pointer` }}
                ></i>
                <div className="text-center">
                  <button
                    className="btn btn-outline-primary btn-lg"
                    type="submit"
                  >
                    {t("loginAccount")}
                  </button>
                </div>
              </form>

              <div>
                <p className="lead">
                  {t("NoAccount")}
                  <Link to="/signup">{t("Register")}</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
