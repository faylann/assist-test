import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Autocomplete from "@material-ui/lab/Autocomplete";
import MenuItem from "@material-ui/core/MenuItem";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { setProvince, setCity } from "../utils/actions";
import { addEmployee, updateEmployeee } from "../utils/actions";
import Snackbar from "./Snackbar";

function ModalForm({
  data,
  open,
  setOpen,
  action,
  provinceList,
  cityList,
  districtList,
  setDistrict,
}) {
  let employee = {
    id: data?.id ? data.id : uuidv4(),
    nama: data?.nama ? data.nama : "",
    posisi: data?.posisi ? data.posisi : "",
    alamat: data?.alamat ? data.alamat : "",
    kecamatan: data?.kecamatan ? data.kecamatan : "",
    kota: data?.kota ? data.kota : "",
    provinsi: data?.provinsi ? data.provinsi : "",
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [state, setState] = useState(employee);
  const { nama, posisi, alamat, kecamatan, kota, provinsi } = state;

  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  let dispatch = useDispatch();

  const handleChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleChangeAutocomplete = (event, value) => {
    setState((prevState) => ({
      ...prevState,
      provinsi: value,
    }));
    dispatch(setProvince(value));
  };

  const handleChangeKota = (event, value) => {
    setState((prevState) => ({
      ...prevState,
      kota: event.target.value,
    }));
    dispatch(setCity(event.target.value));
  };

  const handleChangeKecamatan = (event, value) => {
    setState((prevState) => ({
      ...prevState,
      kecamatan: event.target.value,
    }));
    dispatch(setDistrict(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (action === "add") {
      if (!nama || !posisi || !alamat || !kecamatan || !kota || !provinsi) {
        setError("Field tidak boleh kosong!");
      } else {
        let data = {
          id: state.id ? state.id : uuidv4(),
          nama: state.nama,
          posisi: state.posisi,
          alamat: state.alamat,
          kecamatan: state.kecamatan.nama,
          kota: state.kota.nama,
          provinsi: state.provinsi.nama,
        };
        dispatch(addEmployee(data));
        setOpen(false);
        setError("");
        setTimeout(() => setSuccess(true), 1000);
        setState("");
      }
    } else {
      if (!nama || !posisi || !alamat || !kecamatan || !kota || !provinsi) {
        setError("Field tidak boleh kosong!");
      } else {
        let data = {
          id: state.id ? state.id : uuidv4(),
          nama: state.nama,
          posisi: state.posisi,
          alamat: state.alamat,
          kecamatan: state.kecamatan.nama,
          kota: state.kota.nama,
          provinsi: state.provinsi.nama,
        };
        dispatch(updateEmployeee(data, data.id));
        setOpen(false);
        setError("");
        setTimeout(() => setSuccess(true), 1000);
      }
    }
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {action === "add" ? "Tambah" : "Ubah"} Karyawan
        </DialogTitle>
        {error && (
          <h4 style={{ color: "red", textAlign: "center" }}>{error}</h4>
        )}
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="nama"
            label="Nama Karyawan"
            type="text"
            fullWidth
            name="nama"
            value={nama}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="posisi"
            label="Posisi"
            type="text"
            fullWidth
            name="posisi"
            value={posisi}
            onChange={handleChange}
          />
          <Autocomplete
            id="provinsi"
            name="provinsi"
            value={provinsi}
            onChange={handleChangeAutocomplete}
            options={provinceList}
            getOptionLabel={(option) => option.nama}
            style={{ marginTop: 5 }}
            renderInput={(params) => (
              <TextField {...params} label="Provinsi" variant="outlined" />
            )}
          />
          <TextField
            id="kota"
            select
            style={{ marginTop: 5, width: "100%" }}
            label="Kota"
            name="kota"
            value={kota}
            onChange={handleChangeKota}
            helperText="Silahkan Pilih Kota Karyawan"
          >
            {cityList?.map((option) => (
              <MenuItem key={option.id} value={option}>
                {option.nama}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="kecamatan"
            select
            style={{ marginTop: 5, width: "100%" }}
            label="Kecamatan"
            name="kecamatan"
            value={kecamatan}
            onChange={handleChangeKecamatan}
            helperText="Silahkan Pilih Kecamatan Karyawan"
          >
            {districtList?.map((option) => (
              <MenuItem key={option.id} value={option}>
                {option.nama}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            margin="dense"
            id="name"
            label="Alamat"
            type="text"
            fullWidth
            name="alamat"
            value={alamat}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
      {success ? <Snackbar action={action} setSuccess={setSuccess} /> : ""}
    </div>
  );
}

export default ModalForm;
