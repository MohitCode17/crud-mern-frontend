import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { BASE_URL } from "../services/helper";

const Home = () => {
  const [user, setUser] = useState([]);

  const getUser = async () => {
    const res = await fetch(`${BASE_URL}/getUsers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (res.status === 404 || !data) {
      console.log("Something Error!!");
    } else {
      setUser(data);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const deleteUser = async (id) => {
    const res = await fetch(
      `${BASE_URL}/removeUser/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const deletedata = await res.json();

    if (res.status === 422 || !deletedata) {
      alert("Something went wrong!!");
    } else {
      alert("User Deleted Successfully");
      getUser();
    }
  };

  return (
    <>
      <div className="container add-btn mt-4 text-end">
        <NavLink to="/register" className="btn btn-dark">
          <i className="fa-solid fa-plus"></i> Add User
        </NavLink>
      </div>
      <div className="container mt-3">
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Profession</th>
              <th scope="col">Phone</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {user.map((ele) => (
              <tr key={ele._id}>
                <th scope="row">{ele._id}</th>
                <td>{ele.name}</td>
                <td>{ele.email}</td>
                <td>{ele.profession}</td>
                <td>{ele.phone}</td>
                <td className="d-flex justify-content-between">
                  <NavLink to={`/view/${ele._id}`} className="btn">
                    <i className="fa-solid fa-eye"></i>
                  </NavLink>
                  <NavLink to={`/edit/${ele._id}`} className="btn">
                    <i className="fa-solid fa-pen"></i>
                  </NavLink>
                  <button className="btn" onClick={() => deleteUser(ele._id)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
