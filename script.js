/* ===================================
   OUR ARCHIVE — YAEB & ZAHEED
=================================== */

// GANTI PIN DI SINI JIKA MAU
const CORRECT_PIN = "1111";

// DATA POST INSTAGRAM
const posts = [
  {
    image: "foto1.jpg",
    caption: "happy mensiversary to my dearest boy, Yaeb. ♡"
  },
  {
    image: "foto2.jpg",
    caption: "a lovely soul in the shape of my favorite person."
  },
  {
    image: "foto3.jpg",
    caption: "there's something so special about the way you exist."
  },
  {
    image: "foto4.jpg",
    caption: "my favorite little universe, in all its wonder."
  },
  {
    image: "foto5.jpg",
    caption: "may you always find a thousand reasons to smile."
  },
  {
    image: "foto6.jpg",
    caption: "you deserve all the gentleness this world has to offer."
  },
  {
    image: "foto7.jpg",
    caption: "forever fond of the person that you are."
  }
];

// LOGIN
const loginScreen = document.getElementById("loginScreen");
const website = document.getElementById("website");
const pinInput = document.getElementById("pinInput");
const unlockBtn = document.getElementById("unlockBtn");
const pinError = document.getElementById("pinError");

function unlockWebsite() {
  if (pinInput.value === CORRECT_PIN) {
    loginScreen.classList.add("hidden");
    website.classList.remove("hidden");

    document.getElementById("musicButton").classList.remove("hidden");

    updateCounter();
    setInterval(updateCounter, 1000);
  } else {
    pinError.textContent = "Hmm, that isn't the right PIN. Try again ♡";
    pinInput.value = "";
    pinInput.focus();
  }
}

unlockBtn.addEventListener("click", unlockWebsite);

pinInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") unlockWebsite();
});

// RENDER POSTS
const postsGrid = document.getElementById("postsGrid");

posts.forEach((post, index) => {
  const card = document.createElement("div");
  card.className = "post-card";

  const img = document.createElement("img");
  img.src = post.image;
  img.alt = "Memory " + (index + 1);
  img.loading = "lazy";

  const overlay = document.createElement("div");
  overlay.className = "post-overlay";
  overlay.textContent = "♡";

  card.appendChild(img);
  card.appendChild(overlay);

  card.addEventListener("click", () => openPost(index));

  postsGrid.appendChild(card);
});

// POST MODAL
function openPost(index) {
  const post = posts[index];

  document.getElementById("modalImage").src = post.image;
  document.getElementById("modalCaption").textContent = post.caption;

  document.getElementById("postModal").classList.remove("hidden");
}

function closePost() {
  document.getElementById("postModal").classList.add("hidden");
}

function scrollToPosts() {
  document.getElementById("postsSection").scrollIntoView({
    behavior: "smooth"
  });
}

function openDM() {
  document.getElementById("dmSection").scrollIntoView({
    behavior: "smooth"
  });
}

// RELATIONSHIP COUNTER
const relationshipStart = new Date(2026, 7, 8, 0, 0, 0);

