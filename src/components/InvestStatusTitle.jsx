import styled from "styled-components";


const InvestStatusTitle = () => {  
  return (
    <TitleWrapper>
      <Title>
        팀명
      </Title>

      <Title>
        최대 투자 종목
      </Title>

      <Title>
        총 투자 금액
      </Title>
    </TitleWrapper>
  );
};

export default InvestStatusTitle;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  height: 76px;
  background-color: var(--color-primary);
  border-radius: 50px;
  padding: 0 10px;
  
`;

const Title = styled.div`
  color: var(--color-secondary);
  font-size: 30px;
  padding: 20px;
  width: 200px;
`;