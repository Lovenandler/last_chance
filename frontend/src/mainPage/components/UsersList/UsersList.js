import { React, useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../Todo/firebase";
import UsersListItem from "./UsersListItem";
import { connect } from "react-redux";

import "./UsersList.css";

const UsersList = ({ activeUsers, callState }) => {
  // const [users, setUsers] = useState([]);
  
  // const fetchPost = async () => {
  //   const queryString = window.location.search;
  //   const urlParams = new URLSearchParams(queryString);
  //   let roomId = urlParams.get("room");
  //   const q = query(collection(db, "Rooms"), where("room", "==", roomId));
  //   await getDocs(q).then((querySnapshot) => {
  //     const newData = querySnapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));
  //     setUsers(newData);
  //     console.log(users, newData);
  //   });
  // // };

  // useEffect(() => {
  //   fetchPost();
  // }, []);
  return (
    
    <div className="user_list_container">
      {/* {users.map((activeUser, i) => ( */}
      
      {activeUsers.map((activeUser, i) => (
        <UsersListItem
          key={i}
          activeUser={activeUser}
          callState={callState}
        />
      ))}
    </div>
  );
};

const mapStateToProps = ({ dashboard, call }) => ({
  ...dashboard,
  ...call,
});

export default connect(mapStateToProps)(UsersList);
