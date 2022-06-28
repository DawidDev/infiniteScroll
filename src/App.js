import React, { useState } from "react";

import "./App.css";

import InfiniteScroll from "react-infinite-scroll-component";

// Przykładowy komponent do podłączenia do wybranego/lub każdego elementu listy
const ExampleComponent = ({ index }) => (
  <>
    <p>To jest przykładowo podłączony komponent do elementu nr {index}</p>
  </>
);

// Komponent renderujący zawartość elementu listy (element <li></li>)
const ParentComponent = (index, additionalComponent) => (
  <>
    {`To jest wiersz nr ${index +1}`}
    {additionalComponent}
    {/* 
      Chcąc podłączyć do każdego pojedynczego wiersza dany komponent wygląda to następująco:
      <ExampleComponent index={index}/>
    */}
  </>
);

function App() {
  const startElementsListValue = 50;
  const [page, setPage] = useState(1);
  let tab = [];

  // Początkowo wyświetlane jest 50 wierszy zdefiniowane zmienną 'startElementsListValue'.
  // Kolejno pętla for wywoływana jest przez ponowne renderowanie komponentu przez właściwości
  // komponentu InfiniteScroll. Działa to w nieskończoność jak w poleceniu. 
  for (let y = 0; y < page * startElementsListValue; y++) {
    let element = ParentComponent(y);

    // Dodawanie dodatkowego komponentu do wybranego wiersza listy (tutaj element nr 80)
    y === 80
      ? (element = ParentComponent(y, <ExampleComponent index={y+1} />))
      : (element = ParentComponent(y));
    tab.push(element);
  }

  // Renderowanie elementów listy (<li></li>)
  const returnTab = tab.map((item) => <li>{item}</li>);

  return (
    <>
      <InfiniteScroll
        dataLength={tab.length} 
        next={() => setPage((prevValue) => prevValue + 1)}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <ul>{returnTab}</ul>
      </InfiniteScroll>
    </>
  );
}

export default App;
