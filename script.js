/* ==========================================================================
   TypeMaster Logic - High Performance, Accurate and Beginner Friendly
   ========================================================================== */

// Curated pool of paragraphs by difficulty levels
const paragraphPool = {
  easy: [
    "The quick brown fox jumps over the lazy dog in a sunny field.",
    "A journey of a thousand miles begins with a single small step.",
    "Web design is not just what it looks like, it is how it works.",
    "Coding is the language of the future, and everyone can learn it.",
    "Success is not final, failure is not fatal, courage is what counts."
  ],
  medium: [
    "To be or not to be, that is the question: whether it is nobler in the mind to suffer the slings and arrows of outrageous fortune.",
    "Modern web applications require a blend of structural semantic HTML, modular styling, and robust client-side interactivity.",
    "The binary number system uses only two digits: zero and one. Computers use this system to store and process complex datasets.",
    "Consistency is the key to mastering any creative skill. Just fifteen minutes of deliberate practice daily leads to incredible results.",
    "Artificial intelligence is rapidly transforming industries, but human empathy and creativity remain completely irreplaceable."
  ],
  hard: [
    "In JavaScript, standard array methods like map(), filter(), and reduce() are functional paradigms that avoid state mutation.",
    "The asynchronous execution loop (Event Loop) handles microtasks like Promise.then() prior to macrotasks like setTimeout(cb, 0).",
    "Cascading Style Sheets (CSS) use variables, CSS-Grid layouts, and flexbox containers to achieve highly modular visual components.",
    "Error tracking: syntax errors, runtime exceptions, and logic anomalies must be handled gracefully using structured try-catch blocks.",
    "SQL databases use structured schema layouts with primary and foreign key constraints to enforce strict relational data integrity."
  ]
};

// Comprehensive Preset Database for Client-Side AI Generator
const aiPresetPool = {
  coding: "Coding is the systematic process of designing and building an executable computer program. Modern developers use high-performance programming languages like JavaScript to formulate precise algorithms, manipulate dynamic data structures, and orchestrate complex computational logic to build interactive web apps.",
  space: "The boundless expanse of outer space contains billions of astronomical galaxies, each holding trillions of stars. Exploring dark matter, black holes, gravitational lensing, and cosmic microwave background radiation pushes the structural boundaries of human scientific knowledge.",
  nature: "Eco systems thrive on highly complex interactions between photosynthetic vegetation and diverse biological fauna. Protecting geological water basins, dense forest canopies, and fragile oceanic habitats ensures structural life preservation and maintains the delicate planetary climate balance.",
  cooking: "Culinary arts combine organic food preservation, molecular heat transfer, and sensory flavor alignment. Master chefs blend raw agricultural herbs, refined aromatic spices, and cured proteins to produce exceptionally balanced gastronomic dishes that delight the human palate.",
  sports: "Athletic training develops cardiorespiratory stamina, muscular agility, and strategic mental focus. Consistent physical exercise stimulates neurochemical endorphins, building core structural skeletal endurance, reducing injury risks, and accelerating motor reflex response speeds.",
  history: "Human history is an interconnected tapestry of cultural migrations, socio-political revolutions, and monumental scientific breakthroughs. Studying ancient architectural relics, structural monuments, and bygone written scripts helps reconstruct historical human struggles.",
  gaming: "Modern video game design integrates advanced physics simulations, interactive graphic engines, and structural narrative branches. Players navigate virtual environments, utilizing split-second cognitive reflex actions, strategic map positioning, and real-time team coordination."
};

// Fallback topic templates to generate grammatically correct custom paragraphs for any word!
const aiTemplates = [
  "Exploring the profound depths of {topic} provides valuable insights into modern scientific applications, historical evolution, and real-world utility. When individuals dedicate study to {topic}, they discover complex structures that challenge traditional cognitive methodologies and foster advanced critical thinking skills.",
  "The fascinating subject of {topic} forms an essential branch of modern global study. By examining the structural components and functional patterns associated with {topic}, professionals are able to formulate innovative solutions that drive technological expansion and enhance operational efficiency.",
  "Mastering the intricate dynamics of {topic} is key to achieving success in this complex field. Practicing high-speed keyboard typing while focusing on {topic} connects physical keystroke reflexes with creative cognitive processing, thereby optimizing neurological pathways and boosting muscle memory."
];

// State Variables (The App's Memory)
let maxTime = 30; // Chosen duration of the test
let timeLeft = maxTime; // Countdown value
let timer = null; // Stores the interval ID
let isTyping = false; // Flag to check if typing has started
let selectedDifficulty = 'easy'; // Current difficulty selected
let isInitializing = true; // Block typing during splash screen (3 seconds)
let activeParagraphText = ""; // Holds current paragraph text loaded

