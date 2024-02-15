import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import Header from "./components/Header";
import ProductDisplay from "./components/ProductDisplay";
import Modal from "./components/Modal";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import "./App.css";
import Wishlist from "./components/Wishlist";
import ModalW from "./components/ModalW";

function App() {
  const [userProfile, setUserProfile] = useState(null);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = sessionStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = sessionStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const handleAddToWishlist = (product) => {
    setWishlist((prevWishlist) => [...prevWishlist, product]);
    setModalContent({ type: "wishlist", message: "Item added to Wishlist" });
  };
  const handleRemoveFromWishlist = (item) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter(
        (wishlistItem) =>
          wishlistItem.id !== item.id || wishlistItem.size !== item.size
      )
    );
    setModalContent({
      type: "wishlist",
      message: "Item removed from Wishlist",
    });
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === product.id && item.size === product.size
      );

      if (existingItem) {
        // If the item with the same ID and size exists, update the quantity
        return prevItems.map((item) =>
          item.id === product.id && item.size === product.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If the item with the same ID and size doesn't exist, add a new item
        const updatedItems = [...prevItems, { ...product, quantity: 1 }];
        sessionStorage.setItem("cart", JSON.stringify(updatedItems));
        return updatedItems;
      }
    });

    setShowModal(true);
  };

  const removeFromCart = (itemId, size) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId || item.size !== size)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const closeModal = () => setShowModal(false);

  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const existingSize = prevWishlist.find(
        (item) => item.id === product.id && item.size === product.size
      );

      if (!existingSize) {
        const updatedWishlist = [...prevWishlist, { ...product, quantity: 1 }];
        sessionStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        return updatedWishlist;
      }

      return prevWishlist;
    });
  };

  const removeFromWishlist = (productId, size) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item.id !== productId || item.size !== size)
    );
  };

  return (
    <UserContext.Provider
      value={{ profile: userProfile, setProfile: setUserProfile }}
    >
      <Router>
        <div className="App">
          <Header cartItems={cartItems} wishlistItems={wishlist} />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <ProductDisplay
                    addToCart={addToCart}
                    addToWishlist={handleAddToWishlist}
                    removeFromWishlist={handleRemoveFromWishlist}
                    setShowModal={setShowModal}
                    wishlistItems={wishlist}
                    showModal={showModal}
                  />
                </>
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cartItems}
                  removeFromCart={removeFromCart}
                  setCartItems={setCartItems}
                />
              }
            />
            <Route
              path="/wishlist"
              element={
                <Wishlist
                  wishlistItems={wishlist}
                  removeFromWishlist={handleRemoveFromWishlist}
                  addToCart={addToCart}
                  // addToWishlist={handleAddToWishlist}
                  // showModal={showModal}
                  // setShowModal={setShowModal}
                />
              }
            />
            <Route
              path="/checkout"
              element={<Checkout clearCart={clearCart} />}
            />
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
