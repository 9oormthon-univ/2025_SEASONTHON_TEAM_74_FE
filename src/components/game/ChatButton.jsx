import React from 'react';
import styled from 'styled-components';
import ChatIcon from '../../assets/images/chat.png';

const ChatButton = ({ text, onClick }) => {
    return (
        <Button onClick={onClick}>
            <Icon src={ChatIcon} />
            <span>{text}</span>
        </Button>
    );
}

export default ChatButton;

const Button = styled.button`
    width: 25%;
    height: 60px;
    color: #E0F7F4;
    background-color: #00C2A8;
    font-size: 20px;
    font-weight: 500;
    line-height: 60px;
    border: none;
    border-radius: 40px;
    text-align: center;
    cursor: pointer;
    transition: 0.3s ease;

    &:hover {
        filter: brightness(0.95);
    }

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
`;

const Icon = styled.img`
    width: 22px;
    height: auto;
    object-fit: contain;
`;
