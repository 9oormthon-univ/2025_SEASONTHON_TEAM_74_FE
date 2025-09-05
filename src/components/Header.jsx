import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../context/authStore';

import styled from 'styled-components';
import "./../assets/styles/variables.css";
import right from "./../assets/images/right.png";

const Header = () => {
  const navigate = useNavigate();
  const {user} = useAuthStore();

  const navigateToHome = () => {
    navigate("/");
  }

  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  const handleKakaoLogin = () => {
    if (!REST_API_KEY || !REDIRECT_URI) {
      console.error('카카오 로그인 설정이 완료되지 않았습니다. 환경 변수를 확인해주세요.');
      alert('로그인 기능을 준비 중입니다. 잠시만 기다려주세요.');
      return;
    }
    
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoURL;
  };

  return (
    <HeaderWrapper>
      <HeaderLeft onClick={navigateToHome}>
        motu
      </HeaderLeft>

      <HeaderRight>
        {!user ? (
          <>
            <LoginInfo>
              로그인을 먼저 진행해주세요!
              <img src={right} alt="오른쪽"/>
            </LoginInfo>
            <LogButton onClick={handleKakaoLogin}>
              로그인 | 회원가입
            </LogButton>
          </>
        ) : (
          <>
            <WelcomeText>{user}님, 반갑습니다.</WelcomeText>
            <LogButton>로그아웃</LogButton>
          </>
        )}


        
      </HeaderRight>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 80px;
  border-bottom: 2px solid var(--color-text);
  padding: 0 100px;  
`;


const HeaderLeft = styled.div`
  padding: 10px 30px;
  font-size: 24px;
  font-weight: 600;

  cursor: pointer;
`;


const HeaderRight = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const LoginInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 250px;
  height: 60px;
  background-color: var(--color-primary);
  color: var(--color-text);
  font-size: 18px;
  font-weight: 400;
  padding: 0px 20px;
  border-radius: 8px;
  text-align: left;

  img {
    width: 13px;
    height: 11px;
  }
`;

const LogButton = styled.button`
  font-size: 20px;
  color: var(--color-text);
  background-color: var(--color-background);
  border: none;
  border-radius: 10px;
  margin: 0px 30px 0px 20px;


  padding: 6px 12px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: var(--color-tertiary);
    color: #fff;
  }
`;

const WelcomeText = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: var(--color-text);
`;

