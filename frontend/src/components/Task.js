import React from 'react';
import styled from 'styled-components';

const TaskContainer = styled.div`
  background-color: #e9ecef;
  padding: 20px;
  margin-bottom: 15px;
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

const Task = ({ task }) => {
  return (
    <TaskContainer>
      <TaskTitleBox>{task.title}</TaskTitleBox>
      <TaskDescriptionBox>{task.description}</TaskDescriptionBox>
    </TaskContainer>
  );
};

export default Task;
