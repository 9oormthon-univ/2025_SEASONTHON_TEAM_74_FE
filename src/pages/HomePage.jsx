import Header from "../components/Header";
import PageButton from "../components/PageButton";
import StockCardEx from "../components/StockCardEx";

import styled from "styled-components";
import logo from "./../assets/images/logo.png";
import createRoom from "./../assets/images/createRoom.png";
import participate from "./../assets/images/participate.png";
import guide from "./../assets/images/guide.png";

const HomePage = () => {
  
  return (
    <HomeContainer>
      <Header />

      <BodyContainer>
        <HeroSection>
          {/* 타이틀 */}
          <TitleContainer>
            <MainTitle>
              <HighlightLetter>모</HighlightLetter>두의{" "}
              <HighlightLetter>투</HighlightLetter>자
            </MainTitle>
            <SubTitle>
              반가워요! 투자, 어렵지 않아요
              <br />
              — 우리랑 연습해요.
            </SubTitle>
          </TitleContainer>

          {/* 로고 */}
          <LogoContainer>
            <img src={logo} alt="로고" />
          </LogoContainer>
        </HeroSection>

        <MainSection>
          {/* 타 페이지로 이동하는 버튼 모음 */}
          <ButtonGroup>
            <PageButton to="/create-room" icon={createRoom} alt="생성">
              방 만들기
            </PageButton>
            <PageButton to="/join-room" icon={participate} alt="참여">
              참가하기
            </PageButton>
            <PageButton to="/game-guide" icon={guide} alt="가이드">
              게임방법
            </PageButton>
          </ButtonGroup>

          {/* 주식 개념 카드 */}
          <StockCardEx />
        </MainSection>
      </BodyContainer>
    </HomeContainer>
  );
};

export default HomePage;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
`;

const BodyContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 28px 20px;
  box-sizing: border-box;
`;

const HeroSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 280px;
  padding: 35px 0;
  margin: 10px 0;
  // border: 2px solid red;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: auto 0px;
`;

const MainTitle = styled.h1`
  font-size: 70px;
  font-weight: 300;
  margin: 20px 0;
  animation: fadeInUp 1s ease-out;
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const HighlightLetter = styled.span`
  color: #00C2A8;
  font-weight: 600;
  font-size: 70px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const SubTitle = styled.p`
  font-size: 28px;
  font-weight: 200;
  margin: 20px 0;
  color: var(--color-text);
  line-height: 1.8;
  animation: fadeInUp 1s ease-out 0.3s both;
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const MainSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  padding: 0;
  gap: 40px;
`;

const LogoContainer = styled.div`
  animation: logoBounce 1.5s ease-out;
  
  @keyframes logoBounce {
    0% {
      opacity: 0;
      transform: scale(0.3) rotate(-10deg);
    }
    50% {
      opacity: 0.8;
      transform: scale(1.1) rotate(5deg);
    }
    100% {
      opacity: 1;
      transform: scale(1) rotate(0deg);
    }
  }
  
  img {
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.1) rotate(5deg);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
`;
