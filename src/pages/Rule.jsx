import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TitleHeader from '../components/TitleHeader';
import QuestionIcon from '../assets/images/question.png';
import RuleImg from '../assets/images/rule.png';

const Rule = () => {
    const navigate = useNavigate();

    const money = "1,000,000";

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/invest');
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigate]);

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <Wrapper>
            {/* 헤더 */}
            <TitleHeader title="로비" />

            <BodyContainer>
                <Icon src={QuestionIcon} />
                <Image  src={RuleImg} />

                <TextContainer>
                    <Text>게임이 시작되는 순간 각 팀당 시드머니 {money}원이 지급됩니다.</Text>
                    <Text>상단의 힌트와 포트폴리오를 확인해 주식을 사들이세요.</Text>
                    <Text>최종 라운드 이후 가장 많은 자산을 가진 팀이 우승합니다.</Text>
                </TextContainer>

                <BackButton onClick={handleBack}>돌아가기</BackButton>
                <CountText>3초 뒤에 시작합니다.</CountText>
            </BodyContainer>
        </Wrapper>
    );
}

export default Rule;

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

const Icon = styled.img`
    width: 40px;
    height: auto;
    object-fit: contain;
    margin-bottom: 40px;
`;

const Image = styled.img`
    width: 1200px;
    height: auto;
    object-fit: contain;
`;

const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 40px 0;
`;

const Text = styled.p`
    width: 100%;
    font-size: 24px;
    font-weight: 500;
    text-align: left;
    align-self: flex-start;
    white-space: nowrap;
    cursor: default;
`;

const BackButton = styled.button`
    width: 200px;
    height: 50px;
    color: #00C2A8;
    background-color: #E0F7F4;
    font-size: 20px;
    font-weight: 500;
    line-height: 50px;
    border: none;
    border-radius: 30px;
    text-align: center;
    cursor: pointer;
    transition: 0.3s ease;

    &:hover {
        filter: brightness(0.95);
    }
`;

const CountText = styled.p`
    width: 100%;
    color: #00C2A8;
    font-size: 20px;
    font-weight: 500;
    text-align: center;
    align-self: flex-start;
    white-space: nowrap;
    cursor: default;
    margin: 24px 0;
`;
