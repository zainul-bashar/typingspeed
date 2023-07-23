import React, { useState } from "react";
import {
    Chart as ChartJs,
    CategoryScale,
    PointElement,
    LinearScale,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from "react-chartjs-2";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

ChartJs.register(
    CategoryScale,
    PointElement,
    LinearScale,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const Graph = ({graphData}) => {

    const {theme} = useTheme();
    const navigate = useNavigate();
  
    

    const navi = () => {
       navigate('/user')
    }
    const back = () => {
        navigate('/')
    }

    return(
        <div>
            
            <button className="user-btn" onClick={navi}>User Info</button>
            <button className="user-btn" onClick={back}>Restart Game</button>

          <Line
          data={
            {
                labels: graphData.map(i=>i[0]),
                datasets: [
                    {
                        data: graphData.map(i=>i[1]),
                        label: 'wpm',
                        borderColor: theme.textColor
                    },
                   
                ]
            }
          }
          />
        </div>
    )
}
export default Graph;