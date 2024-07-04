import PaginatedTable from "./components/PaginatedTable";

import "./App.css";

const tableHeaders = ["Название", "Тип", "Страна", "Город", "Год", "Высота"];

const data = [
  {
    name: "Бурдж-Халифа",
    type: "Небоскрёб",
    country: "ОАЭ",
    city: "Дубай",
    year: "2010",
    height: "828",
  },
  {
    name: "Варшавская радиомачта",
    type: "Антенная мачта",
    country: "Польша",
    city: "Константинов",
    year: "1974",
    height: "646",
  },
  {
    name: "Tokyo Skytree",
    type: "Бетонная башня",
    country: "Япония",
    city: "Токио",
    year: "2012",
    height: "634",
  },
  {
    name: "Шанхайская башня",
    type: "Небоскрёб",
    country: "Китай",
    city: "Шанхай",
    year: "2015",
    height: "632",
  },
  {
    name: "Абрадж аль-Бейт",
    type: "Комплекс",
    country: "Саудовская Аравия",
    city: "Мекка",
    year: "2012",
    height: "601",
  },
  {
    name: "Пинаньский международный финансовый центр",
    type: "Небоскрёб",
    country: "Китай",
    city: "Шэньчжэнь",
    year: "2017",
    height: "599",
  },
  {
    name: "Лотте Ворлд Тауэр",
    type: "Небоскрёб",
    country: "Южная Корея",
    city: "Сеул",
    year: "2016",
    height: "555",
  },
  {
    name: "Всемирный торговый центр 1",
    type: "Небоскрёб",
    country: "США",
    city: "Нью-Йорк",
    year: "2013",
    height: "541",
  },
  {
    name: "Кантонская башня",
    type: "Телебашня",
    country: "Китай",
    city: "Гуанчжоу",
    year: "2010",
    height: "600",
  },
  {
    name: "Тайбэй 101",
    type: "Небоскрёб",
    country: "Тайвань",
    city: "Тайбэй",
    year: "2004",
    height: "509",
  },
  {
    name: "Международный коммерческий центр",
    type: "Небоскрёб",
    country: "Гонконг",
    city: "Гонконг",
    year: "2010",
    height: "484",
  },
  {
    name: "Шанхайский всемирный финансовый центр",
    type: "Небоскрёб",
    country: "Китай",
    city: "Шанхай",
    year: "2008",
    height: "492",
  },
  {
    name: "Башня Зифэн",
    type: "Небоскрёб",
    country: "Китай",
    city: "Нанкин",
    year: "2010",
    height: "450",
  },
  {
    name: "Петронас Тауэрс",
    type: "Небоскрёб",
    country: "Малайзия",
    city: "Куала-Лумпур",
    year: "1998",
    height: "452",
  },
];

function App() {
  return (
    <>
      <PaginatedTable
        data={data}
        rowsPerPage={5}
        paginate={true}
        tableHeaders={tableHeaders}
      />
    </>
  );
}

export default App;
