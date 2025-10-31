// Pantone Colors of the Year (Light Mode)
const pantoneColors = {
  '2025': {
    background: '#a47764', // Mocha Mousse
    foreground: '#f4f4f9'
  },
  '2024': {
    background: '#ffbe98', // Peach Fuzz
    foreground: '#f4f4f9'
  },
  '2023': {
    background: '#bb2649', // Viva Magenta
    foreground: '#f4f4f9'
  },
  '2022': {
    background: '#6667ab', // Very Peri
    foreground: '#f4f4f9'
  },
  '2021': {
    background: '#f5df4d', // Illuminating (yellow bg)
    foreground: '#939597' // Ultimate Gray (text)
  },
  '2020': {
    background: '#0f4c81', // Classic Blue
    foreground: '#f4f4f9'
  },
  '2019': {
    background: '#ff6f61', // Living Coral
    foreground: '#f4f4f9'
  },
  '2018': {
    background: '#5f4b8b', // Ultra Violet
    foreground: '#f4f4f9'
  },
  '2017': {
    background: '#88b04b', // Greenery
    foreground: '#f4f4f9'
  }
};

// Pantone Colors of the Year (Dark Mode - swapped)
const pantoneDarkColors = {
  '2025': {
    background: '#0d0d0e', // Dark bg
    foreground: '#a47764' // Mocha Mousse text
  },
  '2024': {
    background: '#0d0d0e', // Dark bg
    foreground: '#ffbe98' // Peach Fuzz text
  },
  '2023': {
    background: '#0d0d0e', // Dark bg
    foreground: '#bb2649' // Viva Magenta text
  },
  '2022': {
    background: '#0d0d0e', // Dark bg
    foreground: '#6667ab' // Very Peri text
  },
  '2021': {
    background: '#939597', // Ultimate Gray (bg)
    foreground: '#f5df4d' // Illuminating (text) - swapped
  },
  '2020': {
    background: '#0d0d0e', // Dark bg
    foreground: '#0f4c81' // Classic Blue text
  },
  '2019': {
    background: '#0d0d0e', // Dark bg
    foreground: '#ff6f61' // Living Coral text
  },
  '2018': {
    background: '#0d0d0e', // Dark bg
    foreground: '#5f4b8b' // Ultra Violet text
  },
  '2017': {
    background: '#0d0d0e', // Dark bg
    foreground: '#88b04b' // Greenery text
  }
};

// Function to apply color scheme
function applyColorScheme(year) {
  // Determine if dark mode is active
  const isDarkMode = document.body.classList.contains('dark-mode');
  
  // Select appropriate color scheme
  const colors = isDarkMode && pantoneDarkColors[year] 
    ? pantoneDarkColors[year] 
    : pantoneColors[year];
  
  if (!colors) return;

  const root = document.documentElement;
  
  // Apply background color
  document.body.style.backgroundColor = colors.background;
  
  // Apply foreground color to text elements
  root.style.setProperty('--text-color', colors.foreground);
  root.style.setProperty('--border-color', colors.foreground);
  
  // Update all text colors
  const textElements = document.querySelectorAll('.name, .intro-text, .intro-text p, .section h2, .section p, .links, .links a, .footer, .footer p, .pantone-box h2, .pantone-years, .pantone-years p');
  textElements.forEach(el => {
    el.style.color = colors.foreground;
  });
  
  // Update logo fill
  const logoPath = document.querySelectorAll('.logo path');
  logoPath.forEach(path => {
    path.style.fill = colors.foreground;
  });
  
  // Update border color
  const pantoneBox = document.querySelector('.pantone-box');
  if (pantoneBox) {
    pantoneBox.style.borderColor = colors.foreground;
  }
  
  // Store the selected year in localStorage
  localStorage.setItem('selectedPantoneYear', year);
}

