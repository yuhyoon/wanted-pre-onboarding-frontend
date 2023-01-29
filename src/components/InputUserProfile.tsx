import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import instance from "../api/instance";

type ProfileType = {
  email: string;
  password: string;
};

type ProfileValidation = {
  email: boolean;
  password: boolean;
};

interface InputUserProfileProps {
  location: string;
  attr: string;
}

interface ErrorMessage {
  display: string;
}

const UserProfileForm = styled.form`
  width: 80%;
  padding: 0 30px;
  margin: 0 auto;
  div {
    margin-bottom: 20px;
  }
  input {
    display: block;
    width: 100%;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 5px 20px;
    font-size: 1.3rem;
    border: 1px solid black;
    margin-bottom: 4px;
  }
  button[type="submit"] {
    width: 100%;
    font-size: 1.3rem;
    margin-top: 20px;
  }
`;

const ErrorMessage = styled.label<{ display: string }>`
  display: ${(props) => props.display};
  color: red;
  text-align: left;
`;

const InputUserProfile = ({ location, attr }: InputUserProfileProps) => {
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

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  //유효성검사
  const isAvailable = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(validation);
    if (e.target.name === "email") {
      emailRegex.test(profile.email)
        ? setValidation({ ...validation, email: true })
        : setValidation({ ...validation, email: false });
    } else if (e.target.name === "password") {
      passwordRegex.test(profile.password)
        ? setValidation({ ...validation, password: true })
        : setValidation({ ...validation, password: false });
    }
  };

  const submitSignupForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    instance
      .post(`/auth/${attr}`, profile)
      .then((res) => {
        console.log(res);
        if (res.status === 201 && res.statusText === "Created") {
          window.confirm("회원가입이 완료되었습니다. 로그인 하시겠습니까?") &&
            navigate(`/${location}`);
        } else if (res.status === 200) {
          localStorage.setItem("access_token", res.data.access_token);
          navigate(`/${location}`);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <UserProfileForm onSubmit={submitSignupForm}>
      <div>
        <input
          data-testid="email-input"
          type={"email"}
          id={"email"}
          name={"email"}
          placeholder={"이메일을 입력해주세요"}
          required={true}
          onChange={inputHandler}
          onBlur={isAvailable}
        ></input>
        {validation.email ? (
          <ErrorMessage display="none" />
        ) : (
          <ErrorMessage display="block">
            "이메일 양식에 맞게 작성해 주세요"
          </ErrorMessage>
        )}
      </div>
      <div>
        <input
          data-testid="password-input"
          type={"password"}
          id={"password"}
          name={"password"}
          placeholder={"비밀번호를 입력해주세요"}
          required={true}
          onChange={inputHandler}
          onBlur={isAvailable}
        ></input>
        {validation.password ? (
          <ErrorMessage display="none" />
        ) : (
          <ErrorMessage display="block">
            "비밀번호는 최소 8자 이상이어야 합니다"
          </ErrorMessage>
        )}
      </div>
      {/* signup 페이지 에서만 보이도록 변경할 것 */}
      <Link to={`/${location}`}>계정이 있다면? 로그인</Link>
      <button
        data-testid={`${attr}-button`}
        type="submit"
        disabled={validation.email && validation.password ? false : true}
      >
        완료
      </button>
    </UserProfileForm>
  );
};

export default InputUserProfile;
