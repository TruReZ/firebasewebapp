import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import BookDataService from "../../services/book.services";
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import './viewData.css'
import { PasswordRounded } from "@mui/icons-material";


const ViewData = ({ id, setBookId }) => {
  const [name, setName] = useState("");
  const [sid, setSid] = useState("");
  const [section, setSection] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (name === "" || sid === "" || section === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newBook = {
      name,
      sid,
      section,
    };
    console.log(newBook);

    try {
      if (id !== undefined && id !== "") {
        await BookDataService.updateBook(id, newBook);
        setBookId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await BookDataService.addBooks(newBook);
        setMessage({ error: false, msg: "New Book added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setName("");
    setSid("");
    setSection("");
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await BookDataService.getBook(id);
      console.log("the record is :", docSnap.data());
      setName(docSnap.data().name);
      setSid(docSnap.data().sid);
      setSection(docSnap.data().section);

    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);

  const getBookIdHandler = (id) => {
    console.log("The ID of document to be edited: ", id);
    setBookId(id);
  };

  return (
    <div className="editData">
      <Sidebar />
      <div className="editDataContainer">
        <Navbar />
        <div className="p-4 box">
          {message?.msg && (
            <Alert
              variant={message?.error ? "danger" : "success"}
              dismissible
              onClose={() => setMessage("")}
            >
              {message?.msg}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>

            <div className="top-editData">
              <h1>{id}</h1>
            </div>
            <div className="from-view">
              <div className='right-view' controlId="formBookAuthor">
                <div className="formInput-edit">
                  <h4> Name: {name} </h4>
                  <h4> ID : {sid} </h4>
                  <h4> Section : {section} </h4>
                </div>
              </div>
            </div>

          </form>
        </div>
      </div >
    </div >

  );
};

export default ViewData;
