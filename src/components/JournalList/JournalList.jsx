import CardButton from "../CardButton/CardButton.jsx";
import JournalItem from "../JournalItem/JournalItem.jsx";

function renderSortedItems(items) {
  return items
    .sort((a, b) => b.date - a.date)
    .map((item) => (
      <CardButton key={item.id}>
        <JournalItem title={item.title} text={item.text} date={item.date} />
      </CardButton>
    ));
}

function JournalList({ items }) {
  if (items.length === 0) {
    return (
      <div className="journal-list__empty">
        Вы еще не добавили ни одной записи
      </div>
    );
  }

  return <>{renderSortedItems(items)}</>;
}

export default JournalList;
