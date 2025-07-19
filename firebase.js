 import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";
 
  const firebaseConfig = {
    apiKey: "AIzaSyCsksBl1tW5ZKfFK3X86ykalXDlXmjc8eM",
    authDomain: "like-counter-ee82a.firebaseapp.com",
    projectId: "like-counter-ee82a",
    storageBucket: "like-counter-ee82a.firebasestorage.app",
    messagingSenderId: "635208917401",
    appId: "1:635208917401:web:ce53ebbf46cf088ba3f308",
    measurementId: "G-1Y41L9PFK3"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);