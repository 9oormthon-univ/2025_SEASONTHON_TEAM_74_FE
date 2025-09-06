import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TitleHeader from '../components/TitleHeader';
import TeamScore from '../components/game/TeamScore';

const Final = () => {
    const navigate = useNavigate();

    const winnerTeam = 1;
    const winnerAssets = "100,000,000";

    const teams = [
        { order: 1, name: "1", totalAsset: "2,456,300", profitRate: "+100", successCount: 5, avgEfficiency: 90 },
        { order: 2, name: "2", totalAsset: "1,000,000", profitRate: "+100", successCount: 5, avgEfficiency: 90 },
        { order: 3, name: "3", totalAsset: "1,000,000", profitRate: "+100", successCount: 5, avgEfficiency: 90 },
        { order: 4, name: "4", totalAsset: "1,000,000", profitRate: "+100", successCount: 5, avgEfficiency: 90 },
        { order: 5, name: "5", totalAsset: "1,000,000", profitRate: "+100", successCount: 5, avgEfficiency: 90 },
        { order: 6, name: "6", totalAsset: "1,000,000", profitRate: "+100", successCount: 5, avgEfficiency: 90 },
    ];

    const handleEnd = () => {
        navigate('/');
    }
    
    return (
      <Wrapper>
        {/* 헤더 */}
        <TitleHeader title="결과" />
        <BodyContainer>
            {/* 최종 우승팀 */}
            <Title>🏆최종 우승팀 : {winnerTeam}팀</Title>
            <Card>
                <Heading>{winnerTeam}팀 최종 자산</Heading>
                <Container>
                    <Text>{winnerAssets} 원</Text>
                </Container>
            </Card>

            {/* 팀별 성적 */}
            <Title>⭐팀별 성적</Title>
            <TeamScore teams={teams}/>

            <EndButton onClick={handleEnd}>게임 종료하기</EndButton>
        </BodyContainer>
      </Wrapper>
    );
}

export default Final;

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

const Title = styled.span`
    font-size: 30px;
    font-weight: 600;
    text-align: left;
    align-self: flex-start;
    white-space: nowrap;
    margin-bottom: 28px;
    cursor: default;
`;

const Card = styled.div`
    background-color: #E0F7F4;
    width: 100%;
    max-width: 1200px;
    min-height: 140px;
    margin-bottom: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    border-radius: 20px;
    padding: 24px 28px;
    cursor: default;
`;

const Heading = styled.span`
    color: #00C2A8;
    font-size: 24px;
    font-weight: 500;
    text-align: left;
    align-self: flex-start;
    white-space: nowrap;
    margin-bottom: 12px;
`;

const Container = styled.div`
    width: 100%;
    max-width: 1100px;
    padding: 16px 24px;
    background-color: #FFFFFF;
    text-align: left;
    display: flex;
    align-items: center;
`;

const Text = styled.span`
    font-size: 22px;
    font-weight: 600;
    white-space: nowrap;
    margin-bottom: 0;
    cursor: default;
`;

const EndButton = styled.button`
    width: 20%;
    min-width: 200px;
    height: 56px;
    border: 1px solid #00C2A8;
    border-radius: 40px;
    color: #E0F7F4;
    background-color: #00C2A8;
    font-size: 22px;
    font-weight: 400;
    margin: 80px 0 60px;
    box-sizing: border-box;
    padding: 0 24px;
    cursor: pointer;
    transition: 0.3s ease;

    &:hover {
        filter: brightness(0.95);
    }
`;
