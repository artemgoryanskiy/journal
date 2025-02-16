import "./JournalForm.css";
import Button from "../Button/Button.jsx";

function JournalForm({ onSubmit }) {
  const addJournalItem = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    onSubmit(formProps);
  };

  return (
    <form className="journal-form" onSubmit={addJournalItem}>
      <input type="text" name="title" id="" />
      <input type="date" name="date" id="" />
      <input type="text" name="tag" />
      <textarea name="text" id="" cols="30" rows="10"></textarea>
      <Button text="Сохранить" onClick={() => console.log("Push")} />
    </form>
  );
}

export default JournalForm;
