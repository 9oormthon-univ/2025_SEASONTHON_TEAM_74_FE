import React, { useState } from 'react';
import styled from 'styled-components';
import TitleHeader from '../components/TitleHeader';

const JoinRoom = () => {
    //const [code, setCode] = useState("");
    //const [nickname, setNickname] = useState("");
    //const [password, setPassword] = useState("");

    return (
        <Wrapper>
            <TitleHeader title="방 참가하기" />
            <BodyContainer>
                <Heading>방에 참가해 보세요!</Heading>

                {/* 닉네임 */}
                <InputBox>
                    <Label>닉네임</Label>
                    <Input type="text" placeholder="게임에서 사용할 닉네임을 입력해 주세요." />
                </InputBox>

                {/* 게임 코드 */}
                <InputBox>
                    <Label>게임 코드</Label>
                    <Input type="text" placeholder="초대 받은 코드를 입력해 주세요." />
                </InputBox>

                {/* 비밀번호 */}
                <InputBox>
                    <Label>비밀번호</Label>
                    <Input type="password" placeholder="비밀번호를 입력해 주세요." />
                </InputBox>

                <JoinBtn>입장하기</JoinBtn>
            </BodyContainer>
        </Wrapper>
    );
}

export default JoinRoom;

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

const JoinBtn = styled.button`
    width: 100%;
    max-width: 300px;
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
