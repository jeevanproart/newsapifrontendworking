import axios from "axios";
import News from "./news";
import { useState, useEffect } from "react";

const instance = axios.create();

function ForYou() {
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      instance
        .post("https://news-aggregator-3fk9.onrender.com/userInfo")
        .then((res) => {
          setUserData(res.data.user);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token]);
  if (!userData) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
        fontSize: '2em' // Change this value to increase or decrease the font size
      }}>
        Please login or register..
      </div>
    );
    
  }
  if (userData.preferences.length===0) {
    return <div>Please select some preferences in Profile.</div>;
  }
  return (
    <div>
      <News newsName={userData.preferences.join(" OR ")} />
    </div>
  );
}
export default ForYou;
