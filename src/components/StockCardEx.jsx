import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import search from "./../assets/images/search.png";

const StockCardEx = () => {
  const navigate = useNavigate();
  
  const navigateToStockCard = () => {
    navigate("/stock-card");
  }

  return (
    <CardContainer onClick={navigateToStockCard}>
      <Card className="card1">
        <CardTitle>기본 개념 용어</CardTitle>
        <CardSubTitle>배당금&nbsp;&emsp;코스닥&nbsp;&emsp;코스피&nbsp;&emsp;분산투자</CardSubTitle>
        <HoverOverlay />
      </Card>
      <Card className="card2">
        <CardTitle>사회 경제 개념</CardTitle>
        <CardSubTitle>금리와 주식&nbsp;&emsp;물가와 소비&nbsp;&emsp;환율과 수출기업</CardSubTitle>
        <HoverOverlay />
      </Card>
      <CardInfo className="cardInfo"><img src={search} />클릭해서 주식 개념 보기</CardInfo>
    </CardContainer>
  );
};

export default StockCardEx;

const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const CardContainer = styled.div`
  position: relative;
  width: 600px;
  height: 540px;
  // border: 2px solid red;

  &:hover {
    transform: scale(1.02);
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 375px;
  height: 375px;
  border-radius: 15px;
  box-shadow: 1px 8px 16px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;

  &.card1 {
    bottom: 45px;
    right: 0;
    z-index: 3;
    transform: rotate(-3.5deg);
    background: #CAFFF8;
    
    &:hover {
      transform: rotate(-3.5deg) scale(1.05);
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.3);
      animation: ${floatAnimation} 2s ease-in-out infinite;
    }
  }

  &.card2 {
    top: 20px;
    left: 0;
    z-index: 2;
    transform: rotate(3.5deg);
    background: #DDFFFBD9;
    
    &:hover {
      transform: rotate(3.5deg) scale(1.05);
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.3);
      animation: ${floatAnimation} 2s ease-in-out infinite;
    }
  }

  &:hover .card-title {
    transform: translateY(-5px);
  }

  &:hover .card-subtitle {
    transform: translateY(-3px);
  }
`;

const HoverOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 128, 111, 0.1) 0%, rgba(0, 128, 111, 0.05) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 15px;

  ${Card}:hover & {
    opacity: 1;
  }
`;


const CardInfo = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 8px;

`;

const CardTitle = styled.div`
  color: #00806F;
  font-weight: 500;
  font-size: 36px;
  margin: 15px;
`;

const CardSubTitle = styled.div`
  color: #00806F;
  font-weight: 300;
  font-size: 16px;
  margin: 15px;
`;
