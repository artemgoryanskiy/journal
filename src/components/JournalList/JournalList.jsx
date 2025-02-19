import CardButton from "../CardButton/CardButton.jsx";
import JournalItem from "../JournalItem/JournalItem.jsx";

const emptyStateMessage = "Вы еще не добавили ни одной записи.";

function generateUniqueId() {
    // Генерация id, основанная на времени и случайности
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function addMissingIds(items) {
    return items.map((item) => ({
        ...item,
        id: item.id ?? generateUniqueId(), // Добавление id, если отсутствует
    }));
}

function sortByDateDescending(items) {
    return items.sort((a, b) => b.date - a.date);
}

function renderItems(items) {
    const itemsWithIds = addMissingIds(items); // Генерация id для всех элементов
    return sortByDateDescending(itemsWithIds).map((item) => (
        <CardButton key={item.id}>
            <JournalItem title={item.title} text={item.text} date={item.date} />
        </CardButton>
    ));
}

function JournalList({ items }) {
    if (items.length === 0) {
        return <div className="journal-list__empty">{emptyStateMessage}</div>;
    }

    return <>{renderItems(items)}</>;
}

export default JournalList;