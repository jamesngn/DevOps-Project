import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders My To-Do List header", () => {
  const { getByText } = render(<App />);
  const headerElement = getByText(/My To-Do List/i);
  expect(headerElement).toBeInTheDocument();
});

test("adds and removes a task", () => {
  const { getByText, getByTestId } = render(<App />);

  // Add a task
  const taskInput = getByTestId("task-input");
  const addButton = getByText("Add Task");
  fireEvent.change(taskInput, { target: { value: "New Task" } });
  fireEvent.click(addButton);

  // Check if the task is added
  const taskElement = getByText("New Task");
  expect(taskElement).toBeInTheDocument();

  // Remove the task
  const removeButton = getByText("Remove");
  fireEvent.click(removeButton);

  // Check if the task is removed
  expect(taskElement).not.toBeInTheDocument();
});
