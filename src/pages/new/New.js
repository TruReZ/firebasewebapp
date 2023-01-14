import { useEffect, useState } from "react";
import './new.css'
import SideBar from '../../components/sidebar/Sidebar'
import NavBar from '../../components/navbar/Navbar'
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import BookDataService from "../../services/book.services";


const New = ({ id, setBookId }) => {
  const [name, setName] = useState("");
  const [sid, setSid] = useState("");
  const [section, setSection] = useState("");
  const [room, setRoom] = useState("");
  const [date, setDate] = useState("");
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
      room,
      date,
    };
    console.log(newBook);

    try {
      if (id !== undefined && id !== "") {
        await BookDataService.updateBook(id, newBook);
        setBookId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await BookDataService.addBooks(newBook);
        setMessage({ error: false, msg: "New user successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setName("");
    setSid("");
    setSection("");
    setRoom("");
    setDate("");
  }
  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await BookDataService.getBook(id);
      console.log("the record is :", docSnap.data());
      setName(docSnap.data().name);
      setSid(docSnap.data().sid);
      setSection(docSnap.data().section);
      setRoom(docSnap.data().room);
      setDate(docSnap.data().date);
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


  return (
    <div className='new'>
      <SideBar />
      <div className='newContainer'>
        <NavBar />
        <>
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
              <div style={{ fontSize: "larger",fontWeight: "bolder", color: "black", marginLeft: "655px" }}>Add New User Page</div>
              <div className='right-new' controlId="formBookAuthor">
                <div className="formInput">
                  <label id="formBookTitle" style={{ fontSize: "larger",fontWeight: "bolder", color: "black" }}>Name</label>
                  <input
                    type="text"
                    placeholder="Your First Name...."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className='right-new' controlId="formBookAuthor">
                <div className="formInput">
                  <label id="formBookAuthor" style={{ fontSize: "larger",fontWeight: "bolder", color: "black" }}>ID</label>
                  <input
                    type="text"
                    placeholder="Your Student ID...."
                    value={sid}
                    onChange={(e) => setSid(e.target.value)}
                  />
                </div >
              </div>

              <div className='right-new' controlId="formBookAuthor">
                <div className="formInput">
                  <label id="formBookAuthor" style={{ fontSize: "larger",fontWeight: "bolder", color: "black" }}>Section</label>
                  <input
                    type="text"
                    placeholder="Enter Your Section..."
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                  />
                </div >
              </div>

              <div className='right-new' controlId="formBookAuthor">
                <div className="formInput">
                  <label id="formBookAuthor" style={{ fontSize: "larger",fontWeight: "bolder", color: "black" }}>Room</label>
                  <input
                    type="text"
                    placeholder="Enter Your Classroom..."
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                  />
                </div >
              </div>

              <div className='right-new' controlId="formBookAuthor">
                <div className="formInput">
                  <label id="formBookAuthor" style={{ fontSize: "larger",fontWeight: "bolder", color: "black" }}>Date/Time</label>
                  <input
                    type="datetime-local"
                    placeholder="Enter Your Date/Time..."
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div >
              </div>

              <button type="submit" className='button-new' >Add User</button>

            </form>
          </div>
        </>
      </div>
    </div>

  );

};

export default New