import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { useTheme } from "../context/ThemeContext";

const TableUserData = ({userData}) => {

    const {theme} = useTheme();
    // console.log(userData);
    const cellStyle = {color: theme.textColor, textAlign: 'center'};
    return(
        <div className="table">
           <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={cellStyle}>
                        WPM
                    </TableCell>
                    <TableCell style={cellStyle}>
                        Accuracy
                    </TableCell>
                    <TableCell style={cellStyle}>
                        Characters
                    </TableCell>
                    <TableCell style={cellStyle}>
                        Date
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    {
                        userData.map((i)=>(
                            <TableRow key={i.userId}>
                                <TableCell style={cellStyle}>
                                  {i.wpm}
                                </TableCell>
                                <TableCell style={cellStyle}>
                                  {i.accuracy}
                                </TableCell>
                                <TableCell style={cellStyle}>
                                 {i.characters}
                                </TableCell>
                                <TableCell style={cellStyle}>
                                  {i.timeStamp.toDate().toLocaleDateString()}
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
              </Table>
           </TableContainer>
        </div>
    )
}
export default TableUserData;