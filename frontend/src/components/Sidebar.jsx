import { Link } from "react-router-dom";

function Sidebar() {

  const user = JSON.parse(localStorage.getItem("user"));

  const admins = [
    "dangngochongyen40@gmail.com",
    "thunguyen465933@gmail.com"
  ];

  const isAdmin = admins.includes(user?.email);

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (

    <div
      style={{
        width:"230px",
        background:"linear-gradient(180deg,#F7CAC9,#92A8D1)",
        height:"100vh",
        color:"white",
        padding:"25px"
      }}
    >

      <h2>Student AI</h2>

      <p>
        <Link style={{color:"white",textDecoration:"none"}} to="/">
          Chat
        </Link>
      </p>

      {/* chỉ admin mới thấy */}

      {isAdmin && (
        <p>
          <Link style={{color:"white",textDecoration:"none"}} to="/documents">
            Documents
          </Link>
        </p>
      )}

      <p>
        <Link style={{color:"white",textDecoration:"none"}} to="/history">
          History
        </Link>
      </p>

      <button
        onClick={logout}
        style={{
          marginTop:"30px",
          padding:"10px",
          border:"none",
          borderRadius:"8px",
          background:"#ffffff",
          color:"#555",
          cursor:"pointer"
        }}
      >
        Logout
      </button>

    </div>

  )

}

export default Sidebar;