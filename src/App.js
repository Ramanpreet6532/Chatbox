import { useState, useEffect } from "react"
import './App.css';
import { Button, FormControl, Input, InputLabel } from "@material-ui/core"
import Message from './components/Message';

function App() {

  const [input, setInput] = useState("");
  const [message, setMessage] = useState(['a', 'b']);

  console.log(input)
  console.log(message)

  const sendMessage = (e) => {
    e.preventDefault();
    setMessage([...message, input]);

    setInput('')

  }

  return (
    <div className="app">
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
        message.map(msg => (
          <Message text={msg} />
        ))
      }
    </div>
  );
}

export default App;
