import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TitleHeader from '../components/TitleHeader';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const MODE_MAP = { '청산': 'STANDARD', '유연': 'RELAXED' };

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const onlyDigits = (v) => v.replace(/[^\d]/g, '');
const nf = new Intl.NumberFormat('ko-KR');
const formatMoney = (v) => (v === '' ? '' : nf.format(Number(v)));
const stripDigits = (s) => s.replace(/[^\d]/g, '');

const CreateRoom = () => {
    const navigate = useNavigate();

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

    // 숫자 입력 공통 onChange
    const handleNumChange = (setter) => (e) => {
        const raw = e.target.value;
        setter(onlyDigits(raw));
    };

    // 시드머니 콤마 표시
    const handleMoneyChange = (e) => {
        const raw = stripDigits(e.target.value);
        setSeedMoney(raw);
    };
    const handleMoneyBlur = () => {
        if (seedMoney === '') return;
        const n = Number(seedMoney);
        const clamped = Math.max(100000, Math.min(1000000, n));
        const snapped = Math.round(clamped / 1000) * 1000;
        setSeedMoney(String(snapped));
    };

    // 범위 강제 onBlur
    const handleClampOnBlur = (setter, min, max, step = 1) => (e) => {
        const v = e.target.value === '' ? '' : Number(e.target.value);
        if (v === '') return;
        const clamped = clamp(v, min, max);
        const snapped = step > 1 ? Math.round(clamped / step) * step : clamped;
        setter(String(clamp(snapped, min, max)));
    };

    // 방 만들기 API
    const handleCreate = async () => {
        // 입력값 검증
        if (!nickname.trim()) return alert('닉네임을 입력해 주세요.');
        if (!maxMember) return alert('최대 인원을 설정해 주세요.');
        if (!inviteCode) return alert('게임 코드를 생성해 주세요.');
        if (!maxTeam) return alert('팀 개수를 설정해 주세요.');
        if (!maxRound) return alert('라운드 수를 설정해 주세요.');
        if (!mode) return alert('모드를 선택해 주세요.');
        if (!yearSet) return alert('연도를 설정해 주세요.');
        if (!seedMoney) return alert('시드머니를 설정해 주세요.');

        const payload = {
            nickname: nickname.trim(),
            maxMember: Number(maxMember),
            pwd: pwd.trim() || undefined,
            inviteCode,
            maxTeam: Number(maxTeam),
            maxRound: Number(maxRound),
            mode: MODE_MAP[mode],
            yearSet: String(yearSet),
            seedMoney: Number(seedMoney),
        };

        console.log('payload:', payload);

        const raw = localStorage.getItem('userData');
        const token = raw ? (JSON.parse(raw).accessToken || JSON.parse(raw).token || JSON.parse(raw).jwt) : null;
        console.log('[TOKEN]', token);

        try {
            const { data } = await axios.post(`${apiUrl}/api/rooms`, payload, {
                headers: { 
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
            });

            if (!data?.isSuccess) {
                throw new Error(data?.message || '방 만들기 실패');
            }

            console.log('방 만들기 완료:', data);

            // for test
            navigate('/test');
        } catch (err) {
            console.error(err);
            console.error(err?.response?.data);
            alert(err?.response?.data?.message || err.message || '방 만들기 실패');
        }
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
                    <Input 
                        value={maxRound}
                        type="number" 
                        placeholder="최대 15개의 라운드까지 설정할 수 있어요." 
                        min="1" 
                        max="15"
                        inputMode="numeric"
                        onChange={handleNumChange(setMaxRound)}
                        onBlur={handleClampOnBlur(setMaxRound, 1, 15)}
                    />
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
                        value={formatMoney(seedMoney)}
                        type="text"
                        placeholder="첫 투자 자금을 설정하세요 (100,000 ~ 1,000,000)"
                        min="100000" 
                        max="1000000" 
                        inputMode="numeric"
                        step="1000" 
                        onChange={handleMoneyChange}
                        onBlur={handleMoneyBlur}
                    />
                </InputBox>
                
                {/* 방 만들기 버튼 */}
                <CreateBtn onClick={handleCreate}>방 만들기</CreateBtn>
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
