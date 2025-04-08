const faq = () => {
  document.getElementById("faq-section").scrollIntoView({ behavior: "smooth" });
};

const learn = () => {
  const vocabularySection = document.querySelector("section");
  vocabularySection.scrollIntoView({ behavior: "smooth" });
};

const logout = () => {
  location.reload();
};

document.addEventListener("DOMContentLoaded", function () {
    const sections = [...document.querySelectorAll('section')]
      .filter(section => section.id !== 'banner');
    const loginButton = document.getElementById("login-btn");
    const banner = document.getElementById("banner");
  
    sections.forEach((section) => {
      section.classList.add("hidden");
    });
  
    loginButton.addEventListener("click", function () {
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
      if (username && password) {
        banner.classList.add("hidden");
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
    const neutralMessage = document.getElementById('neutral');

    neutralMessage.classList.add('hidden');

    wordsContainer.innerHTML = '';

    if (!words || words.length === 0) {
      
        wordsContainer.innerHTML = `
        <div class=" col-span-full flex flex-col items-center text-center my-20">
            <img class="w-24" src="assets/alert-error.png" alt="">
            <p class="text-[#79716B] my-4">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="text-4xl font-medium">নেক্সট Lesson এ যান</h2>
        </div>
        `;
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

loadLevels();