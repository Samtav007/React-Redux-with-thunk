import React, { useState } from "react";
import { createStore, applyMiddleware } from 'redux'
import {thunk} from "redux-thunk";
import axios from "axios";
import reducer from "./Reducers";
import { showError, showUser } from "./Actions";

const store = createStore(reducer, applyMiddleware(thunk));

export default function Display() {
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(true);

  store.subscribe(() => setData(store.getState().user));

  const fetchData = () => {
    return (dispatch) => {
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((res) => {
          const users = res.data;
          dispatch(showUser(users));
        })
        .catch((error) => {
          dispatch(showError(error.message));
        });
    };
  };

  const handleClick = () => {
    if (flag) {
      store.dispatch(fetchData());
      setFlag(false);
    } else {
      setFlag(true);
      setData([]);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Display Data</button>
      {data.map((person) => (
        <div key={person.id} className="container">
          <h2 className="name">{person.name}</h2>
          <p>{person.email}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}
