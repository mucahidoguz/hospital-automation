import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const HastaEkle = (props) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [sikayet, setSikayet] = useState("");
  const [hastalar, setHastalar] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3005/hastalar")
      .then((res) => {
        setHastalar(res.data);
      })
      .catch((err) => console.log("hastaEkle getHasta", err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name === "" || surname === "" || phone === "" || sikayet === "") {
      alert("Bütün alanları doldurmalısınız !");
      return;
    }
    if (phone.length !== 11) {
      alert("Telefon numarası 11 haneli olmalıdır !");
      return;
    }
    const hasNumber = hastalar.find((hasta) => hasta.phone === phone);
    console.log(hasNumber);
    if (hasNumber !== undefined) {
      alert("Bu numaraylı kayıtlı bir hasta vardır.");
      return;
    }

    const newIslem = {
      id: String(new Date().getTime() + 1),
      sikayet: sikayet,
      uygulananTedavi: "",
      yazilanIlaclar: [],
    };

    axios
      .post("http://localhost:3005/islemler", newIslem)
      .then((islemRess) => {
        const newHasta = {
          id: String(new Date().getTime() + 1),
          name: name,
          surname: surname,
          phone: phone,
          islemIds: [newIslem.id],
        };

        axios
          .post("http://localhost:3005/hastalar", newHasta)
          .then((res) => {
            navigate("/hastalar");
          })
          .catch((err) => console.log("hastaEkle newHastaPost", err));
      })
      .catch((err) => console.log("hastaekle newIslemPost", err));
  };



  if (hastalar === null) {
    return <h1>Loading...</h1>;
  }



  return (
    <div>
      <Header />
      <form style={{ margin: "50px" }} onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0px",
          }}
        >
          <TextField
            style={{ width: "50%" }}
            id="outlined-basic"
            label="Hasta Adı"
            variant="outlined"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0px",
          }}
        >
          <TextField
            style={{ width: "50%" }}
            id="outlined-basic"
            label="Hasta Soyadı"
            variant="outlined"
            value={surname}
            onChange={(event) => setSurname(event.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0px",
          }}
        >
          <TextField
            type={"number"}
            style={{ width: "50%" }}
            id="outlined-basic"
            label="Telefon Numarası"
            variant="outlined"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0px",
          }}
        >
          <TextField
            style={{ width: "50%" }}
            id="outlined-basic"
            label="Hastanın Şikayeti"
            variant="outlined"
            value={sikayet}
            onChange={(event) => setSikayet(event.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0px",
          }}
        >
          <Button type="submit" variant="contained">
            Kaydet
          </Button>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default HastaEkle;
