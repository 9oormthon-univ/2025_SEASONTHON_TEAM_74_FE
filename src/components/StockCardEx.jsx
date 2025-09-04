import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StockCardEx = () => {
  const navigate = useNavigate();
  
  const navigateToStockCard = () => {
    navigate("/stock-card");
  }

  return (
    <CardContainer onClick={navigateToStockCard}>
      <Card className="card1" />
      <Card className="card2" />
      <Card className="card3" />
    </CardContainer>
  );
};

export default StockCardEx;

const CardContainer = styled.div`
  position: relative;
  width: 850px;
  height: 600px;
  border: 2px solid red;
`;

const Card = styled.div`
  position: absolute;
  width: 490px;
  height: 450px;
  border-radius: 20px;
  background: var(--color-primary); 
  opacity: 0.7;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;

  &.card1 {
    bottom: 0;
    right: 0;
    z-index: 3;
  }

  &.card2 {
    top: 10%;
    left: 0;
    z-index: 2;
  }

  &.card3 {
    top: 0;
    right: 15%;
    z-index: 1;
  }
`;
