import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import BookDataService from "../../services/book.services";
import "./table.css";

const BooksList = ({ getBookId }) => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    const data = await BookDataService.getAllBooks();
    console.log(data.docs);
    setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await BookDataService.deleteBook(id);
    getBooks();
  };


  return (
    <>
      <div className="mb-4">
        <Button variant="success edit" onClick={getBooks}>
          Refresh
        </Button>
      </div>

      {/* <pre>{JSON.stringify(books, undefined, 2)}</pre>} */}
      <Table striped bordered hover variant="dark" size="md">
        <thead>
          <tr>
            <th>RollNo</th>
            <th>Name</th>
            <th>Student ID</th>
            <th>Section</th>
            <th>Room</th>
            <th>Date/Time</th>
            {/*<th>Action</th>*/}
          </tr>
        </thead>
        <tbody>
          {books.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.name}</td>
                <td>{doc.sid}</td>
                <td>{doc.section}</td>
                <td>{doc.room}</td>
                <td>{doc.date}</td>
                {/*<td>
                  <Button
                    variant="danger"
                    className="delete"
                    onClick={(e) => deleteHandler(doc.id)}
                  >
                    Delete
                  </Button> 
                </td>*/}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default BooksList;
