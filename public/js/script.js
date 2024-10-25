// --------------For responsive navbar---------------
function responsiveNav() {
  let sideNaviMedia = document.querySelector(".sideNaviMedia");
  let sideNavbrgar = document.querySelector(".sideNavbrgar");
  let nav = document.querySelector("nav");

  sideNavbrgar.addEventListener("click", () => {
    sideNaviMedia.classList.toggle("sideNaviMediaHideShow");
    nav.classList.toggle("offBoxShadowNav");
  });

  //   ------------menu list animation----------------
  document.querySelectorAll(".menu ul li").forEach((item, index) => {
    item.style.setProperty("--order", index);
  });

  document.querySelectorAll(".sideMenu ul li").forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
  });
}
responsiveNav();

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
