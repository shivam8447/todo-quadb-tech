"use client";
import { Alert } from "antd";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import QBT_LOGO from "../../public/images/QBT_Logo_Black.png";
import "../../public/scss/index.scss";
import TaskInput from "../../components/TaskInput";
import TaskList from "../../components/TaskList";
import { Provider } from "react-redux";
import { store } from "./redux-toolkit/store";

const TodoListing = () => {
  const [toDoInput, setToDoInput] = useState("");
  const [toDoListingData, setToDoListingData] = useState([]);
  const [deleteTodo, setDeleteTodo] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [modalOpen, setModalOpen] = useState({});

  const onChange = (id, isChecked) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [id]: isChecked,
    }));
  };

  const storeToDoData = () => {
    const localTodoData = localStorage.getItem("storedTodo");
    const todo = JSON.parse(localTodoData) || [];
    const newToDoItem = {
      id: Date.now(),
      text: toDoInput,
    };
    const allDataToAdd = [...todo, newToDoItem];
    toDoInput &&
      localStorage.setItem("storedTodo", JSON.stringify(allDataToAdd));
    setToDoInput("");
    getAllAddedToDos();
  };

  const getAllAddedToDos = () => {
    const localTodoData = localStorage.getItem("storedTodo");
    const todo = JSON.parse(localTodoData);
    setToDoListingData(todo);
  };

  useEffect(() => {
    getAllAddedToDos();
  }, []);

  const editTodoList = (id, updatedText) => {
    const updatedToDoData = toDoListingData.map((data) => {
      if (data.id === id) {
        return {
          ...data,
          text: updatedText,
        };
      }
      return data;
    });

    toDoInput &&
      localStorage.setItem("storedTodo", JSON.stringify(updatedToDoData));
    setToDoListingData(updatedToDoData);
  };

  const deleteTodoList = (id) => {
    const updatedToDoData = toDoListingData?.filter((data) => {
      return data.id !== id;
    });

    localStorage.setItem("storedTodo", JSON.stringify(updatedToDoData));
    setDeleteTodo(true);
    setTimeout(() => {
      setDeleteTodo(false);
    }, 1000);
    getAllAddedToDos();
  };

  const handleModalOpen = (id) => {
    setModalOpen((prevState) => ({
      ...prevState,
      [id]: true,
    }));
    const todo = toDoListingData.find((item) => item.id === id);
    if (todo) {
      setToDoInput(todo.text);
    }
  };

  const handleModalClose = (id) => {
    setModalOpen((prevState) => ({
      ...prevState,
      [id]: false,
    }));
    setToDoInput(""); // Clear the input
  };

  return (
    <Provider store={store}>
      <div className="todo-listing-wrapper">
        <div className="todo-container">
          <div className="todo-header">
            <Image width={154} height={50} src={QBT_LOGO} alt="logo" />
            <p>Todo Management</p>
          </div>
          <TaskInput
            setToDoInput={setToDoInput}
            toDoInput={toDoInput}
            storeToDoData={storeToDoData}
          />
          <br />
          {deleteTodo && (
            <Alert
              className="custom-alert-box-css"
              message="Task deleted successfully"
              type="success"
              showIcon
            />
          )}
          <TaskList
            toDoListingData={toDoListingData}
            onChange={onChange}
            checkedItems={checkedItems}
            handleModalOpen={handleModalOpen}
            deleteTodoList={deleteTodoList}
            modalOpen={modalOpen}
            handleModalClose={handleModalClose}
            editTodoList={editTodoList}
            toDoInput={toDoInput}
            setToDoInput={setToDoInput}
          />
        </div>
      </div>
    </Provider>
  );
};

export default TodoListing;