// DOM Element references (Connecting HTML elements to JavaScript)
const textDisplay = document.getElementById('text-display');
const hiddenInput = document.getElementById('hidden-input');
const typingContainer = document.getElementById('typing-container');
const focusOverlay = document.getElementById('focus-overlay');
const btnRestart = document.getElementById('restart-btn');

// Stats DOM Elements
const statTime = document.getElementById('stat-time');
const statWpm = document.getElementById('stat-wpm');
const statAccuracy = document.getElementById('stat-accuracy');
const statErrors = document.getElementById('stat-errors');
const cardTime = document.getElementById('card-time');

// Difficulty and Time selection tabs
const difficultyTabs = document.querySelectorAll('#difficulty-tabs .tab-btn');
const timeTabs = document.querySelectorAll('#time-tabs .tab-btn');

// Navbar Elements
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const loaderOverlay = document.getElementById('loader-overlay');

// AI Generator Elements
const aiTopicInput = document.getElementById('ai-topic-input');
const aiGenerateBtn = document.getElementById('ai-generate-btn');

/**
 * 1. Initialize and Load a New Paragraph
 */
function loadParagraph(textOverride = "") {
  let paragraphText = textOverride;

  if (!paragraphText) {
    // Select a random paragraph from the active difficulty list
    const list = paragraphPool[selectedDifficulty];
    const randomIndex = Math.floor(Math.random() * list.length);
    paragraphText = list[randomIndex];
  }

  activeParagraphText = paragraphText;

  // Clear current HTML contents in the display box
  textDisplay.innerHTML = "";

  // Split paragraph into characters and wrap each in a span for individual styling
  paragraphText.split("").forEach(char => {
    const span = document.createElement('span');
    span.classList.add('char');
    span.innerText = char;
    textDisplay.appendChild(span);
  });

  // Make the very first character 'active' (show the cursor)
  const firstChar = textDisplay.querySelector('.char');
  if (firstChar) {
    firstChar.classList.add('active');
  }

  // Reset the hidden input text input field
  hiddenInput.value = "";
}

/**
 * 2. Client-Side AI Paragraph Compilation Logic
 */
function compileDynamicParagraph(topic) {
  // Normalize topic input
  const cleanTopic = topic.trim().substring(0, 50);
  const lowerTopic = cleanTopic.toLowerCase();

  // Keyword check to map to advanced presets
  if (lowerTopic.includes("code") || lowerTopic.includes("javascript") || lowerTopic.includes("program") || lowerTopic.includes("web") || lowerTopic.includes("tech") || lowerTopic.includes("develop")) {
    return aiPresetPool.coding;
  }
  if (lowerTopic.includes("space") || lowerTopic.includes("star") || lowerTopic.includes("universe") || lowerTopic.includes("galaxy") || lowerTopic.includes("astro") || lowerTopic.includes("black hole")) {
    return aiPresetPool.space;
  }
  if (lowerTopic.includes("nature") || lowerTopic.includes("earth") || lowerTopic.includes("forest") || lowerTopic.includes("plant") || lowerTopic.includes("animal") || lowerTopic.includes("environ")) {
    return aiPresetPool.nature;
  }
  if (lowerTopic.includes("cook") || lowerTopic.includes("food") || lowerTopic.includes("chef") || lowerTopic.includes("eat") || lowerTopic.includes("recipe")) {
    return aiPresetPool.cooking;
  }
  if (lowerTopic.includes("sport") || lowerTopic.includes("fit") || lowerTopic.includes("run") || lowerTopic.includes("exercise") || lowerTopic.includes("gym") || lowerTopic.includes("train")) {
    return aiPresetPool.sports;
  }
  if (lowerTopic.includes("history") || lowerTopic.includes("ancient") || lowerTopic.includes("war") || lowerTopic.includes("past") || lowerTopic.includes("relic")) {
    return aiPresetPool.history;
  }
  if (lowerTopic.includes("game") || lowerTopic.includes("play") || lowerTopic.includes("xbox") || lowerTopic.includes("console") || lowerTopic.includes("nintendo") || lowerTopic.includes("playstation")) {
    return aiPresetPool.gaming;
  }

  // Formatting custom topic fallback template
  const capitalizedTopic = cleanTopic.charAt(0).toUpperCase() + cleanTopic.slice(1);
  const randomIndex = Math.floor(Math.random() * aiTemplates.length);
  const template = aiTemplates[randomIndex];
  
  return template.replace(/{topic}/g, capitalizedTopic);
}

/**
 * 3. AI Paragraph Generation Trigger
 */
