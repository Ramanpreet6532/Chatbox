import { useState, useEffect } from "react"
import './App.css';
import { Button, FormControl, Input, InputLabel, Modal } from "@material-ui/core"
import Message from './components/Message';
import db from "./firebase"

function App() {

  const [input, setInput] = useState("");
  const [message, setMessage] = useState([]);
  const [username, setUsername] = useState("");

  // console.log(input)
  // console.log(message)

  useEffect(() => {
    db.collection('message').onSnapshot(snapshot => {
      setMessage(snapshot.docs.map(doc => doc.data()))
    })
  }, []);

  useEffect(() => {
    setUsername(prompt('Please Enter your Name'))
  }, []);

  const sendMessage = (e) => {
    e.preventDefault()
    setMessage([...message, { username: username, message: input }]);

    setInput('')

  }

  return (
    <div className="app">
      <h2>Welcome {username}</h2>
      {/* <Modal
        open={open}
        onClose={setOpen(false)}

      >
        <input />
        <button onClick={e => setOpen(false)}>Ok</button>
        <button onClick={e => setOpen(false)}>Cancel</button>
      </Modal> */}
      <form>
        <FormControl>
          <InputLabel>Enter a Message...</InputLabel>
          <Input
            onChange={(e) => setInput(e.target.value)}
            className="msg_input"
            value={input}
          />
          <Button
            disabled={!input}
            type="submit"
            variant="contained"
            color="primary"
            onClick={sendMessage}
          >
            Send Message
           </Button>
        </FormControl>

      </form>

      {
        message.map(message => (
          <Message username={username} message={message} />
        ))
      }

    </div>
  );
}

export default App;
