import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import BookDataService from "../../services/book.services";
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { Link, useNavigate } from "react-router-dom"
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth, deleteUser } from "firebase/auth";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const TableView = ({ getBookId }) => {
  const [books, setBooks] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();
  const q = query(collection(db, "Students"));
  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    const data = await BookDataService.getAllBooks();
    console.log(data.docs);
    setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await BookDataService.deleteBook(id)
    // deleteUser(user); 
    // await BookDataService.deleteUsers(user);
  // Pass result.user here
  alert("success in deleting")
 
  console.log("success in deleting")
  localStorage.removeItem("user");
}
    getBooks();

  

  return (
    <div className="editData">
      <Sidebar />
      <div className="editDataContainer">
        <Navbar />
        <div className="top-editData">
          <h1>View Data</h1>
        </div>

        <div className="table-view">

          <div className="table-data">
            <a href="https://my-firebase-ui-d4dc3.web.app/" className="link-addUser"><PersonAddIcon /></a>
            <Table  bordered className="justify-content-center">
              <tbody>
                <thead>
                  <tr className="text-center" style={{ padding: '20px' }}>
                  <th>No.</th>
                    <th>UID</th>
                    <th>First Name</th>
                    <th>last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    {/* <th>Password</th> */}
                    <th>role</th>
                    {/* <th>User ID Auth</th> */}
                    <th>Address</th>
                    <th>View</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                {books.map((doc, index) => {
                  return (
                    <tr key={doc.id}>
                      <td>{index + 1}</td>
                      <td>{doc.id}</td>
                      <td>{doc.fname}</td>
                      <td>{doc.lname}</td>
                      <td>{doc.email}</td>
                      <td>{doc.phone}</td>
                      <td>{doc.role}</td>
                      <td>{doc.address}</td>
                      {/* <td>{doc.password}</td> */}
                      {/* <td>{doc.uid}</td> */}
                      <td>
                        <Link to="/view/viewuser ">
                          <Button
                            variant="outline-primary"
                            className="viewbtn"
                            onClick={(e) => getBookId(doc.id)}
                          >
                            view
                          </Button>

                        </Link>
                      </td>
                      <td>
                        <Button
                          variant="outline-danger"
                          onClick={(e) => deleteHandler(doc.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableView;