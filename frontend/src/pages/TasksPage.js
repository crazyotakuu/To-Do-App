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
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await api.post(
        '/api/tasks',
        { title, description },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
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
        <div className="form-container">
          <h1>Add a Task</h1>
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
            <button type="submit">Submit</button>
          </form>
        </div>
        {/* <div className="divider"></div> */}
        <div className='tasks-container'>
          <h1 style={{ fontFamily: "Maname, serif" }}>Your Tasks</h1>
          <div className="tasks-list">
            {tasks.map(task => (
              <div className="task" key={task._id}>
                <Task task={task} />
              </div>
            ))}
          </div>
        </div>
    </div>
  );
};

export default TasksPage;