function handleAIGeneration() {
  if (isInitializing) return;

  let topicValue = aiTopicInput.value.trim();

  // If input empty, select a random preset category
  if (!topicValue) {
    const categories = Object.keys(aiPresetPool);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    topicValue = randomCategory;
    aiTopicInput.value = randomCategory.charAt(0).toUpperCase() + randomCategory.slice(1);
  }

  // Block inputs and apply compiling overlay
  isInitializing = true;
  clearInterval(timer);
  typingContainer.classList.add('compiling-effect');
  aiGenerateBtn.disabled = true;
  aiTopicInput.disabled = true;
  aiGenerateBtn.querySelector('span:not(.btn-sparkle)').innerText = "Compiling AI...";

  // 1200ms simulated processing delay
  setTimeout(() => {
    const textCompiled = compileDynamicParagraph(topicValue);

    // Remove compiling classes
    typingContainer.classList.remove('compiling-effect');
    aiGenerateBtn.disabled = false;
    aiTopicInput.disabled = false;
    aiGenerateBtn.querySelector('span:not(.btn-sparkle)').innerText = "Generate Paragraph";

    isInitializing = false;
    isTyping = false;
    timeLeft = maxTime;
    hiddenInput.disabled = false;

    // Reset stats HUD
    statTime.innerText = timeLeft;
    statWpm.innerText = 0;
    statAccuracy.innerText = "100%";
    statErrors.innerText = 0;
    cardTime.classList.remove('time-warning');
    typingContainer.style.borderColor = 'var(--panel-border)';

    // Load AI Text and focus
    loadParagraph(textCompiled);
    focusInput();
  }, 1200);
}

/**
 * 4. Typing Event Handler (Main Game Loop)
 */
function handleTyping() {
  if (isInitializing) {
    hiddenInput.value = "";
    return;
  }

  const characters = textDisplay.querySelectorAll('.char');
  const typedValue = hiddenInput.value;
  const typedChars = typedValue.split('');
  
  // Start the countdown timer on the very first keystroke
  if (!isTyping && typedChars.length > 0) {
    startTimer();
    isTyping = true;
  }

  let errorCount = 0;
  let correctCount = 0;

  // Loop through all paragraph letters and apply correct/incorrect/active classes
  for (let i = 0; i < characters.length; i++) {
    const charSpan = characters[i];
    const typedChar = typedChars[i];

    // Case A: Letter has NOT been typed yet
    if (typedChar === undefined) {
      charSpan.className = 'char'; // Reset all styling classes
      
      // The current character to type gets the flashing cursor
      if (i === typedChars.length) {
        charSpan.classList.add('active');
      }
    } 
    // Case B: Letter WAS typed
    else {
      charSpan.classList.remove('active');
      
      // Compare typed letter with paragraph letter
      if (typedChar === charSpan.innerText) {
        charSpan.className = 'char correct';
        correctCount++;
      } else {
        charSpan.className = 'char incorrect';
        errorCount++;
      }
    }
  }

  // Update real-time metrics
  statErrors.innerText = errorCount;

  // Accuracy calculation: percentage of correct characters relative to total characters typed
  const totalTyped = typedChars.length;
  if (totalTyped > 0) {
    const accuracyVal = Math.round((correctCount / totalTyped) * 100);
    statAccuracy.innerText = `${accuracyVal}%`;
  } else {
    statAccuracy.innerText = "100%";
  }

  // Real-time WPM calculation: (correct letters / 5) / (minutes elapsed)
  const timeElapsed = maxTime - timeLeft;
  if (timeElapsed > 0) {
    const wpmVal = Math.round((correctCount / 5) / (timeElapsed / 60));
    statWpm.innerText = wpmVal > 0 ? wpmVal : 0;
  } else {
    statWpm.innerText = 0;
  }

  // Check if user has successfully typed the entire paragraph
  if (typedChars.length >= characters.length) {
    endTest();
  }
}

/**
 * 5. Countdown Timer Function
 */
function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      statTime.innerText = timeLeft;

      // Add a dynamic low-time warning when less than 5 seconds remain
      if (timeLeft <= 5) {
        cardTime.classList.add('time-warning');
      }

      // Live WPM update even if user isn't actively typing
      const correctCount = textDisplay.querySelectorAll('.char.correct').length;
      const timeElapsed = maxTime - timeLeft;
      if (timeElapsed > 0) {
        const wpmVal = Math.round((correctCount / 5) / (timeElapsed / 60));
        statWpm.innerText = wpmVal > 0 ? wpmVal : 0;
      }
    } else {
      endTest(); // Time is up!
    }
  }, 1000);
}

/**
 * 6. Finish the Typing Speed Test
 */
function endTest() {
  clearInterval(timer);
  hiddenInput.disabled = true; // Block typing
  cardTime.classList.remove('time-warning');
  
  // Trigger a subtle pulse animation on completion
  typingContainer.style.borderColor = 'var(--color-correct)';
  setTimeout(() => {
    typingContainer.style.borderColor = 'var(--panel-border)';
  }, 1000);
}

