import Header from "../components/Header";

import styled from "styled-components";
import guide from "./../assets/images/howToPlay.png";

const GameGuide = () => {
  return (
    <Container>
      <Header />
      <ImgContainer>
        <img src={guide} alt="게임하는 방법" /> 
      </ImgContainer>
    </Container>
  );
};

export default GameGuide;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ImgContainer = styled.div`
  flex: 1;
  overflow-y: auto;  /* 세로 스크롤 가능 */
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  padding: 16px;

  img {
    max-width: 100%;   /* 화면 넘치지 않게 */
    height: auto;      /* 비율 유지 */
    border-radius: 8px; 
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
`;
