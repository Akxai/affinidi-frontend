// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./Cart.css";

// const Cart = ({ cartItems }) => {
//   const navigate = useNavigate();

//   const getTotalPrice = () => {
//     return cartItems.reduce(
//       (total, item) => total + item.quantity * item.price,
//       0
//     );
//   };

//   const goToCheckout = () => {
//     navigate("/checkout");
//   };

//   return (
//     <div className="Cart">
//       <table>
//         <thead>
//           <tr>
//             <th>Product</th>
//             <th>Name</th>
//             <th>Quantity</th>
//             <th>Price</th>
//           </tr>
//         </thead>
//         <tbody>
//           {cartItems.length === 0 ? (
//             <tr>
//               <td colSpan="4">Your cart is empty.</td>
//             </tr>
//           ) : (
//             cartItems.map((item) => (
//               <tr key={item.id}>
//                 <td>
//                   <img src={item.imageUrl} alt={item.name} />
//                 </td>
//                 <td>{item.name}</td>
//                 <td>{item.quantity}</td>
//                 <td>${item.price}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//         <tfoot>
//           <tr>
//             <td colSpan="3">Total</td>
//             <td>${getTotalPrice()}</td>
//           </tr>
//         </tfoot>
//       </table>
//       <button onClick={goToCheckout} disabled={cartItems.length === 0}>
//         Go to Checkout
//       </button>
//     </div>
//   );
// };

// export default Cart;

import React from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = ({ cartItems, removeFromCart, setCartItems }) => {
  const navigate = useNavigate();
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };
  const goToCheckout = () => {
    navigate("/checkout");
  };

  const handleRemoveItem = (itemId, size) => {
    removeFromCart(itemId, size);
  };

  const handleIncreaseQuantity = (itemId, size) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecreaseQuantity = (itemId, size) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId && item.size === size
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <div className="Cart">
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Name</th>
            <th>Size</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length === 0 ? (
            <tr>
              <td colSpan="6">Your cart is empty.</td>
            </tr>
          ) : (
            cartItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={item.imageUrl} alt={item.name} />
                </td>
                <td>{item.name}</td>
                <td>{item.size}</td>
                {/* <td>{item.quantity}</td> */}
                <td>
                  <button
                    onClick={() => handleDecreaseQuantity(item.id, item.size)}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  {item.quantity}
                  <button
                    onClick={() => handleIncreaseQuantity(item.id, item.size)}
                  >
                    +
                  </button>
                </td>
                <td>${item.price}</td>
                <td>
                  <button onClick={() => handleRemoveItem(item.id, item.size)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">Total</td>
            <td>${getTotalPrice()}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <button onClick={goToCheckout} disabled={cartItems.length === 0}>
        Go to Checkout
      </button>
    </div>
  );
};

export default Cart;
