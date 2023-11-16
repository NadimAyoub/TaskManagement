import "./style.scss";
import Task from "../Task/Task";
import { useState } from "react";

export default function Status(props) {
  const {
    status,
    tasks,
    addTask,
    deleteTask,
    addEmptyTask,
    moveTask,
    setTaskID,
    setPopupOpen,
  } = props;

  const [isSaveDisabled, setIsSaveDisabled] = useState(false);

  let taskList, tasksForStatus;

  function handleAddEmpty() {
    setIsSaveDisabled(true);
    addEmptyTask(status);
  }

  if (tasks) {
    tasksForStatus = tasks.filter((task) => {
      return task.status === status;
    });
  }

  if (tasksForStatus) {
    taskList = tasksForStatus.map((task) => {
      return (
        <Task
          addTask={(task) => addTask(task)}
          deleteTask={(id) => deleteTask(id)}
          moveTask={(id, status) => moveTask(id, status)}
          key={task.id}
          task={task}
          setPopupOpen={setPopupOpen}
          setTaskID={setTaskID}
          setIsSaveDisabled={setIsSaveDisabled}
          isSaveDisabled={isSaveDisabled}
        />
      );
    });
  }

  return (
    <div className="statusLine">
      <h3>{status}</h3>
      {taskList}
      <button onClick={handleAddEmpty} className="button addTask">
        +
      </button>
    </div>
  );
}
