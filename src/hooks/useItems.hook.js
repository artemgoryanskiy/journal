import { useState, useEffect } from "react";

function useItems(initialKey = "data") {
  const [items, setItems] = useState([]);

  // Загрузка данных из LocalStorage при начальной загрузке
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(initialKey));
    if (data) {
      setItems(data.map((item) => ({ ...item, date: new Date(item.date) })));
    }
  }, [initialKey]);

  // Сохранение данных в LocalStorage при каждом изменении items
  useEffect(() => {
    if (items.length) {
      localStorage.setItem(initialKey, JSON.stringify(items));
    }
  }, [items, initialKey]);

  // Функция добавления нового элемента
  const addItem = (item) => {
    setItems((prevItems) => [
      ...prevItems,
      {
        text: item.text,
        date: new Date(item.date),
        title: item.title,
        id:
          prevItems.length > 0
            ? Math.max(...prevItems.map((i) => i.id)) + 1
            : 1,
      },
    ]);
  };

  return { items, addItem };
}

export default useItems;
