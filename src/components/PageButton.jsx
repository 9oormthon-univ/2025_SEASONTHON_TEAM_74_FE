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

  background-color: var(--color-background);
  border: 6px solid var(--color-secondary);
  border-radius: 40px; 
  color: var(--color-text);
  width: 280px;
  height: 100px;
  margin: 20px;
  text-decoration: none; /* 기본 밑줄 제거 */

  img {
    width: 35px;
  }

  span {
    font-size: 40px;
    color: var(--color-text);
  }

  &:hover {
    background-color: var(--color-secondary);

    span {
      color: var(--color-background);
    }
  }
`;
