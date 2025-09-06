import styled from "styled-components";

const CountdownTimer = ({ second }) => {
  return (
    <TimeAlarm>
      {second}초 뒤에 시작합니다!
    </TimeAlarm>
  );
};

export default CountdownTimer;


const TimeAlarm = styled.div`
  color: var(--color-text);
  font-size: 24px;
  margin-bottom: 40px;
  text-align: center;
`;