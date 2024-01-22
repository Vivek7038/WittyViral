import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import React from "react";
import FileSaver from "file-saver";
import { TwitterIcon } from "react-share";
function DownloadMeme({ handleClose, url, open, shareOnTwitter }) {
  const saveManual = () => {
    FileSaver.saveAs(url, "meme.jpg");
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle align="center">Generated Meme</DialogTitle>
      <img src={url} height={350} alt="" />
      <DialogActions style={{ alignSelf: "center" }}>
        <Button variant="outlined" color="secondary" onClick={saveManual}>
          Download Meme
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => shareOnTwitter(url)}
        >
          <TwitterIcon size={32} round={true} />
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DownloadMeme;
