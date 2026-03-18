import { useEffect,useState } from "react";
import { uploadFile,getFiles,deleteFile } from "../services/api";

function Documents(){

  const [files,setFiles] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const admins = [
  "dangngochongyen40@gmail.com",
  "thunguyen465933@gmail.com"
];

const isAdmin = admins.includes(user?.email);

  const loadFiles = async()=>{

    try{
      const res = await getFiles();
      setFiles(res.data.files || []);
    }catch(err){
      console.log("Cannot load files");
    }

  }

  useEffect(()=>{
    loadFiles();
  },[])

  const upload = async(e)=>{

    const file = e.target.files[0];

    if(!file) return;

    try{
      await uploadFile(file);
      loadFiles();
    }catch(err){
      alert("Upload failed");
    }

  }

  const remove = async(name)=>{

    try{
      await deleteFile(name);
      loadFiles();
    }catch(err){
      alert("Delete failed");
    }

  }

  return(

    <div style={{padding:"30px"}}>

      <div className="card">

        <h2>Documents</h2>

        {isAdmin && (
          <input type="file" onChange={upload}/>
        )}

        <ul style={{marginTop:"15px"}}>

          {files.map(f=>(

            <li key={f} style={{marginTop:"8px"}}>

              {f}

              {isAdmin && (
                <button
                  className="btn"
                  style={{marginLeft:"10px"}}
                  onClick={()=>remove(f)}
                >
                  delete
                </button>
              )}

            </li>

          ))}

        </ul>

      </div>

    </div>

  )

}

export default Documents