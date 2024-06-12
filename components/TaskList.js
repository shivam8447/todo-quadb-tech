import { Checkbox, Input, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import React from "react";

const TaskList = ({
  toDoListingData,
  onChange,
  checkedItems,
  handleModalOpen,
  deleteTodoList,
  modalOpen,
  handleModalClose,
  editTodoList,
  toDoInput,
  setToDoInput,
}) => {
  return (
    <div className="added-tasks-list">
      {toDoListingData?.map(({ id, text }) => (
        <div key={id}>
          <Checkbox
            onChange={(e) => onChange(id, e.target.checked)}
            checked={checkedItems[id] || false}
          >
            <span
              style={{
                textDecoration: checkedItems[id] ? "line-through" : "none",
              }}
            >
              {text}
            </span>
          </Checkbox>
          <div>
            <EditOutlined onClick={() => handleModalOpen(id)} />
            <DeleteOutlined onClick={() => deleteTodoList(id)} />
            <Modal
              className="edit-task-modal"
              title="Edit Task"
              visible={modalOpen[id]}
              onOk={() => {
                handleModalClose(id);
                editTodoList(id, toDoInput);
              }}
              onCancel={() => handleModalClose(id)}
            >
              <Input
                value={toDoInput}
                onChange={(e) => setToDoInput(e.target.value)}
              />
            </Modal>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
