//l===============loader===============
document.addEventListener("DOMContentLoaded", () => {
  const loaderContainer = document.getElementById("loaderContainer");

  setTimeout(() => {
    loaderContainer.classList.add("hide");
  }, 4000);

  window.addEventListener("load", () => {
    loaderContainer.classList.add("hide");
  });
});

// =============post Slider============
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

// ---------------post see button--------------
function postSeeBtn() {
  const seeBtns = document.querySelectorAll(".seeContainer");
  const postDetailedBox = document.querySelector("#postDetailedBox");

  seeBtns.forEach((seeBtn) => {
    seeBtn.addEventListener("click", async () => {
      const postId = seeBtn.getAttribute("post");
      const profileUser = JSON.parse(seeBtn.getAttribute("profileUser"));
      // console.log(profileUser.comment);
      loaderContainer.classList.remove("hide");
      const response = await fetch(`/users/seeDetailPost/${postId}`);
      // console.log("Post ID: ", postId);
      const postData = await response.json();
      // console.log(postData.postUserId);
      loaderContainer.classList.add("hide");

      let userCommentBox = "";
      let followAndDownBtn = "";
      let commentBox = "";
      if (postData.postCommentCount == 0) {
        commentBox = ""
      }
      else {
        postData.postComment.forEach((comment) => {
          commentBox += `
            <div class="userCommentBox">
                
                <div class="userProfilePic">
                    <img src="${comment.user.dp ? comment.user.dp : "/images/profilePic.png"}" alt="">
                </div>
                <div class="userNameAndComment">
                    <div class="userName" style="margin-bottom: 12px;">
                        <h4>${comment.user.userName}</h4>
                    </div>
                    <div class="comment">
                        <p style="font-size: 15px;">${comment.commentText}</p>
                    </div>
                </div>
            </div>
          `;
        });
      }
      if (!profileUser ) {
        followAndDownBtn = `<div class="followBtn">
              <span class="follow">Follow</span>
            </div>
            <div class="downloadBtn">
              <a href="">Download</a>
            </div>`
      }
      else {
        if (profileUser._id !== postData.postUserId) {
          // console.log("user is not");
          let follow
          if (postData.followers.indexOf(profileUser._id) === -1) {
            // console.log("user is not following");
            follow = `<span class="follow">Follow</span>`
          }
          else {
            // console.log("in following list");
            follow = `<span class="following">following</span>`
          }

          followAndDownBtn = `
      <div class="followBtn">
        ${follow}
      </div>
      <div class="downloadBtn">
        <a href="">Download</a>
      </div>`;
        } else {
          followAndDownBtn = "";
        }
        if (profileUser.comment.length > 0) {
          postData.postComment.forEach((comment) => {
            // console.log(comment.user._id + "userid");
            if (comment.user._id == profileUser._id) {
              userCommentBox += `
                              <div class="userCommentBox">
                                  <button class="deleteComment" commentId = ${comment._id}>&#128465;</button>
                                  <div class="userProfilePic">
                                      <img src="${comment.user.dp ? comment.user.dp : '/images/profilePic.png'}" alt="">
                                  </div>
                                  <div class="userNameAndComment">
                                      <div class="userName" style="margin-bottom: 12px;">
                                          <h4>${comment.user.userName}</h4>
                                      </div>
                                      <div class="comment">
                                          <p style="font-size: 15px;">${comment.commentText}</p>
                                      </div>
                                  </div>
                              </div>
                          `;
            }
          });
        }
      }

      postDetailedBox.style.display = "block";
      // console.log(postData.image);
      let countLike = 0;
      postData.likes.forEach((like) => {
        countLike++;
      });
      postDetailedBox.innerHTML = `
  <div class="postDetailedBoxSet">
    <div class="postBox">
      <div class="closeBtn">
        <p>&#x2702;</p>
      </div>
      <div class="postInfoBox">
        <div class="postThumbnail">
          <img src="${postData.thumbnail}" alt="">
        </div>
        <div class="multiPicPostBox">
          ${postData.image && postData.image.length > 0
          ? postData.image
            .map(
              (img) => `
            <div class="pics">
              <img src="${img.url}" alt="">
            </div>
          `
            )
            .join("")
          : "No images available"
        }
        </div>
        <div class="userAndPostInfoBox">
           <div class="userInfo">
                  <div class="profilePic">
                     <img src="${postData.userProfilePic ? postData.userProfilePic : "/images/profilePic.png"}" alt="">
                   </div>
                   <div class="userName"><h2>${postData.userName}</h2></div>
                 </div>
          <div class="postInfo">
            <div class="postName">
              <h1>${postData.postName}</h1>
            </div>
          </div>
          <div class="followBtnAndDownloadBtn">
              ${followAndDownBtn}
            </div>
        </div>
      </div>
      <div class="commentBox">
        <div class="commentHeader">
          <h3>Comments</h3>
        </div>
        <div class="commentsContainer">
            <div class="commentsContainerSet">
              ${userCommentBox}
              ${commentBox}
            </div>
        </div>
        <div class="addCommentBox">
               <textarea placeholder="Add a comment..." rows="3"></textarea>
               <button type="button" class="submitCommentBtn">
                 <i class="fas fa-paper-plane"></i>
               </button>
            </div>
      </div>
    </div>
  </div>
`;

      //-------------post Add comments---------------
      if (profileUser && profileUser.role != 'admin') {
        const addCommentBtn = document.querySelector(".addCommentBox button");
        const comment = document.querySelector(".addCommentBox textarea");
        const commentsContainerSet = document.querySelector(".commentsContainerSet")
        addCommentBtn.addEventListener("click", async () => {
          const commentText = comment.value;
          loaderContainer.classList.remove("hide");
          const res = await fetch(`/users/addComment/${postId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ comment: commentText })
          });

          if (res.ok) {
            loaderContainer.classList.add("hide");
            // console.log("Commented");
            comment.value = "";
            commentsContainerSet.innerHTML += `
  <div class="userCommentBox">
      <div class="userProfilePic">
          <img src="${profileUser.dp ? profileUser.dp : "/images/profilePic.png"} ">
      </div>
      <div class="userNameAndComment">
          <div class="userName" style="margin-bottom: 12px;">
              <h4>${profileUser.userName}</h4>
          </div>

          <div class="comment">
              <p style="font-size: 15px;">${commentText}</p>
          </div>
      </div>
  </div>
`;

          
          } else {
            console.log("Failed to add comment");
          }

        });

      } 

      //-------------Post comment delete-------------
      if(profileUser && profileUser.role != 'admin'){
        if(profileUser.comment.length > 0){
          const deleteCommentBtn = document.querySelectorAll(".deleteComment")
          // console.log(deleteCommentBtn);
          
          deleteCommentBtn.forEach((btn)=>{
            btn.addEventListener("click",async ()=>{
              // console.log("clicked");
              const commentBox = btn.closest(".userCommentBox")
              const commentId = btn.getAttribute("commentId")
              loaderContainer.classList.remove("hide");
              const res = await fetch(`/users/deleteComment/${commentId}`)
              if(res.ok){
                // console.log("comment deleted");
                loaderContainer.classList.add("hide");
                commentBox.remove();
              }else{
                console.log("post not deleted");
                
              }
            })
          })
        }
      }
     
      // ------------following or unfollow the user---------------
      if (profileUser && profileUser.role != 'admin') {
        if (profileUser._id !== postData.postUserId) {
          function followUnfollowUser() {
            const followBtn = document.querySelector(".followBtn")
            const followBtnA = document.querySelector(".followBtn span")
            followBtn.addEventListener("click", async () => {
              checkFollowBtnNotclicked = false;
              const res = await fetch(`/users/followingOrRemove/${postData.postUserId}`)

              const data = await res.json();
              if (res.ok) {
                // console.log(data.following);
                if (data.following === true) {
                  followBtnA.classList.remove("follow")
                  followBtnA.classList.add("following")
                  followBtnA.innerHTML = "following"
                }
                else {
                  followBtnA.classList.remove("following")
                  followBtnA.classList.add("follow")
                  followBtnA.innerHTML = "follow"
                }
              }
            })
          }
          followUnfollowUser()
        }
      }
      // -----------------Detailed post Thubmnail img change-------------
      function thumbnailImgChange() {
        const thumbnail = document.querySelector(".postThumbnail img");
        const multiImgs = document.querySelectorAll(".pics img");

        multiImgs.forEach((img) => {
          img.addEventListener("click", () => {
            const selectedImg = img.src;
            const oldThumbnailImg = thumbnail.src;

            thumbnail.src = selectedImg;
            img.src = oldThumbnailImg;
          });
        });
      }
      thumbnailImgChange();

      const postDetailedSetBox = document.querySelector(".postDetailedBoxSet");
      const postDetailedBoxCloseBtn = document.querySelector(
        ".postDetailedBoxSet .postBox .closeBtn"
      );
      // Close the post details
      postDetailedBoxCloseBtn.addEventListener("click", () => {
        postDetailedBox.style.display = "none";
      });

      window.addEventListener("click", (event) => {
        if (event.target === postDetailedSetBox) {
          postDetailedBox.style.display = "none";
        }
      });
    });
  });
}
postSeeBtn();

// -------------------like post----------------
const likeButtonElements = document.querySelectorAll(".likeButton");
likeButtonElements.forEach((likeBtn) => {
  likeBtn.addEventListener("click", async function () {
    // console.log("clicked");

    const postId = likeBtn.getAttribute("postId");
    const res = await fetch(`/users/likePost/${postId}`);
    if (res.ok) {
      const data = await res.json();
      const countLike = data.countlike;

      // Update the specific like count for the post
      document.getElementById(`likeCount_${postId}`).innerHTML = countLike;

      // Toggle the liked class
      if (data.liked === true) {
        likeBtn.classList.add("liked");
      } else {
        likeBtn.classList.remove("liked");
      }
    } else {
      // Redirect to login if not authenticated
      window.location.href = "/login";
    }
  });
});