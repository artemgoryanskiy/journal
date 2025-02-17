import "./App.css";
import LeftPanel from "./layouts/LeftPanel/LeftPanel.jsx";
import Body from "./layouts/Body/Body.jsx";
import Header from "./components/Header/Header.jsx";
import JournalList from "./components/JournalList/JournalList.jsx";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton.jsx";
import JournalForm from "./components/JournalForm/JournalForm.jsx";
import { useEffect, useState } from "react";

// const INITIAL_DATA = [
//   {
//     id: 1,
//     title: "Подготовка к обновлению курсов",
//     text: "Горные походы открывают удивительные природные ландшафты",
//     date: new Date(),
//   },
//   {
//     id: 2,
//     title: "Поход в годы",
//     text: "Поход по горам – это следование определенному маршруту",
//     date: new Date(),
//   },
// ];

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    if (data) {
      setItems(data.map((item) => ({ ...item, date: new Date(item.date) })));
    }
  }, []);

  useEffect(() => {
    if (items.length) {
      console.log("Record");
      localStorage.setItem("data", JSON.stringify(items));
    }
  }, [items]);

  const addItem = (item) => {
    setItems([
      ...items,
      {
        text: item.text,
        date: new Date(item.date),
        title: item.title,
        id: Math.max(...items.map((item) => item.id)) + 1,
      },
    ]);
  };

  return (
    <div className="app">
      <LeftPanel>
        <Header />
        <JournalAddButton />
        <JournalList items={items}></JournalList>
      </LeftPanel>
      <Body>
        <JournalForm onSubmit={addItem} />
      </Body>
    </div>
  );
}

export default App;
