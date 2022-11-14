import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

const eventSlice = createSlice({
  name: 'eventSlice',
  initialState: {
    events: undefined,
    eventsUserArchive: undefined,
  },

  reducers: {},
});

export default eventSlice.reducer;

// Selectors
export const getAllEvents = () => ((state: RootState) => state.eventSlice.events);
export const getUserEventsArhive = () => ((state: RootState) => state.eventSlice.eventsUserArchive);
