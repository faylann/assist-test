import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { yellow, green, pink, blue, grey } from "@material-ui/core/colors";
import { useDispatch } from "react-redux";
import { deleteEmployee } from "../utils/actions";
import ModalForm from "./ModalForm";
import Snackbar from "./Snackbar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function CardComponent({
  data,
  provinceList,
  cityList,
  districtList,
  setDistrict,
}) {
  let dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [idEmp, setIdEmp] = useState();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [success, setSuccess] = useState();
  const useStyles = makeStyles({
    avatar: {
      backgroundColor: (data) => {
        if (data.posisi === "Frontend") {
          return yellow[700];
        }
        if (data.posisi === "Backend") {
          return green[500];
        }
        if (data.posisi === "Programmer") {
          return pink[500];
        }
        if (data.posisi === "DevOps") {
          return blue[500];
        }
        return grey[500];
      },
    },
  });
  const classes = useStyles(data);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenConfirm = (id) => {
    setOpenConfirm(true);
    setIdEmp(id);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleDelete = async () => {
    dispatch(deleteEmployee(idEmp));
    setOpenConfirm(false);
    setTimeout(() => setSuccess(true), 1000);
    setSuccess(true);
  };

  const Confirmation = () => {
    return (
      <Dialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Hapus karyawan"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Apakah anda yakin akan menghapus ini?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm} color="primary">
            Tidak
          </Button>
          <Button onClick={() => handleDelete()} color="primary" autoFocus>
            Ya
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  return (
    <div>
      <Confirmation />
      <ModalForm
        open={open}
        setOpen={setOpen}
        data={data}
        action="edit"
        provinceList={provinceList}
        cityList={cityList}
        districtList={districtList}
        setDistrict={setDistrict}
      />
      <Card elevation={1} style={{ backgroundColor: "#F3F4F6" }}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {data.nama?.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={data.nama ? data.nama : "Tidak Ada Nama"}
          subheader={data.posisi ? data.posisi : "Tidak Ada Posisi"}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {typeof data.alamat === "object" && data.alamat !== null
              ? "Tidak ada alamat"
              : data.alamat}{" "}
            {typeof data.kecamatan === "object" && data.kecamatan !== null
              ? "Tidak ada kecamatan"
              : data.kecamatan}{" "}
            {typeof data.kota === "object" && data.kota !== null
              ? "Tidak ada kota"
              : data.kota}{" "}
            {typeof data.provinsi === "object" && data.provinsi !== null
              ? "Tidak ada Provinsi"
              : data.provinsi}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={() => handleClickOpenConfirm(data.id)}>
            <DeleteOutlined />
          </IconButton>
          <IconButton aria-label="edit employee" onClick={handleClickOpen}>
            <EditOutlinedIcon />
          </IconButton>
        </CardActions>
      </Card>
      {success ? <Snackbar action="delete" setSuccess={setSuccess} /> : ""}
    </div>
  );
}

export default CardComponent;
