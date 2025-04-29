
  const events = [
    { title: "🌠 Lyrid Meteor Shower", date: "April 22-23", time: "After midnight", img: "/Lyrid Meteor Shower.jpg", desc: "Up to 18 meteors per hour from a dark location!" },
    { title: "🌕 Full Moon", date: "April 24", time: "7:30 PM", img: "/Full Moon.jpg", desc: "The Pink Moon lights up the night sky." },
    { title: "🌘 Total Lunar Eclipse", date: "May 5", time: "2:00 AM - 5:00 AM", img: "/Total Lunar Eclipse.jpg", desc: "Visible in parts of Asia, Australia, and Pacific." },
    { title: "☄️ Eta Aquarids Meteor Shower", date: "May 6", time: "4 AM", img: "Eta Aquarids Meteor Shower.jpg", desc: "Swift meteors from Halley's Comet." },
    { title: "🌑 New Moon", date: "May 8", time: "All night", img: "New Moon.jpg", desc: "Perfect for deep-sky viewing." },
    { title: "🌌 Saturn at Opposition", date: "May 15", time: "9:00 PM", img: "Saturn at Opposition.jpg", desc: "Best view of Saturn all year!" },
    { title: "🌔 First Quarter Moon", date: "May 17", time: "8:00 PM", img: "First Quarter Moon.jpg", desc: "Great for crater observation." },
    { title: "🌕 Supermoon", date: "May 26", time: "10:30 PM", img: "Supermoon.jpg", desc: "Closest and biggest full moon!" },
    { title: "🌍 Earthshine on the Moon", date: "May 30", time: "Just after sunset", img: "Earthshine on the Moon.jpg", desc: "Faint glow from Earth reflected on the Moon." },
    { title: "☀️ Solar Eclipse", date: "June 10", time: "6:00 AM - 9:00 AM", img: "Solar Eclipse.jpg", desc: "Visible from the Northern Hemisphere." },
    { title: "🌙 Waning Crescent", date: "June 12", time: "Pre-dawn", img: "Waning Crescent.jpg", desc: "Sliver moon best viewed before sunrise." },
    { title: "🌌 Milky Way Peak", date: "June 20", time: "Midnight", img: "Milky Way Peak.jpg", desc: "Clear skies reveal the galactic core." }
  ];

  events.forEach(ev => {
    document.querySelector(".event-card-container").innerHTML += `
      <div class="event-card">
        <img src="${ev.img}" class="event-image" alt="${ev.title}" />
        <div class="event-content">
          <h3>${ev.title}</h3>
          <p><strong>Date:</strong> ${ev.date}</p>
          <p><strong>Time:</strong> ${ev.time}</p>
          <p>${ev.desc}</p>
        </div>
      </div>`;
  });

  const API_KEY = "AIzaSyAIYJxwrsru_TDOMml1jKLfhHD-1wGd0TA";
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  function toggleChat() {
    const chat = document.getElementById("chatContainer");
    chat.style.display = chat.style.display === "flex" ? "none" : "flex";
    if (chat.style.display === "flex" && !document.getElementById("messages").hasChildNodes()) {
      addBotMessage("Hello! Ready to explore the universe? Ask me anything about celestial events.");
    }
  }

  function handleKey(e) {
    if (e.key === "Enter") sendMessage();
  }

  async function sendMessage() {
    const input = document.getElementById("userInput");
    const message = input.value.trim();
    if (!message) return;

    addUserMessage(message);
    input.value = "";

    const loader = document.getElementById("loader");
    loader.style.display = "block";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: message }] }] })
      });

      const data = await res.json();
      const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I didn't catch that cosmic detail.";
      addBotMessage(botReply);
    } catch (err) {
      addBotMessage("Oops! There was an issue connecting to the cosmic servers.");
      console.error(err);
    } finally {
      loader.style.display = "none";
    }
  }

  function addUserMessage(text) {
    const container = document.getElementById("messages");
    const msg = document.createElement("div");
    msg.className = "message user-message";
    msg.textContent = text;
    container.appendChild(msg);
    container.scrollTop = container.scrollHeight;
  }

  function addBotMessage(text) {
    const container = document.getElementById("messages");
    const msg = document.createElement("div");
    msg.className = "message bot-message";
    msg.textContent = text;
    container.appendChild(msg);
    container.scrollTop = container.scrollHeight;
  }

  const text = "🌠 ASTRONOMY EVENT TRACKER 🌌";
  const typeTarget = document.getElementById("typewriter");
  let index = 0;
  function typeWriter() {
    if (index < text.length) {
      typeTarget.innerHTML += text.charAt(index);
      index++;
      setTimeout(typeWriter, 100);
    }
  }
  window.onload = typeWriter;