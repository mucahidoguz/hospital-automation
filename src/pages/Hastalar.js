import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loading/Loading";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const Hastalar = (props) => {
  const [hastalar, setHastalar] = useState(null);
  const [updateComponent, setUpdateComponent] = useState(false);
  const navigate = useNavigate();
  const [randevular, setRandevular] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3005/hastalar")
      .then((res) => {
        setHastalar(res.data);
      })
      .catch((err) => console.log("Hastalar page getHastalarErr", err));
    axios
      .get("http://localhost:3005/randevular")
      .then((res) => {
        setRandevular(res.data);
      })
      .catch((err) => {
        console.log("getRandevuErr", err);
      });
  }, [updateComponent]);

  const handleDeleteHasta = (hasta) => {
    console.log(hasta);
    const filteredRandevular = randevular.filter(
      (item) => item.hastaId === hasta.id
    );
    console.log("filteredRandevu", filteredRandevular);
    axios
      .delete(`http://localhost:3005/hastalar/${hasta.id}`)
      .then((deleteHastaRes) => {
        hasta.islemIds.map((islemId) => {
          axios
            .delete(`http://localhost:3005/islemler/${islemId}`)
            .then((islemDeleteRes) => {            
            })
            .catch((err) => console.log("Hastalar hastaIslemDelete", err));
        });
        filteredRandevular.map((item) => {
          axios
            .delete(`http://localhost:3005/randevular/${item.id}`)
            .then((res) => {})
            .catch((err) => console.log("deleteRandevu", err));
        });
        setUpdateComponent(!updateComponent);
      })
      .catch((err) => console.log("Hastalar HastaDelete", err));
  };

  if (hastalar === null || randevular === null) {
    return <Loading />;
  }

  return (
    <div>
      <Header />
      <h1> HASTALAR </h1>
      <TableContainer
        style={{
          marginTop: "10px",
        }}
        component={Paper}
      >
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button onClick={() => navigate("/hasta-ekle")} variant="contained">
            Hasta Ekle
          </Button>
        </div>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "gray" }}>
            <TableRow>
              <TableCell>Adı</TableCell>
              <TableCell>Soyadı</TableCell>
              <TableCell>Telefon</TableCell>
              <TableCell>İşlem</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hastalar.length === 0 && (
              <TableRow>
                <TableCell align="center" colSpan={4}>
                  Kayıtlı Hasta Bulunmamaktadır
                </TableCell>
              </TableRow>
            )}
            {hastalar.map((hasta) => (
              <TableRow
                key={hasta.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{hasta.name}</TableCell>
                <TableCell>{hasta.surname}</TableCell>
                <TableCell>{hasta.phone}</TableCell>
                <TableCell>
                  <Stack spacing={2} direction="row">
                    <Button variant="outlined" color="primary">
                      Düzenle
                    </Button>
                    <Button
                      onClick={() => handleDeleteHasta(hasta)}
                      variant="outlined"
                      color="error"
                    >
                      Sil
                    </Button>
                    <Button variant="outlined" color="secondary">
                      Detaylar
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Footer />
    </div>
  );
};

export default Hastalar;
