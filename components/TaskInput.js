import { Button, Input } from "antd";
import React from "react";

const TaskInput = ({ setToDoInput, toDoInput, storeToDoData }) => {
  return (
    <div className="add-task">
      <Input
        placeholder="Enter your task"
        onChange={(e) => setToDoInput(e.target.value)}
        value={toDoInput}
        onPressEnter={storeToDoData}
      />
      <Button onClick={storeToDoData}>Add</Button>
    </div>
  );
};

export default TaskInput;
