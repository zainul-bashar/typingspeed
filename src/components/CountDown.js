import React from "react";
import { useContextApi } from "../context/ContextApi";

const CountDown = ({count}) => {

  const {setTestTime} = useContextApi();
  const updateCount = (e) =>{
      setTestTime(Number(e.target.id))
  }
    return(
        <div className="upper-menu">
          <div className="counter">
            {count}
          </div>
          <div className="modes">
            <div className="time-mode" id={15} onClick={updateCount}>15s</div>
            <div className="time-mode" id={30} onClick={updateCount}>30s</div>
            <div className="time-mode" id={60} onClick={updateCount}>60s</div>
          </div>
        </div>
    )
}
export default CountDown;