import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import { useTranslation } from "react-i18next";
import styles from "./Signup.module.css";
import Logo from "../../assets/aiposlab_logo.svg";
import { googleSignup, signup } from "../../api/auth";

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const SignUp: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};

    if (!validateEmail(email)) {
      newErrors.email = t("Signup.invalidEmail");
    }

    if (!validatePassword(password)) {
      newErrors.password = t("Signup.invalidPassword");
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const response = await signup(fullName, email, password);

    if (response.ok) {
      navigate("/payment");
    } else {
      const errorData = await response.json();
      setApiError(errorData.message || t("Signup.signupFailed"));
    }
  };

  const handleGoogleSuccess = async (response: CredentialResponse) => {
    const token = response.credential;
    if (!token) return;

    const googleResponse = await googleSignup(token);

    if (googleResponse.ok) {
      navigate("/payment");
    } else {
      console.error("Google Sign-In failed");
    }
  };

  const handleGoogleError = () => {
    console.error("Google Sign-In failed");
  };

  return (
    <GoogleOAuthProvider
      clientId={
        GOOGLE_CLIENT_ID ||
        "425168771270-ij6h8917dmfpcf73tbos8eimpe6le2oh.apps.googleusercontent.com"
      }
    >
      <div className={styles.contentContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.logoContainer}>
            <img src={Logo} alt="Your Brand Logo" className={styles.logo} />
          </div>
          <div className={styles.signUpBox}>
            <h1 className={styles.title}>{t("Signup.title")}</h1>
            <p className={styles.subtitle}>{t("Signup.subtitle")}</p>
            <div className={styles.socialLogin}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                containerProps={{ className: styles.googleButton }}
              />
            </div>
            <div className={styles.separator}>
              <div className={styles.separatorLine}></div>
              <span>or</span>
              <div className={styles.separatorLine}></div>
            </div>

            <div className={styles.inputContainer}>
              <input
                type="text"
                className={styles.inputBox}
                placeholder={t("Signup.fullNamePlaceholder")}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <input
                type="email"
                className={styles.inputBox}
                placeholder={t("Signup.emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className={styles.errorText}>{t("Signup.invalidEmail")}</p>
              )}
              <input
                type="password"
                className={styles.inputBox}
                placeholder={t("Signup.passwordPlaceholder")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className={styles.errorText}>
                  {t("Signup.invalidPassword")}
                </p>
              )}
              {apiError && (
                <p className={styles.errorText}>{t("Signup.signupFailed")}</p>
              )}
              <p className={styles.description}>
                {t("Signup.agreementText")}{" "}
                <span
                  className={styles.link}
                  onClick={() => navigate("/terms-of-use")}
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  {t("Signup.termsOfUse")}
                </span>
                .
              </p>
            </div>
          </div>
          <div className={styles.footer}>
            <button className={styles.signUpButton} type="submit">
              {t("Signup.signUpButton")}
            </button>

            <p className={styles.loginText}>
              {t("Signup.haveAccount")}{" "}
              <span
                className={styles.loginLink}
                onClick={() => navigate("/login")}
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                {t("Signup.login")}
              </span>
            </p>
          </div>
        </form>
      </div>
    </GoogleOAuthProvider>
  );
};

export default SignUp;
