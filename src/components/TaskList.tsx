import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleCreateNewTask() {
    if (newTaskTitle) {
      const id = Math.floor(Math.random() * 50 + 1);

      const newTask: Task = {
        id,
        title: newTaskTitle,
        isComplete: false,
      };

      const newTaskArray: Task[] = [...tasks, newTask];

      setTasks(newTaskArray);
    }
  }

  function handleToggleTaskCompletion(id: number) {
    let completedTask = [...tasks];

    const tasksArray: Task = completedTask.filter((task) => task.id === id)[0];

    completedTask[completedTask.indexOf(tasksArray)] = {
      id: tasksArray.id,
      title: tasksArray.title,
      isComplete: !tasksArray.isComplete,
    };

    setTasks(completedTask);
  }

  function handleRemoveTask(id: number) {
    let tasksArray: Task[] = [...tasks];

    const deletedTask: Task = tasksArray.filter((task) => task.id === id)[0];

    tasksArray.splice(tasksArray.indexOf(deletedTask), 1);

    setTasks(tasksArray);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
