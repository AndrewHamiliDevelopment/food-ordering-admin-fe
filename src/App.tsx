import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Api, Category, Paginated, PaymentMethod, Product } from "./api";
import React from "react";
import { store, useStore } from "./store";

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = React.useState<firebase.default.User | undefined>(
    undefined
  );
  const [isReady, setIsReady] = React.useState(false);
  const snap = useStore();

  const api = new Api(import.meta.env.VITE_API_BASE_URL, user);

  React.useEffect(() => {
    const requests = [
      api.getProducts({}),
      api.getCategories({}),
      api.getPaymentMethods({}),
    ];

    const getResponses = async () => {
      try {
        const responses = await Promise.all(requests);
        store.paginatedProducts = responses[0].data as Paginated<Product>;
        store.paginatedCategories = responses[1].data as Paginated<Category>;
        store.paginatedPaymentMethods = responses[2]
          .data as Paginated<PaymentMethod>;
        //setIsReady(true);
      } catch (error) {
        console.error("error", error);
      }
    };

    getResponses();
  }, []);

  React.useEffect(() => {
    console.log("🚀 ~ React.useEffect ~ snap:", snap)
  }, [snap]);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
