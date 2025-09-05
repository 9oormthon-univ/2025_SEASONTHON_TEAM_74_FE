import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TitleHeader from '../components/TitleHeader';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const onlyDigits = (v) => v.replace(/[^\d]/g, '');

const CreateRoom = () => {
    const [nickname, setNickname] = useState("");       // 방장
    const [maxMember, setMaxMember] = useState("");     // 최대 인원(1~36명)
    const [pwd, setPwd] = useState("");                 // 비밀번호
    const [inviteCode, setInviteCode] = useState("");   // 게임 코드
    const [copy, setCopy] = useState(false);            // 게임 코드 복사

    // 게임 설정
    const [maxTeam, setMaxTeam] = useState("");         // 팀 개수 설정(1~6)
    const [maxRound, setMaxRound] = useState("");       // 라운드
    const [mode, setMode] = useState("");               // 모드
    const [yearSet, setYearSet] = useState("");         // 연도 설정
    const [seedMoney, setSeedMoney] = useState("");     // 시드머니(10,000 ~ 1,000,000)

    // 게임 코드 생성
    const handleCode = () => {
        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
        setInviteCode(code);
        setCopy(false);
    }

    // 게임 코드 복사
    const handleCopy = () => {
        if (inviteCode) {
            navigator.clipboard.writeText(inviteCode);
            setCopy(true);
        }
    }

    // 시드머니 콤마 표시
    const formatMoney = (v) =>
        v === '' ? '' : Number(v).toLocaleString('en-US');

    // 숫자 입력 공통 onChange (입력 중에는 숫자만 유지)
    const handleNumChange = (setter) => (e) => {
        const raw = e.target.value;
        setter(onlyDigits(raw));
    };

    // 범위 강제 onBlur
    const handleClampOnBlur = (setter, min, max, step = 1) => (e) => {
        const v = e.target.value === '' ? '' : Number(e.target.value);
        if (v === '') return;
        const clamped = clamp(v, min, max);
        const snapped = step > 1 ? Math.round(clamped / step) * step : clamped;
        setter(String(clamp(snapped, min, max)));
    };

    return (
        <Wrapper>
            <TitleHeader title="방 만들기" />
            <BodyContainer>
                <Heading>방을 만들어 보세요!</Heading>

                {/* 방장 */}
                <InputBox>
                    <Label>방장</Label>
                    <Input 
                        value={nickname}
                        type="text" 
                        placeholder="닉네임을 입력해 주세요." 
                        onChange={(e) => setNickname(e.target.value)}
                    />
                </InputBox>

                {/* 최대 인원 */}
                <InputBox>
                    <Label>최대 인원</Label>
                    <Input 
                        value={maxMember}
                        type="number" 
                        placeholder="1명에서 36명까지 선택할 수 있어요." 
                        min="1" 
                        max="36"
                        inputMode="numeric"
                        onChange={handleNumChange(setMaxMember)}
                        onBlur={handleClampOnBlur(setMaxMember, 1, 36)}
                    />
                </InputBox>

                {/* 비밀번호 */}
                <InputBox>
                    <Label>비밀번호</Label>
                    <Input 
                        value={pwd}
                        type="password" 
                        placeholder="비밀번호를 설정할 수 있어요. (선택)" 
                        onChange={(e) => setPwd(e.target.value)}
                    />
                </InputBox>

                {/* 게임 코드 */}
                <InputBox>
                    <Label>게임 코드</Label>
                    <Row>
                        <CodeBtn type="button" onClick={handleCode}>생성</CodeBtn>
                        <CodeBox>{inviteCode || '· · ·'}</CodeBox>
                        <CodeBtn type="button" onClick={handleCopy} disabled={!inviteCode}>
                            {copy ? '복사됨' : '복사'}
                        </CodeBtn>
                    </Row>
                </InputBox>

                {/* 게임 설정 */}
                <SectionTitle>게임 설정</SectionTitle>

                {/* 팀 개수 설정 */}
                <InputBox>
                    <Label>팀 개수 설정</Label>
                    <Input 
                        value={maxTeam}
                        type="number" 
                        placeholder="최대 6팀까지 만들 수 있어요." 
                        min="1" 
                        max="6"
                        inputMode="numeric"
                        onChange={handleNumChange(setMaxTeam)}
                        onBlur={handleClampOnBlur(setMaxTeam, 1, 6)}
                    />
                </InputBox>

                {/* 라운드 */}
                <InputBox>
                    <Label>라운드</Label>
                    <Select value={maxRound} onChange={(e) => setMaxRound(e.target.value)}>
                        <option value="" disabled hidden>
                            최대 10개의 라운드까지 설정할 수 있어요.
                        </option>
                        {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1}
                            </option>
                        ))}
                    </Select>
                </InputBox>

                {/* 모드 */}
                <InputBox>
                    <Label>모드</Label>
                    <Row>
                        {['청산', '유연'].map((m) => (
                            <ModeBtn
                                key={m}
                                type="button"
                                onClick={() => setMode(m)}
                                data-active={mode === m}
                            >
                                {m}
                            </ModeBtn>
                        ))}
                    </Row>
                </InputBox>

                {/* 연도 설정 */}
                <InputBox>
                    <Label>연도 설정</Label>
                    <Select value={yearSet} onChange={(e) => setYearSet(e.target.value)}>
                        <option value="" disabled hidden>
                            게임을 진행할 연도를 설정해 주세요.
                        </option>
                        {[2000, 2005, 2010, 2015].map((y) => (
                            <option key={y} value={y}>
                                {y}
                            </option>
                        ))}
                    </Select>
                </InputBox>

                {/* 시드머니 */}
                <InputBox>
                    <Label>시드머니</Label>
                    <Input
                        value={seedMoney}
                        type="number"
                        placeholder="첫 투자 자금을 설정하세요 (10,000 ~ 1,000,000)"
                        min="10000" 
                        max="1000000" 
                        inputMode="numeric"
                        step="1000" 
                        onChange={handleNumChange(setSeedMoney)}
                        onBlur={handleClampOnBlur(setSeedMoney, 10000, 1000000, 1000)}
                    />
                </InputBox>
                
                {/* 방 만들기 버튼 */}
                <CreateBtn>방 만들기</CreateBtn>
            </BodyContainer>
        </Wrapper>
    );
}

