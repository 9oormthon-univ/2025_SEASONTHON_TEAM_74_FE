import styled from "styled-components";

const TeamCard = ({ team, onJoinTeam }) => {
  // 팀장으로 방에 참가하는 함수
  const handleJoinLeader = () => {
    onJoinTeam(team.teamId, "leader");
  };

  // 팀원으로 방에 참가하는 함수
  const handleJoinMember = () => {
    onJoinTeam(team.teamId, "member");
  };

  return (
    <CardContainer>
      {/* 팀 구성원 정보(이름, 역할) */}
      <TeamInfo $completed={team.leaderNickName && team.memberNickNames.length >= 5}>
        <TeamMember $weight={600}>
          팀장: {team.leaderNickName || ""}
        </TeamMember>

        <TeamMembers>
          {team.memberNickNames.map((element, index) => (
            <TeamMember key={index} $weight={400}>
              팀원: {element || ""}
            </TeamMember>
          ))}
        </TeamMembers>

      </TeamInfo>

      {/* 팀 이름 */}
      <TeamName>
        {team.teamName}
      </TeamName>

      {/* 팀에 참가하기 버튼 모음(팀장 또는 팀원) */}
      <JoinButtonGroup>
        <JoinButton 
          $isAvailable={ !team.leaderNickName }
          disabled={ !!team.leaderNickName }
          onClick={handleJoinLeader}
        >
          팀장으로 참가
        </JoinButton>
        <JoinButton 
          $isAvailable={ team.memberNickNames.length < 5 }
          disabled={ team.memberNickNames.length >= 5 }
          onClick={handleJoinMember}
        >
          팀원으로 참가
        </JoinButton>
      </JoinButtonGroup>
    </CardContainer>
  );
};

export default TeamCard;

const CardContainer = styled.div`
  
`;

const TeamInfo = styled.div`
  height: 320px;
  background-color: var(--color-background);
  border: 5px solid ${props => props.$completed ? "var(--color-secondary)" : "var(--color-primary)"};
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const TeamMembers = styled.div`
  
`;

const TeamMember = styled.div`
  font-size: 30px;
  color:  var(--color-text);
  text-align: left;
  font-weight: ${props => props.$weight || "400"};
  padding-left: 15px;
  margin: 15px;
`;

const TeamName = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: var(--color-text);
  margin: 0 0 20px 0;
  text-align: center;
  margin: 12px;
`;

const JoinButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 12px;
`;

const JoinButton = styled.button`
  border: none;
  border-radius: 8px;
  padding: 10px;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3 ease;
  ${props => props.$isAvailable ? `
    background-color: #B2FFF5;
    color: var(--color-text);  

    &:hover {
      background-color: var(--color-secondary);
      transform: translateY(-1px);
    }
  ` : `
    background-color: #D9D9D970;
    color: #A6A6A6;
    cursor: not-allowed;
  `}

`;