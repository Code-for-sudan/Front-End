import api from "./Api";
import { TokenService } from "../auth/tokenService";
import axios from "axios";
import { toast } from "react-toastify";

/**
 * Registers a new user account.
 *
 * @param {Object} formData - User registration data.
 * @returns {Promise<Object>} - API response data.
 */
export const signupUser = async (formData) => {
  const response = await axios.post("https://sudamall.ddns.net/api/v1/accounts/signup/user/", formData);
  return response.data;
};

/**
 * Registers a new business (store owner) account.
 *
 * @param {Object} formData2 - Business registration data.
 * @returns {Promise<Object>} - API response data.
 */
export const registerBusiness = async (formData2) => {
  const response = await axios.post('https://sudamall.ddns.net/api/v1/accounts/signup/business/', formData2);
  return response.data;
};

/**
 * Logs the user in and stores the access token.
 *
 * @param {Object} credentials - User login credentials.
 * @param {string} credentials.email - User email.
 * @param {string} credentials.password - User password.
 * @param {boolean} credentials.rememberMe - Whether to persist the token.
 * @returns {Promise<Object>} - API response including user info and token.
 */
export const login =  async ({ email, password, rememberMe }) => {
  const response = await api.post("/auth/login/", { email, password });
  const { access_token } = response.data;
  TokenService.setAccessToken(access_token, rememberMe);
  return response.data;
};

/**
 * Resends the email verification link to the user.
 *
 * @param {string} email - User email address.
 * @returns {void}
 * @sideEffect - Shows a toast notification with the result.
 */
export const resendVerification = async (email) => {
  try {
    const res = await axios.post(
      "https://sudamall.ddns.net/api/v1/auth/resend-verification/",
      { email }
    );

    let successMsg = res.data.message;

    if (successMsg === "A new verification link has been sent to your email address.") {
      successMsg = "تم إرسال رابط تفعيل جديد إلى بريدك الإلكتروني";
    } else if (!successMsg) {
      successMsg = "تم إرسال رابط التفعيل مرة أخرى بنجاح";
    }

    toast.success(successMsg);

  } catch (error) {
    const msg =
      error.response?.data?.message ||
      "حدث خطأ أثناء محاولة إعادة إرسال رابط التفعيل.";
    toast.error(msg);
  }
};

/**
 * Verifies a user's account using the provided token.
 *
 * @param {string} token - Activation token from the verification link.
 * @returns {Promise<Object>} - API response confirming activation.
 */
export const verifyAccount = async (token) => {
  const response = await axios.post("https://sudamall.ddns.net/api/v1/auth/activate-account/", { token });
  return response.data;
};
