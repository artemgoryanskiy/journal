export const ACTIONS = {
  RESET_VALIDITY: "RESET_VALIDITY",
  SUBMIT: "SUBMIT",
};

export const INITIAL_STATE = {
  isValid: {
    title: true,
    text: true,
    date: true,
  },
  values: {
    title: "",
    text: "",
    date: "",
    tag: "",
  },
  isFormReadyToSubmit: false,
};

// Правила проверки для всех полей
const getFieldValidationState = ({ title, text, date }) => ({
  title: !!title.trim(),
  text: !!text.trim(),
  date: !!date.trim(),
});

// Утилита для проверки валидности всей формы
const isFormValid = (validation) => Object.values(validation).every(Boolean);

export function formReducer(state, action) {
  switch (action.type) {
    case "SET_VALUE": {
      const updatedValues = { ...state.values, ...action.payload };
      const [fieldName] = Object.keys(action.payload);
      const fieldValue = action.payload[fieldName];

      // Проверка валидности отдельного поля
      const updatedIsValid = {
        ...state.isValid,
        [fieldName]: fieldValue.trim() !== "",
      };

      return {
        ...state,
        values: updatedValues,
        isValid: updatedIsValid,
      };
    }

    case "SET_VALIDITY":
      console.log("Validation payload:", action.payload);

      return { ...state, isValid: {...state.isValid, ...action.payload} };

    case "CLEAR": {
      const resetValues = INITIAL_STATE.values;
      return { ...state, values: resetValues };
    }

    case ACTIONS.RESET_VALIDITY: {
      const resetValidity = INITIAL_STATE.isValid;
      return { ...state, isValid: resetValidity };
    }

    case ACTIONS.SUBMIT: {
      const newValidationState = getFieldValidationState(state.values);
      const isReadyToSubmit = isFormValid(newValidationState);

      return {
        ...state,
        isValid: newValidationState, // Обновляем валидность всех полей
        isFormReadyToSubmit: isReadyToSubmit, // Проверяем, готова ли форма
      };
    }

    default:
      return state;
  }
}