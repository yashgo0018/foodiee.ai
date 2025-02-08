"use client";

import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";

interface Order {
  id: string;
  platform: "UberEats" | "DoorDash" | "Swiggy";
  orderTime: string;
  items: string[];
  total: number;
  hasReview: boolean;
}

export default function Dashboard() {
  const { user, authenticated } = usePrivy();
  const [orders, setOrders] = useState<Order[]>([
    // Temporary mock data
    {
      id: "UE123456",
      platform: "UberEats",
      orderTime: "2024-03-15T18:30:00Z",
      items: ["Burger", "Fries"],
      total: 25.99,
      hasReview: false,
    },
    {
      id: "DD789012",
      platform: "DoorDash",
      orderTime: "2024-03-14T19:45:00Z",
      items: ["Pizza", "Wings"],
      total: 32.5,
      hasReview: true,
    },
  ]);

  const [reviewModal, setReviewModal] = useState({
    isOpen: false,
    orderId: "",
  });

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="text-center">
          Please login to view your order history
        </div>
      </div>
    );
  }

  const handleReviewClick = (orderId: string) => {
    setReviewModal({
      isOpen: true,
      orderId,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Order History</h1>

        <div className="bg-white rounded-lg shadow">
          <div className="grid grid-cols-6 gap-4 p-4 font-semibold border-b">
            <div>Platform</div>
            <div>Order ID</div>
            <div>Date</div>
            <div>Items</div>
            <div>Total</div>
            <div>Review</div>
          </div>

          {orders.map((order) => (
            <div
              key={order.id}
              className="grid grid-cols-6 gap-4 p-4 border-b hover:bg-gray-50"
            >
              <div className="flex items-center">
                <PlatformIcon platform={order.platform} />
                <span className="ml-2">{order.platform}</span>
              </div>
              <div>{order.id}</div>
              <div>{new Date(order.orderTime).toLocaleDateString()}</div>
              <div>{order.items.join(", ")}</div>
              <div>${order.total.toFixed(2)}</div>
              <div>
                {order.hasReview ? (
                  <span className="text-green-600">Reviewed ✓</span>
                ) : (
                  <button
                    onClick={() => handleReviewClick(order.id)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Add Review
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {reviewModal.isOpen && (
        <ReviewModal
          orderId={reviewModal.orderId}
          onClose={() => setReviewModal({ isOpen: false, orderId: "" })}
          onSubmit={(review) => {
            // Handle review submission
            setOrders(
              orders.map((order) =>
                order.id === reviewModal.orderId
                  ? { ...order, hasReview: true }
                  : order
              )
            );
            setReviewModal({ isOpen: false, orderId: "" });
          }}
        />
      )}
    </div>
  );
}

function PlatformIcon({ platform }: { platform: Order["platform"] }) {
  // You can replace these with actual platform icons
  const iconMap = {
    UberEats: "🚗",
    DoorDash: "🔔",
    Swiggy: "🛵",
  };

  return <span>{iconMap[platform]}</span>;
}

function ReviewModal({
  orderId,
  onClose,
  onSubmit,
}: {
  orderId: string;
  onClose: () => void;
  onSubmit: (review: { rating: number; comment: string }) => void;
}) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add Review</h2>
        <p className="text-gray-600 mb-4">Order ID: {orderId}</p>

        <div className="mb-4">
          <label className="block mb-2">Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`text-2xl ${
                  star <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit({ rating, comment })}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}
