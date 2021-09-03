import * as type from "./actionType";

const initialState = {
  employees: [],
  provinces: [],
  cities: [],
  districts: [],
  employee: {},
  loading: true,
};

const employeeReducers = (state = initialState, action) => {
  switch (action.type) {
    case type.GET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload,
        loading: false,
      };
    case type.GET_PROVINCES:
      return {
        ...state,
        provinces: action.payload,
        loading: false,
      };
    case type.GET_CITIES:
      return {
        ...state,
        cities: action.payload,
        loading: false,
      };
    case type.GET_DISTRICTS:
      return {
        ...state,
        districts: action.payload,
        loading: false,
      };
    case type.ADD_EMPLOYEE:
    case type.UPDATE_EMPLOYEE:
    case type.DELETE_EMPLOYEE:
      return {
        ...state,
        loading: false,
      };
    case type.SET_PROVINCE:
      return { ...state, selectedProvince: action.payload };
    case type.SET_CITY:
      return { ...state, selectedCity: action.payload };
    case type.SET_DISTRICT:
      return { ...state, selectedDistrict: action.payload };
    default:
      return state;
  }
};

export default employeeReducers;
