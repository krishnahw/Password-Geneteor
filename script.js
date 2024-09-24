// Password elements
const passwordDisplay = document.querySelector('[data-passwordDisplay]');
const copyButton = document.querySelector('[data-copy]');
const copyMsg = document.querySelector('[data-copyMsg]');
const lengthSlider = document.querySelector('[data-lengthSlider]');
const lengthNumber = document.querySelector('[data-lengthNumber]');
const strengthIndicator = document.querySelector('[data-indicator]');
const generateButton = document.querySelector('.generateButton');

// Checkbox elements
const uppercaseCheck = document.querySelector('#uppercase');
const lowercaseCheck = document.querySelector('#lowercase');
const numbersCheck = document.querySelector('#numbers');
const symbolsCheck = document.querySelector('#symbols');

// Character sets
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+{}[]<>";

function generatePassword() {
   let password = "";
   let charSet = "";
   const length = lengthSlider.value;
   
   // Add checked character sets
   if (uppercaseCheck.checked) charSet += uppercaseLetters;
   if (lowercaseCheck.checked) charSet += lowercaseLetters;
   if (numbersCheck.checked) charSet += numbers;
   if (symbolsCheck.checked) charSet += symbols;
   
   // Generate password from selected character set
   for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      password += charSet[randomIndex];
   }
   
   // Update display
   passwordDisplay.value = password;
   updateStrengthIndicator(password);
}

// Function to update password length number
lengthSlider.addEventListener('input', () => {
   lengthNumber.textContent = lengthSlider.value;
});

// Function to copy password to clipboard
copyButton.addEventListener('click', () => {
   navigator.clipboard.writeText(passwordDisplay.value).then(() => {
      copyMsg.textContent = "Copied!";
      copyMsg.classList.add("active");
      setTimeout(() => {
         copyMsg.classList.remove("active");
         copyMsg.textContent = "";
      }, 2000);
   });
});

// Function to update strength indicator
function updateStrengthIndicator(password) {
   const hasUpper = /[A-Z]/.test(password);
   const hasLower = /[a-z]/.test(password);
   const hasNumbers = /\d/.test(password);
   const hasSymbols = /[!@#$%^&*()_+{}[\]<>]/.test(password);

   // Simple strength logic (you can improve this)
   let strength = 0;
   if (hasUpper) strength++;
   if (hasLower) strength++;
   if (hasNumbers) strength++;
   if (hasSymbols) strength++;
   if (password.length >= 12) strength++;

   const strengthLevels = ['Too Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
   const colors = ['#ff4d4d', '#ffcc00', '#80ff80', '#00cc44', '#006400'];
   
   // Update indicator color based on strength
   strengthIndicator.style.backgroundColor = ['#ff4d4d', '#ffcc00', '#80ff80', '#00cc44'][strength - 1] || '#ff4d4d';
}

// Generate password on button click
generateButton.addEventListener('click', generatePassword);
