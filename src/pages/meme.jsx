import React, { useEffect, useState } from "react";
import { getMemes } from "../api/api";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "../helper/pagination";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import { Link as RouterLink } from "react-router-dom";

function Meme() {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(2);
  const [recordsPerPage] = useState(10);
  useEffect(() => {
    getMemes()
      .then((r) => {
        if (r.success === true) {
          setMemes(r.data.memes);
          setLoading(false);
        } else {
          console.log(r.error_message);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = memes.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(memes.length / recordsPerPage);

  if (loading) {
    return <CircularProgress color="secondary" />;
  } else {
    return (
      <div className="">
        <div className="flex justify-center align-center flex-col">
          <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <Grid container spacing={2}>
            {currentRecords.map((meme) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={meme.id}
                style={{ padding: "2%" }}
              >
                <Card variant="outlined" sx={{ width: 350, height: 350 }}>
                  <CardActionArea
                    component={RouterLink}
                    to={`/meme/${meme.id}`}
                    state={{ meme: meme }}
                  >
                    <CardHeader title={meme.name} />
                    <CardMedia
                      height="250"
                      component="img"
                      image={meme.url}
                      alt={meme.name}
                      sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                    />
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    );
  }
}

export default Meme;
