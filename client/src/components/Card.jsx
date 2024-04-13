import React, { useState } from "react";
import { Alert, Button, Card, Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CardComponent({ image, price, name }) {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePurchase = async () => {
    try {
      setLoading(true);
      setError(null);

      const key = await fetch(`/api/razorpay/${currentUser._id}`);
      if (!key.ok) {
        setLoading(false);
        return setError("Key not found");
      }

      const res = await fetch(`/api/userDetail/${currentUser._id}`);
      let userName = "";
      let userEmail = "";
      let userContact = "";

      if (res.ok) {
        const data = await res.json();
        userName = data.name;
        userEmail = data.email;
        userContact = data.contact;
      }

      const response = await fetch(`/api/purchase/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          price: price,
          userName: userName,
          userEmail: userEmail,
          userContact: userContact,
        }),
      });
      const order = await response.json();
      console.log(order)

      const options = {
        key: key,
        amount: price,
        currency: "INR",
        name: name,
        description: "Test Transaction",
        image: image,
        order_id: order.id,
        callback_url: `/api/purchase/verifytransaction/${currentUser._id}`,
        prefill: {
          name: userName,
          email: userEmail,
          contact: userContact,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#721EF1",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();

      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <div>
      <Card
        className="max-w-sm w-[360px] object-cover overflow-hidden shadow-xl"
        imgAlt=""
        imgSrc={image}
      >
        <Link to="/">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h5>
        </Link>
        <div className="flex items-center">
          <svg
            className="h-5 w-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <svg
            className="h-5 w-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <svg
            className="h-5 w-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <svg
            className="h-5 w-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <svg
            className="h-5 w-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
            5.0
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ₹{price}
          </span>
          <Button
            onClick={handlePurchase}
            gradientDuoTone="purpleToPink"
            size="lg"
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              "Pay Now"
            )}
          </Button>
        </div>
        {error && (
          <Alert className="mt-5" color="failure">
            {error}
          </Alert>
        )}
      </Card>
    </div>
  );
}
