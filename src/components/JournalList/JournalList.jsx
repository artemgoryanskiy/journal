import "./JournalList.css";
import CardButton from "../CardButton/CardButton.jsx";
import JournalItem from "../JournalItem/JournalItem.jsx";

function JournalList({ items }) {
  if (items.length === 0) {
    return (
      <div className="journal-list__empty">
        Вы еще не добавили ни одной записи
      </div>
    );
  }
  const sortItems = (a, b) => {
    return a.date - b.date;
  };

  return (
    <>
      {items.sort(sortItems).map((item) => (
        <CardButton key={item.id}>
          <JournalItem titile={item.title} text={item.text} date={item.date} />
        </CardButton>
      ))}
    </>
  );
}

export default JournalList;
