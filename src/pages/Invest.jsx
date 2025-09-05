import React, { useState } from 'react';
import styled from 'styled-components';
import TitleHeader from '../components/TitleHeader';
import InfoCard from '../components/game/InfoCard';
import InvestCard from '../components/game/InvestCard';
import PortfolioCard from '../components/game/PortfolioCard';

const Invest = () => {
    const money = "1,000,000";

    const stocks = Array.from({ length: 16 }, (_, i) => ({
        id: i,
        name: `A 뷰티 ${i + 1}`,
        category: "beauty",
        rate: -3.69,
        price: 67417,
        owned: 0,
    }));

    const portfolios = Array.from({ length: 16 }, (_, i) => ({
        id: i,
        industry: "AI 반도체",
        capital: "3조 | 최근 수익률: +12%",
        risk: "신규 AI 서버 대량 수주",
        issue: "삼성전자, 엔비디아와 협력 강화",
        rating: "★★★★☆",
        comment: "단기 변동성 있지만 장기 성장 가능",
    }));

    const [selectedId, setSelectedId] = useState(null);

    const handleOpenPortfolio = (id) => setSelectedId(id);
    const handleClosePortfolio = () => setSelectedId(null);

    const stock = selectedId != null ? stocks.find(s => s.id === selectedId) : null;
    const portfolio = selectedId != null ? portfolios.find(p => p.id === selectedId) : null;

    return (
        <Wrapper>
            <TitleHeader title="투자" />
            <BodyContainer>
                <Row>
                    <Heading>투자 제한시간 3분 30초! 지금 바로 결정하세요!</Heading>
                    <Heading>팀 자산: {money}</Heading>
                </Row>

                <InfoCard 
                    title="2018 힌트 :" 
                    items={[
                        "평창 동계올림픽 개최",
                        "최저임금 상향 (6490 → 7530, 14.9%)",
                        " "
                    ]}
                />

                <InvestCardContainer>
                    {stocks.map((stock) => (
                        <InvestCard
                            id={stock.id}
                            name={stock.name}
                            category={stock.category}
                            rate={stock.rate}
                            price={stock.price}
                            owned={stock.owned}
                            openPortfolio={handleOpenPortfolio}
                        />
                    ))}
                </InvestCardContainer>

                <InfoCard 
                    title="보유 :" 
                    items={[
                        "A 뷰티 주식 1주를 샀어요.",
                        "B 자동차 주식 2주를 샀어요."
                    ]}
                />
            </BodyContainer>

            {/* 포트폴리오 오버레이 */}
            {stock && portfolio && (
                <PortfolioCard
                    name={stock.name}
                    data={portfolio}
                    onClose={handleClosePortfolio}
                />
            )}
        </Wrapper>
    );
}

export default Invest;

const Wrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    color: #000000;
`;

const BodyContainer = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 40px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Row = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
`;

const Heading = styled.span`
    font-size: 24px;
    font-weight: 600;
    white-space: nowrap;
    margin-bottom: 0;
    cursor: default;
`;

const InvestCardContainer = styled.div`
    width: 100%;
    max-width: 1200px;
    display: grid;
    grid-template-rows: repeat(4, auto);
    grid-template-columns: repeat(4, 1fr);
    gap: 32px 40px;
    margin: 40px 0;
`;
