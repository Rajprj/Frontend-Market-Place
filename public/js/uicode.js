function postSlider() {
    var currentIndex = 0;
    const slides = document.querySelector(".slides");
    const totalSlides = document.querySelectorAll(".slide").length;
    const preBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const dotsContainer = document.querySelector(".dotsContainer");
  
    // Create dots dynamically
    for (let i = 0; i < totalSlides; i++) {
      let dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active"); // Set the first dot as active
      dotsContainer.appendChild(dot);
    }
    const dots = document.querySelectorAll(".dot");
  
    function showSlide(index) {
      const slideWidth = document.querySelector(".slide").clientWidth;
      slides.style.transform = `translateX(-${index * slideWidth}px)`;
      updateDots(index);
    }
  
    // Update active dot
    function updateDots(index) {
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
    }
  
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % totalSlides;
      showSlide(currentIndex);
    });
  
    preBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      showSlide(currentIndex);
    });
  
    // Add click event for dots
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        currentIndex = i;
        showSlide(currentIndex);
      });
    });
}
postSlider();

function singlePost(){
  const postBox = document.querySelectorAll('#page3 .box');


  postBox.forEach((boxes)=>{
    boxes.addEventListener("mouseenter",()=>{
      boxes.childNodes[1].style.height = "67%";
    })
  })

  postBox.forEach((boxes)=>{
    boxes.addEventListener("mouseleave",()=>{
      boxes.childNodes[1].style.height = "50%";
    })
  })
  
}
singlePost();

// ---------------------like Button---------------
function likeButton() {

  document.addEventListener('DOMContentLoaded', function () {
    
    const likeButtons = document.querySelectorAll(".likeButton");
  
    // Iterate through each like button
    likeButtons.forEach((likeButton) => {
      const likeCount = likeButton.querySelector(".likeCount");
  
      let liked = false;
      let count = parseInt(likeCount.textContent); 
  
      
      likeButton.addEventListener("click", function () {
        liked = !liked;
        if (liked) {
          count++;
          likeButton.classList.add("liked");
        } else {
          count--;
          likeButton.classList.remove("liked");
        }
        
        likeCount.textContent = count;
      });
    });
  });
  
  
}
likeButton();
// -----------------Detailed post Thubmnail img change--------------
function thumbnailImgChange() {
  const thumbnail = document.querySelector(".postThumbnail img")
  const multiImgs = document.querySelectorAll(".pics img");

  multiImgs.forEach((imgs) => {
    imgs.addEventListener("click", () => {
      const selectedImg = imgs.src;
      const oldThumbnailImg = thumbnail.src;
      thumbnail.src = selectedImg;
      imgs.src = oldThumbnailImg;
    })
  })
}
thumbnailImgChange();

// ---------------post see button--------------
function postSeeBtn(){

  const seeBtns = document.querySelectorAll(".seeContainer")
  const postDetailedBox = document.querySelector("#postDetailedBox");
  const postDetailedBoxCloseBtn = document.querySelector(".postDetailedBoxSet .postBox .closeBtn")

  seeBtns.forEach((seeBtn)=>{
    seeBtn.addEventListener("click",()=>{
      postDetailedBox.style.display = "block";
    })
  })

  postDetailedBoxCloseBtn.addEventListener("click",()=>{
    postDetailedBox.style.display = "none";
  })

}
postSeeBtn();