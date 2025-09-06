import React from 'react';
import styled from "styled-components";

const TeamScore = ({ teams = [] }) => {
    return (
        <Table>
            {/* 헤더 */}
            <HeaderContainer>
                <Cell>순위</Cell>
                <Cell>팀명</Cell>
                <Cell>총자산</Cell>
                <Cell>수익률</Cell>
                <Cell>성공 투자 건수</Cell>
                <Cell>평균 투자 효율</Cell>
            </HeaderContainer>

            {/* 바디 */}
            <BodyContainer>
                {teams.map((team, idx) => (
                    <Row key={team.id ?? idx}>
                        {/* 순위 */}
                        <Cell>{team.order}위</Cell>

                        {/* 팀명 */}
                        <Cell>{team.name}팀</Cell>

                        {/* 총자산 */}
                        <Cell>{team.totalAsset}</Cell>

                        {/* 수익률 */}
                        <Cell>{team.profitRate}%</Cell>

                        {/* 성공 투자 건수 */}
                        <Cell>{team.successCount}회</Cell>

                        {/* 평균 투자 효율 */}
                        <Cell>{team.avgEfficiency}%</Cell>
                    </Row>
                ))}
            </BodyContainer>
        </Table>
    );
};

export default TeamScore;

const Table = styled.div`
    width: 100%;
    border-radius: 16px;
    overflow: hidden;
    background-color: #FFFFFF;
    color: #00C2A8;
    border: none;
`;

const grid = `
    display: grid;
    grid-template-columns: 100px 1fr 1.4fr 1fr 1.4fr 1.4fr;
    align-items: center;
`;

const HeaderContainer = styled.div`
    ${grid}
    color: #00C2A8;
    background-color: #E0F7F4;
    font-weight: 500;
    padding: 12px 16px;
    border-radius: 50px;
`;

const BodyContainer = styled.div`
`;

const Row = styled.div`
    ${grid}
    padding: 12px 16px;
    border-bottom: 1px solid #00C2A8;
    
    &:last-child {
        border-bottom: none;
    }
`;

const Cell = styled.div`
    color: #00C2A8;
    height: 40px;
    font-size: 18px;
    font-weight: 500;
    line-height: 40px;
    text-align: center;
    white-space: nowrap;
`;
