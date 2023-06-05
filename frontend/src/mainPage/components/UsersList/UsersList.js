import { React, useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../Todo/firebase";
import UsersListItem from "./UsersListItem";
import { connect } from "react-redux";

import "./UsersList.css";

const UsersList = ({ activeUsers, callState }) => {
  const [users, setUsers] = useState([]);
  
  return (
    <div className="user_list_container">
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
