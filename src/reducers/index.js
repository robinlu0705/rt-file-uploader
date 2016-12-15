import { combineReducers } from 'redux';
import fileDepot from '/src/reducers/fileDepot';
import layoutDepot from '/src/reducers/layoutDepot';
import modeDepot from '/src/reducers/modeDepot';
import editDepot from '/src/reducers/editDepot';
import placeholderDepot from '/src/reducers/placeholderDepot';
import galleryStatusDepot from '/src/reducers/galleryStatusDepot';
import galleryFilterDepot from '/src/reducers/galleryFilterDepot';
import galleryImageDepot from '/src/reducers/galleryImageDepot';
import gallerySelectionDepot from '/src/reducers/gallerySelectionDepot';
import globalErrorDepot from '/src/reducers/globalErrorDepot';

export default combineReducers({
  fileDepot,
  layoutDepot,
  modeDepot,
  editDepot,
  placeholderDepot,
  galleryStatusDepot,
  galleryFilterDepot,
  galleryImageDepot,
  gallerySelectionDepot,
  globalErrorDepot
});
