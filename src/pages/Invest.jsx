import React from 'react';
import styled from 'styled-components';
import TitleHeader from '../components/TitleHeader';
import InfoCard from '../components/game/InfoCard';
import InvestCard from '../components/game/InvestCard';

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
                            key={stock.id}
                            name={stock.name}
                            category={stock.category}
                            rate={stock.rate}
                            price={stock.price}
                            owned={stock.owned}
                        />
                    ))}
                </InvestCardContainer>
            </BodyContainer>
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
    margin-top: 40px;
`;
