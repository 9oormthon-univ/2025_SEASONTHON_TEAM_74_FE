import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import TitleHeader from '../components/TitleHeader';
import LockIcon from '../assets/images/lock.png';
import InvestStatusTitle from '../components/InvestStatusTitle';
import InvestStatusContent from '../components/InvestStatusContent';

const mockData = {
  "isSuccess": true,
  "code": "COMMON200",
  "message": "성공!",
  "result": {
    "roundNumber": 1,
    "year": 2020,
    "teamInvestments": [
      {
      "teamName": "Team Alpha",
      "maxInvestmentStock": "삼성전자",
      "totalInvestmentAmount": 68000
      },
      {
      "teamName": "Team Alpha",
      "maxInvestmentStock": "없음",
      "totalInvestmentAmount": 0
      }
    ]
  }
}

const Lock = () => {
    const navigate = useNavigate();
    const { roomId, roundId } = useParams();
    const API_BASE_URL = import.meta.env.VITE_API_URL;

    const currentRound = 1;

    const [investData, setInvestData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 최대 투자 종목 가져오는 API 호출 함수
    const fetchInvestData = async () => {
        // mockData로 우선 테스트
        setInvestData(mockData.result);
        console.log("mockData로 테스트 중...");


        try {
            setLoading(true);

            // 추후 api 연결시에 위 두 줄 코드는 삭제하고, 아래 코드는 주석 해제해주세요!
            // const res = await axios.get(
            //     `${REST_API}/api/rooms/${roomId}/rounds/${roundId}/lock`
            // );

            // if (res.data.isSuccess) {
            //     setInvestData(res.data.result);
            //     console.log("로비 데이터 로드 성공!");
            // } 
            // else {
            //     console.log("로비 데이터 로드 실패: ", res.data.message);
            // }
        } 
        catch (err) {
            console.error("API 호출 에러: ", err);
        } 
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvestData();
    }, [roomId, roundId]);

    return (
        <Wrapper>
            <TitleHeader title="체결" />

            <BodyContainer>
                <RoundText>라운드 {currentRound}</RoundText>
                <Title>LOCK!</Title>
                <Icon src={LockIcon} />
                <LockText>주문이 잠겼어요!</LockText>
                <LockText>서버에서 체결 계산을 준비중입니다.</LockText>
                <TipText>💡팁: 이번 라운드에서 배운 점을 팀과 채팅해 보세요</TipText>
            </BodyContainer>

            <InvestStatusWrapper>
                {/* 투자 정보 제목 부분 */}
                <InvestStatusTitle />

                {/* 투자 정보 내용 부분 */}
                {console.log("팀 정보에 뭐가? ", investData)}
                {investData?.teamInvestments?.map(item => (
                    <InvestStatusContent 
                        key={item.teamName}
                        team={item}
                    />
                ))}
            </InvestStatusWrapper>
        </Wrapper>
    );
}

export default Lock;

const Wrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    color: #000000;
`;

const BodyContainer = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 40px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const RoundText = styled.span`
    color: #00C2A8;
    font-size: 24px;
    font-weight: 600;
`;

const Title = styled.span`
    font-size: 80px;
    font-weight: 500;
    margin: 28px 0;
`;

const Icon = styled.img`
    width: 32px;
    height: auto;
    object-fit: contain;
    margin-bottom: 48px;
`;

const LockText = styled.span`
    font-size: 40px;
    font-weight: 600;
    margin-bottom: 20px;
`;

const TipText = styled.span`
    font-size: 32px;
    font-weight: 500;
    margin: 60px 0 80px;
`;


const InvestStatusWrapper = styled.div`
    width: 1000px;
    // border: 2px solid red;
    margin: 20px auto;
`;