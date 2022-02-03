const track = document.querySelector(".carousel_track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel_button-right");
const prevButton = document.querySelector(".carousel_button-left");
const navigation = document.querySelector(".carousel_nav");
const navArray = Array.from(navigation.children);

const slideSize = slides[0].getBoundingClientRect().width;

// Shows/hides the arrows depending on what part of the carousel the user is at.
const hideArrows = (targetIndex) => {
    if (targetIndex === 0) {
        prevButton.classList.add("hidden");
        nextButton.classList.remove("hidden");
    } else if (targetIndex === slides.length - 1) {
        prevButton.classList.remove("hidden");
        nextButton.classList.add("hidden");
    } else {
        prevButton.classList.remove("hidden");
        nextButton.classList.remove("hidden");
    }
}

// Sets the slide to be n * the size of the slides at whatever size the screen is at.
const setSlidePosition = (slide, index) => {
    slide.style.left = `${slideSize * index}px`;
}

slides.forEach(setSlidePosition);

// Moves the "current_slide" class to be on the new target slide, and moves the track to show the right slide.
const moveToSlide = (currentSlide, targetSlide) => {
    const targetIndex = slides.findIndex(slide => slide === targetSlide);
    console.log(currentSlide);
    console.log(targetSlide);
    console.log(targetIndex);
    track.style.transform = `translateX(-${targetSlide.style.left})`;
    console.log(targetSlide.style.left);
    currentSlide.classList.remove("current_slide");
    targetSlide.classList.add("current_slide");
    hideArrows(targetIndex);
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove("current_slide");
    targetDot.classList.add("current_slide");
}

// Moves slide with a click on the > button
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector(".current_slide");
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = navigation.querySelector(".current_slide");
    const nextDot = currentDot.nextElementSibling;

    moveToSlide(currentSlide, nextSlide);
    updateDots(currentDot, nextDot);

});

// Moves slide with a click on the < button
prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector(".current_slide");
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = navigation.querySelector(".current_slide");
    const prevDot = currentDot.previousElementSibling;

    moveToSlide(currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
});

// Lets for users to click on the navigation dots to move around.
navigation.addEventListener("click", e => {
    const targetDot = e.target.closest("button");

    if (!targetDot) return;

    const currentSlide = track.querySelector(".current_slide");
    const currentDot = navigation.querySelector(".current_slide");
    const targetIndex = navArray.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];
    
    moveToSlide(currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
});