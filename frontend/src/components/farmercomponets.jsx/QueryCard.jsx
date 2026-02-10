import React from "react";
import { MessageCircle } from "lucide-react";

const QueryCard = ({ initials, name, crop, time, message, status, onReplyClick, reply }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 flex justify-between items-start">
      {/* LEFT */}
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center font-semibold text-green-800">
          {initials}
        </div>

        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-[#0f2f1f]">{name}</h3>

            {status === "New" && (
              <span className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full">
                New
              </span>
            )}

            {status === "Replied" && (
              <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                Replied
              </span>
            )}
          </div>

          <p className="text-sm text-[#5f7f6b] mt-1">
            Regarding: <span className="text-[#2f6f55]">{crop}</span> • {time}
          </p>

          <p className="text-sm text-[#3f5f52] mt-3 max-w-3xl">{message}</p>

          {/* Show previous reply if available */}
          {reply && reply.trim() !== "" && (
            <p className="text-sm text-green-800 mt-2">
              <strong>Reply:</strong> {reply}
            </p>
          )}
        </div>
      </div>

      {/* RIGHT */}
      {status === "New" && (
        <button
          className="bg-[#3b6f5b] hover:bg-[#2f5e4d] text-white px-6 py-2 rounded-full flex items-center gap-2"
          onClick={onReplyClick} // trigger modal
        >
          <MessageCircle size={16} />
          Reply
        </button>
      )}
    </div>
  );
};

export default QueryCard;
