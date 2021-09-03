import * as type from "./actionType";
import axios from "axios";

const getEmployees = (employees) => ({
  type: type.GET_EMPLOYEES,
  payload: employees,
});

const employeeDeleted = () => ({
  type: type.DELETE_EMPLOYEE,
});

const employeeAdded = () => ({
  type: type.ADD_EMPLOYEE,
});

const employeeUpdated = () => ({
  type: type.UPDATE_EMPLOYEE,
});

const getProvinces = (provinces) => ({
  type: type.GET_PROVINCES,
  payload: provinces,
});

const getCities = (cities) => ({
  type: type.GET_CITIES,
  payload: cities,
});

const getDistricts = (districts) => ({
  type: type.GET_DISTRICTS,
  payload: districts,
});

export const loadEmployees = () => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_API}`)
      .then((res) => {
        setTimeout(() => dispatch(getEmployees(res.data)), 500);
      })
      .catch((error) => console.log(error));
  };
};

export const deleteEmployee = (id) => {
  return function (dispatch) {
    axios
      .delete(`${process.env.REACT_APP_API}/${id}`)
      .then((res) => {
        dispatch(employeeDeleted());
        dispatch(loadEmployees());
      })
      .catch((error) => console.log(error));
  };
};

export const addEmployee = (employee) => {
  return function (dispatch) {
    axios
      .post(`${process.env.REACT_APP_API}`, employee)
      .then((res) => {
        dispatch(employeeAdded());
        dispatch(loadEmployees());
      })
      .catch((error) => console.log(error));
  };
};

export const updateEmployeee = (employee, id) => {
  return function (dispatch) {
    axios
      .put(`${process.env.REACT_APP_API}/${id}`, employee)
      .then((res) => {
        dispatch(employeeUpdated(res.data));
        dispatch(loadEmployees());
      })
      .catch((error) => console.log(error));
  };
};

export const loadProvinces = () => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_API_INDO}/provinsi`)
      .then((res) => {
        dispatch(getProvinces(res.data.provinsi));
      })
      .catch((error) => console.log(error));
  };
};

export const loadCities = (id) => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_API_INDO}/kota?id_provinsi=${id?.id}`)
      .then((res) => {
        dispatch(getCities(res.data.kota_kabupaten));
      })
      .catch((error) => console.log(error));
  };
};

export const loadDistricts = (id) => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_API_INDO}/kecamatan?id_kota=${id?.id}`)
      .then((res) => {
        dispatch(getDistricts(res.data.kecamatan));
      })
      .catch((error) => console.log(error));
  };
};

export const setProvince = (province) => {
  return {
    type: type.SET_PROVINCE,
    payload: province,
  };
};

export const setCity = (city) => {
  return {
    type: type.SET_CITY,
    payload: city,
  };
};

export const setDistrict = (district) => {
  return {
    type: type.SET_DISTRICT,
    payload: district,
  };
};
