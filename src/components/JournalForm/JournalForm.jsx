import styles from './JournalForm.module.css';
import Button from '../Button/Button.jsx';
import { useState } from 'react';
import classNames from 'classnames';

function JournalForm({ onSubmit }) {
	const FIELD_NAMES = ['title', 'date', 'text'];

	const [validationState, setValidationState] = useState(
		Object.fromEntries(FIELD_NAMES.map((field) => [field, true]))
	);

	// Проверяет валидность поля
	const isFieldValid = (name, value) => {
		if (name === 'title' || name === 'text') {
			return Boolean(value?.trim().length);
		}
		if (name === 'date') {
			return Boolean(value);
		}
		return true;
	};

	// Получает класс для состояния валидации
	const getValidationClass = (field) =>
		classNames({
			[styles['input-title']]: field === 'title', // Применяем класс для названия "title"
			[styles.invalid]: field === 'title' ? !validationState[field] : !validationState[field], // Проверяем валидность поля title и других полей
			[styles.input]: field !== 'title', // Применяем базовый класс для всех, кроме title
		});

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);

		// Обновляем состояние валидации
		const updatedValidationState = Object.fromEntries(
			FIELD_NAMES.map((field) => [field, isFieldValid(field, formProps[field])])
		);
		setValidationState(updatedValidationState);

		// Проверяем наличие невалидных полей
		if (Object.values(updatedValidationState).some((isValid) => !isValid)) {
			return; // Прекращаем отправку, если есть ошибки
		}

		onSubmit(formProps);
	};

	return (
		<form className={styles['journal-form']} onSubmit={handleSubmit}>
			<div>
				<input
					type="text"
					name="title"
					className={getValidationClass('title')}
				/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="date" className={styles['form-label']}>
					<img src="/date.svg" alt="Иконка календаря"/>
					<span>Дата</span>
				</label>
				<input
					type="date"
					name="date"
					id="date"
					className={getValidationClass('date')}
				/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="tag" className={styles['form-label']}>
					<img src="/folder.svg" alt="Иконка папки"/>
					<span>Метки</span>
				</label>
				<input
					type="text"
					name="tag"
					id="tag"
					className={styles.input} // Поле tag не требует валидации
				/>
			</div>
			<textarea
				name="text"
				cols="30"
				rows="10"
				className={getValidationClass('text')}
			></textarea>
			<Button text="Сохранить" />
		</form>
	);
}

export default JournalForm;