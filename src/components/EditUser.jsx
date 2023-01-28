import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../services/helper";

const EditUser = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    age: "",
    phone: "",
    profession: "",
    address: "",
    description: "",
  })

  const inputChangeHandler = (e) => {
    setUserData(prevData => (
      {
        ...prevData,
        [e.target.name] : e.target.value
      }
    ))
  }

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
      setUserData(data);
    }
  };

  useEffect(() => {
    getSingleUser();
  },[]);

  const updateUserDetails = async (e) => {
    e.preventDefault();
    const { name, email, age, phone, profession, address, description } = userData;

    const res = await fetch(`${BASE_URL}/updateDetails/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, age, phone, profession, address, description
      })
    })

    const data = await res.json();
    if(res.status === 422 || !data){
      alert("Something went wrong!!");
    }else{
      alert("Updated Successfully");
      navigate("/");
    }
  }

  return (
    <div className="container my-3">
      <div className="back-to-home text-end">
        <NavLink to="/" className="text-decoration-none text-uppercase">
          Back to Home
        </NavLink>
      </div>
      <div>
        <h3 className="text-center text-uppercase mb-3 mt-2">Update Your details</h3>
      </div>
      <form className="form">
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              name="name"
              onChange={inputChangeHandler}
              value={userData.name}
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              name="email"
              onChange={inputChangeHandler}
              value={userData.email}
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputAge" className="form-label">
              Age
            </label>
            <input 
             type="text"
             className="form-control" 
             id="exampleInputAge"
             name="age"
             onChange={inputChangeHandler}
             value={userData.age}
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPhone" className="form-label">
              Phone
            </label>
            <input
              type="number"
              className="form-control"
              id="exampleInputPhone"
              name="phone"
              onChange={inputChangeHandler}
              value={userData.phone}
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputWork" className="form-label">
              Profession
            </label>
            <input 
              type="text" 
              className="form-control" 
              id="exampleInputWork" 
              name="profession"
              onChange={inputChangeHandler}
              value={userData.profession}
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputAdress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputAdress"
              name="address"
              onChange={inputChangeHandler}
              value={userData.address}
            />
          </div>
          <div className="mb-3 col-lg-12 col-md-12 col-12">
            <label htmlFor="exampleTextArea" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id=""
              rows="4"
              name="description"
              onChange={inputChangeHandler}
              value={userData.description}
            ></textarea>
          </div>
          <button type="submit" onClick={updateUserDetails} className="btn btn-dark submit-btn text-uppercase">
            Update Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
