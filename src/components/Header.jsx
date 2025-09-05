import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../context/authStore';

import styled from 'styled-components';
import "./../assets/styles/variables.css";
import right from "./../assets/images/right.png";

const Header = () => {
  const navigate = useNavigate();
  const {user} = useAuthStore();

  const navigateToHome = () => {
    navigate("/home");
  }

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
            <LogButton>
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

