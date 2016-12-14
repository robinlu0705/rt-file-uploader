import { combineReducers } from 'redux';
import fileDepot from 'fileDepot';
import layoutDepot from 'layoutDepot';
import modeDepot from 'modeDepot';
import editDepot from 'editDepot';
import placeholderDepot from 'placeholderDepot';
import galleryStatusDepot from 'galleryStatusDepot';
import galleryFilterDepot from 'galleryFilterDepot';
import galleryImageDepot from 'galleryImageDepot';
import gallerySelectionDepot from 'gallerySelectionDepot';
import globalErrorDepot from 'globalErrorDepot';

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
