import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  getAllUsers,
  deleteUser,
  getOrderAllUsersByAge,
  getUserBetweenXAndY,
  addUser,
  updateUser,
} from "../../Services/ApiUser";

export default function CardTable({ color }) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    password: "",
  });

  const getUsers = useCallback(async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data.userList);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const Orderuser = useCallback(async () => {
    try {
      const res = await getOrderAllUsersByAge();
      setUsers(res.data.userList);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const UserBetweenXAndY = useCallback(async (minAge, maxAge) => {
    try {
      const res = await getUserBetweenXAndY(minAge, maxAge);
      setUsers(res.data.userList);
    } catch (err) {
      if (err.response.data.message === "maxAge < minAge") {
        setError("Max age should be greater than min age");
      }
    }
  }, []);

  const handleAddUser = async () => {
    try {
      await addUser(newUser);
      setNewUser({
        firstName: "",
        lastName: "",
        age: "",
        email: "",
        password: "",
      });
      getUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateUser = async (user) => {
    try {
      await updateUser(user._id, user);
      getUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleTrie = async () => {
    try {
      await Orderuser();
    } catch (error) {
      console.log(error);
    }
  };

  const handleBet = async () => {
    try {
      await UserBetweenXAndY(minAge, maxAge);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                List Users
                <br />
                <button onClick={handleTrie}>Trie</button>
                <br />
                <div className="flex space-x-4">
                  <input
                    type="number"
                    placeholder="age minimum"
                    value={minAge}
                    onChange={(event) => setMinAge(event.target.value)}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                  <div className="mr-4"> </div>
                  <input
                    type="number"
                    placeholder="age maximum"
                    value={maxAge}
                    onChange={(event) => setMaxAge(event.target.value)}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
                <button onClick={handleBet}>UserBetweenXAndY</button>
                {error && (
                  <div className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500">
                    <span className="text-xl inline-block mr-5 align-middle">
                      <i className="fas fa-bell"></i>
                    </span>
                    <span className="inline-block align-middle mr-8">
                      <b className="capitalize">Error!</b> {error}
                    </span>
                    <button
                      className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
                      onClick={() => setError(null)}
                    >
                      <span>×</span>
                    </button>
                  </div>
                )}
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Firstname
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  lastName
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  age
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  email
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  createdAt
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                ></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                    <span
                      className={
                        "ml-3 font-bold " +
                        +(color === "light"
                          ? "text-blueGray-600"
                          : "text-white")
                      }
                    >
                      <img
                        src={`http://localhost:5000/images/${user.user_image}`}
                        className="h-12 w-12 bg-white rounded-full border"
                        alt="..."
                      ></img>{" "}
                      {user.firstName}
                    </span>
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {user.lastName}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {user.age}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {user.email}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {user.createdAt}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                    <button
                      onClick={() => handleUpdateUser(user)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <input
          type="text"
          name="firstName"
          value={newUser.firstName}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="lastName"
          value={newUser.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          type="number"
          name="age"
          value={newUser.age}
          onChange={handleChange}
          placeholder="Age"
        />
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={newUser.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
