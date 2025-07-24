"use client";
import { ChangeEvent, FC, useState } from "react";

interface Props {
  createTodo: (value: string) => void;
}

const AddTodo: FC<Props> = ({ createTodo }) => {
  // State for handling input value
  const [input, setInput] = useState("");

  // Event handler for input change
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Event handler for adding a new todo
  const handleAdd = async () => {
    createTodo(input);
    setInput("");
  };

  // Event handler for Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      handleAdd();
    }
  };

  // Rendering the AddTodo component
  return (
    <div className="w-full flex gap-2 mt-4">
      {/* Input field for entering new todo text */}
      <input
        type="text"
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-lg outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-colors"
        onChange={handleInput}
        onKeyPress={handleKeyPress}
        value={input}
        placeholder="Add a new todo..."
      />
      {/* Button for adding a new todo */}
      <button
        className="flex items-center justify-center bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white rounded-lg px-4 py-2 min-w-16 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleAdd}
        disabled={!input.trim()}
      >
        Add
      </button>
    </div>
  );
};

export default AddTodo;
