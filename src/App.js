import { useState, useEffect } from "react"
import './App.css';
import { Button, FormControl, Input, InputLabel, Modal } from "@material-ui/core"
import Message from './components/Message';
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import { Send } from "@material-ui/icons"
import { IconButton } from "@material-ui/core"

function App() {

  const [input, setInput] = useState("");
  const [message, setMessage] = useState([]);
  const [username, setUsername] = useState("");

  // console.log(input)
  // console.log(message)

  useEffect(() => {
    db.collection('message')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        setMessage(snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() })))
      })
  }, []);

  useEffect(() => {
    setUsername(prompt('Please Enter your Name'))
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection('message').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    // setMessage([...message, { username: username, message: input }]);

    setInput('')

  }

  return (
    <div className="app">
      <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100" />
      <h2>Welcome {username}</h2>
      {/* <Modal
        open={open}
        onClose={setOpen(false)}

      >
        <input />
        <button onClick={e => setOpen(false)}>Ok</button>
        <button onClick={e => setOpen(false)}>Cancel</button>
      </Modal> */}
      <form className="app_form">
        <FormControl className="app_formControl">
          <Input
            placeholder="Enter a Message..."
            onChange={(e) => setInput(e.target.value)}
            className="app_input"
            value={input}
          />

          <IconButton
            className="app_iconButton"
            disabled={!input}
            type="submit"
            variant="contained"
            color="primary"
            onClick={sendMessage}
          >
            <Send />
          </IconButton>

        </FormControl>

      </form>

      <FlipMove>
        {
          message.map(({ id, message }) => (
            <Message key={id} username={username} message={message} />
          ))
        }
      </FlipMove>


    </div>
  );
}

export default App;
