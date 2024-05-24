import React, { useState } from "react";
import "./Login.css";
import img2 from "../../Assets/image/loginimage.png";
import InputField from "../../components/input/index";
import Button from "../../components/button";
import { ADD_LOGIN } from "../../services/ApiService";
import { useDispatch } from "react-redux";
import { addUser } from "../../Store/reducer";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [selectField, setSelectField] = React.useState({
    username: "",
    password: "",
  });
  const initialState = {
    username: "",
    password: "",
  };
  const dispatch = useDispatch();
  const [error, setError] = useState(initialState);
  const handelChange = (name, value) => {
    setError({});
    setSelectField({ ...selectField, [name]: value });
  };
  const Validate = () => {
    let username = "";
    let password = "";

    if (Object.keys(selectField).length === 0) {
      username = "Please enter your username";
      password = "Please enter your password";
    }

    if (
      selectField["username"] === undefined ||
      selectField["username"] === ""
    ) {
      username = "Please enter username";
    }
    if (
      selectField["password"] === undefined ||
      selectField["password"] === ""
    ) {
      password = "Please enter password";
    }

    if (username !== "" || password !== "") {
      setError({ username, password });
      return false;
    }

    return true;
  };
  const Login = async () => {
    let validate = Validate();
    if (validate === true) {
      console.log("second");
      setError({});
      let response;
      try {
        response = await ADD_LOGIN({ ...selectField });
        if (response.success === true) {
          localStorage.setItem("token", response.token);
          dispatch(addUser(response));
          // _getGeneralInfo(response.response.token)
          navigate("/dashboard");
          // window.location.pathname = '/dashboard'
          localStorage.setItem("username", selectField["username"]);
        } else {
          alert(response.error);
        }
      } catch (error) {
        alert(error.message);
      }
    }
  };
  return (
    <div className="loginpage" style={{ backgroundColor: "#3781bd" }}>
      <div className="login_body_one" style={{ backgroundColor: "white" }} />
      <div className="login_body_two" style={{ backgroundColor: "white" }}>
        <div className="loginbg">
          <img className="loginbg1" src={img2} alt="logo1" />
          <div className="login_card">
            <div className="card-body">
              <div className="card-title">Login</div>
              <div>
                <div>
                  <InputField
                    type={"text"}
                    classNameInLabel="username"
                    name="Username"
                    keyname={"username"}
                    label={"username"}
                    width={"90%"}
                    inputType={"emailType"}
                    avoidSplChar={true}
                    value={selectField["username"]}
                    onChange={handelChange}
                    placeholder={"Enter your username"}
                    onKeyPress={true}
                  />
                  <p className="error-msg">{error.username}</p>
                </div>
                <div style={{ position: "relative" }}>
                  <InputField
                    type={"password"}
                    label={"Password"}
                    classNameInLabel="hr_login_password_field_label"
                    name="Password"
                    width={"90%"}
                    keyname={"password"}
                    value={selectField["password"]}
                    onChange={handelChange}
                    placeholder={"Password"}
                    onKeyPress={true}
                  />
                  <p className="error-msg">{error.password}</p>
                </div>
                <Button
                  type="submit"
                  name="login"
                  onClick={() => {
                    Login();
                  }}
                />
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
