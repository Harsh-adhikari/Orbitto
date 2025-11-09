import { Send } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import React from "react";

const THEMES = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
];

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  {
    id: 2,
    content: "I'm doing great! Just working on some new features.",
    isSent: true,
  },
];

const SettingsPage = () => {
  // This should use your actual store
  // const { theme, setTheme } = useThemeStore();

  // For demo purposes, using local state

  const { theme, setTheme } = useThemeStore();

  // Apply theme to document when it changes
  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="h-screen flex pt-20">
      {/* Left Side - Theme Selection */}
      <div className="w-1/2 border-r border-base-300 overflow-y-auto bg-base-100">
        <div className="py-8 px-8">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Theme Settings</h2>
              <p className="text-base-content/70">
                Choose a theme for your chat interface
              </p>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {THEMES.map((t) => (
                <button
                  key={t}
                  className={`
                    group flex flex-col items-center gap-2 p-3 rounded-lg transition-all
                    border-2 hover:scale-105
                    ${
                      theme === t
                        ? "border-primary bg-primary/10 shadow-lg"
                        : "border-base-300 hover:border-base-content/20"
                    }
                  `}
                  onClick={() => setTheme(t)}
                >
                  <div
                    className="relative h-8 w-full rounded-md overflow-hidden shadow-sm"
                    data-theme={t}
                  >
                    <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                      <div className="rounded bg-primary"></div>
                      <div className="rounded bg-secondary"></div>
                      <div className="rounded bg-accent"></div>
                      <div className="rounded bg-neutral"></div>
                    </div>
                  </div>
                  <span className="text-xs font-medium truncate w-full text-center">
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </span>
                  {theme === t && (
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Preview */}
      <div className="w-1/2 bg-base-200 overflow-y-auto">
        <div className="py-8 px-8">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Live Preview</h3>
              <p className="text-base-content/70">
                See how your selected theme looks
              </p>
            </div>

            <div className="bg-base-100 rounded-2xl shadow-2xl overflow-hidden border border-base-300">
              {/* Chat Header */}
              <div className="px-6 py-4 border-b border-base-300 bg-base-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-content font-bold text-lg">
                    J
                  </div>
                  <div>
                    <h3 className="font-semibold">John Doe</h3>
                    <p className="text-xs text-base-content/70 flex items-center gap-1">
                      <span className="w-2 h-2 bg-success rounded-full"></span>
                      Online
                    </p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="p-6 space-y-4 h-[400px] overflow-y-auto bg-base-100">
                {PREVIEW_MESSAGES.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.isSent ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`
                        max-w-[75%] rounded-2xl p-4 shadow-md
                        ${
                          message.isSent
                            ? "bg-primary text-primary-content rounded-br-md"
                            : "bg-base-200 rounded-bl-md"
                        }
                      `}
                    >
                      <p className="text-sm leading-relaxed">
                        {message.content}
                      </p>
                      <p
                        className={`
                          text-[10px] mt-2
                          ${
                            message.isSent
                              ? "text-primary-content/60"
                              : "text-base-content/60"
                          }
                        `}
                      >
                        12:00 PM
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-6 border-t border-base-300 bg-base-100">
                <div className="flex gap-3">
                  <input
                    type="text"
                    className="input input-bordered flex-1 h-12 text-sm"
                    placeholder="Type a message..."
                    value="This is a preview"
                    readOnly
                  />
                  <button className="btn btn-primary h-12 px-6">
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Theme Info Card */}
            <div className="mt-6 p-6 bg-base-100 rounded-xl border border-base-300">
              <h4 className="font-semibold mb-2">Current Theme</h4>
              <p className="text-2xl font-bold text-primary capitalize">
                {theme}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
