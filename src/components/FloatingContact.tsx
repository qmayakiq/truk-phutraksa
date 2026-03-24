"use client";

import { Phone, MessageCircle, X } from "lucide-react";
import { useState } from "react";

export default function FloatingContact() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded buttons */}
      {expanded && (
        <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
          {/* Phone */}
          <a
            href="tel:+66828800878"
            className="flex items-center gap-3 bg-primary text-white pl-4 pr-5 py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-primary-light transition-all group"
          >
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <Phone className="w-5 h-5" />
            </div>
            <span className="font-semibold text-sm whitespace-nowrap">082-880-0878</span>
          </a>

          {/* LINE */}
          <a
            href="https://line.me/ti/p/@truk"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#06C755] text-white pl-4 pr-5 py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-[#05b34d] transition-all group"
          >
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <MessageCircle className="w-5 h-5" />
            </div>
            <span className="font-semibold text-sm whitespace-nowrap">LINE: @truk</span>
          </a>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 ${
          expanded
            ? "bg-gray-600 hover:bg-gray-700 rotate-0"
            : "bg-accent hover:bg-accent/90 animate-bounce"
        }`}
        aria-label="ติดต่อเรา"
      >
        {expanded ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Phone className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
}
