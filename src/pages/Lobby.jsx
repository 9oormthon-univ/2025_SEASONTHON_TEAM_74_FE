import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import TeamCard from "../components/TeamCard";
import { useWebsocketStore } from "../context/Websocket";

import styled from "styled-components";

// const mockData = {
//   roomId: 9,
//   nickName: "string",
//   teamDetail: [
//     {
//       teamId: 1,
//       teamName: "팀명 1",
//       isReady: true,
//       leaderNickName: "ZXCV",
//       memberNickNames: ["153212", "string", "QWER", "d", "d"],
//     },
//     {
//       teamId: 2,
//       teamName: "팀명 2",
//       isReady: false,
//       leaderNickName: null,
//       memberNickNames: [],
//     },
//     {
//       teamId: 3,
//       teamName: "팀명 3",
//       isReady: false,
//       leaderNickName: null,
//       memberNickNames: [],
//     },
//     {
//       teamId: 4,
//       teamName: "팀명 4",
//       isReady: false,
//       leaderNickName: null,
//       memberNickNames: [],
//     },
//     {
//       teamId: 5,
//       teamName: "팀명 5",
//       isReady: false,
//       leaderNickName: null,
//       memberNickNames: [],
//     },
//     {
//       teamId: 6,
//       teamName: "팀명 6",
//       isReady: false,
//       leaderNickName: null,
//       memberNickNames: [],
//     },
//   ],
// };

