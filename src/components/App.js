import { useState, useEffect } from "react";
import "../styles/App.scss";
import Status from "./Statuses/Status";
import Popup from "./PopUp/PopUp";

function App() {
  const statuses = ["Task List", "Not Completed", "Completed"];
  const [tasks, setTasks] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [taskID, setTaskID] = useState("");

  const closePopup = () => {
    setPopupOpen(false);
  };
  useEffect(() => {
    document.title = "Task Management App";
    loadTasksFromLocalStorage();
  }, []);

  // add empty task function
  function addEmptyTask(status) {
    const lastTask = tasks[tasks.length - 1];

    let newTaskId = 1;

    if (lastTask !== undefined) {
      newTaskId = lastTask.id + 1;
    }

    setTasks((tasks) => [
      ...tasks,
      {
        id: newTaskId,
        title: "",
        description: "",
        status: status,
      },
    ]);
  }

  // add task function
  function addTask(taskToAdd) {
    let filteredTasks = tasks.filter((task) => {
      return task.id !== taskToAdd.id;
    });

    let newTaskList = [...filteredTasks, taskToAdd];

    setTasks(newTaskList);
    saveTasksToLocalStorage(newTaskList);
  }

  //function to delete task
  function deleteTask(taskId) {
    let filteredTasks = tasks.filter((task) => {
      return task.id !== taskId;
    });

    setTasks(filteredTasks);

    saveTasksToLocalStorage(filteredTasks);
  }

  // function to move tasks between different statuses
  function moveTask(id, newStatus) {
    let task = tasks.filter((task) => {
      return task.id === id;
    })[0];

    let filteredTasks = tasks.filter((task) => {
      return task.id !== id;
    });

    task.status = newStatus;

    let newTaskList = [...filteredTasks, task];

    setTasks(newTaskList);

    saveTasksToLocalStorage(newTaskList);
  }

  // save added tasks to local storage
  function saveTasksToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // load saved tasks from local storage=
  function loadTasksFromLocalStorage() {
    let loadedTasks = localStorage.getItem("tasks");

    let tasks = JSON.parse(loadedTasks);

    if (tasks) {
      setTasks(tasks);
    }
  }

  return (
    <div className="App">
      <h1>Task Management</h1>
      <main>
        <section>
          {statuses?.map((singleStatus) => {
            // Display all statuses from the array
            return (
              <Status
                tasks={tasks}
                addEmptyTask={addEmptyTask}
                addTask={addTask}
                deleteTask={deleteTask}
                moveTask={moveTask}
                status={singleStatus}
                setPopupOpen={setPopupOpen}
                setTaskID={setTaskID}
              />
            );
          })}
        </section>
      </main>
      {isPopupOpen && (
        // Delete confirmation popup
        <Popup
          taskID={taskID}
          isPopupOpen={isPopupOpen}
          closePopup={closePopup}
          deleteTask={deleteTask}
        />
      )}
    </div>
  );
}

export default App;
