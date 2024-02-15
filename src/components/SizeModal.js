// import React, { useState } from "react";

// const SizeModal = ({ addToCart, removeFromWishlist, item }) => {
//   const [selectedSize, setSelectedSize] = useState(""); // State for selected size

//   const handleAddToCart = () => {
//     if (selectedSize) {
//       addToCart({ ...item, size: selectedSize });
//       removeFromWishlist(item); // Remove the item from the wishlist after adding to cart
//     }
//   };

//   return (
//     <div className="ModalOverlay">
//       <div className="Modal">
//         <h3>Select Size</h3>
//         <select
//           onChange={(e) => setSelectedSize(e.target.value)}
//           value={selectedSize}
//         >
//           <option value="" disabled>
//             Select Size
//           </option>
//           {["S", "M", "L", "XL", "XXL"].map((size) => (
//             <option key={size} value={size}>
//               {size}
//             </option>
//           ))}
//         </select>
//         <button onClick={handleAddToCart}>Add to Cart</button>
//       </div>
//     </div>
//   );
// };

// export default SizeModal;

import React, { useState } from "react";

const SizeModal = ({ addToCart, removeFromWishlist, closeSizeModal, item }) => {
  const [selectedSize, setSelectedSize] = useState(""); // State for selected size

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart({ ...item, size: selectedSize });
      removeFromWishlist(item);
      closeSizeModal(); // Close the size modal after adding to cart
    } else {
      alert("Please select the size");
    }
  };

  return (
    <div className="ModalOverlay">
      <div className="Modal">
        <h3>Select Size</h3>
        <select
          onChange={(e) => setSelectedSize(e.target.value)}
          value={selectedSize}
        >
          <option value="" disabled>
            Select Size
          </option>
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default SizeModal;
