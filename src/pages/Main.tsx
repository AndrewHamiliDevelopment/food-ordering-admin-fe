import React from "react";
import { firebaseSignOut } from "../shared";
import { Api, Product } from "../api";
import { store } from "../store";
import { AxiosError, AxiosResponse } from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from '../components/Profile';
import Header from '../components/Header';
import Menu from '../components/Menu';
import LoginSignup from "../components/LoginSignup";

interface Props {
  user: firebase.default.User | undefined;
}

const Main: React.FC<Props> = (props) => {
  const { user } = props;
  const [isReady, setIsReady] = React.useState(false);
  const [dataError, setDataError] = React.useState<string | null>(null);
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const api = new Api(import.meta.env.VITE_API_BASE_URL, user);

  React.useEffect(() => {
    const getData = async () => {
      const requests: Promise<AxiosResponse>[] = [
        api.getCategories({}),
        api.getProducts({}),
        api.getPaymentMethods({}),
      ];
      if (user) {
        requests.push(api.getUsers({}));
        requests.push(api.getOrders({}));
        requests.push(api.getMe());
      }
      try {
        const responses = await Promise.all(requests);
        store.paginatedCategories = responses[0].data;
        store.paginatedProducts = responses[1].data;
        store.paginatedPaymentMethods = responses[2].data;

        if (user) {
          store.paginatedUsers = responses[3].data;
          store.paginatedOrders = responses[4].data;
          store.me = responses[5].data;
        }
        setIsReady(true);
      } catch (error) {
        console.error("error", error);
        if (error instanceof AxiosError) {
          setDataError(error.message);
        }
      }
    };
    getData();
  }, []);

  if (!isReady) {
    return (
      <>
        <p>{dataError !== null ? dataError : "Loading..."}</p>
        <button onClick={() => firebaseSignOut()}>Logout</button>
      </>
    );
  }

  if (isReady) {
    return (
      <div>
        <Router>
          <Header
            isLoginOpen={isLoginOpen}
            setIsLoginOpen={setIsLoginOpen}
          />

          <main
            style={{
              filter: isLoginOpen ? "blur(3px)" : "none",
              pointerEvents: isLoginOpen ? "none" : "auto",
            }}
          >
            <Routes>
              <Route
                path="/profile"
                element={
                  <Profile api={api} />
                }
              />
              <Route path="/menu" element={<Menu />} />
            </Routes>
          </main>

          {isLoginOpen && (
            <LoginSignup isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} />
          )}
        </Router>
      </div>
    );
  }
};

export default Main;
