import React, { useState, useEffect, FC } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Typography, Container, Box } from '@mui/material';
import DepartmentList from "./DepartmentList";
import { useNavigate } from "react-router-dom";
import { Post } from './model/apiInterfaces';


const PostPage: FC = () => {
  const [data, setData] = useState<Post[]>([]);

  const navigate = useNavigate();
  const userObject = localStorage.getItem('user');

  useEffect(() => {
    if (!userObject) {
      navigate("/");
    }
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);


  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'body', headerName: 'Body', width: 600 }
  ];

  return (
    <Container maxWidth="md">
      {userObject ? (
        <Box display="flex" flexDirection="column" alignItems="center" padding="1rem">
          <Typography variant="h4" style={{ margin: '1rem 0', color: '#3f51b5' }}>
            Welcome to Your Dashboard
          </Typography>
          <Box bgcolor="#f0f0f0" borderRadius="10px" padding="1rem" maxWidth="1200px" margin="0 auto">
            <DepartmentList />
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid rows={data} columns={columns} />
            </div>
          </Box>
        </Box>
      ) : (
        <Typography variant="body1" color="error" gutterBottom>
          Please provide your details before accessing this page.
        </Typography>
      )}
    </Container>
  );
};



export default PostPage;
