import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../services/helper";

const UserDetails = () => {

  const { id } = useParams();

  const [user, setUser] = useState([]);

  const getSingleUser = async () => {
    const res = await fetch(`${BASE_URL}/getUser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (res.status === 422 || !data) {
      console.log("Something Error!!");
    } else {
      setUser(data);
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  return (
    <div className="container mt-5 card-container">
      <h2 className="text-center text-uppercase mb-3">Welcome {user.name}</h2>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="left_view col-lg-6 col-md-6 col-12">
              <img src="../avatar.png" alt="profile" width={60} />
              <h4 className="mt-3">
                Name: <span>{user.name}</span>
              </h4>
              <p className="mt-3">
                Age: <span>{user.age}</span>
              </p>
              <p>
                <i className="fa-solid fa-envelope"></i>{" "}
                <span>{user.email}</span>
              </p>
              <p>
                <i className="fa-solid fa-user-tie"></i>{" "}
                <span>{user.profession}</span>
              </p>
            </div>
            <div className="right_view col-lg-6 col-md-6 col-12">
                {/* <div className="text-end">
                    <button className="btn fs-5"><i className="fa-solid fa-pen"></i></button>
                    <button className="btn fs-5 mx-2"><i className="fa-solid fa-trash"></i></button>
                </div> */}
              <p className="mt-5">
                <i className="fa-solid fa-phone"></i> <span>{user.phone}</span>
              </p>
              <p className="mt-3">
                <i className="fa-solid fa-location-dot"></i>{" "}
                <span>{user.address}</span>
              </p>
              <p className="mt-3">
                <strong>Description:</strong>{" "}
                <span>{user.description}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
