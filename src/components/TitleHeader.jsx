import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const TitleHeader = ({ title }) => {
    const navigate = useNavigate();

    const handleLogo = () => {
        navigate('/');
    }

    return (
        <Wrapper>
            <Logo onClick={handleLogo}>motu</Logo>
            <Title>{title}</Title>
        </Wrapper>
    );
}

export default TitleHeader;

const Wrapper = styled.div`
    height: 52px;
    padding: 8px 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.9);
    border-bottom: 1px solid #919191;
`;

const Logo = styled.span`
    color: #000000;
    font-weight: 500;
    font-size: 30px;
    cursor: pointer;
`;

const Title = styled.span`
    color: #000000;
    font-size: 18px;
    cursor: default;
`;
