import React, { useState } from "react";
import styles from "./Login.module.css";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import Logo from "../../assets/aiposlab_logo.svg";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import Cookies from "js-cookie";
import { googleLogin, login } from "../../api/auth";
import { useTranslation } from "react-i18next";

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setApiError(null);
    const newErrors: { email?: string; password?: string } = {};

    if (!validateEmail(email)) {
      newErrors.email = t("Login.invalidEmail");
    }

    if (!validatePassword(password)) {
      newErrors.password = t("Login.invalidPassword");
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    } else {
      setErrors({});
    }

    try {
      const response = await login(email, password);

      if (!response.ok) {
        const errorData = await response.json();
        setApiError(errorData.message || t("Login.loginFailed"));
        return;
      }

      const result = await response.json();
      Cookies.set("userId", result.data, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      }); // Save user ID to cookies

      console.log("Login successful, navigating to /brand-setup");
      navigate("/brand-setup");
    } catch (error) {
      setApiError(t("Login.invalidCredentials"));
      console.error("Login error", error);
    }
  };

  const handleGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    if (credentialResponse.credential) {
      try {
        setApiError(null);
        const response = await googleLogin(credentialResponse.credential);

        if (!response.ok) {
          console.error("Google login failed");
          return;
        }

        const data = await response.json();
        Cookies.set("userId", data.userId, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        }); // Save user ID to cookies

        console.log("Google login successful, navigating to /brand-setup");
        navigate("/brand-setup");
      } catch (error) {
        console.error("Google login error", error);
      }
    }
  };

  const handleGoogleError = () => {
    console.error("Google Sign-In failed");
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className={styles.contentContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.logoContainer}>
            <img src={Logo} alt={t("Login.logoAlt")} className={styles.logo} />
          </div>
          <div className={styles.loginBox}>
            <h1 className={styles.loginTitle}>{t("Login.title")}</h1>
            <p className={styles.subTitle}>{t("Login.subTitle")}</p>

            <div className={styles.socialLogin}>
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleError}
                containerProps={{ className: styles.googleButton }}
              />
            </div>
            <div className={styles.separator}>
              <div className={styles.separatorLine}></div>
              <span>{t("Login.or")}</span>
              <div className={styles.separatorLine}></div>
            </div>

            <div className={styles.inputContainer}>
              <input
                type="email"
                className={styles.inputBox}
                placeholder={t("Login.emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className={styles.errorText}>{errors.email}</p>
              )}
              <div className={styles.passwordContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  className={styles.inputBox}
                  placeholder={t("Login.passwordPlaceholder")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className={styles.eyeIcon}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && (
                <p className={styles.errorText}>{errors.password}</p>
              )}
            </div>
            {apiError && <p className={styles.errorText}>{apiError}</p>}
            <p className={styles.description}>{t("Login.forgotPassword")}</p>
          </div>
          <div className={styles.footer}>
            <button className={styles.loginButton} type="submit">
              {t("Login.loginButton")}
            </button>

            <p className={styles.signUpText}>
              {t("Login.noAccount")}{" "}
              <span
                className={styles.signUpLink}
                onClick={() => navigate("/sign-up")}
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                {t("Login.signUp")}
              </span>
            </p>
          </div>
        </form>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
