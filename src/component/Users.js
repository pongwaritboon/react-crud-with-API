import React, {useState, useEffect} from "react";

import {Link} from "react-router-dom";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Avatar from "@mui/material/Avatar";

// const theme = createTheme(); const theme = createTheme({   spacing: [0, 4, 8,
// 16, 32, 64], }); const useStyles = makeStyles((theme) => ({     root: {
// display : 'flex'     },     container: {       marginTop: theme.spacing(2)
//  },     paper:{        padding: theme.spacing(2)     } }));

export default function Users() {
  // const classes = useStyles();

  const [users,
    setUsers] = useState([]);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    // alert('hello world');
   // fetch("https://www.mecallapi.com/api/users").then((res) => res.json()).then((result) => {
    fetch("http://localhost:3001/users").then((res) => res.json()).then((result) => {
      setUsers(result);
    });
  };

  const UpdateUser = (id) => {
    window.location = "/update/" + id;
  };

  const DeleteUser = (id) => {
    var data = {
      id: id
    };
    fetch("http://localhost:3001/users/delete", {
      method: "DELETE",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((res) => res.json()).then((result) => {
      alert(result["message"]);
      if (result["status"] === "ok") {
        getUser();
      }
    });
  };
  return (
    <div>
      <Container maxWidth="lg" sx={{
        p: 2
      }}>
        <Paper>
          <Box sx={{
            m: 2
          }} display="flex">
            <Box flexGrow={1}>
              <Typography variant="h6" color="primary" gutterBottom>
                USERS
              </Typography>
            </Box>
            <Box>
              <Link to="/create">
                <Button variant="contained" color="primary">
                  Create
                </Button>
              </Link>
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table
              sx={{
              minWidth: 650
            }}
              aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="center">Avatar</TableCell>
                  <TableCell align="center">Firstname</TableCell>
                  <TableCell align="center">Lastname</TableCell>
                  <TableCell align="center">Username</TableCell>
                  {/* <TableCell align="center">Email</TableCell> */}
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={users.fname}
                    sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0
                    }
                  }}>
                    <TableCell component="th" scope="row">
                      {user.id}
                    </TableCell>
                    <TableCell align="">
                      <Box display="flex" justifyContent="center">
                        <Avatar alt={user.fname} src={user.avatar}/>
                      </Box>
                    </TableCell>
                    <TableCell align="center">{user.fname}</TableCell>
                    <TableCell align="center">{user.lname}</TableCell>
                    <TableCell align="center">{user.username}</TableCell>
                    {/* <TableCell align="center">{user.email}</TableCell> */}
                    <TableCell align="center">
                      <ButtonGroup aria-label="outlined primary button group">
                        <Button onClick={() => UpdateUser(user.id)} variant="contained" color="warning">
                          Edit
                        </Button>
                        <Button onClick={() => DeleteUser(user.id)} variant="contained" color="error">
                          Del
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </div>
  );
}
