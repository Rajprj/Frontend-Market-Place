
// =================Show naviBar for Update Use Profile==============

function showSideNavi() {
  const hamBargar = document.querySelector("#sideNaviBtn");
  const profileSideNavi = document.querySelector(".profileSideNavi");

  hamBargar.addEventListener("click", () => {
    profileSideNavi.classList.toggle("hideNaviBar");
    hamBargar.classList.toggle("active"); // Add or remove the 'active' class for animation
  });
}

showSideNavi();



// ==============Show Upload/Update dp================

function showDPuploadBox() {
  document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("imageUploadModal");
    const editDpBtn = document.querySelector('.editdp'); // Corrected selector
    const closeBtn = document.querySelector(".closeBtnDp");
  
    // Open the modal on "Edit DP" click
    editDpBtn.addEventListener("click", function(event) {
      event.preventDefault(); // Prevent link navigation
      modal.style.display = "block";
    });
  
    // Close the modal on close button click
    closeBtn.addEventListener("click", function() {
      modal.style.display = "none";
    });
  
    // Close the modal if user clicks outside the modal content
    window.addEventListener("click", function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  });
  
}    
showDPuploadBox();


// ==================Show Update User info Profile==============

function showUserInfoBox(){
  const editProfileBtn = document.querySelector('.editProfile');
  const updateProfileBox = document.querySelector('.modalProfile');
  const closeBtn = document.querySelector(".closeBtnProfile");

  console.log(updateProfileBox);
  
  editProfileBtn.addEventListener("click", (event)=>{
    event.preventDefault();
    updateProfileBox.style.display = "block";
  })

  closeBtn.addEventListener("click", ()=>{
    updateProfileBox.style.display = "none";
  })
}

showUserInfoBox();


// ==================Show Upload Post==============

function showPostUpload(){
  const addPostBtn = document.querySelectorAll('.addPost');
  const uploadPostBox = document.querySelector('.modalPost');
  const closeBtn = document.querySelector(".closeBtnPost");

  // console.log(updateProfileBox);
  
  addPostBtn.forEach((btn)=>{
    btn.addEventListener("click",(event)=>{
      event.preventDefault();
      uploadPostBox.style.display = "block";
    })
  })

  closeBtn.addEventListener("click", ()=>{
    uploadPostBox.style.display = "none";
  })
}

showPostUpload();

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