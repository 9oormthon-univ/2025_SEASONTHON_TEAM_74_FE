import React from 'react';
import styled from 'styled-components';

const InfoCard = ({ title, items }) => {
    return (
        <Wrapper>
            <Heading>{title}</Heading>
            <Container>
                <List>
                    {items.map((item, idx) => (
                        <ListItem key={idx}>{item}</ListItem>
                    ))}
                </List>
            </Container>
        </Wrapper>
    );
}

export default InfoCard;

const Wrapper = styled.div`
    width: 100%;
    max-width: 1200px;
    min-height: 140px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    border-radius: 20px;
    padding: 24px 28px;
    background-color: #E0F7F4;
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
    width: 100%;
    max-width: 1100px;
    padding: 16px 24px;
    background-color: #FFFFFF;
    text-align: left;
    display: flex;
    align-items: center;
`;

const List = styled.ul`
    margin: 0;
    padding-left: 20px;
`;

const ListItem = styled.li`
    font-size: 22px;
    font-weight: 500;
    margin-bottom: 8px;

    &:last-child {
        margin-bottom: 0;
    }
`;
