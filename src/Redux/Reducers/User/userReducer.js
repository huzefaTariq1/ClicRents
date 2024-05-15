const initialState = {
  token: '',
  userData: '',
  organization: [],
  customerId: '',
  backIdCard: '',
  frontIdCard: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'setToken':
      return {
        ...state,
        token: action.payload,
      };
    case 'setOrganization': {
      return {
        ...state,
        organization: action.payload,
      };
    }
    case 'setId': {
      return {
        ...state,
        customerId: action.payload,
      };
    }

    case 'setBackId': {
      return {
        ...state,
        backIdCard: action.payload,
      };
    }

    case 'setFrontId': {
      return {
        ...state,
        frontIdCard: action.payload,
      };
    }

    case 'setUser': {
      return {
        ...state,
        userData: action.payload,
      };
    }

    default:
      return state;
  }
};

export default userReducer;
