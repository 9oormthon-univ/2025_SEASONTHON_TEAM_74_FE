import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import TeamLobbyItem from "../components/TeamLobbyItem";
import CountdownTimer from "../components/game/CountdownTimer";
import TeamLobbyButtons from "../components/TeamLobbyButtons";

import styled from "styled-components";
import question from "./../assets/images/question.svg"; 

const mockData = {
  "isSuccess": true,
  "code": "COMMON200",
  "message": "성공!",
  "result": {
    "teamId": 1,
    "teamName": "팀명 1",
    "leader": {
      "ㅇㅇㅇ": false  //리더는 준비완료 상태가 따로 없습니다! 팀원 다 준비되면 팀 확정하기 버튼이 가능합니다!
    },
    "members": [
      {
        "유림": false   //멤버 닉네임 : 준비완료 상태
      },
      {
        "ㄴㄴㄴ": true //닉네임 : 준비완료 상태
      },
      {
        "QWER": true
      }
    ]
  }
}


const TeamLobby = () => {
  const navigate = useNavigate();

  const { roomId, teamId } = useParams();

  const [teamData, setTeamData] = useState(mockData.result);
  const currentUserNickname = JSON.parse(localStorage.getItem("userData") || "{}")?.nickname;
  const [isTeamConfirmed, setIsTeamConfirmed] = useState(false);
  const [isUserReady, setIsUserReady] = useState(false);

  const leaderNickname = Object.keys(teamData.leader)[0];

  // 현재 사용자의 역할(leader 또는 member)
  const role = currentUserNickname === leaderNickname ? "leader" : "member";

  // 게임까지 몇초가 남았는지
  const second = 3;

  const handleQuestion = () => {
    navigate("/rule");
  };

  const handleExitRoom = () => {
    // 팀 나가기 api 연동

    navigate("/lobby"); // API 연동 후 RoomId를 넘겨서 나가도록
  };

  const handleReady = () => {
    // 팀원 준비 상태 업데이트 api 연동

    // setIsUserReady(true);
  }

  const isAllMembersReady = teamData.members.every((member) => Object.values(member)[0]);

  const handleConfirmTeam = () => {
    if(isAllMembersReady) {
      // 팀 확정하기 api 연동
      
      // setIsTeamConfirmed(true);
    }
    else {
      alert("모든 팀원이 준비하기 버튼을 눌렀어야 팀 확정하기 버튼이 활성화됩니다.");
    }
  };

  // 팀명 변경 핸들러
  const handleTeamNameChange = (newTeamName) => {
    setTeamData(prev => ({
      ...prev,
      teamName: newTeamName,
    }));
  };

  // 팀장 이름 변경 핸들러
  const handleLeaderNameChange = (newLeaderName) => {
    setTeamData(prev => ({
      ...prev,
      leader: {
        [newLeaderName]: true,
      },
    }));
  };

  const handleMemberNameChange = (memberIndex, newMemberName) => {
    console.log("handleMemberNameChange 함수 호출!");
    setTeamData(prev => ({
      ...prev,
      members: prev.members.map((member, index) => 
        index === memberIndex ? { [newMemberName]: Object.values(member)[0] } : member),
    }));
  };

  const isInputDisabled = (itemType) => {
    if(itemType === "leader") {
      // 팀장의 경우: 팀 확정하기 버튼을 누르면 모든 입력칸 비활성화
      return isTeamConfirmed;
    }
    else {
      // 팀원의 경우: 준비하기 버튼을 누르면 자신의 이름 입력칸도 비활성화
      return isUserReady && itemType === "member";
    }
  };

  return(
    <TeamLobbyContainer>
      <Header />

      <InfoContainer>
        <TitleContainer>
          <MainTitle>팀 대기실</MainTitle>
          <SubTitle>(팀 당 6명까지 참가할 수 있어요!)</SubTitle>
        </TitleContainer>

        <QuestionButton onClick={handleQuestion}>
          <img src={question} alt="궁금합니다!"/>
        </QuestionButton>
      </InfoContainer>

      <MemberItemWrapper>
        {/* 팀명 입력 */}
        <TeamLobbyItem 
          title="팀명"
          content={teamData.teamName || `팀명을 변경하지 않으시면 자동으로 ${teamData.teamName}로 지정이 됩니다.`}
          isEditable={role === "leader"}
          isDisabled={isInputDisabled("team")}
          onContentChange={handleTeamNameChange}
        />

        { /* 팀장 */ }
        <TeamLobbyItem 
          title="팀장"
          content={leaderNickname}
          isLeader={true}
          isEditable={role === "leader"}
          isDisabled={isInputDisabled("leader")}
          onContentChange={handleLeaderNameChange}
        />

        { /* 팀원 */ }
        {teamData.members.map((member, index) =>{
          const memberNickname = Object.keys(member)[0];
          const memberIsReady = Object.values(member)[0];
          const isCurrentMember = memberNickname === currentUserNickname;

          return (<TeamLobbyItem 
            key={`member-${index}`}
            title={`팀원${index + 1}`}
            content={memberNickname || ""}
            isReady={memberIsReady}
            isLeader={false}
            isEditable={isCurrentMember}
            isDisabled={isInputDisabled("member")}
            onContentChange={(newName) => handleMemberNameChange(index, newName)}
          />
          );
        })}

        { /* 빈 팀원 슬롯들( 최대 5개 ) */ }
        {Array.from({length: 5 - teamData.members.length}).map((_, index) => (
          <TeamLobbyItem 
            key={`member-${index}`}
            title={`팀원${teamData.members.length + index + 1}`}
            content=""
            isReady={false}
            isLeader={false}
            isEditable={false}
            isDisabled={true}
          />
        ))}
      </MemberItemWrapper>

      { /* 팀 확정하기 버튼 */ }
      { /* 팀장은 모든 팀원이 준비하기 버튼을 눌렀을 경우, 팀 확정하기 버튼이 활성화되며, 팀 확정하기 버튼을 누르면 카운트 다운이 시작된다. */}
      { /* 팀원은 준비하기 버튼을 눌렀을 경우, 준비하기 버튼이 비활성화된다. */ }
      { role === "leader" ? (
        <TeamLobbyButtons 
          role="leader"
          handleExitRoom={handleExitRoom}
          handleConfirmTeam={handleConfirmTeam}
        />
      ) : (
        <TeamLobbyButtons 
          role="member"
          handleExitRoom={handleExitRoom}
          handleReady={handleReady}
        />
      )}

      <CountdownTimer second={second} />
    </TeamLobbyContainer>

    
  );
}

export default TeamLobby;

const TeamLobbyContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 100px;  
  margin-top: 50px;
`;

const TitleContainer = styled.div`
  display: flex;
`;

const MainTitle = styled.div`
  font-size: 32px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 10px 0 0;
`;

const SubTitle = styled.div`
  font-size: 24px;
  color: var(--color-text);
  margin-top: 5px;
`;

const QuestionButton = styled.button`
  border: none;
  background-color: var(--color-background);
`;

const MemberItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 100px;  
  margin-top: 50px;
  margin-bottom: 30px;
`;



