import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";
import Loading from "../components/Loading/Loading";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const RandevuEkle = (props) => {
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [sikayet, setSikayet] = useState("");
  const [hastalar, setHastalar] = useState(null);
  const [hasHasta, setHasHasta] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3005/hastalar")
      .then((res) => {
        setHastalar(res.data);
      })
      .catch((err) => console.log("RandevuEkleGetHastalarErr", err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(date);
    if (
      date === "" ||
      phone === "" ||
      name === "" ||
      surname === "" ||
      sikayet === ""
    ) {
      alert("Tüm Alanları Girmek Zorunludur !");
      return;
    }
    if (phone.length !== 11) {
      alert("Telefon Numarası 11 Hane Olarak Girilmelidir !");
      return;
    }
    if (hasHasta) {
      const newRandevu = {
        id: String(new Date().getTime()),
        date: date,
        hastaId: hasHasta.id,
      };
      const newIslem = {
        id: String(new Date().getTime() + 1),
        sikayet: sikayet,
        uygulananTedavi: "",
        yazilanIlaclar: [],
      };

      const updatedHasta = {
        ...hasHasta,
        islemIds: [...hasHasta.islemIds, newIslem.id],
      };
      axios
        .post("http://localhost:3005/randevular", newRandevu)
        .then((res) => {
          console.log("saveRandevu", res);
        })
        .catch((err) => console.log("saveRandevu", err));
    }
    axios
      .post("http://localhost:3005/islemler")
      .then((res) => {
        console.log("saveIslem", res);
      })
      .catch((err) => console.log("saveIslem", err));
    axios
      .put(`http://localhost:3005/hastalar/${hasHasta.id}`,updatedHasta)
      .then((res) => {
        console.log("UpdatedHastaSaveIslem", res);
      })
      .catch((err) => console.log("UpdatedHastaSaveIslem", err));
    navigate("/");
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
    const arananHasta = hastalar.find(
      (item) => item.phone === String(event.target.value)
    );
    if (arananHasta !== undefined) {
      setName(arananHasta.name);
      setSurname(arananHasta.surname);
      setHasHasta(arananHasta);
    } else {
      setName("");
      setSurname("");
      setHasHasta(false);
    }
  };
  if (hastalar === null) {
    return <Loading />;
  }

  return (
    <div>
      <Header />
      <form>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0px",
          }}
        >
          <input
            value={date}
            onChange={(event) => setDate(event.target.value)}
            type={"datetime-local"}
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
            onChange={handlePhoneChange}
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
            type={"text"}
            style={{ width: "50%" }}
            id="outlined-basic"
            label="Hasta Adı"
            variant="outlined"
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={hasHasta}
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
            type={"text"}
            style={{ width: "50%" }}
            id="outlined-basic"
            label="Hasta Soyadı"
            variant="outlined"
            value={surname}
            onChange={(event) => setSurname(event.target.value)}
            disabled={hasHasta}
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
            type={"text"}
            style={{ width: "50%" }}
            id="outlined-basic"
            label="Şikayet"
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

export default RandevuEkle;
