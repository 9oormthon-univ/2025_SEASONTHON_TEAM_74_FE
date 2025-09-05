import React from 'react';
import styled from 'styled-components';

const PortfolioCard = ({ data, name, onClose }) => {
    if (!data) return null;

    return (
        <Overlay onClick={onClose}>
            <Wrapper onClick={(e) => e.stopPropagation()}>
                <Title>{name}</Title>

                <Text>업종 : {data.industry}</Text>
                <Text>시총 : {data.capital}</Text>
                <Text>리스크 : {data.risk}</Text>
                <Text>최근 이슈 : {data.issue}</Text>
                <Text>시장 평판 : {data.rating}</Text>
                <Text>전문가 코멘트 : "{data.comment}"</Text>

                <CloseBtn onClick={onClose}>닫기</CloseBtn>
            </Wrapper>
        </Overlay>
    );
}

export default PortfolioCard;

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const Wrapper = styled.div`
    min-width: 420px;
    display: flex;
    flex-direction: column;
    background-color: #FFFFFF;
    border: 5px solid #00C2A8;
    border-radius: 16px;
    padding: 30px;
`;

const Title = styled.span`
    color: #00C2A8;
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 24px;
    text-align: left;
`;

const Text = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
    text-align: left;
`;

const CloseBtn = styled.button`
    width: 100%;
    height: 40px;
    margin-top: 12px;
    color: #00C2A8;
    background-color: #E0F7F4;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
`;
