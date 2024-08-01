import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";
import UserContext from "../context/userContext";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#212121",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#ffa50042",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function HistoryTable() {
  const { userData } = React.useContext(UserContext);

  return (
    <React.Fragment>
      <CssBaseline />
      <Box style={{ margin: 50 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Passenger Class</StyledTableCell>
                <StyledTableCell>Sex</StyledTableCell>
                <StyledTableCell>Age</StyledTableCell>
                <StyledTableCell>Fare ($)</StyledTableCell>
                <StyledTableCell>Traveled Alone</StyledTableCell>
                <StyledTableCell>Embarkation</StyledTableCell>
                <StyledTableCell>Model</StyledTableCell>
                <StyledTableCell>Conclusion</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userData.map((data, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {`${data.formData.title} ${data.formData.name}`}
                  </StyledTableCell>
                  <StyledTableCell>
                    {data.formData.pClass === "First"
                      ? "First Class"
                      : data.formData.pClass === "Second"
                      ? "Second Class"
                      : "Third Class"}
                  </StyledTableCell>
                  <StyledTableCell>{data.formData.sex}</StyledTableCell>
                  <StyledTableCell>{data.formData.age}</StyledTableCell>
                  <StyledTableCell>{data.formData.fare}</StyledTableCell>
                  <StyledTableCell>
                    {data.formData.traveledAlone === "Yes" ? "Yes" : "No"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {data.formData.embarked === "Cherbourg"
                      ? "Cherbourg"
                      : data.formData.embarked === "Queenstown"
                      ? "Queenstown"
                      : "Southampton"}
                  </StyledTableCell>
                  <StyledTableCell>{data.formData.chooseModel}</StyledTableCell>
                  <StyledTableCell>
                    {data.predictions.map((prediction, idx) => (
                      <div key={idx}>
                        {prediction.model_name}: {prediction.survived ? "Survived" : "Did not survive"}
                      </div>
                    ))}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </React.Fragment>
  );
}
