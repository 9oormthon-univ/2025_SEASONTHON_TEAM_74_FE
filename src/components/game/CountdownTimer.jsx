import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CountdownTimer = ({ initialTime = 210, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime); // 3분 30초

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onTimeUp) onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (onTimeUp) onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}분 ${remainingSeconds.toString().padStart(2, '0')}초`;
  };

  const getTimeColor = () => {
    if (timeLeft <= 30) return '#FF4444'; // Read (30초 이하)
    if (timeLeft <= 60) return '#FF8800'; // 주황색 (1분 이하)
    return '#000000'; // 기본 색상
  };

  return (
    <TimerContainer>
      <ClockIcon>⏰</ClockIcon>
      <TimerText color={getTimeColor()}>
        {formatTime(timeLeft)}
      </TimerText>
    </TimerContainer>
  );
};

export default CountdownTimer;

const TimerContainer = styled.div`
  width: 120px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 16px;
  background-color: #FFFFFF;
  border-radius: 100px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
  border: 2px solid #E0F7F4;
  box-sizing: border-box;
`;

const ClockIcon = styled.span`
  font-size: 18px;
  animation: tick 1s ease-in-out infinite;
  
  @keyframes tick {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
`;

const TimerText = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.color};
  text-align: center;
  min-width: 70px;
`;
