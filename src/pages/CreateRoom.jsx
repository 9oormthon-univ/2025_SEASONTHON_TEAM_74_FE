import React, { useState } from 'react';
import styled from 'styled-components';
import TitleHeader from '../components/TitleHeader';

const CreateRoom = () => {
    // 입력 필드
    const [hostname, setHostname] = useState("");
    const [maxPlayers, setMaxPlayers] = useState("");
    const [password, setPassword] = useState("");
    
    // 게임 코드
    const [gameCode, setGameCode] = useState("");
    const [copy, setCopy] = useState(false);

    // 게임 설정
    const [round, setRound] = useState("");
    const [mode, setMode] = useState("");
    const [year, setYear] = useState("");
    const [seed, setSeed] = useState("");

    // 게임 코드 생성
    const handleCode = () => {
        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
        setGameCode(code);
        setCopy(false);
    }

    // 게임 코드 복사
    const handleCopy = () => {
        if (gameCode) {
            navigator.clipboard.writeText(gameCode);
            setCopy(true);
        }
    }

    return (
        <Wrapper>
            <TitleHeader title="방 만들기" />
            <BodyContainer>
                <Heading>방을 만들어보세요!</Heading>

                {/* 입력 필드 */}
                <InputBox>
                    <Label>방장</Label>
                    <Input type="text" placeholder="닉네임을 적어주세요." />
                </InputBox>

                <InputBox>
                    <Label>최대 인원</Label>
                    <Input type="number" placeholder="1명에서 36명까지 선택할 수 있어요." />    
                </InputBox>

                <InputBox>
                    <Label>비밀번호</Label>
                    <Input type="password" placeholder="비밀번호를 설정할 수 있어요. 원하지 않으면 비워두세요." />
                </InputBox>

                <InputBox>
                    <Label>게임 코드</Label>
                    <Row>
                        <SmallBtn type="button" onClick={handleCode}>생성</SmallBtn>
                        <CodeBox>{gameCode || '· · ·'}</CodeBox>
                        <SmallBtn type="button" onClick={handleCopy} disabled={!gameCode}>
                            {copy ? '복사됨' : '복사'}
                        </SmallBtn>
                    </Row>
                </InputBox>

                {/* 게임 설정 */}
                <SectionTitle>게임 설정</SectionTitle>

                <InputBox>
                    <Label>라운드</Label>
                    <Select value={round} onChange={(e) => setRound(e.target.value)}>
                        <option disabled hidden>최대 10개의 라운드까지 설정할 수 있어요.</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((r) => (
                            <option key={r} value={r}>{r}</option>
                        ))}
                    </Select>
                </InputBox>

                <InputBox>
                    <Label>모드</Label>
                    <Row>
                        {['청산', '결정', '유연'].map((m) => (
                            <SmallBtn
                                key={m}
                                type="button"
                                onClick={() => setMode(m)}
                                data-active={mode === m}
                            >
                                {m}
                            </SmallBtn>
                        ))}
                    </Row>
                </InputBox>

                <InputBox>
                    <Label>연도 설정</Label>
                    <Select value={year} onChange={(e) => setYear(e.target.value)}>
                        <option disabled hidden>게임을 진행할 연도를 설정해주세요.</option>
                        {[2000, 2005, 2010, 2015].map((y) => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </Select>
                </InputBox>

                <InputBox>
                    <Label>시드머니</Label>
                    <Input
                        type="number"
                        placeholder="첫 투자 자금을 설정하세요 (0 ~ 1,000,000)"
                        value={seed}
                        onChange={(e) => setSeed(e.target.value)}
                    />
                </InputBox>

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

const SmallBtn = styled.button`
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
