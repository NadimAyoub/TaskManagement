import clsx from "clsx";
import { useState } from "react";
import "./style.scss";

export default function Popup(props) {
  const { taskID, isPopupOpen, closePopup, deleteTask } = props;

  const [closing, setClosing] = useState(false);

  //Delete task function
  const deleteGivenTask = (taskID) => {
    deleteTask(taskID);
    setClosing(true);
    setTimeout(() => {
      closePopup();
    }, 900);
  };

  //close delete popup
  const closeDeletePopup = () => {
    setClosing(true);
    setTimeout(() => {
      closePopup();
    }, 900);
  };

  return (
    <div>
      {isPopupOpen && (
        <div className={clsx("overlay", closing && "closing")}>
          <div className="popup">
            <div className="popup-content">
              <p>Are you sure you want to delete this task?</p>
              <button
                className="button deleteReject"
                onClick={() => closeDeletePopup()}
              >
                No
              </button>
              <button
                className="button deleteApprove"
                onClick={() => deleteGivenTask(taskID)}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
