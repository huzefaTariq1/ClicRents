import {combineReducers} from 'redux';

//
import CounterReducer from './Counter/counterReducer';
import UserReducer from './User/userReducer';

const rootReducer = combineReducers({
  counter: CounterReducer,
  user: UserReducer,
});

export default rootReducer;
