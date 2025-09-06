import Header from "../components/Header";
import CountdownTimer from "../components/CountdownTimer";

import styled from "styled-components";
import rule from "./../assets/images/team-lobby-rule.png";
import { useNavigate } from "react-router-dom";

const Rule = () => {
  const navigate = useNavigate();

  const second = 3;

  const navigateToBack = () => {
    navigate(-1);
  }

  return (
    <RuleContainer>
      <Header /> 
      
      <RuleImg>
        <img src={rule} alt="게임 규칙"/>
      </RuleImg>

      <BackButton onClick={navigateToBack}>
        돌아가기
      </BackButton>

      <CountdownTimer second={second} />
    </RuleContainer>
  );
};

export default Rule;

const RuleContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const RuleImg = styled.div`
  display: flex;
  justify-content: center;
  margin: 80px 0;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 12px;
  }
`;

const BackButton = styled.button`
  width: 250px;
  height: 70px;
  border: none;
  border-radius: 20px;
  background-color: var(--color-primary);
  color: var(--color-secondary);
  font-size: 24px;
  cursor: pointer;
  margin: 40px auto;
`;
