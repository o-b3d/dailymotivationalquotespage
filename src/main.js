import "./style.css";
import quotes from "./quote.json";
import { animate } from "animejs";

// Get a quote based on the day of year
function getDailyQuote() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  // Cycle all quotes per day
  const quoteIndex = dayOfYear % quotes.length;
  return quotes[quoteIndex];
}

// Daily quote variable
const quoteDisplay = document.getElementById("quote-display");
const dailyQuote = getDailyQuote();

// Animation for quote display
const pulseAnimation = {
  scale: [1, 1.1, 1],
  duration: 400,
  easing: "easeInOutQuad",
};

// Set quote text and author
quoteDisplay.innerHTML = `
  <p class="quote-text">"${dailyQuote.quote}"</p>
  <p class="quote-author">- ${dailyQuote.author}</p>
`;

// Copy button to copy quote and author
const copyBtn = document.getElementById("copy-btn");

copyBtn.addEventListener("click", () => {
  const text = `"${dailyQuote.quote}" - ${dailyQuote.author}`;
  navigator.clipboard.writeText(text).then(() => {
    copyBtn.textContent = "Copied!";
    setTimeout(() => {
      copyBtn.textContent = "Copy";
    }, 2000);
  });

// Animate the copy button on-click
  animate(copyBtn, {
    scale: [1, 1.2, 1],
    duration: 400,
    easing: "easeInOutQuad",
  });
});
