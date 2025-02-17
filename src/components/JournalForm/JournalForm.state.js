export const INITIAL_STATE = {
  isValid: {
    title: true,
    text: true,
    date: true,
  },
  values: {
    title: undefined,
    text: undefined,
    date: undefined,
  },
  isFormReadyToSubmit: false,
};

export function formReducer(state, action) {
  switch (action.type) {
    case "RESET_VALIDITY":
      return {
        ...state,
        isValid: INITIAL_STATE.isValid,
      };
    case "SUBMIT": {
      const textValidity = action.payload.text;
      const dateValidity = action.payload.date;
      const titleValidity = action.payload.title;
      return {
        values: action.payload,
        isValid: {
          title: titleValidity,
          text: textValidity,
          date: dateValidity,
        },
        isFormReadyToSubmit: titleValidity && textValidity && dateValidity,
      };
    }
  }
}
