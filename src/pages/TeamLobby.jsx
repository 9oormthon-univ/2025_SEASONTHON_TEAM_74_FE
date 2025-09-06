import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import TeamLobbyItem from "../components/TeamLobbyItem";
import CountdownTimer from "../components/game/CountdownTimer";
import TeamLobbyButtons from "../components/TeamLobbyButtons";
import { useWebsocketStore } from "../context/Websocket";
import { useAuthStore } from "../context/authStore";
import axios from "axios";

import styled from "styled-components";
import question from "./../assets/images/question.svg"; 

// const mockData = {
//   "isSuccess": true,
//   "code": "COMMON200",
//   "message": "성공!",
//   "result": {
//     "teamId": 1,
//     "teamName": "팀명 1",
//     "leader": {
//       "ㅇㅇㅇ": false  //리더는 준비완료 상태가 따로 없습니다! 팀원 다 준비되면 팀 확정하기 버튼이 가능합니다!
//     },
//     "members": [
//       {
//         "유림": false   //멤버 닉네임 : 준비완료 상태
//       },
//       {
//         "ㄴㄴㄴ": true //닉네임 : 준비완료 상태
//       },
//       {
//         "QWER": true
//       }
//     ]
//   }
// }


const TeamLobby = () => {
  const navigate = useNavigate();

  const { roomId, teamId } = useParams();

  const { connect, disconnect, subscribeToTeamLobby, unsubscribeFromTopic, sendMessage, isConnected } = useWebsocketStore();
  
  // 웹소켓 연결 상태 디버깅
  console.log('🔍 TeamLobby - isConnected:', isConnected);

  const [teamData, setTeamData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, updateNickname } = useAuthStore();
  const currentUserNickname = user?.nickname;
  const [isTeamConfirmed, setIsTeamConfirmed] = useState(false);
  const [isUserReady, setIsUserReady] = useState(false);

  const REST_API = import.meta.env.VITE_API_URL;

  const leaderNickname = teamData?.leader ? Object.keys(teamData.leader)[0] : "";

  // 디버깅을 위한 콘솔 로그 추가
  console.log("현재 사용자 닉네임:", currentUserNickname);
  console.log("팀장 닉네임:", leaderNickname);
  console.log("팀 데이터:", teamData);
  console.log("로딩 상태:", isLoading);

  // 현재 사용자의 역할(leader 또는 member)
  const role = currentUserNickname === leaderNickname ? "leader" : "member";

  console.log("현재 역할:", role);

  // 게임까지 몇초가 남았는지
  const second = 3;

  useEffect(() => {
    const initializeTeamLobby = async () => {
      // 먼저 초기 데이터 로드
      await fetchTeamData();
      
      // 웹소켓 연결
      connect();
      
      // 연결이 완료된 후 구독 (약간의 지연을 두고)
      setTimeout(() => {
        console.log('🚀 팀 로비 구독 시도 중...', { roomId, teamId });
        subscribeToTeamLobby(roomId, teamId, (data) => {
          console.log("📨 팀 로비 데이터 수신:", data);
          console.log("📨 데이터 타입:", typeof data);
          console.log("📨 데이터 구조:", JSON.stringify(data, null, 2));

          // 팀 데이터 업데이트 - 서버에서 직접 팀 데이터를 보내는 경우
          if(data && data.teamId && data.teamName) {
            console.log("✅ 팀 데이터 업데이트 중 (직접 데이터):", data);
            setTeamData(data);
            setIsLoading(false);
          }
          // 기존 API 응답 형태인 경우
          else if(data && data.isSuccess && data.result) {
            console.log("✅ 팀 데이터 업데이트 중 (API 응답):", data.result);
            setTeamData(data.result);
            setIsLoading(false);
          }
          // result만 있는 경우
          else if(data && data.result) {
            console.log("✅ 팀 데이터 업데이트 중 (result만 있음):", data.result);
            setTeamData(data.result);
            setIsLoading(false);
          }
          else {
            console.log("❌ 팀 로비 데이터 수신 실패:", data);
          }
        });
      }, 1000);
    };

    initializeTeamLobby();

    return () => {
      // 팀 로비 토픽 구독 해제
      const topic = `/topic/room/${roomId}/team/${teamId}`;
      unsubscribeFromTopic(topic);
    };

  }, [roomId, teamId]);

  // 웹소켓 연결 상태 변화 모니터링
  useEffect(() => {
    console.log('🔍 웹소켓 연결 상태 변화:', isConnected);
    if (isConnected) {
      console.log('✅ 웹소켓이 연결되었습니다. 팀 로비 구독을 시도합니다.');
    } else {
      console.log('❌ 웹소켓이 연결되지 않았습니다.');
    }
  }, [isConnected]);

  // 팀 데이터 로드 함수
  const fetchTeamData = async () => {
    try {
      setIsLoading(true);

      const raw = localStorage.getItem('userData');
      const token = raw ? (JSON.parse(raw).accessToken || JSON.parse(raw).token || JSON.parse(raw).jwt) : null;

      if (!token) {
        console.error('JWT 토큰이 없습니다. 로그인을 먼저 해주세요.');
        return;
      }
      
      const res = await axios.get(`${REST_API}/api/rooms/${roomId}/${teamId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if(res.data.isSuccess) {
        setTeamData(res.data.result);
        setIsLoading(false);
      }
      else {
        console.log("팀 데이터 로드 실패:", res.data.message);
      }
    }
    catch(err) {
      console.error("팀 데이터 로드 오류: ", err);
    }
  };

  const handleQuestion = () => {
    navigate("/rule");
  };

  // 디버깅용: 수동으로 구독 재시도
  const handleRetrySubscription = () => {
    console.log('🔄 수동 구독 재시도');
    subscribeToTeamLobby(roomId, teamId, (data) => {
      console.log("📨 수동 재시도 - 팀 로비 데이터 수신:", data);
      
      // 팀 데이터 업데이트 - 서버에서 직접 팀 데이터를 보내는 경우
      if(data && data.teamId && data.teamName) {
        console.log("✅ 수동 재시도 - 팀 데이터 업데이트 중 (직접 데이터):", data);
        setTeamData(data);
        setIsLoading(false);
      }
      // 기존 API 응답 형태인 경우
      else if(data && data.isSuccess && data.result) {
        console.log("✅ 수동 재시도 - 팀 데이터 업데이트 중 (API 응답):", data.result);
        setTeamData(data.result);
        setIsLoading(false);
      }
      // result만 있는 경우
      else if(data && data.result) {
        console.log("✅ 수동 재시도 - 팀 데이터 업데이트 중 (result만 있음):", data.result);
        setTeamData(data.result);
        setIsLoading(false);
      }
      else {
        console.log("❌ 수동 재시도 - 팀 로비 데이터 수신 실패:", data);
      }
    });
  };

  const handleExitRoom = async () => {
    // 팀 나가기 api 연동
    try {
      // JWT 토큰 가져오기
      const raw = localStorage.getItem('userData');
      const token = raw ? (JSON.parse(raw).accessToken || JSON.parse(raw).token || JSON.parse(raw).jwt) : null;

      if (!token) {
        console.error('JWT 토큰이 없습니다.');
        return;
      }

      const res = await axios.delete(`${REST_API}/api/rooms/${roomId}/${teamId}/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if(res.data.isSuccess) {
        console.log("팀 나가가기에 성공하셨습니다.");
        navigate(`/lobby/${roomId}`);
      }
      else {
        alert(res.data.message || "팀 나가기에 실패하셨습니다.");
      }
    }
    catch(err) {
      console.error("팀 나가기 오류: ", err);
    }
  };

  const handleReady = async() => {
    try {
      // JWT 토큰 가져오기
      const raw = localStorage.getItem('userData');
      const token = raw ? (JSON.parse(raw).accessToken || JSON.parse(raw).token || JSON.parse(raw).jwt) : null;

      if (!token) {
        console.error('JWT 토큰이 없습니다.');
        return;
      }

      const res = await axios.patch(`${REST_API}/api/rooms/${roomId}/me/ready`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if(res.data.isSuccess) {
        console.log("준비 상태가 되셨습니다.");
        setIsUserReady(true);
      }
      else {
        alert(res.data.message || "준비 상태에 실패하셨습니다.");
      }
    }
    catch(err) {
      console.error("준비하기 오류: ", err);
    }
  }

  // 모든 팀원이 준비되었는지 확인하는 로직
  const isAllMembersReady = teamData?.members?.every(member => Object.values(member)[0] === true) || false;

  const handleConfirmTeam = async () => {
    if(isAllMembersReady) {
      // 팀 확정하기 api 연동
      try {
        // JWT 토큰 가져오기
        const raw = localStorage.getItem('userData');
        const token = raw ? (JSON.parse(raw).accessToken || JSON.parse(raw).token || JSON.parse(raw).jwt) : null;

        if (!token) {
          console.error('JWT 토큰이 없습니다.');
          return;
        }

        const res = await axios.patch(`${REST_API}/api/rooms/${roomId}/${teamId}/confirm`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if(res.data.isSuccess) {
          console.log("팀 확정이 되셨습니다.");
          setIsTeamConfirmed(true);
        }
        else {
          alert(res.data.message || "팀 확정에 실패하셨습니다.");
        }
      }
      catch(err) {
        console.error("팀 확정 오류: ", err);
      }
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
    updateNickname(newLeaderName);

    setTeamData(prev => ({
      ...prev,
      leader: {
        [newLeaderName]: true,
      },
    }));
  };

  const handleMemberNameChange = (memberIndex, newMemberName) => {
    console.log("handleMemberNameChange 함수 호출!");
    
    // 현재 사용자가 자신의 이름을 변경하는 경우에만 updateNickname 호출
    const currentMember = teamData?.members?.[memberIndex];
    const currentMemberNickname = currentMember ? Object.keys(currentMember)[0] : "";
    
    if (currentMemberNickname === currentUserNickname) {
      updateNickname(newMemberName);
    }
    
    setTeamData(prev => ({
      ...prev,
      members: prev?.members?.map((member, index) => 
        index === memberIndex ? { [newMemberName]: Object.values(member)[0] } : member) || [],
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

  // 로딩 중이거나 teamData가 없으면 로딩 표시
  if (isLoading || !teamData) {
    return (
      <TeamLobbyContainer>
        <Header />
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <MainTitle>로딩 중...</MainTitle>
        </div>
      </TeamLobbyContainer>
    );
  }

  return(
    <TeamLobbyContainer>
      <Header />

      <InfoContainer>
        <TitleContainer>
          <MainTitle>팀 대기실</MainTitle>
          <SubTitle>(팀 당 6명까지 참가할 수 있어요!)</SubTitle>
        </TitleContainer>

        <div style={{ display: 'flex', gap: '10px' }}>
          <QuestionButton onClick={handleQuestion}>
            <img src={question} alt="궁금합니다!"/>
          </QuestionButton>
          <button 
            onClick={handleRetrySubscription}
            style={{
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            구독 재시도
          </button>
        </div>
      </InfoContainer>

      <MemberItemWrapper>
        {/* 팀명 입력 */}
        <TeamLobbyItem 
          title="팀명"
          content={teamData?.teamName || `팀명을 변경하지 않으시면 자동으로 ${teamData?.teamName}로 지정이 됩니다.`}
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
        {teamData?.members?.map((member, index) =>{
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
        {Array.from({length: 5 - (teamData?.members?.length || 0)}).map((_, index) => (
          <TeamLobbyItem 
            key={`empty-member-${index}`}
            title={`팀원${(teamData?.members?.length || 0) + index + 1}`}
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

      {/* <CountdownTimer second={second} /> */}
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



