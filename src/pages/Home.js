import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [randevular, setRandevular] = useState(null);
  const [hastalar, setHastalar] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3005/randevular")
      .then((resRandevular) => {
        setRandevular(resRandevular.data);
        axios
          .get("http://localhost:3005/hastalar")
          .then((resHastalar) => {
            setHastalar(resHastalar.data);
          })
          .catch((err) => console.log("hastalar hata", err));
      })
      .catch((err) => console.log("randevular hata", err));
  }, []);

  if (randevular === null || hastalar === null) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <Header />
      <h1> ANA SAYFA</h1>
      <TableContainer
        style={{
          marginTop: "50px",
        }}
        component={Paper}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "gray" }}>
            <TableRow>
              <TableCell>Tarih</TableCell>
              <TableCell>Adı</TableCell>
              <TableCell>Soyadı</TableCell>
              <TableCell>Telefon</TableCell>
              <TableCell>İşlem</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {randevular.map((randevu) => {
              const aradigimHasta = hastalar.find(
                (hasta) => hasta.id === randevu.hastaId
              );

              return (
                <TableRow
                  key={randevu.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {randevu.date}
                  </TableCell>
                  <TableCell>{aradigimHasta.name}</TableCell>
                  <TableCell>{aradigimHasta.surname}</TableCell>
                  <TableCell>{aradigimHasta.phone}</TableCell>
                  <TableCell>buraya btn gelecek</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Footer />
    </div>
  );
};

export default Home;
