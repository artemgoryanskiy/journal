import "./App.css";
import Button from "./components/Button/Button.jsx";
import JournalItem from "./components/JournalItem/JournalItem.jsx";
import CardButton from "./components/CardButton/CardButton.jsx";
import LeftPanel from "./layouts/LeftPanel/LeftPanel.jsx";
import Body from "./layouts/Body/Body.jsx";
import Header from "./components/Header/Header.jsx";
import JournalList from "./components/JournalList/JournalList.jsx";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton.jsx";

function App() {
  const data = [
    {
      title: "Подготовка к обновлению курсов",
      text: "Горные походы открывают удивительные природные ландшафты",
      date: new Date(),
    },
    {
      title: "Поход в годы",
      text: "Поход по горам – это следование определенному маршруту",
      date: new Date(),
    },
  ];

  return (
    <div className="app">
      <LeftPanel>
        <Header />
        <JournalAddButton />
        <JournalList>
          <CardButton>
            <JournalItem
              titile={data[0].title}
              text={data[0].text}
              date={data[0].date}
            />
          </CardButton>
          <CardButton>
            <JournalItem
              titile={data[1].title}
              text={data[1].text}
              date={data[1].date}
            />
          </CardButton>
        </JournalList>
      </LeftPanel>
      <Body>Body</Body>
    </div>
  );
}

export default App;
