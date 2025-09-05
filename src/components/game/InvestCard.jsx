import React from 'react';
import styled from 'styled-components';

const InvestCard = ({ id, name, category, rate, price, owned, openPortfolio }) => {
    return (
        <Wrapper>
            <Box>
                <Header>
                    <Title>{name}</Title>
                    <Category>[{category}]</Category>
                </Header>

                <Rate rate={rate}>{rate}%</Rate>

                <Info>가격 : {price} 원</Info>
                <Info>보유 : {owned}</Info>

                <PortfolioBtn onClick={() => openPortfolio?.(id)}>
                    포트폴리오
                </PortfolioBtn>
            </Box>

            <BtnContainer>
                <SellBtn>매도 -1</SellBtn>
                <BuyBtn>매수 +1</BuyBtn>
            </BtnContainer>
        </Wrapper>
    );
}

export default InvestCard;

const Wrapper = styled.div`
    width: 100%;
    max-width: 280px;
    height: 280px;
    display: flex;
    flex-direction: column;
    color: #000000;
`;

const Box = styled.div`
    flex: 1;
    padding: 20px 16px;
    border-top: 1px solid #7ED6DF;
    border-left: 1px solid #7ED6DF;
    border-right: 1px solid #7ED6DF;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const Title = styled.span`
    font-size: 20px;
    font-weight: 700;
`;

const Category = styled.span`
    font-size: 14px;
    font-weight: 400;
`;

const Rate = styled.div`
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 16px;
    text-align: left;
    color: ${({ rate }) => (rate < 0 ? '#FF0707' : '#0717FF')};
`;

const Info = styled.div`
    font-size: 18px;
    font-weight: 600;
    text-align: left;
    margin-bottom: 16px;
`;

const PortfolioBtn = styled.button`
    width: 156px;
    height: 28px;
    background-color: #E0F7F4;
    border: none;
    font-size: 16px;
    font-weight: 600;
    line-height: 28px;
    text-align: center;
    margin: 0 auto;
    cursor: pointer;
`;

const BtnContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const SellBtn = styled.button`
    background: #EA4335;
    color: #FFFFFF;
    width: 100%;
    height: 48px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
`;

const BuyBtn = styled.button`
    background: #3AB7C4EB;
    color: #FFFFFF;
    width: 100%;
    height: 48px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
`;
