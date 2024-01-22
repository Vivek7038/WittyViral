import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputsForm from "../helper/InputsForm.jsx";
import Button from "@mui/material/Button";
import { createMeme } from "../api/api";
import DownloadMeme from "../helper/DownloadMeme.jsx";
import CircularProgress from '@mui/material/CircularProgress';
const fonts = [
  { value: "impact", label: "impact" },
  { value: "arial", label: "arial" },
  { value: "roboto", label: "roboto" },
  { value: "lato", label: "lato" },
  { value: "montserrat", label: "montserrat" },
  { value: "open sans", label: "open sans" },
  { value: "playfair display", label: "playfair display" },
  { value: "raleway", label: "raleway" },
  { value: "ubuntu", label: "ubuntu" },
  { value: "oswald", label: "oswald" },
  { value: "lobster", label: "lobster" },
  { value: "nunito", label: "nunito" },
  { value: "merriweather", label: "merriweather" },
  { value: "poppins", label: "poppins" },
  { value: "source sans pro", label: "source sans pro" },
  { value: "dancing script", label: "dancing script" },
  { value: "noto sans", label: "noto sans" },
  { value: "quicksand", label: "quicksand" },
  { value: "arial black", label: "arial black" },
  { value: "cabin", label: "cabin" },
  { value: "titillium web", label: "titillium web" },
  { value: "exo", label: "exo" },
  { value: "muli", label: "muli" },
  { value: "architects daughter", label: "architects daughter" },
  { value: "roboto condensed", label: "roboto condensed" },
  { value: "cinzel", label: "cinzel" },
  { value: "chivo", label: "chivo" },
  { value: "arvo", label: "arvo" },
  { value: "patua one", label: "patua one" },
  { value: "rubik", label: "rubik" },
];

function CreateMeme() {
  const location = useLocation();
  const meme = location.state.meme;
  const [generatedMeme, setGeneratedMeme] = useState("");
  const [font, setFont] = useState("impact");
  const [open, setOpen] = useState(false);
  const [textBoxes, setTextBoxes] = useState({});
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    setOpen(!open);
  };
  let formData = new FormData();

  formData.append("template_id", meme.id);
  formData.append("username", import.meta.env.VITE_REACT_APP_USER);
  formData.append("password", import.meta.env.VITE_REACT_APP_PASSWORD);
  formData.append("font", "impact");

  const changeForm = (key) => (event) => {
    if (key === "font") {
      setFont(event.target.value);
    } else {
      setTextBoxes({
        ...textBoxes,
        [key]: event.target.value,
      });
    }
  };

  const generateMeme = () => {
    setLoading(true);
    formData.set("font", font);
    for (const key in textBoxes) {
      formData.append(key, textBoxes[key]);
    }
    console.log(loading);
    createMeme(formData)
      .then((r) => {
        if (r.success === true) {
          setGeneratedMeme(r.data.url);
          console.log(r.data)
          setLoading(false);
          setOpen(true);
        } else {
          console.log(r.error_message);
          setLoading(false);
        }
      })
      .catch((e) => {
        console.log(e)
        setLoading(false)
      });
  };
  const shareOnTwitter = (url) => {
    const tweetText = encodeURIComponent(`Check out this meme! ${url}\n\nMade using https://wittyviral.vercel.app`);
    const tweetUrl = encodeURIComponent(url);
    const twitterShareLink = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(twitterShareLink,'_blank')
  };
  return (
    <div className="content" style={{ right: 0, left: 0, margin: "auto" }}>
      <Grid
        container
        direction="row"
        alignItems="center"
        rowSpacing={1}
        justify="center"
      >
        <Grid item xs={12} align="center">
          <Typography variant={"h5"}>{meme.name}</Typography>
        </Grid>
        <Grid item xs={6} style={{ padding: "2%" }} align="center">
         {loading && <CircularProgress />}
         {!loading &&  <img height={350} src={meme.url} alt={meme.name} />}
        </Grid>
        <Grid item xs={4} style={{ padding: "2%" }} align="center">
          <TextField
            color="secondary"
            style={{ width: "110px" }}
            select
            key="font"
            id="font"
            label="Select Font"
            type="text"
            value={font}
            onChange={changeForm("font")}
          >
            {fonts.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <InputsForm numOfFields={meme.box_count} changeForm={changeForm} />
          <Button variant="outlined" color="secondary" disabled={loading} onClick={generateMeme}>
     Generate
          </Button>
        
          {generatedMeme !== "" ? (
            <DownloadMeme
              handleClose={handleClose}
              url={generatedMeme}
              open={open}
              shareOnTwitter={shareOnTwitter}
            />
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default CreateMeme;
