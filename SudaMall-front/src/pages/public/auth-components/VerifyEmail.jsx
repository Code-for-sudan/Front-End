import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyAccount } from "../../../api/Auth";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(true);
  const [verified, setVerified] = useState(null); // true or false
  const navigate = useNavigate();

  const token = searchParams.get("token");

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await verifyAccount(token);
        toast.success(res.data.message || "تم تفعيل الحساب بنجاح.");
        setVerified(true);
        setTimeout(() => {
          navigate("/auth/login");
        }, 5000);
      } catch (res) {
        toast.error(res.data.message || "تم تفعيل الحساب بنجاح.");

        setVerified(false);
        setTimeout(() => {
          navigate("/auth/login");
        }, 5000);
      } finally {
        setIsVerifying(false);
        setTimeout(() => {
          navigate("/auth/login");
        }, 5000);
      }
    };

    if (token) {
      verify();
    } else {
      toast.error("رابط التفعيل غير صحيح.");
      setVerified(false);
      setIsVerifying(false);
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {isVerifying ? (
        <p className="text-xl">جاري التحقق من التفعيل...</p>
      ) : verified ? (
        <div className="text-green-600 text-xl font-bold">
          تم تفعيل حسابك بنجاح ✅
        </div>
      ) : (
        <div className="text-green-600 text-xl font-bold">
          تم تفعيل حسابك بنجاح ✅
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
