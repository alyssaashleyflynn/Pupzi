import React, { useMemo, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const tabs = [
  { id: "walk", label: "WALK", icon: "🥾" },
  { id: "feed", label: "FEED", icon: "🍖" },
  { id: "water", label: "WATER", icon: "💧" },
  { id: "trick", label: "TRICK", icon: "🪄" },
  { id: "quiz", label: "QUIZ", icon: "❓" },
  { id: "poll", label: "POLL", icon: "📊" },
];

const bottomTabs = ["WARDROBE", "ROOM", "TOYS", "ACHIEVEMENTS", "FRIENDS"];

const quiz = {
  q: "Why is sniffing during walks good for dogs?",
  choices: ["Mental enrichment", "Stress relief", "Gathering information", "All of the above"],
  answer: "All of the above",
};

const poll = {
  q: "What is your dog's favorite part of the day?",
  choices: ["Walks", "Food", "Cuddles", "Playtime"],
};

function PixelDog({ outfit }) {
  return (
    <div className="pixel-dog">
      <div className="dog-body" />
      <div className="dog-ear dog-ear-left" />
      <div className="dog-ear dog-ear-right" />
      <div className="dog-head" />
      <div className="inner-ear inner-ear-left" />
      <div className="inner-ear inner-ear-right" />
      <div className="dog-eye dog-eye-left"><span /></div>
      <div className="dog-eye dog-eye-right"><span /></div>
      <div className="dog-nose" />
      <div className="dog-mouth" />
      <div className="dog-leg dog-leg-left" />
      <div className="dog-leg dog-leg-right" />
      {outfit !== "None" && <div className="dog-harness">MOOSE</div>}
    </div>
  );
}

function PixelRoom({ outfit }) {
  return (
    <div className="pixel-room">
      <div className="wallpaper" />
      <div className="floor" />
      <div className="window">
        <div className="cloud cloud-one">☁️</div>
        <div className="cloud cloud-two">☁️</div>
        <div className="hill" />
      </div>
      <div className="plant-left">🪴</div>
      <div className="shelf" />
      <div className="dog-photo">🐶</div>
      <div className="name-sign">MOOSE</div>
      <div className="dresser"><div>🐾</div><div>🐾</div></div>
      <div className="lamp">💡</div>
      <div className="plant-right">🪴</div>
      <div className="dog-bed">🐾</div>
      <div className="rug" />
      <div className="bone">🦴</div>
      <div className="ball">🏀</div>
      <PixelDog outfit={outfit} />
    </div>
  );
}

function ActionCard({ active, tab, onClick }) {
  return (
    <button onClick={onClick} className={`action-card ${active ? "active" : ""}`}>
      <div className="action-icon">{tab.icon}</div>
      <div>{tab.label}</div>
    </button>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState("walk");
  const [xp, setXp] = useState(350);
  const [coins, setCoins] = useState(250);
  const [points, setPoints] = useState(1250);
  const [walkStarted, setWalkStarted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [miles, setMiles] = useState(0);
  const [done, setDone] = useState({ walk:false, feed:false, water:false, trick:false, quiz:false, poll:false });
  const [quizAnswer, setQuizAnswer] = useState("");
  const [pollAnswer, setPollAnswer] = useState("");
  const [outfit, setOutfit] = useState("Teal Harness");

  useEffect(() => {
    if (!walkStarted) return;
    const timer = setInterval(() => {
      setSeconds(s => s + 1);
      setMiles(m => +(m + 0.004).toFixed(2));
    }, 1000);
    return () => clearInterval(timer);
  }, [walkStarted]);

  const level = useMemo(() => Math.floor(xp / 100) + 1, [xp]);
  const progress = xp % 700;
  const time = `${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,"0")}`;

  function reward(key, addXp, addCoins, addPoints) {
    if (done[key]) return;
    setDone(d => ({...d, [key]: true}));
    setXp(x => x + addXp);
    setCoins(c => c + addCoins);
    setPoints(p => p + addPoints);
  }

  function Content() {
    if (activeTab === "walk") return (
      <div className="content-grid">
        <div className="pixel-panel">
          <h2>DAILY WALK</h2>
          <div className="map">🗺️</div>
          <div className="stats-grid">
            <div><p className="big">{miles.toFixed(2)} mi</p><p>DISTANCE</p></div>
            <div><p className="big">{time}</p><p>TIME</p></div>
          </div>
          {!walkStarted ? (
            <button className="pixel-button green" onClick={() => setWalkStarted(true)} disabled={done.walk}>
              {done.walk ? "WALK DONE" : "START WALK"}
            </button>
          ) : (
            <button className="pixel-button green" onClick={() => {setWalkStarted(false); reward("walk",100,50,100)}}>
              FINISH WALK
            </button>
          )}
        </div>
        <div className="pixel-panel">
          <h2>Why daily walks?</h2>
          <p className="copy">Daily walks keep your dog healthy, happy, and help strengthen your bond together.</p>
          <div className="reward-box">⭐ +100 XP &nbsp;&nbsp; 🐾 +100 POINTS &nbsp;&nbsp; 🪙 +50 COINS</div>
        </div>
      </div>
    );

    if (activeTab === "feed") return (
      <div className="pixel-panel">
        <h2>FEED DOG</h2>
        <p className="copy">After feeding your real dog, tap the button to feed Moose in the app.</p>
        <div className="huge">🍖</div>
        <button className="pixel-button gold" onClick={() => reward("feed",15,10,25)} disabled={done.feed}>
          {done.feed ? "FED TODAY" : "FEED MOOSE"}
        </button>
      </div>
    );

    if (activeTab === "water") return (
      <div className="pixel-panel">
        <h2>REFILL WATER</h2>
        <p className="copy">Refresh your real dog's water bowl, then refill the digital water bowl.</p>
        <div className="huge">💧</div>
        <button className="pixel-button blue" onClick={() => reward("water",15,10,25)} disabled={done.water}>
          {done.water ? "WATER REFILLED" : "REFILL WATER"}
        </button>
      </div>
    );

    if (activeTab === "trick") return (
      <div className="pixel-panel">
        <h2>PRACTICE TRICK</h2>
        <p className="copy">Today's simple cue: <b>SIT</b>. Practice for 3 minutes and reward your dog.</p>
        <div className="huge">🎾</div>
        <button className="pixel-button purple" onClick={() => reward("trick",35,20,50)} disabled={done.trick}>
          {done.trick ? "TRICK DONE" : "COMPLETE PRACTICE"}
        </button>
      </div>
    );

    if (activeTab === "quiz") return (
      <div className="pixel-panel">
        <h2>DAILY QUIZ</h2>
        <p className="copy bold">{quiz.q}</p>
        <div className="choice-grid">
          {quiz.choices.map(c => (
            <button className="choice" key={c} onClick={() => {setQuizAnswer(c); if(c===quiz.answer) reward("quiz",25,15,40)}}>
              {c}
            </button>
          ))}
        </div>
        {quizAnswer && <div className="reward-box">{quizAnswer===quiz.answer ? "✅ Correct! +25 XP" : "Not quite — the answer is All of the above."}</div>}
      </div>
    );

    return (
      <div className="pixel-panel">
        <h2>DAILY POLL</h2>
        <p className="copy bold">{poll.q}</p>
        <div className="choice-grid">
          {poll.choices.map(c => (
            <button className="choice" key={c} onClick={() => {setPollAnswer(c); reward("poll",10,5,20)}}>
              {c}
            </button>
          ))}
        </div>
        {pollAnswer && <div className="reward-box">You voted: <b>{pollAnswer}</b></div>}
      </div>
    );
  }

  return (
    <div className="app-shell">
      <div className="game-frame">
        <header className="top-bar">
          <div className="profile-area">
            <div className="avatar-thumb">🐶</div>
            <div>
              <div className="title">MOOSE ✎</div>
              <div className="level-row">
                <span className="level-star">{level}</span>
                <div className="xp-track"><div style={{width:`${Math.min(100,(progress/700)*100)}%`}} /></div>
                <span className="xp-text">{xp} / 700 XP</span>
              </div>
            </div>
          </div>
          <div className="currency-area">
            <div className="currency">🪙 {coins}<div>COINS</div></div>
            <div className="currency">🐾 {points}<div>POINTS</div></div>
            <div className="settings">⚙️</div>
          </div>
        </header>

        <PixelRoom outfit={outfit} />

        <section className="action-row">
          {tabs.map(t => <ActionCard key={t.id} tab={t} active={activeTab===t.id} onClick={() => setActiveTab(t.id)} />)}
        </section>

        <section className="content-area"><Content /></section>

        <nav className="bottom-nav">
          {bottomTabs.map((b, i) => (
            <button key={b} onClick={() => i===0 && setOutfit(outfit === "None" ? "Teal Harness" : "None")}>
              {i===0?"👕":i===1?"🛋️":i===2?"🏀":i===3?"🏆":"👥"} {b}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
