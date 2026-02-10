import React, { useState } from "react";
import { toast } from "react-toastify";
import { postQuery } from "../../api/queryApi";

const QueryModal = ({ isOpen, onClose, product, productType }) => {
  const [question, setQuestion] = useState("");
  const buyerId = localStorage.getItem("id");

  if (!isOpen) return null;

  const handleSubmitQuery = async () => {
    if (!buyerId) {
      return toast.error("Please login first");
    }

    if (!question.trim()) {
      return toast.error("Question is required");
    }

    try {
      const payload = {
        productId: product._id,
        farmerId: product.farmerId,
        productType, // 🔥 Harvested OR FutureHarvest
        question,
      };

      await postQuery(payload);
      toast.success("Query submitted");
      setQuestion("");
      onClose();
    } catch (error) {
      toast.error("Failed to submit query");
      console.error(error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Ask a Question</h3>

        <textarea
          placeholder="Type your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmitQuery}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default QueryModal;
