import React from 'react';
import styled from 'styled-components';

const GraphCard = ({ title }) => {
    return (
        <Wrapper>
            <Heading>{title}</Heading>
            <Container>
                {/* 그래프 */}
            </Container>
        </Wrapper>
    );
}

export default GraphCard;

const Wrapper = styled.div`
    background-color: #E0F7F4;
    width: 100%;
    max-width: 580px;
    min-height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    border-radius: 20px;
    padding: 24px 28px 36px;
    cursor: default;
`;

const Heading = styled.span`
    color: #00C2A8;
    font-size: 28px;
    font-weight: 500;
    text-align: left;
    align-self: flex-start;
    white-space: nowrap;
    margin-bottom: 12px;
`;

const Container = styled.div`
    flex: 1;
    width: 100%;
    box-sizing: border-box;
    background-color: #FFFFFF;
`;
