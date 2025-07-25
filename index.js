
import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getAnalytics
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCsksBl1tW5ZKfFK3X86ykalXDlXmjc8eM",
  authDomain: "like-counter-ee82a.firebaseapp.com",
  projectId: "like-counter-ee82a",
  storageBucket: "like-counter-ee82a.appspot.com",
  messagingSenderId: "635208917401",
  appId: "1:635208917401:web:ce53ebbf46cf088ba3f308",
  measurementId: "G-1Y41L9PFK3"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Load GitHub Projects
function projects() {
  const username = "Rohitsakhalkar";

  fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(repos => {
      const projectContainer = document.getElementById("github-projects");
      repos
        .filter(repo => !repo.fork)
        .slice(0, 6)
        .forEach(repo => {
          const projectCard = document.createElement("div");
          projectCard.className = "project-card";
          projectCard.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || "No description available"}</p>
            <a href="${repo.html_url}" target="_blank">View on GitHub</a>
          `;
          projectContainer.appendChild(projectCard);
        });
    })
    .catch(error => {
      console.error("Error fetching GitHub repos:", error);
    });
}

// Firebase-based Like System
async function like() {
  const toggleBtn = document.getElementById("likeToggle");
  const like = document.getElementById("heart-like");
  const unlike = document.getElementById("heart-unlike");
  const likeCounter = document.getElementById("likeCounter");

  const likeDocRef = doc(db, "likes", "likeCount");

  async function loadLikeCount() {
    const docSnap = await getDoc(likeDocRef);
    if (docSnap.exists()) {
      likeCounter.innerHTML = docSnap.data().count;
    } else {
      await setDoc(likeDocRef, { count: 0 });
      likeCounter.innerHTML = 0;
    }
  }

  toggleBtn.addEventListener("click", async () => {
    const docSnap = await getDoc(likeDocRef);
    let currentCount = docSnap.data().count;

    const isLiked = like.style.display === "inline";

    if (isLiked) {
      like.style.display = "none";
      unlike.style.display = "inline";
      currentCount--;
    } else {
      like.style.display = "inline";
      unlike.style.display = "none";
      currentCount++;
      const heartSVG = like.querySelector("svg");
      heartSVG.classList.remove("pop");
      void heartSVG.offsetWidth;
      heartSVG.classList.add("pop");
    }

    likeCounter.innerHTML = currentCount;
    await updateDoc(likeDocRef, { count: currentCount });
  });

  await loadLikeCount();
}

// Call functions on page load
projects();
like();
