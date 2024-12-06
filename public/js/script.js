document.addEventListener("DOMContentLoaded", () => {
  const loaderContainer = document.getElementById("loaderContainer");

  setTimeout(() => {
    loaderContainer.classList.add("hide");
  }, 7000);

  window.addEventListener("load", () => {
    loaderContainer.classList.add("hide");
  });
});


// ---------------post see button--------------

function postSeeBtn() {
  const seeBtns = document.querySelectorAll(".seeContainer");
  const postDetailedBox = document.querySelector("#postDetailedBox");

  seeBtns.forEach((seeBtn) => {
    seeBtn.addEventListener("click", async () => {
      const postId = seeBtn.getAttribute("post");
      let profileUser = JSON.parse(seeBtn.getAttribute("profileUser"));
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
      if (!profileUser) {
        followAndDownBtn = `<div class="followBtn">
              <span class="follow">Follow</span>
            </div>
            <div class="downloadBtn">
              <a>Download</a>
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
        <a href="/users/download/${postId}">Download</a>
      </div>`;
        } else {
          followAndDownBtn = "";
        }
        if (profileUser.comment.length > 0) {
          postData.postComment.forEach((comment) => {
            console.log(comment.user._id + "userid");
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

      const addCommentBtn = document.querySelector(".addCommentBox button");
      const comment = document.querySelector(".addCommentBox textarea");
      const commentsContainerSet = document.querySelector(".commentsContainerSet")
      
      addCommentBtn.addEventListener("click", async () => {
        if (profileUser && profileUser.role == 'admin') {
          flashMsgsTimingForAjax("Admin can't comment on developer's post!")
          return;
        }
        if (profileUser && profileUser.role != 'admin') {
          console.log(comment.value);
          
          if(!comment.value){
            flashMsgsTimingForAjax("Comment text is required!")
            return;
          }
          const commentText = comment.value;
          loaderContainer.classList.remove("hide");
          const res = await fetch(`/users/addComment/${postId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ comment: commentText })
          });
          let data = await res.json();
          if (res.ok) {
            // console.log("Commented");
            loaderContainer.classList.add("hide");
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
            flashMsgsTimingForAjax(data.errMsg)
          }
        } else {
         
          
            flashMsgsTimingForAjax("Sorry you'r not loggedIn!")
          
        }
      });

      //-------------Post comment delete-------------
      if (profileUser && profileUser.role != 'admin') {
        if (profileUser.comment.length > 0) {
          const deleteCommentBtn = document.querySelectorAll(".deleteComment")
          console.log(deleteCommentBtn);

          deleteCommentBtn.forEach((btn) => {
            btn.addEventListener("click", async () => {
              // console.log("clicked");
              const commentBox = btn.closest(".userCommentBox")
              const commentId = btn.getAttribute("commentId")
              loaderContainer.classList.remove("hide");
              const res = await fetch(`/users/deleteComment/${commentId}`)
              if (res.ok) {
                // console.log("comment deleted");
                loaderContainer.classList.add("hide");
                commentBox.remove();
              } else {
                console.log("post not deleted");

              }
            })
          })
        }
      }
      
      // ------------following or unfollow the user---------------
      // ------------following or unfollow the user---------------
      function followUnfollowUser() {
        const followBtn = document.querySelector(".followBtn")
        if(followBtn){
          const followBtnA = document.querySelector(".followBtn span")

          followBtn.addEventListener("click", async () => {
  
            if (profileUser && profileUser.role != 'admin') {
              if (profileUser._id !== postData.postUserId) {
                checkFollowBtnNotclicked = false;
                const res = await fetch(`/users/followingOrRemove/${postData.postUserId}`)
  
                const data = await res.json();
                if (res.ok) {
                  console.log(data.following);
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
              }
  
            }
            else {
              if (profileUser && profileUser.role == 'admin') {
                flashMsgsTimingForAjax("Admin can't follow developer!")
              }
              else {
                flashMsgsTimingForAjax("Sorry you'r not loggedIn!")
              }
            }
          })
        }

      }
      followUnfollowUser()
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
    let profileUser = likeBtn.getAttribute("user")
    if(profileUser !== 'null'){
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
    }
    else{
      flashMsgsTimingForAjax("Sorry you'r not loggedIn!")
    }
    
  });
});


//===========for ajax req error msg===============
function flashMsgsTimingForAjax(errMsg) {

  const errorDiv = document.createElement("div");
  errorDiv.id = "errorMsgFromBackend";
  errorDiv.innerHTML = `<p>${errMsg} <span class="circle"></span></p>`;
  document.body.appendChild(errorDiv);

  const msgTimeCircle = document.querySelector(".circle");
  errorDiv.style.display = 'flex';
  let count = 4;
  const timeInt = setInterval(() => {
    count--;
    msgTimeCircle.innerHTML = count;
    if (count === 0) {
      clearInterval(timeInt);

      errorDiv.style.transition = "opacity 0.5s, transform 0.5s";
      errorDiv.style.opacity = "0";
      errorDiv.style.transform = "translateY(-20%)";

      setTimeout(() => {
        errorDiv.style.display = 'none';
        errorDiv.remove();
        return
      }, 500);
    }
  }, 1000);
}