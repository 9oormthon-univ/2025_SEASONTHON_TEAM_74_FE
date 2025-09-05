import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useAuthStore } from "../context/authStore";
import axios from "axios";

const KakaoRedirect = () => {
  const navigate = useNavigate();
  const hasExecuted = useRef(false);

  const { login } = useAuthStore();

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    if(!code || hasExecuted.current) return ;
    
    console.log("인가코드: ", code);
    hasExecuted.current = true;

    const handleKakaoLogin = async () => {
      try {
        const res = await axios.post(`${API_BASE_URL}/api/user/callback?code=${code}`);

        if(res.data.isSuccess) {
          console.log("로그인 후 응답: ", res.data);
          const userData = res.data.result;

          // jwt와 사용자 정보 저장
          login({
            id: userData.id,
            email: userData.email,
            nickname: userData.nickname,
            accessToken: userData.accessToken,
          });

          navigate("/home");
        }
        else {
          console.log("로그인 실패: ", res.data.message);
        }
      }
      catch (err) {
        console.log("카카오 로그인 처리 중 에러 발생: ", err);
        console.log("에러 응답 데이터: ", err.response?.data); // 서버에서 보낸 에러 메시지
        console.log("요청 URL: ", `${API_BASE_URL}/api/user/callback?code=${code}`);

        navigate("/");
      }
    };
    
    handleKakaoLogin();
  }, [code]); // 사용자가 로그인할 때마다 로그인 API 호출한다.

  return (
    <>
      <h1>로그인 중입니다.</h1>
      <h3>잠시만 기다려주세요.</h3>
    </>
  );
};

export default KakaoRedirect;