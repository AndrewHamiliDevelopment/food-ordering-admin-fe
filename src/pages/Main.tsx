import React from "react";
import { firebaseSignOut } from "../shared";
import { Api, Product } from "../api";
import { store } from "../store";
import { AxiosError } from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "../components/Profile";
import Header from "../components/Header";
import Menu from "../components/Menu";
import LoginSignup from "../components/LoginSignup";

interface Props {
  user?: firebase.default.User;
}

const Main: React.FC<Props> = ({ user }) => {
  const [isReady, setIsReady] = React.useState(false);
  const [dataError, setDataError] = React.useState<string | null>(null);
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);

  const api = new Api(import.meta.env.VITE_API_BASE_URL, user);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const responses = await Promise.all([
          api.getCategories({}),
          api.getProducts({}),
          api.getPaymentMethods({}),
          ...(user ? [api.getUsers({}), api.getOrders({}), api.getMe()] : []),
        ]);

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
  }, [user]);

  const addProduct = async (newProduct: Product) => {
    try {
      const response = await api.createProduct(newProduct);
      store.paginatedProducts.data.push(response.data);
    } catch (error) {
      console.error("Failed to add product", error);
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      await api.deleteProduct(productId);
      store.paginatedProducts.data = store.paginatedProducts.data.filter(
        (p) => p.id !== productId
      );
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  const editProduct = async (updatedProduct: Product) => {
    try {
      const response = await api.updateProduct(updatedProduct.id, updatedProduct);
      store.paginatedProducts.data = store.paginatedProducts.data.map((p) =>
        p.id === updatedProduct.id ? response.data : p
      );
    } catch (error) {
      console.error("Failed to edit product", error);
    }
  };

  if (!isReady) {
    return (
      <>
        <p>{dataError !== null ? dataError : "Loading..."}</p>
        <button onClick={firebaseSignOut}>Logout</button>
      </>
    );
  }

  return (
    <div>
      <Router>
        <Header isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen} />
        <main
          style={{
            filter: isLoginOpen ? "blur(3px)" : "none",
            pointerEvents: isLoginOpen ? "none" : "auto",
          }}
        >
          <Routes>
            <Route
              path="/profile/*"
              element={
                <Profile

                  products={store.paginatedProducts.data}
                  addProduct={addProduct}
                  deleteProduct={deleteProduct}
                  editProduct={editProduct}
                />
              }
            />
            <Route path="/menu" element={<Menu />} />
          </Routes>
        </main>
        {isLoginOpen && <LoginSignup isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} />}
      </Router>
    </div>
  );
};

export default Main;
