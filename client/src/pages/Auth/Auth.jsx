import React, { useState } from "react";
import "./Auth.css";
import { logIn, signUp } from "../../actions/AuthActions.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const initialState = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpass: "",
  };
  const states = [
    {
      name: "Ariana",
      id: "1",
    },
    {
      name: "Béja",
      id: "2",
    },
    {
      name: "Ben Arous",
      id: "3",
    },
    {
      name: "Bizerte",
      id: "4",
    },
    {
      name: "Gabès",
      id: "5",
    },
    {
      name: "Gafsa",
      id: "6",
    },
    {
      name: "Jendouba",
      id: "7",
    },
    {
      name: "Kairouan",
      id: "8",
    },
    {
      name: "Kasserine",
      id: "9",
    },
    {
      name: "Kebili",
      id: "10",
    },
    {
      name: "Kef",
      id: "11",
    },
    {
      name: "Mahdia",
      id: "12",
    },
    {
      name: "Manouba",
      id: "13",
    },
    {
      name: "Medenine",
      id: "14",
    },
    {
      name: "Monastir",
      id: "15",
    },
    {
      name: "Nabeul",
      id: "16",
    },
    {
      name: "Sfax",
      id: "17",
    },
    {
      name: "Sidi Bouzid",
      id: "18",
    },
    {
      name: "Siliana",
      id: "19",
    },
    {
      name: "Sousse",
      id: "20",
    },
    {
      name: "Tataouine",
      id: "21",
    },
    {
      name: "Tozeur",
      id: "22",
    },
    {
      name: "Tunis",
      id: "23",
    },
    {
      name: "Zaghouan",
      id: "24",
    },
  ];
  const loading = useSelector((state) => state.authReducer.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgot, setForgot] = useState(false);
  const [reset, setReset] = useState(false);
  const [data, setData] = useState(initialState);

  const [confirmPass, setConfirmPass] = useState(true);

  // Reset Form
  const resetForm = () => {
    setData(initialState);
    setConfirmPass(confirmPass);
  };

  // handle Change in input
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Form Submission
  const handleSubmit = (e) => {
    setConfirmPass(true);
    e.preventDefault();
    if (isSignUp) {
      data.password === data.confirmpass
        ? dispatch(signUp(data, navigate))
        : setConfirmPass(false);
    } else {
      dispatch(logIn(data, navigate));
    }
  };

  return (
    <section className="Auth">
      {/* left side */}

      <div className="a-left">
        {/* <img src={Logo} alt="" /> */}

        <div className="Webname">
          <h1>T-Link</h1>
          <h6>Welcome to our community</h6>
        </div>
      </div>

      {/* right form side */}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>
            {isForgot ? "Reset your Password" : isSignUp ? "Register" : "Login"}
          </h3>

          {!isForgot &&
            (isSignUp ? (
              <div className="form_input">
                <input
                  required
                  type="text"
                  placeholder="First Name"
                  className="infoInput"
                  name="firstname"
                  value={data.firstname}
                  onChange={handleChange}
                />
                <input
                  required
                  type="text"
                  placeholder="Last Name"
                  className="infoInput"
                  name="lastname"
                  value={data.lastname}
                  onChange={handleChange}
                />
              </div>
            ) : (
              ""
            ))}
          {reset ? (
            <div className="form_input">
              <input
                required
                type="password"
                className="infoInput"
                placeholder="Password"
                name="password"
                value={data.password}
                onChange={handleChange}
              />
            </div>
          ) : (
            <div className="form_input">
              <input
                required
                type="text"
                placeholder="E-mail"
                className="infoInput"
                name="email"
                value={data.email}
                onChange={handleChange}
              />
            </div>
          )}

          {!isForgot && (
            <div className="form_input">
              <input
                required
                type="password"
                className="infoInput"
                placeholder="Password"
                name="password"
                value={data.password}
                onChange={handleChange}
              />
              {isSignUp && (
                <input
                  required
                  type="password"
                  className="infoInput"
                  name="confirmpass"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                />
              )}
            </div>
          )}
          {isSignUp && (
            <div className="form_input">
              <select
                className="infoInput"
                name="region"
                id="region"
                onChange={handleChange}
              >
                <option className="infoInput" value="none">
                  select your state
                </option>
                {states.map((state) => (
                  <option value={state.name} key={state.id}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <span
            style={{
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
              display: confirmPass ? "none" : "block",
            }}
          >
            *Confirm password is not same
          </span>
          <div className="form_input">
            <div className="linksText">
              <p
                style={{
                  fontSize: "12px",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={() => {
                  resetForm();
                  setForgot(false);
                  setIsSignUp((prev) => !prev);
                }}
              >
                {isSignUp
                  ? "Already have an account Login"
                  : "Don't have an account Sign up"}
              </p>
              <p
                style={{
                  fontSize: "12px",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={() => {
                  setForgot((prev) => !prev);
                }}
              >
                {!isForgot ? "Forget Password !?" : ""}
              </p>
            </div>
            <button
              className="button infoButton"
              type="Submit"
              disabled={loading}
            >
              {loading ? "Loading..." : isSignUp ? "SignUp" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Auth;
