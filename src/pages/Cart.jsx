import { useCart } from "../context/CartContext";

import { addDoc, collection } from "firebase/firestore";

import { db, auth } from "../firebase";
import { stripePromise } from "../stripe";
export default function Cart() {
  const {
    cart,
    removeFromCart,
    total,
  } = useCart();

  const checkout = async () => {
    if (!auth.currentUser) {
      alert("Please login first");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        userId: auth.currentUser.uid,

        items: cart,

        total: total,

        createdAt: new Date(),

        status: "pending",
      });

      alert("Order Placed Successfully 🎉");
    } catch (err) {
      console.log(err);
      alert("Error placing order");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow p-4 rounded-xl mb-4 flex justify-between items-center"
            >
              <div>
                <h2 className="font-bold">
                  {item.name}
                </h2>

                <p>
                  Qty: {item.qty}
                </p>

                <p>
                  {item.price} QAR
                </p>
              </div>

              <button
                onClick={() =>
                  removeFromCart(item.id)
                }
                className="bg-red-500 text-white px-3 py-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-2xl font-bold mt-6">
            Total: {total} QAR
          </div>

         <button
  onClick={() => {

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    localStorage.setItem(
      "total",
      JSON.stringify(total)
    );

    window.open(
      "https://buy.stripe.com/test_8x23cn0VMcf9dYY0rm1sQ00",
      "_self"
    );

  }}
  className="bg-green-600 text-white px-4 py-3 rounded mt-4 w-full"
>
  Pay Now
</button>
        </>
      )}
    </div>
  );
}