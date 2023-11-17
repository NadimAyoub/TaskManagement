import "./style.scss";
import { useState, useEffect } from "react";
import clsx from "clsx";

export default function Task(props) {
  const {
    addTask,
    moveTask,
    task,
    setPopupOpen,
    setTaskID,
    setIsSaveDisabled,
    isSaveDisabled,
  } = props;

  const [collapsed, setCollapsed] = useState(task.isCollapsed);
  const [formAction, setFormAction] = useState("");
  const [isMoveButtonRightDisabled, setIsMoveButtonRightDisabled] =
    useState(false);
  const [isMoveButtonLeftDisabled, setIsMoveButtonLeftDisabled] =
    useState(false);
  const [isTaskMoving, setIsTaskMoving] = useState(false);

  //handling task action
  function handleSubmit(event) {
    event.preventDefault();

    //handle if task is being saved or edited
    if (formAction === "save") {
      //if tasks is being edited
      if (collapsed) {
        setCollapsed(false);
      } else {
        //if tasks is being saved
        let newTask = {
          id: task?.id,
          title: event?.target?.elements?.title?.value,
          description: event?.target?.elements?.description?.value,
          status: task?.status,
          isCollapsed: true,
        };
        addTask(newTask);
        setCollapsed(true);
        setIsSaveDisabled(false);
      }
    }

    //if task is being deleted
    if (formAction === "delete") {
      setPopupOpen(true);
      setTaskID(task?.id);
    }
  }

  // function to handle moving the task to the left
  function handleMoveLeft() {
    let newStatus = "";

    if (task?.status === "Completed") {
      newStatus = "Not Completed";
    } else if (task?.status === "Not Completed") {
      newStatus = "Task List";
    }

    if (newStatus !== "") {
      setIsTaskMoving(true);
      setTimeout(() => {
        moveTask(task.id, newStatus);
      }, 900);
    }
  }

  // function to handle moving the task to the right
  function handleMoveRight() {
    let newStatus = "";

    if (task?.status === "Task List") {
      newStatus = "Not Completed";
    } else if (task?.status === "Not Completed") {
      newStatus = "Completed";
    }

    if (newStatus !== "") {
      setIsTaskMoving(true);
      setTimeout(() => {
        moveTask(task?.id, newStatus);
      }, 900);
    }
  }

  // handle title changes to enable the user to save or not
  function handleOnChange(event) {
    if (event?.target?.value !== "") {
      setIsSaveDisabled(false);
    } else {
      setIsSaveDisabled(true);
    }
  }

  useEffect(() => {
    // disabling move buttons if the task is on any extremity
    if (task?.status === "Completed") {
      setIsMoveButtonRightDisabled(true);
    } else if (task?.status === "Task List") {
      setIsMoveButtonLeftDisabled(true);
    }
    //disabling save button if task title is empty
    if (task?.title === "") {
      setIsSaveDisabled(true);
    } else {
      setIsSaveDisabled(false);
    }
  }, [task?.status]);

  return (
    <div
      className={clsx(
        "task",
        collapsed && "collapsedTask",
        isTaskMoving && "moving"
      )}
    >
      <button
        onClick={handleMoveLeft}
        className={clsx(
          "button moveTask left",
          (isMoveButtonLeftDisabled || !collapsed) && "disabled"
        )}
      >
        &#171;
      </button>
      <form onSubmit={handleSubmit} className={clsx(collapsed && "collapsed")}>
        <input
          onChange={(e) => handleOnChange(e)}
          type="text"
          className="title input"
          name="title"
          placeholder="Enter Title"
          disabled={collapsed}
          defaultValue={task?.title}
        />
        <textarea
          rows="2"
          className="description input"
          name="description"
          placeholder="Enter Description"
          defaultValue={task?.description}
        />
        <button
          onClick={() => {
            setFormAction("save");
          }}
          className={clsx("button editTask", isSaveDisabled && "disabled")}
        >
          {collapsed ? "Edit" : "Save"}
        </button>
        {collapsed && (
          <button
            onClick={() => {
              setFormAction("delete");
            }}
            className="button delete"
          >
            X
          </button>
        )}
      </form>
      <button
        onClick={handleMoveRight}
        className={clsx(
          "button moveTask right",
          (isMoveButtonRightDisabled || !collapsed) && "disabled"
        )}
      >
        &#187;
      </button>
    </div>
  );
}
