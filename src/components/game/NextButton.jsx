import React from 'react';
import styled from 'styled-components';

const NextButton = ({ text, onClick }) => {
    return (
        <Button onClick={onClick}>
            {text}
        </Button>
    );
}

export default NextButton;

const Button = styled.button`
    width: 75%;
    height: 60px;
    color: #00C2A8;
    background-color: #E0F7F4;
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
`;
