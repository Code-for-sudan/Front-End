import React, { useEffect } from "react";

const GoogleButton = () => {
  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: "YOUR_CLIENT_ID",
        callback: handleCredentialResponse,
      });

      google.accounts.id.renderButton(
        document.getElementById("google-login-button"),
        {
          theme: "outline",
          size: "large",
          text: "signin_with", 
          shape: "rectangular",
          width: "100%",
        }
      );
    }
  }, []);

  const handleCredentialResponse = (response) => {
    const token = response.credential;
    console.log("Google Token:", token);

    fetch("http://142.93.43.88:8000/api/auth/google/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Login Success:", data);

      })
      .catch((err) => console.error(err));
  };

  return (
    <div id="google-login-button" className="mt-6 flex justify-center"></div>
  );
};

export default GoogleButton;
