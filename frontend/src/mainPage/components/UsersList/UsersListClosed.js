import { React, useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../Todo/firebase";
import UsersListItemClosed from "./UsersListItemClosed";
import { connect } from "react-redux";

import "./UsersListClosed.css";

const UsersList = ({ activeUsers, callState }) => {
  return (
    <div className="user_list_container">
      {/* {users.map((activeUser, i) => ( */}
      {activeUsers.map((activeUser, i) => (
        <UsersListItemClosed
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
