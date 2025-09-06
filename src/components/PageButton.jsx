import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../context/authStore";

import styled from "styled-components";

const PageButton = ({ to, icon, alt, children }) => {
  const navigate = useNavigate();

  const { user } = useAuthStore();

  const navigateToPage = () => {
    if(!user) {
      alert("로그인을 먼저 진행해주세요!");
      return;
    }
    navigate(to);
  };

  return (
    <Wrapper onClick={navigateToPage}>
      <img src={icon} alt={alt || "아이콘"} />
      <span>{children}</span>
    </Wrapper>
  );
};

export default PageButton;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;

  background-color: var(--color-background);
  border: 6px solid var(--color-secondary);
  border-radius: 40px; 
  color: var(--color-text);
  width: 240px;
  height: 80px;
  margin: 15px 15px 15px 0;
  text-decoration: none; /* 기본 밑줄 제거 */
  
  transition: all 0.3s ease;
  animation: slideInFromRight 0.8s ease-out;
  
  @keyframes slideInFromRight {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  img {
    width: 30px;
    transition: transform 0.3s ease;
  }

  span {
    font-size: 32px;
    color: var(--color-text);
    transition: all 0.3s ease;
  }

  &:hover {
    background-color: var(--color-secondary);
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);

    img {
      transform: scale(1.1) rotate(5deg);
    }

    span {
      color: var(--color-background);
      transform: scale(1.05);
    }
  }
  
  &:active {
    transform: translateY(-2px) scale(1.02);
    transition: all 0.1s ease;
  }
`;
