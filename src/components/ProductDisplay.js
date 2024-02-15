// import React, { useState } from "react";
// import "./ProductDisplay.css";
// import Modal from "./Modal";
// import ModalW from "./ModalW";

// const ProductDisplay = ({
//   addToCart,
//   addToWishlist,
//   removeFromWishlist,
//   wishlistItems,
// }) => {
//   const products = [
//     { id: 1, name: "Hoodie", price: 10, imageUrl: "hoodie.png" },
//     { id: 2, name: "T-Shirt", price: 15, imageUrl: "tee.png" },
//   ];

//   // State to track the selected size for each product
//   const [selectedSizes, setSelectedSizes] = useState({});
//   const [showModal, setShowModal] = useState(false);
//   const [modalContent, setModalContent] = useState({});

//   // Function to handle size selection for a specific product
//   const handleSizeSelect = (productId, size) => {
//     setSelectedSizes((prevSelectedSizes) => ({
//       ...prevSelectedSizes,
//       [productId]: size,
//     }));
//   };

//   const handleAddToWishlist = (product) => {
//     addToWishlist(product);
//     setModalContent({ type: "wishlist", message: "Item added to Wishlist" });
//     setShowModal(true);
//   };

//   const handleRemoveFromWishlist = (product) => {
//     removeFromWishlist(product);
//     setModalContent({
//       type: "wishlist",
//       message: "Item removed from Wishlist",
//     });
//     setShowModal(true);
//   };

//   return (
//     <div className="ProductDisplay">
//       {products.map((product) => (
//         <div key={product.id} className="ProductItem">
//           <img src={product.imageUrl} alt={`Product: ${product.name}`} />
//           <h2>{product.name}</h2>
//           <p>${product.price}</p>

//           {/* Size selection buttons */}
//           <div className="SizeButtons">
//             {["S", "M", "L", "XL", "XXL"].map((size) => (
//               <button
//                 key={size}
//                 className={
//                   selectedSizes[product.id] === size
//                     ? "SizeButton selected"
//                     : "SizeButton"
//                 }
//                 onClick={() => handleSizeSelect(product.id, size)}
//               >
//                 {size}
//               </button>
//             ))}
//           </div>

//           {/* "Add to Cart" button (enabled only if a size is selected) */}
//           <button
//             className="ActionButton"
//             onClick={() => {
//               const selectedSize = selectedSizes[product.id];
//               if (selectedSize) {
//                 addToCart({ ...product, size: selectedSize });
//                 setModalContent({
//                   type: "cart",
//                   message: "Item added to Cart",
//                 });
//                 setShowModal(true);
//               } else {
//                 alert("Please select a size before adding to cart.");
//               }
//             }}
//           >
//             Add to Cart
//           </button>

//           {/* {wishlistItems.some(
//             (item) =>
//               item.id === product.id && item.size === selectedSizes[product.id]
//           ) ? (
//             <button onClick={() => handleRemoveFromWishlist(product)}>
//               Remove from Wishlist
//             </button>
//           ) : (
//             <button onClick={() => handleAddToWishlist(product)}>
//               Add to Wishlist
//             </button>
//           )} */}

//           {wishlistItems.some(
//             (item) =>
//               item.id === product.id && item.size === selectedSizes[product.id]
//           ) ? (
//             <button onClick={() => handleRemoveFromWishlist(product)}>
//               Remove from Wishlist
//             </button>
//           ) : (
//             <button onClick={() => handleAddToWishlist(product)}>
//               Add to Wishlist
//             </button>
//           )}
//         </div>
//       ))}
//       {showModal &&
//         (modalContent.type === "cart" ? (
//           <Modal
//             closeModal={() => setShowModal(false)}
//             message={modalContent.message}
//           />
//         ) : (
//           <ModalW
//             closeModal={() => setShowModal(false)}
//             message={modalContent.message}
//           />
//         ))}
//     </div>
//   );
// };

// export default ProductDisplay;

import React, { useState } from "react";
import "./ProductDisplay.css";
import Modal from "./Modal";
import ModalW from "./ModalW";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import SizeModal from "./SizeModal";

const ProductDisplay = ({
  addToCart,
  addToWishlist,
  removeFromWishlist,
  wishlistItems,
}) => {
  const products = [
    { id: 1, name: "Hoodie", price: 10, imageUrl: "hoodie.png" },
    { id: 2, name: "T-Shirt", price: 15, imageUrl: "tee.png" },
  ];

  const [selectedSizes, setSelectedSizes] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [wishlistButtonStates, setWishlistButtonStates] = useState(
    products.reduce((acc, product) => ({ ...acc, [product.id]: false }), {})
  );

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes((prevSelectedSizes) => ({
      ...prevSelectedSizes,
      [productId]: size,
    }));
  };

  const handleAddToWishlist = (product) => {
    addToWishlist(product);
    setWishlistButtonStates((prevStates) => ({
      ...prevStates,
      [product.id]: true, // Set the button state to true for the added product
    }));
    setModalContent({ type: "wishlist", message: "Item added to Wishlist" });
    setShowModal(true);
  };

  const handleRemoveFromWishlist = (product) => {
    removeFromWishlist(product);
    setWishlistButtonStates((prevStates) => ({
      ...prevStates,
      [product.id]: false, // Set the button state to false for the removed product
    }));
    setModalContent({
      type: "wishlist",
      message: "Item removed from Wishlist",
    });
    setShowModal(true);
  };

  return (
    <div className="ProductDisplay">
      {products.map((product) => (
        <div key={product.id} className="ProductItem">
          <img src={product.imageUrl} alt={`Product: ${product.name}`} />

          <h2>{product.name}</h2>
          <p>${product.price}</p>

          {/* Size selection buttons */}
          <div className="SizeButtons">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <button
                key={size}
                className={
                  selectedSizes[product.id] === size
                    ? "SizeButton selected"
                    : "SizeButton"
                }
                onClick={() => handleSizeSelect(product.id, size)}
              >
                {size}
              </button>
            ))}
          </div>

          <button
            className="ActionButton"
            onClick={() => {
              const selectedSize = selectedSizes[product.id];
              if (selectedSize) {
                addToCart({ ...product, size: selectedSize });
                setModalContent({
                  type: "cart",
                  message: "Item added to Cart",
                });
                setShowModal(true);
              } else {
                alert("Please select a size before adding to cart.");
              }
            }}
          >
            Add to Cart
          </button>

          {wishlistItems.some((item) => item.id === product.id) ? (
            <button onClick={() => handleRemoveFromWishlist(product)}>
              {/* Remove from Wishlist */}
              <FaHeart style={{ fontSize: "1em", color: "red" }} />
            </button>
          ) : (
            <button
              onClick={() => {
                handleAddToWishlist(product);
              }}
              disabled={wishlistButtonStates[product.id]} // Disable the button when it's already in the wishlist
            >
              {/* Add to Wishlist */}
              <FaRegHeart style={{ fontSize: "1em", color: "red" }} />
            </button>
          )}
        </div>
      ))}
      {showModal &&
        (modalContent.type === "cart" ? (
          <Modal
            closeModal={() => setShowModal(false)}
            message={modalContent.message}
          />
        ) : (
          <ModalW
            closeModal={() => setShowModal(false)}
            message={modalContent.message}
          />
        ))}
    </div>
  );
};

export default ProductDisplay;
