import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SnackbarComponent({ setSuccess, action }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  if (!open) setSuccess(false);

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        {action === "delete" ? (
          <Alert onClose={handleClose} severity="error">
            Berhasil menghapus data!
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="success">
            Berhasil {action === "add" ? "Menambahkan " : "Mengubah "} data!
          </Alert>
        )}
      </Snackbar>
    </div>
  );
}
