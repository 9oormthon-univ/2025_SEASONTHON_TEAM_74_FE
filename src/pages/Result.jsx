import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TitleHeader from '../components/TitleHeader';
import InfoCard from '../components/game/InfoCard';
import GraphCard from '../components/game/GraphCard';
import NextButton from '../components/game/NextButton';
import ChatButton from '../components/game/ChatButton';

const Result = () => {
    const navigate = useNavigate();

    // 다음 라운드
    const handleNext = () => {
        navigate('/final');
    }

    // 채팅창 열기
    const handleChat = () => {
        navigate('/test');
    }

    const round = "1";

    return (
      <Wrapper>
        {/* 헤더 */}
        <TitleHeader title="결과" />
        <BodyContainer>
          {/* 타이틀 */}
          <Heading>따끈따끈한 {round} 라운드 결과가 나왔어요! 🥳</Heading>

          {/* 총 자산 / 이번 라운드 손익 */}
          <InfoCard
            title="총 자산 / 이번 라운드 손익"
            items={["1,120,000 원 (+12%)", "120,000 원 (+12%)"]}
            background="#7ED6DF"
            titleColor="#02453C"
          />

          {/* 시장 분석 리포트 */}
          <Title>시장 분석 리포트 :</Title>
          <InfoCard
            title="당신의 선택을 돕던 2018년도 힌트, 실제 그 결과는?"
            items={[
              "평창 동계올림픽 개최: 개최지 인근 숙박·여행·스포츠 관련주가 호재로 반응해 상승세를 보였습니다.",
              "최저임금 상향: 인건비 부담으로 일부 소매·외식 업종 주가가 약세를 기록했습니다.",
            ]}
          />

          {/* 종목별 성과 */}
          <Title>종목별 성과 :</Title>
          <InfoCard
            title="1 라운드 종목별 손익"
            items={[
              "A 뷰티 40%  /  +₩50,000 (+5%)",
              "B 자동차 30%  /  -₩30,000 (-3%)",
              "C 헬스케어 30%  /  +₩100,000 (+10%)",
            ]}
          />

          {/* 그래프 */}
          {/* <Title>그래프 :</Title>
          <GraphContainer>
            <GraphCard title="총 자산 변화" />
            <GraphCard title="수익 기여도" />
          </GraphContainer> */}

          {/* [청산] & [채팅창 열기] 버튼 */}
          {/* <ModeBtnContainer>
            <NextButton text="청산" onClick={handleNext} />
            <NextButton text="유지" onClick={handleNext} />
          </ModeBtnContainer> */}

          {/* [다음 라운드] & [채팅창 열기] 버튼 */}
          <BtnContainer>
            <NextButton text="다음 라운드" onClick={handleNext} />
            <ChatButton text="채팅창 열기" onClick={handleChat} />
          </BtnContainer>
        </BodyContainer>
      </Wrapper>
    );
}

export default Result;

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

const Heading = styled.span`
    font-size: 32px;
    font-weight: 600;
    white-space: nowrap;
    margin-bottom: 40px;
    cursor: default;
`;

const Title = styled.span`
    font-size: 28px;
    font-weight: 600;
    text-align: left;
    align-self: flex-start;
    white-space: nowrap;
    margin: 60px 0 30px;
    cursor: default;
`;

const GraphContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 40px;
`;

const ModeBtnContainer = styled.div`
    width: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 80px;
    gap: 30px;
`;

const BtnContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 80px 0;
    gap: 30px;
`;
