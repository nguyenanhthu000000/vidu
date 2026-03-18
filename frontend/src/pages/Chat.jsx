import { useState, useRef } from "react";
import { askQuestion } from "../services/api";

function Chat(){

  const [question,setQuestion] = useState("");
  const [messages,setMessages] = useState([]);
  const bottomRef = useRef(null);

  const send = async () => {

    if(!question.trim()) return;

    const userMessage = { role:"user", text:question };

    setMessages(prev => [...prev, userMessage]);

    setQuestion("");

    try{

      const res = await askQuestion(question);

      const answer = res?.data?.answer || "No response";

      setMessages(prev => [
        ...prev,
        { role:"ai", text:answer }
      ]);

    }catch(error){

      setMessages(prev => [
        ...prev,
        { role:"ai", text:"Server error. Please try again." }
      ]);

    }

    setTimeout(()=>{
      bottomRef.current?.scrollIntoView({ behavior:"smooth" });
    },100);

  };

  const handleKey = (e)=>{
    if(e.key === "Enter"){
      send();
    }
  }

  return(

    <div style={{padding:"30px"}}>

      <div className="card">

        <h2>AI Assistant</h2>

        <div
          style={{
            height:"400px",
            overflow:"auto",
            marginTop:"10px"
          }}
        >

          {messages.map((m,i)=>(
            <div
              key={i}
              className={m.role==="user"?"msg-user":"msg-ai"}
            >
              <b>{m.role==="user"?"You":"AI"}:</b> {m.text}
            </div>
          ))}

          <div ref={bottomRef}></div>

        </div>

        <div
          style={{
            display:"flex",
            marginTop:"15px"
          }}
        >

          <input
            className="input"
            value={question}
            onChange={(e)=>setQuestion(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask something..."
          />

          <button
            className="btn"
            onClick={send}
          >
            Send
          </button>

        </div>

      </div>

    </div>

  )

}

export default Chat;