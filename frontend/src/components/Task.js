import React, { useState } from 'react';
import styled from 'styled-components';

const TaskContainer = styled.div`
  background-color: #e9ecef;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
  border-left: 5px solid #6c757d;
  font-family: 'Roboto', sans-serif;
`;

const Box = styled.div`
  background-color: #ffffff;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const TaskTitleBox = styled(Box)`
  font-size: 1.25rem;
  font-weight: 700;
  color: #343a40;
`;

const TaskDescriptionBox = styled(Box)`
  font-size: 1rem;
  color: #495057;
  font-weight: 400;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #dc3545;
  
  &:hover {
    background-color: #c82333;
  }
`;

const Task = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onUpdate(task._id, title, description);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setTitle(task.title);
    setDescription(task.description);
  };

  const handleDeleteClick = () => {
    onDelete(task._id);
  };

  return (
    <TaskContainer>
      {isEditing ? (
        <>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
          <ButtonContainer>
            <Button onClick={handleSaveClick}>Save</Button>
            <Button onClick={handleCancelClick}>Cancel</Button>
          </ButtonContainer>
        </>
      ) : (
        <>
          <TaskTitleBox>{task.title}</TaskTitleBox>
          <TaskDescriptionBox>{task.description}</TaskDescriptionBox>
          <ButtonContainer>
            <Button onClick={handleUpdateClick}>Update</Button>
            <DeleteButton onClick={handleDeleteClick}>Delete</DeleteButton>
          </ButtonContainer>
        </>
      )}
    </TaskContainer>
  );
};

export default Task;
