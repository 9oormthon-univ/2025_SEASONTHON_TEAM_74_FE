import styled from "styled-components";
import Header from "../components/Header";
import PageButton from "../components/PageButton";
import StockCardEx from "../components/StockCardEx";

import logo from "./../assets/images/logo.png";
import createRoom from "./../assets/images/createRoom.png";
import participate from "./../assets/images/participate.png";
import guide from "./../assets/images/guide.png";

const HomePage = () => {
  return (
    <HomeContainer>
      <Header />

      <HeroSection>
        {/* 타이틀 */}
        <TitleContainer>
          <MainTitle>
            <HighlightLetter>모</HighlightLetter>두의{" "}
            <HighlightLetter>투</HighlightLetter>자
          </MainTitle>
          <SubTitle>반가워요! 투자, 어렵지 않아요 — 우리랑 연습해요.</SubTitle>
        </TitleContainer>

        {/* 로고 */}
        <>
          <img src={logo} alt="로고" />
        </>
      </HeroSection>

      <MainSection>
        {/* 타 페이지로 이동하는 버튼 모음 */}
        <ButtonGroup>
          <PageButton to="/test" icon={createRoom} alt="생성">
            방 만들기
          </PageButton>
          <PageButton to="/test" icon={participate} alt="참여">
            참가하기
          </PageButton>
          <PageButton to="/test" icon={guide} alt="가이드">
            게임방법
          </PageButton>
        </ButtonGroup>

        {/* 주식 개념 카드 */}
        <StockCardEx />
      </MainSection>
    </HomeContainer>
  );
};

export default HomePage;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 100vh;
`;

const HeroSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 100px;
  height: 340px;
  padding: 35px 100px;

  // border: 2px solid red;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: auto 0px;
`;

const MainTitle = styled.h1`
  font-size: 64px;
  font-weight: 200;
  margin: 0;
`;

const HighlightLetter = styled.span`
  color: var(--color-secondary);
  font-weight: 600;
  font-size: 64px;
`;

const SubTitle = styled.p`
  font-size: 36px;
  font-weight: 200;
  margin: 5px 0 0 0;
  color: var(--color-text);
`;

const MainSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
`;