function updateCounter() {
  const now = new Date();

  let difference = now - relationshipStart;

  if (difference < 0) difference = 0;

  const secondsTotal = Math.floor(difference / 1000);
  const days = Math.floor(secondsTotal / 86400);
  const hours = Math.floor((secondsTotal % 86400) / 3600);
  const minutes = Math.floor((secondsTotal % 3600) / 60);
  const seconds = secondsTotal % 60;

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

// MUSIC PLAYER
const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");

let isPlaying = false;

musicButton.addEventListener("click", async () => {
  if (isPlaying) {
    music.pause();
    musicButton.classList.remove("playing");
    isPlaying = false;
    return;
  }

  try {
    await music.play();
    musicButton.classList.add("playing");
    isPlaying = true;
  } catch (error) {
    alert("Musiknya belum bisa diputar. Pastikan file kissing-in-cars.mp3 sudah ada di folder website.");
  }
});

music.addEventListener("pause", () => {
  isPlaying = false;
  musicButton.classList.remove("playing");
});

music.addEventListener("play", () => {
  isPlaying = true;
  musicButton.classList.add("playing");
});

// QUIZ
const quizQuestions = [
  {
    question: "When did our little story begin?",
    options: [
      "08 August 2026",
      "14 February 2026",
      "01 January 2026",
      "25 December 2025"
    ],
    answer: 0
  },
  {
    question: "Who is the favorite boy in this little archive?",
    options: [
      "Zaheed",
      "Yaeb",
      "Both of us",
      "A stranger"
    ],
    answer: 1
  },
  {
    question: "Who made this little website?",
    options: [
      "Yaeb",
      "Someone random",
      "Zaheed",
      "The internet"
    ],
    answer: 2
  },
  {
    question: "What do I hope for us?",
    options: [
      "More beautiful memories",
      "More reasons to smile",
      "More chapters together",
      "All of the above"
    ],
    answer: 3
  }
];

let currentQuestion = 0;
let quizScore = 0;
let answered = false;

const quizNumber = document.getElementById("quizNumber");
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizFeedback = document.getElementById("quizFeedback");
const nextQuizBtn = document.getElementById("nextQuizBtn");
const quizResult = document.getElementById("quizResult");

function renderQuestion() {
  const q = quizQuestions[currentQuestion];

  answered = false;

  quizNumber.textContent =
    `QUESTION ${String(currentQuestion + 1).padStart(2, "0")} / 04`;

  quizQuestion.textContent = q.question;
  quizOptions.innerHTML = "";
  quizFeedback.textContent = "";
  nextQuizBtn.classList.add("hidden");

  q.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.className = "quiz-option";
    button.textContent = option;

    button.addEventListener("click", () => selectAnswer(index));

    quizOptions.appendChild(button);
  });
}

function selectAnswer(selected) {
  if (answered) return;

  answered = true;

  const q = quizQuestions[currentQuestion];
  const buttons = quizOptions.querySelectorAll("button");

  buttons.forEach((button, index) => {
    button.disabled = true;

    if (index === q.answer) {
      button.classList.add("correct");
    }

    if (index === selected && selected !== q.answer) {
      button.classList.add("wrong");
    }
  });

  if (selected === q.answer) {
    quizScore++;
    quizFeedback.textContent = "That's right! You know us well. ♡";
  } else {
    quizFeedback.textContent = "Not quite, but you're still my favorite. ♡";
  }

  nextQuizBtn.classList.remove("hidden");

  if (currentQuestion === quizQuestions.length - 1) {
    nextQuizBtn.textContent = "See your result ♡";
  }
}

nextQuizBtn.addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion < quizQuestions.length) {
    renderQuestion();
  } else {
    quizOptions.classList.add("hidden");
    quizQuestion.classList.add("hidden");
    quizNumber.classList.add("hidden");
    quizFeedback.classList.add("hidden");
    nextQuizBtn.classList.add("hidden");

    quizResult.classList.remove("hidden");

    quizResult.innerHTML = `
      <h3>You've completed our little quiz! ♡</h3>
      <p>You got ${quizScore} out of 4 questions right.</p>
      <p>But no matter the score, you're still my favorite person.</p>
      <button class="primary-btn" onclick="restartQuiz()">Play again ↻</button>
    `;
  }
});

function restartQuiz() {
  currentQuestion = 0;
  quizScore = 0;

  quizOptions.classList.remove("hidden");
  quizQuestion.classList.remove("hidden");
  quizNumber.classList.remove("hidden");
  quizFeedback.classList.remove("hidden");
  quizResult.classList.add("hidden");

  renderQuestion();
}

renderQuestion();

// SECRET SURPRISE
const secretBtn = document.getElementById("secretBtn");
const secretMessage = document.getElementById("secretMessage");

secretBtn.addEventListener("click", () => {
  secretMessage.classList.toggle("hidden");

  secretBtn.textContent = secretMessage.classList.contains("hidden")
    ? "Open your surprise ♡"
    : "Close your surprise ♡";
});

// ESCAPE KEY FOR MODAL
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closePost();
});