/**
 * 7. Reset Game to Initial Settings
 */
function resetGame() {
  if (isInitializing) return;

  clearInterval(timer);
  isTyping = false;
  timeLeft = maxTime;
  hiddenInput.disabled = false;
  
  // Reset Stats Elements to default values
  statTime.innerText = timeLeft;
  statWpm.innerText = 0;
  statAccuracy.innerText = "100%";
  statErrors.innerText = 0;
  
  // Reset warning flags and container outlines
  cardTime.classList.remove('time-warning');
  typingContainer.style.borderColor = 'var(--panel-border)';
  
  // Fetch fresh paragraph text (preserve AI if currently loaded, or pull difficulty preset)
  // If active text is custom (not in pools), re-generate a new one from active difficulty preset
  const allEasyPool = paragraphPool.easy;
  const allMediumPool = paragraphPool.medium;
  const allHardPool = paragraphPool.hard;
  const isDifficultyPreset = allEasyPool.includes(activeParagraphText) || allMediumPool.includes(activeParagraphText) || allHardPool.includes(activeParagraphText);
  
  if (isDifficultyPreset) {
    loadParagraph();
  } else {
    // If it's custom AI paragraph, let's keep it loaded so they can retry it!
    loadParagraph(activeParagraphText);
  }
  
  focusInput();
}

/**
 * 8. Interactive Cursor and Box Focus Controllers
 */
function focusInput() {
  if (isInitializing) return;
  hiddenInput.focus();
  typingContainer.classList.remove('blurred');
}

function blurInput() {
  typingContainer.classList.add('blurred');
}

/**
 * 9. Navbar Navigation & Active Section Highlighting
 */
function initNavigation() {
  // Mobile hamburger menu toggle
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });
  }

  // Close mobile hamburger menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (menuToggle && navMenu) {
        menuToggle.classList.remove('open');
        navMenu.classList.remove('open');
      }
    });
  });

  // Modern active link state tracking using IntersectionObserver
  const sections = document.querySelectorAll('.content-section');
  
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px', // Trigger when section enters upper-middle screen viewport
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });
}

/**
 * 10. Attach all DOM event listeners
 */
function initEventListeners() {
  // Focus the input box when the main interactive typing container is clicked
  typingContainer.addEventListener('click', focusInput);
  
  // Track focus and blur states to toggle helpful overlays
  hiddenInput.addEventListener('focus', focusInput);
  hiddenInput.addEventListener('blur', blurInput);
  
  // Process typed characters in real-time
  hiddenInput.addEventListener('input', handleTyping);
  
  // Restart button listener
  btnRestart.addEventListener('click', resetGame);

  // AI Paragraph Generator binds
  if (aiGenerateBtn) {
    aiGenerateBtn.addEventListener('click', handleAIGeneration);
  }
  if (aiTopicInput) {
    aiTopicInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleAIGeneration();
      }
    });
  }

  // Difficulty selection tab clicks
  difficultyTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      if (isInitializing) return;
      // Toggle CSS active state class
      difficultyTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Update state and restart test
      selectedDifficulty = tab.getAttribute('data-difficulty');
      
      // Reset AI input box to indicate presets are active
      if (aiTopicInput) aiTopicInput.value = "";
      
      resetGame();
    });
  });

  // Time limit tab clicks
  timeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      if (isInitializing) return;
      // Toggle CSS active state class
      timeTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Update state and restart test
      maxTime = parseInt(tab.getAttribute('data-time'), 10);
      resetGame();
    });
  });

  // Keyboard global listener: press 'Escape' to restart rapidly!
  window.addEventListener('keydown', (e) => {
    if (isInitializing) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      resetGame();
    } else {
      // Focus typing box instantly if any regular key is pressed and container blurred
      // Ignore if currently typing inside the AI topic input box!
      if (document.activeElement === aiTopicInput) return;
      
      if (document.activeElement !== hiddenInput && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        focusInput();
      }
    }
  });
}

/**
 * 11. Splash Screen Timer Lifecycle (Exact 3.0 Seconds)
 */
function handleSplashScreen() {
  setTimeout(() => {
    // Add fade-out transition
    if (loaderOverlay) {
      loaderOverlay.classList.add('fade-out');
    }
    
    // Clear initialization state
    isInitializing = false;
    
    // Initial focus into game window
    focusInput();
  }, 3000);
}

// Self-starting entrypoint when page loads
window.addEventListener('DOMContentLoaded', () => {
  initEventListeners();
  initNavigation();
  loadParagraph();
  
  // Start Splash Screen countdown
  handleSplashScreen();
});
