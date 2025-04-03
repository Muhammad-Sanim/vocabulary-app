const faq = () => {
  document.getElementById("faq-section").scrollIntoView({ behavior: "smooth" });
};


const learn = () => {
  const vocabularySection = document.querySelector("section:nth-of-type(1)"); // The vocabulary section
  vocabularySection.scrollIntoView({ behavior: "smooth" });
};

const logout = () => {
  // Handle logout functionality - for now just reload the page
  location.reload();
};

document.addEventListener("DOMContentLoaded", function () {
    // Select all sections except the banner
    const sections = document.querySelectorAll("section:not(#banner)");
    const loginButton = document.getElementById("login-btn");
    const banner = document.getElementById("banner");
  
    // Hide all sections initially
    sections.forEach((section) => {
      section.classList.add("hidden");
    });
  
    // Add event listener for login button
    loginButton.addEventListener("click", function () {
      // Simulating a login process (you can replace this with real authentication)
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
      if (username && password) {
        // Hide the banner section
        banner.classList.add("hidden");
  
        // Show other sections
        sections.forEach((section) => {
          section.classList.remove("hidden");
        });
      } else {
        alert("Please enter both username and password!");
      }
    });
  });
  

const loadLevels = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/levels/all');
    const data = await response.json();
    showLevels(data.data);
}

document.getElementById('neutral').classList.remove('hidden');

const showLevels = (levels) => {
    levels.forEach((level) => {
        const levelContainer = document.getElementById('level-container');
        const levelDiv = document.createElement("div");
        levelDiv.innerHTML = `
        <button onclick="loadWords(${level.level_no})" class="btn border-[#422AD5] border-2 text-[#422AD5] font-semibold hover:bg-sky-500 hover:text-white"><img src="assets/fa-book-open.png"/>Lesson -${level.level_no}</button>
        `
        levelContainer.appendChild(levelDiv);
    })
}

const loadWords = async (levelName) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/level/${levelName}`);
    const data = await response.json();
    showWords(data.data);
}

const showWords = (words) => {
    const wordsContainer = document.getElementById('words-container');
    const noWords = document.getElementById('no-words');
    const neutralMessage = document.getElementById('neutral');

    wordsContainer.innerHTML = '';

    neutralMessage.classList.add('hidden');

    if (words.length == 0) {
      
        wordsContainer.innerHTML = `
        <div id="no-words" class="hidden col-span-full flex flex-col items-center text-center my-20">
            <img class="w-24" src="assets/alert-error.png" alt="">
            <p class="text-[#79716B] my-4">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="text-4xl font-medium">নেক্সট Lesson এ যান</h2>
        </div>
        `;
        noWords.classList.remove('hidden');
    } else {
      words.forEach((word) => {
          const div = document.createElement("div");
          div.innerHTML = `
          <div class="card w-96 h-64 bg-base-100 card-xl shadow-sm">
            <div class="card-body items-center text-center">
              <h2 class="card-title text-2xl font-bold">${word.word}</h2>
              <p class="font-medium">Meaning / Pronounciation</p>
              <p class="text-2xl font-semibold opacity-80">${word.meaning}/${word.pronunciation}</p>
            </div>
          </div>
          `;
          wordsContainer.appendChild(div);
      });
  }
};  

loadWords();

loadLevels();