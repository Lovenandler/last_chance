import React from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
export default function AddTodo() {
  const [title, setTitle] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title !== "") {
      await addDoc(collection(db, "todos"), {
        title,
        completed: false,
      });
      setTitle("");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="submit_todo_form">
      <div className="input_container">
        <input
          type="text"
          placeholder="Введите задачу"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="btn_container">
        <button className="add_todo_btn">
          <span className="add_btn_title">Добавить</span>
        </button>
      </div>
    </form>
  );
}