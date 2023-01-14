import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import BookDataService from "../../services/book.services";
import './editData.css'

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

  return (
    <div className="edit-table">
      <Table  bordered className="justify-content-center">
        <tbody>
          <thead>
            <tr className="text-center" style={{ padding: '20px' }}>
              <th>No.</th>
              <th>ID</th>
              <th>Name</th>
              <th>Section</th>
            </tr>
          </thead>
          {books.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.sid}</td>
                <td>{doc.name}</td>
                <td>{doc.section}</td>
                {/* <td>{doc.uid}</td> */}
                <td>
                  <Button
                    variant="outline-warning"
                    className="editbtn"
                    onClick={(e) => getBookId(doc.id)}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

    </div>
  );
};

export default BooksList;