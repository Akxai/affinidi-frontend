// import React from "react";
// import "./Wishlist.css";

// const Wishlist = ({
//   wishlistItems,
//   removeFromWishlist,
//   addToWishlist,
//   showModal,
//   setShowModal,
// }) => {
//   const handleAddToWishlist = (item) => {
//     addToWishlist(item);
//     setShowModal(true);
//   };

//   return (
//     <div className="Wishlist">
//       <h2>Wishlist</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Product</th>
//             <th>Name</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {wishlistItems.length === 0 ? (
//             <tr>
//               <td colSpan="3">Your wishlist is empty.</td>
//             </tr>
//           ) : (
//             wishlistItems.map((item) => (
//               <tr key={item.id + item.size}>
//                 <td>
//                   <img src={item.imageUrl} alt={item.name} />
//                 </td>
//                 <td>{item.name}</td>
//                 <td>
//                   <button onClick={() => removeFromWishlist(item)}>
//                     Remove from Wishlist
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Wishlist;

import React, { useState } from "react";
import "./Wishlist.css";
import SizeModal from "./SizeModal";

const Wishlist = ({
  wishlistItems,
  removeFromWishlist,
  addToWishlist,
  addToCart,
}) => {
  const [sizeModalOpen, setSizeModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleAddToCart = (item) => {
    setSelectedItem(item);
    setSizeModalOpen(true);
  };

  const closeSizeModal = () => {
    setSizeModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="Wishlist">
      <h2>Wishlist</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Name</th>
            <th>Add to Cart</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {wishlistItems.length === 0 ? (
            <tr>
              <td colSpan="4">Your wishlist is empty.</td>
            </tr>
          ) : (
            wishlistItems.map((item) => (
              <tr key={item.id + item.size}>
                <td>
                  <img src={item.imageUrl} alt={item.name} />
                </td>
                <td>{item.name}</td>
                <td>
                  <button onClick={() => handleAddToCart(item)}>
                    Add to Cart
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => removeFromWishlist(item)}
                    style={{ backgroundColor: "red" }}
                  >
                    Remove from Wishlist
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {sizeModalOpen && selectedItem && (
        <SizeModal
          item={selectedItem}
          addToCart={addToCart}
          removeFromWishlist={removeFromWishlist}
          closeSizeModal={closeSizeModal}
        />
      )}
    </div>
  );
};

export default Wishlist;
