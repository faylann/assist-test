import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CardComponent from "../components/CardComponent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import ModalForm from "../components/ModalForm";
import { useDispatch, useSelector } from "react-redux";
import {
  loadEmployees,
  loadProvinces,
  loadCities,
  loadDistricts,
  setDistrict,
} from "../utils/actions";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  margin: {
    marginTop: "0px",
  },
});
function Home() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  let dispatch = useDispatch();
  const {
    employees,
    provinces,
    cities,
    districts,
    selectedProvince,
    selectedCity,
    loading,
  } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(loadEmployees());
    dispatch(loadProvinces());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadCities(selectedProvince));
  }, [selectedProvince, dispatch]);

  useEffect(() => {
    dispatch(loadDistricts(selectedCity));
  }, [selectedCity, dispatch]);

  return (
    <Container>
      <Grid
        justifyContent="space-between"
        container
        spacing={3}
        className={classes.margin}
      >
        <Grid item>
          <Typography type="title" variant="h4">
            Daftar Karyawan
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Tambah
          </Button>
          <ModalForm
            open={open}
            setOpen={setOpen}
            action="add"
            provinceList={provinces}
            cityList={cities}
            districtList={districts}
            setDistrict={setDistrict}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {loading ? (
          <div style={{ margin: "auto", marginTop: "300px" }}>
            <CircularProgress />
          </div>
        ) : (
          employees &&
          employees.map((data) => {
            return (
              <Grid item xs={12} md={6} lg={4} key={data.id}>
                <CardComponent
                  data={data}
                  provinceList={provinces}
                  cityList={cities}
                  districtList={districts}
                  setDistrict={setDistrict}
                />
              </Grid>
            );
          })
        )}
      </Grid>
    </Container>
  );
}

export default Home;
