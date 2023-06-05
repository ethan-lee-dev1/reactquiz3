import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";

export const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [friends, setFriends] = useState([]);
  const refInput = useRef("");
  const navigate = useNavigate();

  // Set up the proper usage of useQuery hook
  const url = "https://jsonplaceholder.typicode.com/users/";
  const usersQuery = useQuery(`friendsList`, async () => await axios.get(url), {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  useEffect(() => {
    // Load todos (if any) from localStorage
    //const todosFromLocalstorage = localStorage.getItem("todos");
    // parse through the stored to-do's and set them in state
    // console.log(todosFromLocalstorage);
    //setTodos((oldArray) => oldArray.concat(todosFromLocalstorage));
  }, []);

  useEffect(() => {
    // Save todos to localStorage
    localStorage.setItem("todos", todos);
  }, [todos]);

  const handleAddTodo = () => {
    // access the input and update the state variable "todos"
    setTodos((oldArray) => [...oldArray, refInput.current.value]);
    console.log(todos);
  };

  const handleFetchFriends = async () => {
    // refetch your implementation of the useQuery hook
    await usersQuery.refetch();
    //console.log(usersQuery);

    // extract data into a new array and extract only the names from this array of objects
    const friendsList = usersQuery.data.data.map((friend) => friend.name);
    setFriends(friendsList);
  };

  const handleDeleteTodo = (index) => {
    // filter out the todo that was deleted from the array - hint: keep the rest of the todos in an array
    // update todos array
  };

  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem("loginUsername");
    localStorage.removeItem("loginPassword");

    // route user back to sign in page
    navigate("/");
  };

  return (
    <div>
      <input type="text" ref={refInput} />
      <button onClick={handleAddTodo}>Add to your list</button>
      <h3>To do:</h3>
      <ul id="todo-list">
        {/* Use map to return the todos here :) */}
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              {todo}
              <button onClick={() => handleDeleteTodo()}>delete</button>
            </li>
          );
        })}
      </ul>
      <button id="get-friends-btn" onClick={handleFetchFriends}>
        Get friends list
      </button>
      <h3>Your active friends: </h3>
      <ul id="friends-list">
        {friends?.map((friend, index) => {
          return <li key={index}>{friend}</li>;
        })}
      </ul>
      <button id="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};
