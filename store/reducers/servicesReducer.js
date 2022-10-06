import { GET_SERVICES } from "../actions/services";

const initialState = {
  services: [],
};

export const servicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SERVICES:
      const services = action.payload;
      let currentSection = "";
      let filterSection = {};

      const filterData = services.forEach((el) => {
        if (currentSection !== el.section && currentSection !== "") {
          filterSection[currentSection] = services
            .filter((item) => item.section === currentSection)
            .sort((a, b) => a.price - b.price);
        }
        currentSection = el.section;
      });

      return { ...state, services: filterSection };
    default:
      return state;
  }
};
