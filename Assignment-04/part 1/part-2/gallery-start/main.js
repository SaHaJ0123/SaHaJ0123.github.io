/*<!--
    Title: PART 2
    Author: Sahaj Dhakal
    Date: august 4,2024
    purpose: Application of Web for amending background 
-->*/
const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const images = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

/* Declaring the alternative text for each image file */
const altText = {
  'pic1.jpg': 'Closeup of a human eye',
  'pic2.jpg': 'Rock that looks like a wave',
  'pic3.jpg': 'Purple and white pansies',
  'pic4.jpg': 'Section of an Egyptian mural',
  'pic5.jpg': 'Brown and white moth on a leaf'
};

/* Looping through images */
images.forEach(image => {
  const newImage = document.createElement('img');
  newImage.setAttribute('src', `images/${image}`);
  newImage.setAttribute('alt', altText[image]);
  thumbBar.appendChild(newImage);

  /* Adding click event listener to each thumbnail image */
  newImage.addEventListener('click', () => {
    displayedImage.setAttribute('src', `images/${image}`);
    displayedImage.setAttribute('alt', altText[image]);
  });
});

/* Wiring up the Darken/Lighten button */
btn.addEventListener('click', () => {
  const currentClass = btn.getAttribute('class');
  if (currentClass === 'dark') {
    btn.setAttribute('class', 'light');
    btn.textContent = 'Lighten';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  } else {
    btn.setAttribute('class', 'dark');
    btn.textContent = 'Darken';
    overlay.style.backgroundColor = 'rgba(0,0,0,0)';
  }
});
