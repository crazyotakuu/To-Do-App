import React, { useContext, useEffect, useState, useCallback } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import Task from '../components/Task';
import '../Styles/TasksPage.css'; // Import CSS file for styling

const TasksPage = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Define fetchTasks as a memoized callback
  const fetchTasks = useCallback(async () => {
    try {
      const response = await api.get('/api/tasks', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  }, [user]);

  useEffect(() => {
    fetchTasks(); // Initial fetch when component mounts or user changes
  }, [fetchTasks]); // Fetch tasks whenever fetchTasks function changes

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await api.post(
        '/api/tasks',
        { title, description },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      // Clear tasks and fetch again to refresh the list
      setTasks([]);
      fetchTasks();
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error adding task', error);
    }
  };

  return (
    <div className="container">
      <h2>Your Tasks</h2>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <button type="submit">Add Task</button>
      </form>
      <div className="tasks-list">
        {tasks.map(task => (
          <div className="task" key={task._id}>
            <Task task={task} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksPage;
