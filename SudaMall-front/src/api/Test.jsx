import React from "react";
import axios from "axios";

const Test = () => {
  const sendSignupRequest = async () => {
    try {
      const response = await axios.post(
        "https://sudamall.ddns.net/api/v1/accounts/signup/user/",
        {
          email: "test@example.com",
          first_name: "Test",
          last_name: "User",
        //   profile_picture: null,
          password: "testpassword123",
          gender: "M",
          phone_number: "+249912345678",
          whatsapp_number: "+249912345678"
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      console.log("Signup success:", response.data);
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
    }
  };

  return <button onClick={sendSignupRequest}>Send Test Signup</button>;
};

export default Test
