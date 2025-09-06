import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TitleHeader from '../components/TitleHeader';
import LockIcon from '../assets/images/lock.png';

const Lock = () => {
    const navigate = useNavigate();

    const currentRound = 1;

    return (
        <Wrapper>
            <TitleHeader title="체결" />

            <BodyContainer>
                <RoundText>라운드 {currentRound}</RoundText>
                <Title>LOCK!</Title>
                <Icon src={LockIcon} />
                <LockText>주문이 잠겼어요!</LockText>
                <LockText>서버에서 체결 계산을 준비중입니다.</LockText>
                <TipText>💡팁: 이번 라운드에서 배운 점을 팀과 채팅해 보세요</TipText>
            </BodyContainer>
        </Wrapper>
    );
}

export default Lock;

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

const RoundText = styled.span`
    color: #00C2A8;
    font-size: 24px;
    font-weight: 600;
`;

const Title = styled.span`
    font-size: 80px;
    font-weight: 500;
    margin: 28px 0;
`;

const Icon = styled.img`
    width: 32px;
    height: auto;
    object-fit: contain;
    margin-bottom: 48px;
`;

const LockText = styled.span`
    font-size: 40px;
    font-weight: 600;
    margin-bottom: 20px;
`;

const TipText = styled.span`
    font-size: 32px;
    font-weight: 500;
    margin: 60px 0 80px;
`;