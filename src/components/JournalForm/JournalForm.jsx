import { useEffect, useReducer } from "react";
import styles from "./JournalForm.module.css";
import classNames from "classnames";
import Button from "../Button/Button";
import { formReducer, INITIAL_STATE } from "./JournalForm.state.js";

const ACTION_TYPES = {
  SUBMIT: "SUBMIT",
  RESET_VALIDITY: "RESET_VALIDITY",
};

const FIELD_NAMES = ["title", "date", "text"];

const CSS_CLASSES = {
  input: styles.input,
  inputTitle: styles["input-title"],
  invalid: styles.invalid,
};

function JournalForm({ onSubmit }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid } = formState;

  useEffect(() => {
    if (Object.values(isValid).some((fieldValid) => !fieldValid)) {
      const timerId = setTimeout(() => {
        dispatchForm({ type: ACTION_TYPES.RESET_VALIDITY });
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [isValid]);

  const dispatchValidation = (field, value) => {
    dispatchForm({ type: ACTION_TYPES.SUBMIT, payload: { [field]: value } });
  };

  const createValidationState = (formProps) =>
    Object.fromEntries(
      FIELD_NAMES.map((field) => [
        field,
        dispatchValidation(field, formProps[field]),
      ]),
    );

  const getValidationClass = (field) =>
    classNames({
      [CSS_CLASSES.inputTitle]: field === "title",
      [CSS_CLASSES.invalid]: !isValid[field],
      [CSS_CLASSES.input]: true,
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    const updatedValidationState = createValidationState(formProps);

    if (Object.values(updatedValidationState).some((valid) => !valid)) {
      return;
    }

    if (formState.isFormReadyToSubmit) {
      onSubmit(formProps);
    }
  };

  return (
    <form className={styles["journal-form"]} onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="title"
          className={getValidationClass("title")}
        />
      </div>
      <div className={styles["form-row"]}>
        <label htmlFor="date" className={styles["form-label"]}>
          <img src="/date.svg" alt="Иконка календаря" />
          <span>Дата</span>
        </label>
        <input
          type="date"
          name="date"
          id="date"
          className={getValidationClass("date")}
        />
      </div>
      <div className={styles["form-row"]}>
        <label htmlFor="tag" className={styles["form-label"]}>
          <img src="/folder.svg" alt="Иконка папки" />
          <span>Метки</span>
        </label>
        <input type="text" name="tag" id="tag" className={CSS_CLASSES.input} />
      </div>
      <textarea
        name="text"
        cols="30"
        rows="10"
        className={getValidationClass("text")}
      ></textarea>
      <Button text="Сохранить" />
    </form>
  );
}

export default JournalForm;
