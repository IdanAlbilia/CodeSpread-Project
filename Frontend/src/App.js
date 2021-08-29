// imports
import React, { useEffect, useState } from "react";
import NavBar from "./components/Navbar";
import ThreadList from "./components/ThreadList";
import { useSelector, useDispatch } from "react-redux";
import { newThread, editThread, importThreads } from "./actions";

const App = () => {
  // redux -->
  //   const threadss = useSelector((state) => state.threadReducer);
  //   const dispatch = useDispatch();

  // hooks
  const [db_threads, setThreads] = useState([]);

  // communicates with the server and retrieves the threads in the db
  const getThreadsFromDB = async () => {
    const url = "http://localhost:5000/getThreads";
    const response = await fetch(url);
    const resopnseJson = await response.json();
    console.log(resopnseJson);
    // dispatch(importThreads(resopnseJson));
    setThreads(resopnseJson);
  };

  // do the above function on load
  useEffect(() => {
    getThreadsFromDB();
  }, []);

  // informs that the new thread btn was clicked
  const handleNewThread = () => {
    console.log("new thread has been clicked!");
  };

  // informs what thread was cliked to edit
  const handleGetThreadById = async (thread) => {
    console.log("edit thread has been clicked! - thread number", thread._id);
    // const url = `http://localhost:5000/getThreadById?ID=${thread._id}`;
    // const response = await fetch(url);
    // const resopnseJson = await response.json();
    // console.log(resopnseJson);
    // setThreads([resopnseJson]);
  };

  return (
    <React.Fragment>
      <NavBar onNewThread={handleNewThread} />
      <ThreadList onEditThread={handleGetThreadById} threads={db_threads} />
    </React.Fragment>
  );
};

export default App;
