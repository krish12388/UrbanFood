import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
const Login = () => {
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const googleReasponse = async (authResult: any) => {
    try {
      const result = await axios.post(`${authService}/api/user/login`, {
        code: authResult["code"],
      });
      console.log("googleReasponse");
      localStorage.setItem("token", result.data.token);
      toast.success(result.data.message);
      setLoading(false);
      navigate("/");
    } catch (e) {
      console.log(e);
      toast.error("problem in login");
      setLoading(false);
    }
  };
  const googleLogin = useGoogleLogin({
    onSuccess: googleReasponse,
    onError: googleReasponse,
    flow: "auth-code",
  });
  return (
    <>
      <main className="flex items-center justify-center h-screen">
          <div className="text-center h-[70%] w-[50%] flex items-center justify-center flex-col gap-4 bg-[#f8f6ec] p-8 rounded-xl border-2 border-slate-600">
            <h1 className="text-4xl font-bold stroke-1 stroke-black text-[#e8aa58f1]">UrbanFood</h1>
            <p className="text-lg font-medium">Login or signup to continue</p>

            <button
              onClick={() => googleLogin()}
              disabled={Loading}
              className="mt-4 px-4 py-2 text-slate-500 font-medium flex justify-center items-center gap-2 border-2 rounded-md hover:bg-blue-300 hover:text-black"
            >
              <FcGoogle size={20} />
              {Loading ? "signing in ....": "Login with Google" }
            </button>
            <p className="text-lg font-medium">
              By continuing you agree with our{" "}
              <span className="text-md font-bold text-[#e31977]">
                Terms of Service & <span>privacy policy</span>
              </span>
            </p>
          </div>
      </main>
    </>
  );
};

export default Login;