// Function to reset to default colors
function resetColors() {
  const root = document.documentElement;
  
  // Reset background based on dark mode state
  document.body.style.backgroundColor = '';
  
  // Remove inline styles to revert to CSS defaults
  const textElements = document.querySelectorAll('.name, .intro-text, .intro-text p, .section h2, .section p, .links, .links a, .footer, .footer p, .pantone-box h2, .pantone-years, .pantone-years p');
  textElements.forEach(el => {
    el.style.color = '';
  });
  
  const logoPath = document.querySelectorAll('.logo path');
  logoPath.forEach(path => {
    path.style.fill = '';
  });
  
  const pantoneBox = document.querySelector('.pantone-box');
  if (pantoneBox) {
    pantoneBox.style.borderColor = '';
  }
  
  localStorage.removeItem('selectedPantoneYear');
  
  // Reapply dark mode styles if dark mode is active
  const savedDarkMode = localStorage.getItem('darkMode');
  if (savedDarkMode === 'true') {
    document.body.classList.add('dark-mode');
  }
}

// Dark mode functionality
function applyDarkMode() {
  document.body.classList.add('dark-mode');
  localStorage.setItem('darkMode', 'true');
  
  // If a pantone year is selected, re-apply with dark mode version
  const savedYear = localStorage.getItem('selectedPantoneYear');
  if (savedYear) {
    applyColorScheme(savedYear);
  }
}

function removeDarkMode() {
  document.body.classList.remove('dark-mode');
  localStorage.setItem('darkMode', 'false');
  
  // If a pantone year is selected, re-apply with light mode version
  const savedYear = localStorage.getItem('selectedPantoneYear');
  if (savedYear) {
    applyColorScheme(savedYear);
  }
}

function toggleDarkMode() {
  if (document.body.classList.contains('dark-mode')) {
    removeDarkMode();
  } else {
    applyDarkMode();
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  const pantoneYears = document.querySelector('.pantone-years');
  const logo = document.querySelector('.logo');
  const darkModeToggle = document.getElementById('darkModeToggle');
  
  // Check and apply saved dark mode preference
  const savedDarkMode = localStorage.getItem('darkMode');
  if (savedDarkMode === 'true') {
    document.body.classList.add('dark-mode');
  }
  
  // Dark mode toggle
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleDarkMode);
  }
  
  if (pantoneYears) {
    // Make each year clickable
    const yearElements = pantoneYears.querySelectorAll('p');
    
    yearElements.forEach(yearEl => {
      const year = yearEl.textContent.trim();
      
      // Add click handler
      yearEl.style.cursor = 'pointer';
      yearEl.addEventListener('click', function() {
        // Remove active class from all years
        yearElements.forEach(el => el.classList.remove('active-year'));
        
        // Add active class to clicked year
        this.classList.add('active-year');
        
        // Apply the color scheme
        applyColorScheme(year);
      });
      
      // Add hover effect
      yearEl.addEventListener('mouseenter', function() {
        if (!this.classList.contains('active-year')) {
          this.style.opacity = '0.6';
        }
      });
      
      yearEl.addEventListener('mouseleave', function() {
        this.style.opacity = '1';
      });
    });
    
    // Check if there's a saved year and apply it
    const savedYear = localStorage.getItem('selectedPantoneYear');
    if (savedYear) {
      const yearEl = Array.from(yearElements).find(el => el.textContent.trim() === savedYear);
      if (yearEl) {
        yearEl.classList.add('active-year');
        applyColorScheme(savedYear);
      }
    }
  }
  
  // Add logo click handler to reset colors
  if (logo) {
    logo.style.cursor = 'pointer';
    logo.addEventListener('click', function() {
      // Remove active class from all years
      const yearElements = document.querySelectorAll('.pantone-years p');
      yearElements.forEach(el => el.classList.remove('active-year'));
      
      // Reset to default colors
      resetColors();
    });
  }
  
  // Optional: Add a reset button functionality (can be triggered elsewhere)
  window.resetPantoneColors = resetColors;
});