const Lobby = () => {
  const { roomId } = useParams(); // App.jsx에서 경로 수정할 것
  const navigate = useNavigate();

  const { connect, disconnect, subscribeToLobby, unsubscribeFromTopic } = useWebsocketStore();

  const [loading, setLoading] = useState(true);
  const [lobbyData, setLobbyData] = useState(null);

  const REST_API = import.meta.env.VITE_API_URL;

  // 방 내 모든 팀 정보(팀 구성원)를 가져오는 API 호출 함수
  const fetchLobbyData = async () => {
    try {
      setLoading(true);

      // JWT 토큰 가져오기
      const raw = localStorage.getItem('userData');
      const token = raw ? (JSON.parse(raw).accessToken || JSON.parse(raw).token || JSON.parse(raw).jwt) : null;
      console.log('[TOKEN]', token);

      // 요청 URL 확인
      const requestUrl = `${REST_API}/api/rooms/${roomId}/lobby`;
      console.log("🔍 API 요청 URL:", requestUrl);

      const res = await axios.get(requestUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log("✅ API 응답 성공:", res.data);

      if (res.data.isSuccess) {
        setLobbyData(res.data.result);
        console.log("로비 데이터 로드 성공!");
      } 
      else {
        console.log("로비 데이터 로드 실패: ", res.data.message);
      }
    } 
    catch (err) {
      console.error("API 호출 에러: ", err);
    } 
    finally {
      setLoading(false);
    }
  };

  // 마운트 시점과 roomId가 바뀔 때마다 로비 데이터 호출 함수 실행
  useEffect(() => {
    const initializeLobby = async () => {
      // 먼저 초기 데이터 로드
      await fetchLobbyData();
      
      // 웹소켓 연결
      connect();
      
      // 연결이 완료된 후 구독 (약간의 지연을 두고)
      setTimeout(() => {
        subscribeToLobby(roomId, (data) => {
          console.log('로비 데이터 수신:', data);
          setLobbyData(data);
          setLoading(false);
        });
      }, 1000);
    };

    initializeLobby();
    
    return () => {
      // 로비 토픽 구독 해제
      unsubscribeFromTopic(`/topic/room/${roomId}/lobby`);
    };
  }, [roomId]);

  // 로딩 중일 때 화면
  if (loading) {
    return (
      <LoadingContainer>
        <LoadingText>로딩 중...</LoadingText>
      </LoadingContainer>
    );
  }

  // 로비 데이터를 불러올 수 없을 때 화면
  if (!lobbyData) {
    return (
      <ErrorContainer>
        <ErrorText>로비 데이터를 불러올 수 없습니다.</ErrorText>
      </ErrorContainer>
    );
  }

  // 팀에 참가하는 함수
  // 팀장으로 참가하는지 팀원으로 참가하는지 구분하여 API 호출
  const handleJoinTeam = async(teamId, role) => {
    // JWT 토큰 가져오기 추가
    const raw = localStorage.getItem('userData');
    const token = raw ? (JSON.parse(raw).accessToken || JSON.parse(raw).token || JSON.parse(raw).jwt) : null;

    if (!token) {
      console.error('JWT 토큰이 없습니다. 로그인을 먼저 해주세요.');
      return;
    }

    // role에는 "leader"인지 "member" 둘 중 하나로 넣어준다.
    try {
      const res = await axios.patch(`${REST_API}/api/rooms/${roomId}/${teamId}/${role}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if(res.data.isSuccess) {
        fetchLobbyData(); // 역할 부여가 성공시에는 로비 데이터 새로 부른다.
        console.log(`${role}이 되셨습니다.`);

        // 팀 참가에 성공하였으므로 바로 아래에 해당 팀 로비로 이동(teamId 넣어서 )
        navigate(`/team-lobby/${roomId}/${teamId}`);
      }
      else {
        alert(res.data.message || "팀 참가에 실패하셨습니다.");
      }
    }
    catch(err) {
      console.error("팀 참가 오류: ", err);
    }
  };

  // 팀 나가기 함수
  const handleExitRoom = async () => {
    // JWT 토큰 가져오기 추가
    const raw = localStorage.getItem('userData');
    const token = raw ? (JSON.parse(raw).accessToken || JSON.parse(raw).token || JSON.parse(raw).jwt) : null;

    if (!token) {
      console.error('JWT 토큰이 없습니다. 로그인을 먼저 해주세요.');
      return;
    }

    if(window.confirm("정말로 방을 나가시겠습니까?")) {
      try {
        const res = await axios.delete(`${REST_API}/api/rooms/${roomId}/participants/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if(res.data.isSuccess) {
          console.log("방 나가가기에 성공하셨습니다.");
          navigate("/");
        }
        else {
          alert(res.data.message || "방 나가기에 실패하셨습니다.");
        }
      }
      catch (err) {
        console.error("방 나기기 오류: ", err);
      }
    }
  }

  return (
    <LobbyContainer>
      <Header />

      <MainSection>
        {/* 간단한 설명과 팀 나가기 버튼 */}
        <InfoContainer>
          <TitleContainer>
            <MainTitle>팀 대기실</MainTitle>
            <SubTitle>(팀 당 6명까지 참가할 수 있어요!)</SubTitle>
          </TitleContainer>

          <ExitRoomButton onClick={handleExitRoom}>
            방 나가기
          </ExitRoomButton>
        </InfoContainer>
        
        {/* 팀 정보 렌더링 */}
        <TeamGrid>
          {lobbyData.teamDetail.map((team) => (
            <TeamCard 
              key={team.teamId}
              team={team}
              onJoinTeam={handleJoinTeam}
            /> 
          ))}
        </TeamGrid>
      </MainSection>
    </LobbyContainer>
  );
};

export default Lobby;

const LobbyContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--color-background);
`;

const MainSection = styled.div`
  flex: 1;
  padding: 40px 60px;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  margin: 0 10px;
  margin-bottom: 50px;
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

const ExitRoomButton = styled.button`
  background-color: var(--color-primary);
  color: var(--color-text);
  border: 1px solid var(--color-secondary);
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--color-secondary);
    transform: translateY(-2px);
  }
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

/* 예외 상황일 경우 화면 관련 스타일링 */
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const LoadingText = styled.div`
  font-size: 24px;
  color: #666;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const ErrorText = styled.div`
  font-size: 24px;
  color: #e74c3c;
`;

