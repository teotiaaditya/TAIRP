// Get the DOM elements for the image slider
const sliderWrapper = document.querySelector(".slider-wrapper");
const slider = document.querySelector(".carousel");
const images = document.querySelectorAll(".carousel img");
const buttons = document.querySelectorAll(".slider-button");
const dotsContainer = document.querySelector(".dots-container");

// Initialize variables
let imageIndex = 0;
let intervalId;
let startX = 0;
let endX = 0;

// Function to start automatic image slider
const autoSlide = () => {
  intervalId = setInterval(() => slideImage(++imageIndex), 2500); // Auto slide interval set to 2500 milliseconds
};
autoSlide();

// Function to create indicator dots for each image
const createDots = () => {
  images.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.setAttribute("data-index", index);
    dotsContainer.appendChild(dot);
  });
  dotsContainer.children[0].classList.add("active"); // Set the first dot as active initially
};
createDots();

// Function to update active dot based on current image index
const updateDots = () => {
  const dots = document.querySelectorAll(".dot");
  dots.forEach(dot => dot.classList.remove("active"));
  dots[imageIndex].classList.add("active");
};

// Function to update the slider to show the specified image
const slideImage = () => {
  imageIndex = imageIndex === images.length ? 0 : imageIndex < 0 ? images.length - 1 : imageIndex;
  slider.style.transform = `translate(-${imageIndex * 100}%)`;
  updateDots();
};

// Function to handle click on navigation buttons
const updateClick = (e) => {
  clearInterval(intervalId);
  imageIndex += e.target.id === "next" ? 1 : -1;
  slideImage(imageIndex);
  autoSlide();
};

// Add event listeners to the navigation buttons
buttons.forEach((button) => button.addEventListener("click", updateClick));

// Pause auto sliding on mouseover
sliderWrapper.addEventListener("mouseover", () => clearInterval(intervalId));

// Resume auto sliding on mouseleave
sliderWrapper.addEventListener("mouseleave", autoSlide);

// Add event listener for keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    clearInterval(intervalId);
    imageIndex += e.key === "ArrowLeft" ? -1 : 1;
    slideImage(imageIndex);
    autoSlide();
  }
});

// Add event listeners for swipe gestures
sliderWrapper.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

sliderWrapper.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

// Function to handle swipe gestures
const handleSwipe = () => {
  const swipeThreshold = 50;
  const deltaX = endX - startX;
  if (deltaX > swipeThreshold || deltaX < -swipeThreshold) {
    clearInterval(intervalId);
    imageIndex += deltaX > swipeThreshold ? -1 : 1;
    slideImage(imageIndex);
    autoSlide();
  }
};