export default CreateRoom;

const Wrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    color: #000000;
`;

const BodyContainer = styled.div`
    width: 100%;
    max-width: 600px;
    margin: 80px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const Heading = styled.span`
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 40px;
    cursor: default;
`;

const InputBox = styled.div`
    width: 100%;
    max-width: 600px;
    height: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 28px 24px;
    box-sizing: border-box;
    border: 1px solid #121212;
    border-radius: 100px;
`;

const Label = styled.span`
    margin-right: 32px;
    font-size: 20px;
    font-weight: 600;
    cursor: default;
`;

const Input = styled.input`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none;
    font-size: 16px;
    background-color: transparent;

    &::placeholder {
        color: #A6A6A6;
    }
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
`;

const CodeBtn = styled.button`
    width: 72px;
    height: 30px;
    padding: 8px 16px;
    border: none;
    border-radius: 20px;
    color: #5E5E5E;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
        background-color: #E7E7E7;
    }
        
    &[data-active='true'] {
        background-color: #E0F7F4;
        font-weight: 600;
    }
`;

const ModeBtn = styled.button`
    width: 120px;
    height: 30px;
    padding: 8px 16px;
    border: none;
    border-radius: 20px;
    color: #5E5E5E;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
        background-color: #E7E7E7;
    }
        
    &[data-active='true'] {
        background-color: #E0F7F4;
        font-weight: 600;
    }
`;

const CodeBox = styled.div`
    width: 100px;
    height: 30px;
    padding: 0px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    color: #00C2A8;
    background-color: #F5F5F5;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: default;
`;

const SectionTitle = styled.span`
    width: 100%;
    max-width: 600px;
    margin: 40px 0 8px 0;
    font-size: 22px;
    font-weight: 600;
    text-align: left;
    cursor: default;
`;

const Select = styled.select`
    flex: 1;
    padding: 12px 8px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    background-color: transparent;
    outline: none;
    cursor: pointer;
    color: ${props => props.value ? '#000000' : '#A6A6A6'};

    option {
        color: #000000;
    }

    option[disabled] {
        color: #A6A6A6;
    }

    &:focus {
        color: #000000;
    }
`;

const CreateBtn = styled.button`
    width: 100%;
    max-width: 400px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    padding: 16px;
    border: none;
    border-radius: 30px;
    background-color: #E0F7F4;
    color: #00C2A8;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background-color: #C8EBE3;
    }
`;
