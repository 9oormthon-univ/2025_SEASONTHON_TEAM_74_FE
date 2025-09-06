import styled from "styled-components";

const TeamLobbyButtons = ({role, handleExitRoom, handleReady, handleConfirmTeam}) => {
  return (
    <ButtonGroup >
      <ExitButton onClick={handleExitRoom}>
        나가기
      </ExitButton>

      {role === "leader" ? (
        <ActionButton onClick={handleConfirmTeam}>팀 확정하기</ActionButton>
      ) : (
        <ActionButton onClick={handleReady}>준비하기</ActionButton>
      )}
    </ButtonGroup>
  );
};

export default TeamLobbyButtons;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-bottom: 60px;
`;

const ExitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 220px;
  height: 60px;
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  background-color: var(--color-secondary);
  color: var(--color-background);
  font-size: 24px;
  cursor: pointer;

  &:hover {
    background-color: #0984e3;
  }
`;


const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 220px;
  height: 60px;
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  font-size: 24px;
  cursor: pointer;
  background-color: var(--color-primary);
  color: var(--color-secondary);

  &:hover {
    background-color: #0984e3;
  }
`;