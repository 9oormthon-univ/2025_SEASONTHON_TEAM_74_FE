import { useState } from "react";

import styled from "styled-components";

const TeamLobbyItem = ({ 
  title, 
  content, 
  isReady = false, 
  isLeader = false,
  isEditable = false,
  isDisabled = false,
  onContentChange = null,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleEdit = () => {
    if (isEditable && !isDisabled) {
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    if(onContentChange) {
      // console.log("onContentChange 함수 호출!");
      onContentChange(editedContent);
    }
    else {
      // console.log("onContentChange 함수가 없습니다.");
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if(e.key === "Enter") {
      handleSave();
    }
    else if(e.key === "Escape") {
      setIsEditing(false);
    }
  };

  return (
    <ItemWrapper 
      title={title} 
      $isEditable={isEditable} 
      $isDisabled={isDisabled}
    >
      {/* 타이틀 */}
      <Title 
        title={title} 
        $isReady={isReady} 
        $isDisabled={isDisabled}
      >
        {title} : 
      </Title>

      {/* 입력칸(팀명 또는 팀장 이름 등) */}
      {isEditing ? (
        <NameInput
         type="text" 
         value={editedContent} 
         onChange={(e) => setEditedContent(e.target.value)}
         onKeyDown={handleKeyPress}
         onBlur={handleSave}
         autoFocus
         disabled={isDisabled} 
        />
      ) : (
        <Content
          $isEditable={isEditable && !isDisabled}
          $isDisabled={isDisabled}
          onClick={handleEdit} 
        >
          {content}
        </Content>
      )}
    </ItemWrapper>
  );
};

export default TeamLobbyItem;

const ItemWrapper = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 4px 30px;
  max-width: 1200px;
  height: 80px;
  background-color: var(--color-background);
  border-radius: 70px;
  margin-bottom: 30px;
  position: relative;

  border: 3px solid ${props => 
    props.title === "팀명" ? "var(--color-secondary)" :
    props.$isReady ? "#0717FF" : 
    props.$isDisabled ? "#cccccc" :
    "var(--color-text)"
  };
`;

const Title = styled.div`
  color: ${props => 
    props.title === "팀명" ? "var(--color-secondary)" :
    props.$isReady ? "#0717FF" : 
    props.$isDisabled ? "#cccccc" :
    "var(--color-text)"
  };
  font-size: 32px;
  font-weight: 600;
  width: 130px;
  margin-right: 10px;
`;

const Content = styled.div`
  font-size: 24px;
  font-weight: 400;
  cursor: ${props => props.$isEditable ? "pointer" : "default"};
  color: ${props => props.$isDisabled ? "#cccccc" : "var(--color-text)"};
  
  &:hover {
    color: ${props => props.$isEditable ? "var(--color-primary)" : "var(--color-text)"};
  }
`;

const NameInput = styled.input`
  font-size: 24px;
  font-weight: 400;
  background-color: none;
  flex: 1;
  border: none;
  outline: none;

  &:disabled {
    color: #cccccc;
    cursor: not-allowed;
  }
`;
