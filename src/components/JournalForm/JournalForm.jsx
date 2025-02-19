import {useReducer, useRef} from 'react';
import styles from "./JournalForm.module.css";
import classNames from "classnames";
import Button from "../Button/Button";
import { formReducer, INITIAL_STATE } from "./JournalForm.state.js";

const FIELD_NAMES = {
    TITLE: "title",
    DATE: "date",
    TEXT: "text",
};

const CSS_CLASSES = {
    input: styles.input,
    inputTitle: styles["input-title"],
    invalid: styles.invalid,
};

const FORM_FIELDS = [
    {
        name: FIELD_NAMES.TITLE,
        placeholder: "Заголовок",
        type: "text",
        label: null,
        isTextArea: false,
    },
    {
        name: FIELD_NAMES.DATE,
        placeholder: null,
        type: "date",
        label: "Дата",
        icon: "/date.svg",
        isTextArea: false,
    },
    {
        name: "tag",
        placeholder: "Метки",
        type: "text",
        label: "Метки",
        icon: "/folder.svg",
        isTextArea: false,
    },
    {
        name: FIELD_NAMES.TEXT,
        placeholder: "Текст",
        type: null,
        label: null,
        isTextArea: true,
    },
];

function getValidationClass(isValid, field) {

    return classNames({
        [CSS_CLASSES.input]: true,
        [CSS_CLASSES.inputTitle]: field === FIELD_NAMES.TITLE,
        [CSS_CLASSES.invalid]: isValid[field] === false,
    });
}

function validateFields(formData) {
    const validations = {
        [FIELD_NAMES.TITLE]: !!formData[FIELD_NAMES.TITLE]?.trim(),
        [FIELD_NAMES.DATE]: !!formData[FIELD_NAMES.DATE],
        [FIELD_NAMES.TEXT]: !!formData[FIELD_NAMES.TEXT]?.trim(),
    };

    return validations;
}

function isFormValid(validationResults) {
    return Object.values(validationResults).every(Boolean);
}

function renderField({
                         name,
                         placeholder,
                         type,
                         label,
                         icon,
                         isTextArea,
                         values,
                         isValid,
                         handleChange,
                        inputRef,
                     }) {
    return (
        <div className={styles["form-row"]} key={name}>
            {label && (
                <label htmlFor={name} className={styles["form-label"]}>
                    {icon && <img src={icon} alt={`Иконка для ${label}`} />}
                    <span>{label}</span>
                </label>
            )}
            {isTextArea ? (
                <>
                    <textarea
                        name={name}
                        value={values[name] || ""}
                        className={getValidationClass(isValid, name)}
                        placeholder={placeholder}
                        onChange={handleChange}
                        ref={inputRef}
                        rows="10"
                        cols="30"
                    />
                </>
            ) : (
                <>
                    <input
                        type={type}
                        name={name}
                        id={name}
                        value={values[name] || ""}
                        className={getValidationClass(isValid, name)}
                        placeholder={placeholder}
                        onChange={handleChange}
                        ref={inputRef}
                    />
                </>
            )}
        </div>
    );
}

function JournalForm({ onSubmit }) {
    const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
    const { values, isValid } = formState;

    const titleRef = useRef()
    const dateRef = useRef()
    const textRef = useRef()

    const focusError = (isValid) => {
        switch (true) {
            case !isValid.title:
                titleRef.current.focus();
                break;
            case !isValid.date:
                dateRef.current.focus();
                break;
            case !isValid.text:
                textRef.current.focus();
                break;
        }
    }

    const handleChange = ({ target: { name, value } }) => {
        dispatchForm({ type: "SET_VALUE", payload: { [name]: value } });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationResults = validateFields(formState.values);

        dispatchForm({ type: "SET_VALIDITY", payload: validationResults });
        focusError(validationResults);

        if (!isFormValid(validationResults)) {
            return;
        }

        onSubmit(formState.values);
        dispatchForm({ type: "CLEAR" });
    };

    return (
        <form className={styles["journal-form"]} onSubmit={handleSubmit}>
            {FORM_FIELDS.map((field) =>
                renderField({
                    ...field,
                    values,
                    isValid,
                    handleChange,
                    inputRef:
                        field.name === FIELD_NAMES.TITLE
                            ? titleRef
                            : field.name === FIELD_NAMES.DATE
                                ? dateRef
                                : field.name === FIELD_NAMES.TEXT
                                    ? textRef
                                    : undefined,

                })
            )}
            <Button text="Сохранить" />
        </form>
    );
}

export default JournalForm;