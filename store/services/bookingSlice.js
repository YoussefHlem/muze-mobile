import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  filteredEventsInstitution: [],
  filteredEventsStudios: [],
  selectedStudio: [],
  componentState: "booking",
  bookingSearchData: [],
  isLoading: "",
  gridData: [],
  currentStudioId: 0,
  currentDate: "",
};

const bookingSlice = createSlice({
  name: "bookingSlice",
  initialState,
  reducers: {
    setFilteredEventsInstitution: (state, action) => {
      state.filteredEventsInstitution = action.payload;
    },
    setFilteredEventsStudios: (state, action) => {
      state.filteredEventsStudios = action.payload;
    },
    setSelectedStudio: (state, action) => {
      state.selectedStudio = action.payload;
    },
    setComponentState: (state, action) => {
      state.componentState = action.payload;
    },
    setBookingSearchData: (state, action) => {
      state.bookingSearchData = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setGridData: (state, action) => {
      const array = new Array();
      for (let i = 0; i < action.payload.length; i++) {
        for (let j = 0; j < action.payload[i].length; j++) {
          array.push(action.payload[i][j].slice(0, 2));
        }
      }
      state.gridData = array;
    },
    setCurrentStudioId: (state, action) => {
      state.currentStudioId = action.payload;
    },
    setCurrentDate: (state, action) => {
      state.currentDate = action.payload;
    },
  },
});

export const {
  setFilteredEventsInstitution,
  setFilteredEventsStudios,
  setSelectedStudio,
  setComponentState,
  setBookingSearchData,
  setIsLoading,
  setGridData,
  setCurrentStudioId,
  setCurrentDate,
} = bookingSlice.actions;
export default bookingSlice.reducer;
