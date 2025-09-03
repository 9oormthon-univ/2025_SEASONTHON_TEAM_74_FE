import { Link } from "react-router-dom";
import styled from "styled-components";

const PageButton = ({ to, icon, alt, children }) => {
  return (
    <Wrapper to={to}>
      <img src={icon} alt={alt || "아이콘"} />
      <span>{children}</span>
    </Wrapper>
  );
};

export default PageButton;

const Wrapper = styled(Link)`
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
  margin: 10px;
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
