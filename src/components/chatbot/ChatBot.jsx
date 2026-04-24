import { useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";
// import conf from "../../config";

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const randomRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getBotReply = (message) => {
  const msg = message.toLowerCase().trim();
  const role = (localStorage.getItem("role") || "student")
    .toLowerCase()
    .trim();

  // Greeting
  if (msg.includes("hi") || msg.includes("hello")) {
    return `Hello 👋 ${role.toUpperCase()} Panel Assistant ready.`;
  }

  // PERFORMANCE / MARKS
  if (msg.includes("performance") || msg.includes("marks")) {
    if (role === "student") {
      return `📊 Your predicted result is ${randomRange(74, 88)}%.`;
    }
    if (role === "teacher") {
      return `📈 Class average performance is ${randomRange(68, 82)}%.`;
    }
    if (role === "admin") {
      return `📊 Institute performance rate is ${randomRange(75, 90)}%.`;
    }
  }

  // ATTENDANCE
  if (msg.includes("attendance")) {
    if (role === "student") {
      return `🧾 Your attendance is ${randomRange(85, 97)}%.`;
    }
    if (role === "teacher") {
      return `👨‍🏫 Class attendance average is ${randomRange(78, 92)}%.`;
    }
    if (role === "admin") {
      return `🏫 Overall institution attendance is ${randomRange(80, 94)}%.`;
    }
  }

  // EXAMS
  if (msg.includes("exam")) {
    if (role === "student") {
      return "📝 Your next exam is on 15 April 2026.";
    }
    if (role === "teacher") {
      return "📚 Upcoming faculty invigilation starts 15 April 2026.";
    }
    if (role === "admin") {
      return "🏫 Semester examinations begin from 15 April 2026.";
    }
  }

  // AVERAGE / CLASS RESULT
  if (msg.includes("average") || msg.includes("class result")) {
    return `📈 Average result is ${randomRange(68, 84)}%.`;
  }

  // ANALYTICS / REPORT
  if (
    msg.includes("analytics") ||
    msg.includes("report") ||
    msg.includes("students") ||
    msg.includes("teachers")
  ) {
    return `📊 Dashboard Report:
Pass Rate ${randomRange(82, 96)}%
Avg Score ${randomRange(70, 85)}%
Students ${randomRange(250, 600)}
Teachers ${randomRange(20, 80)}`;
  }

  // Fallback
  return randomItem([
    "🤖 Ask me about performance, attendance, exams, or analytics.",
    "💬 I can help with results, reports, schedules, and attendance.",
    "📌 Try asking: My performance / Attendance / Analytics",
  ]);
};

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋 How can I help you?" },
  ]);
  const [input, setInput] = useState("");

  const chatRef = useRef(null);
  const messagesEndRef = useRef(null);

  // ✅ Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (chatRef.current && !chatRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

 const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = input;
  setInput("");

  setMessages((prev) => [...prev, { from: "user", text: userMessage }]);
  setIsTyping(true);

  setTimeout(() => {
    const botReply = getBotReply(userMessage);

    setMessages((prev) => [...prev, { from: "bot", text: botReply }]);
    setIsTyping(false);
  }, 800); // typing effect
};



  const SUGGESTED_QUESTIONS = [
    "My performance",
    "Average result of class",
    "My attendance",
    "Next exam date",
  ];
 const handleQuickQuestion = (question) => {
  setMessages((prev) => [...prev, { from: "user", text: question }]);
  setIsTyping(true);

  setTimeout(() => {
    const botReply = getBotReply(question);
    setMessages((prev) => [...prev, { from: "bot", text: botReply }]);
    setIsTyping(false);
  }, 600);
};



  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* 🔵 Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 bg-[#00aae1] hover:bg-[#0591c0] text-white p-4 rounded-full shadow-lg"
      >
        <MessageCircle size={24} />
      </button>

      {/* 💬 Chat Window */}
      {open && (
        <div
          ref={chatRef}
          className="fixed bottom-24 right-6 w-80 h-[500px] bg-white rounded-xl shadow-2xl z-50 flex flex-col"
        >
          {/* Header */}
          <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 bg-[#00aae1] text-white rounded-t-xl">
            <h3 className="font-semibold">SRMS Assistant 🤖</h3>
            <X
              size={20}
              className="cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`text-sm p-2 rounded-lg max-w-[75%] ${
                  msg.from === "user"
                    ? "ml-auto bg-indigo-100 text-right"
                    : "bg-gray-100"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {/* 👇 Scroll anchor */}
            <div ref={messagesEndRef} />
            {isTyping && (
              <div className="text-sm p-2 rounded-lg bg-gray-100 w-fit">
                Bot is typing<span className="animate-pulse">...</span>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex-shrink-0">
            {/* Quick Questions */}
            <div className="px-3 py-2 flex flex-wrap gap-2 border-t bg-gray-50">
              {SUGGESTED_QUESTIONS.map((q, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(q)}
                  className="text-xs px-3 py-1 rounded-full border border-[#00aae1] text-[#00aae1] hover:bg-[#00aae1] hover:text-white transition"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex border-t">
              <input
                className="flex-1 px-3 py-2 text-sm outline-none"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="px-4 text-[#00aae1] font-semibold"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
