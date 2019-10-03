import { createSelector } from 'reselect'
 
const selectFacility = state => state.Facility

export const FacilitySelector = createSelector(
  [selectFacility],
  facilities =>facilities.facilities
)