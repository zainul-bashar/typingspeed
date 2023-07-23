import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import TableUserData from "../components/TableUserData";
import Graph from "../components/Graph";
import UserInfo from "../components/UserInfo";

const UserPage = () => {

  const[userData, setUserData] = useState([]);
  const[graphData, setGraphData] = useState([]);
  const[dataLoading, setDataLoading] = useState(true);
  const[user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  let tempData = [];
  let tempGraphData = [];
  const fetchUserData = () => {
    const resultRef = db.collection('result');
    const {uid} = auth.currentUser;
    resultRef
    .where('userId', '==', uid)
    .orderBy('timeStamp', 'desc')
    .get()
    .then((snapshot)=>{
      snapshot.docs.forEach((doc)=>{
            tempData.push({...doc.data()});
            tempGraphData.push([doc.data().timeStamp.toDate().toLocaleDateString(), doc.data().wpm]);
      });
      setUserData(tempData)
      setGraphData(tempGraphData.reverse());
      setDataLoading(false)
      // console.log(tempData);
    })
  }

  useEffect(()=>{
    if(!loading){
      fetchUserData();
    }
    if(!loading && !user){
      navigate('/')
    }
  },[loading]);

  if(loading || dataLoading){
    return <div className="center-of-screen">
         <CircularProgress size={100}/>;
      </div>
  }
  // console.log(userData.length)

    return(
        <div className="canvas">
           <UserInfo totaltestTaken={userData.length}/>

           <div className="user-graph">
             <Graph graphData={graphData} type='date'/>
           </div>
        
          <TableUserData userData = {userData}/>
        </div>
    )
}
export default UserPage;