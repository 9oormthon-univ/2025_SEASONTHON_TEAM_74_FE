import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const KakaoRedirect = (props) => {
  const navigate = useNavigate();

  const code = new URL(window.location.href).searchParams.get("code");
  console.log("인가코드: ", code);

  useEffect(() => {
    if(!code) return ;

    const handleKakaoLogin = async () => {
      try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/callback`, { 
          code: code,
        });

        if(res.data.isSuccess) {
          console.log("로그인 후 응답: ", res.data);
          const { accessToken, id, email, nickname } = res.data.result;

          // jwt와 사용자 정보 저장
          localStorage.setItem("token", accessToken);
          localStorage.setItem("user_id", String(id));
          localStorage.setItem("user_email", email);
          localStorage.setItem("user_nickname", nickname);

          navigate("/home");
        }
        else {
          console.log("로그인 실패: ", res.data.message);
        }
      }
      catch (err) {
        console.log("카카오 로그인 처리 중 에러 발생: ", err);
        navigate("");
      }
    };
    
    handleKakaoLogin();
  }, [code, navigate]); // 의존성 배열에 props.his

  return (
    <>
      <h1>로그인 중입니다.</h1>
      <h3>잠시만 기다려주세요.</h3>
    </>
  );
};

export default KakaoRedirect;