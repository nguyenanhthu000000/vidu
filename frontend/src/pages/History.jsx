import { useEffect,useState } from "react";
import { getHistory } from "../services/api";

function History(){

  const [history,setHistory] = useState([]);

  const load = async()=>{

    try{

      const res = await getHistory();

      setHistory(res.data || []);

    }catch(err){

      console.log("Cannot load history");

    }

  }

  useEffect(()=>{
    load();
  },[])

  return(

    <div style={{padding:"30px"}}>

      <div className="card">

        <h2>Chat History</h2>

        {history.length === 0 && (
          <p>No history yet</p>
        )}

        {history.map((h,i)=>(

          <div key={i} style={{marginTop:"10px"}}>

            <b>Q:</b> {h.question}

            <br/>

            <b>A:</b> {h.answer}

            <hr/>

          </div>

        ))}

      </div>

    </div>

  )

}

export default History