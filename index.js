function projects(){
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

let count = parseInt(localStorage.getItem("likeCount")) || 0;

function like(){
  const toggleBtn = document.getElementById("likeToggle");
  const like = document.getElementById("heart-like");
  const unlike = document.getElementById("heart-unlike");
  const likeCounter = document.getElementById("likeCounter");

  likeCounter.innerHTML = count;

  toggleBtn.addEventListener("click", () => {
    const isLiked = like.style.display === "inline";

    if (isLiked) {
      like.style.display = "none";
      unlike.style.display = "inline";
      count--;
    } else {
      like.style.display = "inline";
      unlike.style.display = "none";
      count++;
      const heartSVG = like.querySelector("svg");
      heartSVG.classList.remove("pop");
      void heartSVG.offsetWidth;
      heartSVG.classList.add("pop");
    }

    likeCounter.innerHTML = count;
    localStorage.setItem("likeCount", count); // store updated count
  });
}

like();

projects();