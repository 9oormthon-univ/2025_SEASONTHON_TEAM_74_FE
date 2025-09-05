import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import TeamCard from "../components/TeamCard";

import styled from "styled-components";

const mockData = {
  roomId: 9,
  nickName: "string",
  teamDetail: [
    {
      teamId: 1,
      teamName: "팀명 1",
      isReady: true,
      leaderNickName: "ZXCV",
      memberNickNames: ["153212", "string", "QWER", "d", "d"],
    },
    {
      teamId: 2,
      teamName: "팀명 2",
      isReady: false,
      leaderNickName: null,
      memberNickNames: [],
    },
    {
      teamId: 3,
      teamName: "팀명 3",
      isReady: false,
      leaderNickName: null,
      memberNickNames: [],
    },
    {
      teamId: 4,
      teamName: "팀명 4",
      isReady: false,
      leaderNickName: null,
      memberNickNames: [],
    },
    {
      teamId: 5,
      teamName: "팀명 5",
      isReady: false,
      leaderNickName: null,
      memberNickNames: [],
    },
    {
      teamId: 6,
      teamName: "팀명 6",
      isReady: false,
      leaderNickName: null,
      memberNickNames: [],
    },
  ],
};

const Lobby = () => {
  const { roomId } = useParams(); // App.jsx에서 경로 수정할 것

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [lobbyData, setLobbyData] = useState(null);

  const REST_API = import.meta.env.VITE_API_URL;

  // 방 내 모든 팀 정보(팀 구성원)를 가져오는 API 호출 함수
  const fetchLobbyData = async () => {
    try {
      setLoading(true);

      // mockData로 우선 테스트
      setLobbyData(mockData);
      console.log("mockData로 테스트 중...");


      // 추후 api 연결시에 위 두 줄 코드는 삭제하고, 아래 코드는 주석 해제해주세요!
      // const res = await axios.get(
      //   `${REST_API}/api/rooms/${roomId}/lobby`
      // );

      // if (res.data.isSuccess) {
      //   setLobbyData(res.data.result);
      //   console.log("로비 데이터 로드 성공!");
      // } 
      // else {
      //   console.log("로비 데이터 로드 실패: ", res.data.message);
      //   /*
      //   우선은 목데이터로 사용합니다 추후에 아래 코드를 지워주세요
      //   */
      //  setLobbyData(mockData);
      // }
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
    fetchLobbyData();
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
    // role에는 "leader"인지 "member" 둘 중 하나로 넣어준다.
    try {
      const res = await axios.patch(`${REST_API}/api/rooms/${roomId}/${teamId}/${role}`);

      if(res.data.isSuccess) {
        fetchLobbyData(); // 역할 부여가 성공시에는 로비 데이터 새로 부른다.
        console.log(`${role}이 되셨습니다.`);

        // 팀 참가에 성공하였으므로 바로 아래에 해당 팀 로비로 이동(teamId 넣어서 )
        navigate("/team-lobby");
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
    if(window.confirm("정말로 방을 나가시겠습니까?")) {
      try {
        const res = await axios.delete(`${REST_API}/api/rooms/${roomId}/participants/me`);

        if(res.data.isSuccess) {
          console.log("방 나기기에 성공하셨습니다.");
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

