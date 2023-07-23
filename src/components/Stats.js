import React, { useEffect } from "react";
import Graph from "./Graph";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import { db } from "../firebaseConfig";


const Stats = (
   { wpm,
    accuracy,
    missedChars,
    correctChars,
    incorreactChars,
    extraChars,
    graphData}
) => {
    let timeSet = new Set();
    const newGraph = graphData.filter(i=>{
        if(!timeSet.has(i[0])){
            timeSet.add(i[0]);
            return i;
        }
    })

    const pushDataToDB = () => {

        if(isNaN(accuracy)){
            toast.error( 'invalid test', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
                });
                return;
        }
        const resultRef = db.collection('result');
        const {uid} = auth.currentUser;
        resultRef.add(
            {
                wpm: wpm,
                accuracy: accuracy,
                timeStamp: new Date(),
                characters: `${correctChars}/${incorreactChars}/${missedChars}/${extraChars}`,
                userId: uid
            }
        ).then((res)=>{
            toast.success('data saved to DB', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
                });
        }).catch((err)=>{
            toast.error( 'not able to save result', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
                });
                
        })
    }

    useEffect(()=>{
        if(auth.currentUser){
            pushDataToDB();
        }
        else{
            toast.warning('login to save result', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
                });
        }
    })
    return(
        <div className="stats-box">
          <div className="left-box">
           <div className="title">WPM</div>
           <div className="sub-title">{wpm}</div>
           <div className="title">Accuracy</div>
           <div className="sub-title">{accuracy}</div>
           <div className="title">Chars</div>
           <div className="sub-title">{correctChars}/{incorreactChars}/{missedChars}/{extraChars}</div>
          </div>
          <div className="right-box">
            <Graph graphData = {newGraph}/>
          </div>
        </div>
    )
}
export default Stats;