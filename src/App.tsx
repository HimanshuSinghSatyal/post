import React from "react";
import UserForm from "./UserForm";
import PostPage from "./PostPage";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <Routes>
       <Route path="/" 
    element={<UserForm/>} 
    />     
       <Route
      path="/post"
      element={<PostPage/>}
     />
      </Routes>
    </>
  );
}