import { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const StockCard = () => {
  const navigate = useNavigate();

  const [flippedCards, setFlippedCards] = useState({});

  const handleCardClick = (cardId) => {
    setFlippedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const navigateToHome = () => {
    navigate("/home");
  }

  const cardData = [
    // Row 1: 기본 개념 용어
    {
      id: "card1",
      category: "기본 개념 용어",
      categoryColor: "#3AB7C4EB",
      front: "배당금",
      back: "배당금은 기업이 벌어들인 이익을 주주에게 나눠주는 것을 말해요. 가장 흔한 형태는 현금 배당으로, 주주에게 일정 금액을 현금으로 지급합니다. 또 다른 방식은 주식 배당으로, 현금 대신 새로 발행한 주식을 나눠줍니다."
    },
    {
      id: "card2", 
      category: "기본 개념 용어",
      categoryColor: "#3AB7C4EB",
      front: "PER\n(주가수익비율)",
      back: "PER은 주가를 주당순이익(EPS)으로 나눈 값이에요. 주가는 기업의 주식 가격이고, 주당순이익은 기업 순이익을 발행주식 수로 나눈 값이에요. 이 값이 높으면 주식이 비싸다, 낮으면 싸다고 평가할 수 있어요."
    },
    {
      id: "card3",
      category: "기본 개념 용어", 
      categoryColor: "#3AB7C4EB",
      front: "주식시장",
      back: "주식시장은 기업이 자금을 모으고 투자자가 주식을 사고 파는 곳이에요.\n코스피(KOSPI)는 대기업과 우량주가 상장된 대표 시장이고, 코스닥(KOSDAQ)은 중소·벤처기업 중심으로 신기술과 성장성이 큰 기업이 많이 상장돼 있어요."
    },
    // Row 2: 투자 원리 개념
    {
      id: "card4",
      category: "투자 원리 개념",
      categoryColor: "#00C2A8EB", 
      front: "장기 투자\nvs\n단기 투자",
      back: "장기 투자는 수년 이상 주식을 보유하며 산업 성장과 기업 발전을 기다리는 방식이에요. 복리효과와 비용 절감, 안정감이 장점이지만, 기회비용과 시장 리스크가 있고 인내가 필요해요.\n단기투자는 며칠 내에서 수개월 단위로 수익을 추구하는 방식이에요. 빠른 수익과 유연성이 장점이지만, 높은 리스크와 비용, 심리적 스트레스가 단점이에요."
    },
    {
      id: "card5",
      category: "투자 원리 개념",
      categoryColor: "#00C2A8EB",
      front: "리스크와 수익률", 
      back: "리스크와 수익률은 비례 관계예요.\n위험이 커야 큰 수익을 기대할 수 있고, 위험을 줄이면 수익도 제한되는 구조예요."
    },
    {
      id: "card6",
      category: "투자 원리 개념",
      categoryColor: "#00C2A8EB",
      front: "분산 투자",
      back: "분산 투자는 여러 종목, 산업, 자산군, 지역에 나눠 투자해 위험을 줄이는 전략이에요."
    },
    // Row 3: 사회·경제 개념
    {
      id: "card7",
      category: "사회·경제 개념",
      categoryColor: "#7ED6DF",
      front: "금리와 주식",
      back: "금리는 돈을 빌릴 때 내야 하는 이자 비율이에요. 금리가 오르면 기업 비용이 늘고 안전자산 선호가 커져 주식시장이 약세를 보이기 쉽고, 금리가 내리면 투자와 자금 유입이 늘어 주식시장이 강세를 보이기 쉬워요."
    },
    {
      id: "card8",
      category: "사회·경제 개념", 
      categoryColor: "#7ED6DF",
      front: "물가와 소비",
      back: "물가가 오르면 소비가 줄어 기업 실적이 약화되고 주식시장이 약세를 보일 수 있어요. 물가가 안정되면 소비가 늘고 기업 실적이 좋아져 주식시장이 활기를 띌 수 있어요."
    },
    {
      id: "card9",
      category: "사회·경제 개념",
      categoryColor: "#7ED6DF", 
      front: "환율과 수출기업",
      back: "환율이 오르면 수출기업이 유리하고 내수기업이 불리해요. 환율이 내리면 수출 기업이 불리하고 내수기업이 유리해요."
    }
  ];

  return (
    <PageContainer>
      <Header />
      <Container>
        <CardGrid>
          {cardData.map((card) => (
            <CardWrapper key={card.id} $width={card.width}>
              <Card 
                $isFlipped={flippedCards[card.id]}
                onClick={() => handleCardClick(card.id)}
              >
                <CardFront>
                  <CategoryLabel $color={card.categoryColor}>
                    {card.category}
                  </CategoryLabel>
                  <CardContent $size="36px" $weight={700} $align="center">{card.front}</CardContent>
                </CardFront>
                <CardBack>
                  <CategoryLabel $color={card.categoryColor}>
                    {card.front}
                  </CategoryLabel>
                  <CardContent $size="18px" $weight={300} $align="justify">{card.back}</CardContent>
                </CardBack>
              </Card>
            </CardWrapper>
          ))}
        </CardGrid>
        <CompleteButton onClick={navigateToHome}>
          주식 이해 완! 🌟
        </CompleteButton>
      </Container>
    </PageContainer>
  );
};

export default StockCard;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 100vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  padding: 40px;
  margin-top: 100px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  justify-items: center;
`;

const CardWrapper = styled.div`
  width: 360px;
  height: 280px;
  perspective: 1000px;
  justify-items: center;
`;

const Card = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s ease-in-out;
  cursor: pointer;
  transform: ${props => props.$isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'};

  &:hover {
    transform: ${props => props.$isFlipped ? 'rotateY(180deg) scale(1.02)' : 'rotateY(0deg) scale(1.02)'};
  }
`;

const CardSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 15px;
  background: var(--color-primary);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid #e0e0e0;
`;

const CardFront = styled(CardSide)`
  transform: rotateY(0deg);
`;

const CardBack = styled(CardSide)`
  transform: rotateY(180deg);
  background: var(--color-primary);
  color: var(--color-text);
`;

const CategoryLabel = styled.div`
  background-color: ${props => props.$color};
  color: var(--color-background);
  font-size: 18px;
  font-weight: 600;
  padding: 10px 20px;
  align-self: flex-start;
  margin: 0px auto 15px -20px;
`;

const CardContent = styled.div`
  font-size: ${props => props.$size || "16px"};
  font-weight: ${props => props.$weight || "400"}
  line-height: 1.4;
  text-align: ${props => props.$align || "justify"};
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  white-space: pre-line;
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const CompleteButton = styled.button`
  width: 480px;
  background: var(--color-primary);
  color: #333;
  border: none;
  border-radius: 25px;
  margin: 50px;
  padding: 20px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: var(--color-secondary);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  }
`;