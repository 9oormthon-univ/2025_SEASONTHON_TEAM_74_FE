import styled from "styled-components";

const InvestStatusContent = ({ team }) => {
  return (
    <Container>
      <ContentWrapper>
        <Content>
          {team.teamName}
        </Content>

        <Content>
          {team.maxInvestmentStock}
        </Content>

        <Content>
          {team.totalInvestmentAmount}
        </Content>
      </ContentWrapper>

      <BorderBottom />
    </Container>
  );
};

export default InvestStatusContent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 76px;
  background-color: var(--color-background);
  // border-bottom: 1px solid var(--color-secondary);
  padding: 0 10px;
`;

const Content = styled.div`
  width: 200px;
  // border: 1px solid red;
  color: var(--color-secondary);
  font-size: 30px;
  text-align-center;
  padding: 20px;
`;

const BorderBottom = styled.div`
  border-bottom: 1px solid var(--color-secondary);
  width: 95%;
  margin: 0 auto;
`;
