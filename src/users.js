import React, { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("getUsers")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));

    // console.log(users);
  }, []);

  return (
    <div className="users">
      <h1>Users</h1>
      {users.map((x) => (
        <User email={x.email} />
      ))}
    </div>
  );
}

function User({ email }) {
  return (
    <div className="user">
      <div className="data">
        {/* <div>
          <h5>{index}</h5>
        </div> */}
        <div>
          <h5>{email}</h5>
        </div>
      </div>
      <div className="buttons">
        {/* <div>
          <button>update</button>
        </div> */}
        <div>
          {/* <button>log out</button> */}
        </div>
      </div>
    </div>
  );
}

export default Users;
