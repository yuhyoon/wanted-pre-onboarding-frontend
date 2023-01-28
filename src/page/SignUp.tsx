import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

type ProfileType = {
  email: string;
  password: string;
};

type ProfileValidation = {
  email: boolean;
  password: boolean;
};

const UserProfileForm = styled.form`
  width: 80%;
  padding: 0 30px;
  margin: 0 auto;
  input {
    display: block;
    width: 100%;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 5px 20px;
    font-size: 1.3rem;
    border: 1px solid black;
    margin-bottom: 20px;
  }
  button[type="submit"] {
    width: 100%;
    font-size: 1.3rem;
    margin-top: 20px;
  }
`;

const SignUp = () => {
  const [profile, setProfile] = useState<ProfileType>({
    email: "",
    password: "",
  });
  const [validation, setValidation] = useState<ProfileValidation>({
    email: false,
    password: false,
  });

  //유효성검사에 사용되는 정규식표현
  const emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
  const passwordRegex = /.{8,}/;

  const navigate = useNavigate();

  //유효성검사
  const isAvailable = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });

    if (name === "email") {
      emailRegex.test(value)
        ? setValidation({ ...validation, email: true })
        : setValidation({ ...validation, email: false });
    } else if (name === "password") {
      passwordRegex.test(value)
        ? setValidation({ ...validation, password: true })
        : setValidation({ ...validation, password: false });
    }
  };

  const submitSignupForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("/users/create", profile)
      .then((res) => {
        console.log(res);
        if (res.statusText === "Created") {
          window.confirm("회원가입이 완료되었습니다. 로그인 하시겠습니까?") &&
            navigate("/login");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <>
      <h2>회원가입</h2>
      <UserProfileForm onSubmit={submitSignupForm}>
        <input
          data-testid="email-input"
          type={"email"}
          id={"email"}
          name={"email"}
          placeholder={"이메일을 입력해주세요"}
          required={true}
          onChange={isAvailable}
        ></input>
        <input
          data-testid="password-input"
          type={"password"}
          id={"password"}
          name={"password"}
          placeholder={"비밀번호를 입력해주세요"}
          required={true}
          onChange={isAvailable}
        ></input>
        <Link to="/login">계정이 있다면? 로그인</Link>
        <button
          data-testid="signup-button"
          type="submit"
          disabled={validation.email && validation.password ? false : true}
        >
          완료
        </button>
      </UserProfileForm>
    </>
  );
};

export default SignUp;
