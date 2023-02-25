import { configureStore, combineReducers} from '@reduxjs/toolkit';
import fileUploadReducer  from './fileUploadSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import thunk from 'redux-thunk';
import trackingReducer from './trackingSlice';
import tableReducer from './tableSlice';
import stepperReducer from './stepperSlice';
import renderReducer from './renderSlice';
import traineeReducer from './traineeSlice';

const persistConfig = {
    key: 'root',
    storage,
    version: 1
};

const reducers = combineReducers({
  files: fileUploadReducer,
  tracking: trackingReducer,
  table: tableReducer,
  stepper: stepperReducer,
  render: renderReducer,
  trainee: traineeReducer
})

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware({
          serializableCheck: false
      }),
})

