import React, { useState } from "react";
import { useTodo } from "../context";

function TodoItem({ todo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [todoMsg, setTodoMsg] = useState(todo.todo);

    const { updateTodo, deleteTodo, toggleComplete } = useTodo();

    const editTodo = () => {
        if (todoMsg.trim() === "" || todoMsg === todo.todo) {
            setIsTodoEditable(false);
            return;
        }
        updateTodo(todo.id, { ...todo, todo: todoMsg });
        setIsTodoEditable(false);
    };

    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${
                todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}
        >
            {/* Toggle Completion */}
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
            />

            {/* Todo Text Input */}
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                } ${todo.completed ? "line-through text-gray-500" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />

            {/* Edit / Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (isTodoEditable) {
                        editTodo();
                    } else {
                        setIsTodoEditable(true);
                    }
                }}
                disabled={todo.completed && !isTodoEditable} // Allows editing if already in edit mode
            >
                {isTodoEditable ? "📁" : "✏️"}
            </button>

            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteTodo(todo.id)}
            >
                ❌
            </button>
        </div>
    );
}

export default TodoItem;
