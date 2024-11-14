// =================Show naviBar for Update Use Profile==============
function showSideNavi() {
  const hamBargar = document.querySelector("#sideNaviBtn");
  const profileSideNavi = document.querySelector(".profileSideNavi");

  hamBargar.addEventListener("click", () => {
    profileSideNavi.classList.toggle("hideNaviBar");
    hamBargar.classList.toggle("active");
  });
  document.addEventListener("click", (e) => {
    if (!profileSideNavi.contains(e.target) && !hamBargar.contains(e.target)) {
      profileSideNavi.classList.add("hideNaviBar");
      hamBargar.classList.remove("active");
    }
  });
}
showSideNavi();

// ==============Show Upload/Update dp================
function showDPuploadBox() {
  document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("imageUploadModal");
    const editDpBtn = document.querySelector(".editdp");
    const closeBtn = document.querySelector(".closeBtnDp");

    editDpBtn.addEventListener("click", function (event) {
      event.preventDefault();
      modal.style.display = "block";
    });

    closeBtn.addEventListener("click", function () {
      modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  });
}
showDPuploadBox();

// ==================Show Update User info Profile==============
function showUserInfoBox() {
  const editProfileBtn = document.querySelector(".editProfile");
  const updateProfileBox = document.querySelector(".modalProfile");
  const closeBtn = document.querySelector(".closeBtnProfile");

  // console.log(updateProfileBox);

  editProfileBtn.addEventListener("click", (event) => {
    event.preventDefault();
    updateProfileBox.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    updateProfileBox.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === updateProfileBox) {
      updateProfileBox.style.display = "none";
    }
  });
}
showUserInfoBox();

// ==================Show Upload Post==============
function showPostUpload() {
  const addPostBtn = document.querySelectorAll(".addPost");
  const uploadPostBox = document.querySelector(".modalPost");
  const closeBtn = document.querySelector(".closeBtnPost");

  // console.log(updateProfileBox);

  addPostBtn.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      uploadPostBox.style.display = "block";
    });
  });

  closeBtn.addEventListener("click", () => {
    uploadPostBox.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === uploadPostBox) {
      uploadPostBox.style.display = "none";
    }
  });
}
showPostUpload();

// ---------------post see button--------------
function postSeeBtn() {
  const seeBtns = document.querySelectorAll(".seeContainer");
  const postDetailedBox = document.querySelector("#postDetailedBox");

  seeBtns.forEach((seeBtn) => {
    seeBtn.addEventListener("click", async () => {
      const postId = seeBtn.getAttribute("postId");
      const userId = JSON.parse(seeBtn.getAttribute("userId"));

      const response = await fetch(`/users/seeDetailPost/${postId}`);
      const postData = await response.json();

      postDetailedBox.style.display = "block";
      // console.log(postData.image);
      let countLike = 0;
      postData.likes.forEach(like => {
        countLike++
      })

      let userCommentBox = "";

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

      if (userId.comment.length > 0) {
        postData.postComment.forEach((comment) => {
          console.log(comment.user._id + "userid");
          if (comment.user._id == userId._id) {
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
          <div class="likeBox">
            <div class="likeContainer">
              <span class="likeButton" id="likeButton">
                <i class="heartIcon" id="heartIcon"></i>
                <span class="likeCount" id="likeCount">${countLike}</span>
              </span>
            </div>
          </div>
          <div class="postInfo">
            <div class="postName">
              <h1>${postData.postName}</h1>
            </div>
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
      const likeButtonElement = document.getElementById("likeButton");

      postData.likes.forEach(like => {
        if (postData.likes.indexOf(userId._id) === -1) {
          likeButtonElement.classList.remove("liked");
        }
        else {
          likeButtonElement.classList.add("liked");
        }
      })
 //-------------post Add comments---------------
 if (userId) {
  const addCommentBtn = document.querySelector(".addCommentBox button");
  const comment = document.querySelector(".addCommentBox textarea");
  const commentsContainerSet = document.querySelector(".commentsContainerSet")
  addCommentBtn.addEventListener("click", async () => {
    const commentText = comment.value;
    const res = await fetch(`/users/addComment/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment: commentText })
    });

    if (res.ok) {
      console.log("Commented");
      comment.value = "";
      commentsContainerSet.innerHTML += `
<div class="userCommentBox">
<div class="userProfilePic">
    <img src="${userId.dp ? userId.dp : "/images/profilePic.png"} ">
</div>
<div class="userNameAndComment">
    <div class="userName" style="margin-bottom: 12px;">
        <h4>${userId.userName}</h4>
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
if(userId.comment.length > 0){
  const deleteCommentBtn = document.querySelectorAll(".deleteComment")
  console.log(deleteCommentBtn);
  
  deleteCommentBtn.forEach((btn)=>{
    btn.addEventListener("click",async ()=>{
      // console.log("clicked");
      const commentBox = btn.closest(".userCommentBox")
      const commentId = btn.getAttribute("commentId")
      const res = await fetch(`/users/deleteComment/${commentId}`)
      if(res.ok){
        console.log("comment deleted");
        commentBox.remove();
      }else{
        console.log("post not deleted");
        
      }
    })
  })
}
      // -------------------like post----------------
      likeButtonElement.addEventListener("click", async function () {
        const res = await fetch(`/users/likePost/${postId}`);
        const data = await res.json();
        countLike = data.countlike;
        document.getElementById("likeCount").textContent = countLike;
        if (data.liked === true) {
          likeButtonElement.classList.add("liked");
        }
        else {
          likeButtonElement.classList.remove("liked");
        }
      });

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

// ==============Show Change Role================
function showChangeRole() {

  const modal = document.getElementById("changeRoleModel");
  const changeRoleBtn = document.querySelector(".changeRole");
  const closeBtn = document.querySelector(".closeBtnRole");
  // console.log(changeRoleBtn);
  if (changeRoleBtn) {
    changeRoleBtn.addEventListener("click", function (event) {
      event.preventDefault();
      modal.style.display = "block";
    });

    closeBtn.addEventListener("click", function () {
      modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  }
}
showChangeRole();

// =============show followings user==========
function showFollowingsUser() {


  const followingsBtn = document.querySelector(".followings");
  const followContainer = document.querySelector("#followContainer");
  const followContainerSet = document.querySelector(".followContainerSet");

  followingsBtn.addEventListener("click", async () => {
    followContainer.style.display = 'block';
    console.log("open following list");

    // console.log(userId);
    followContainerSet.innerHTML = "";

    const res = await fetch(`/users/followingList`);
    const data = await res.json();

    if (data.status) {
      const listUser = data.followingDetails;
      listUser.forEach((list) => {
        console.log(list.userName);

        // Create a new div element to hold the content
        const followContent = document.createElement('div');
        followContent.classList.add('userBox');
        followContent.innerHTML = `
          <div class="profilePic"><img src="${list.dp ? list.dp : "/images/profilePic.png"}" alt=""></div>
          <p class="userName">${list.userName}</p>
          <div class="followBtn" userId="${list._id}">
            <span class="following" >Follow</span>
          </div>
        `;
        // Append the created element to the container
        followContainerSet.appendChild(followContent)
      });
      const unfollow = document.querySelectorAll(".followBtn")

      unfollow.forEach((btn) => {
        btn.addEventListener("click", async () => {
          const unfollowSpan = btn.querySelector("span")
          const followedUserId = btn.getAttribute("userId")
          console.log(followedUserId);

          const res = await fetch(`/users/followingOrRemove/${followedUserId}`)
          const data = await res.json()
          if (data.following == false) {
            unfollowSpan.classList.remove("following")
            unfollowSpan.classList.add("follow")
          } else {
            unfollowSpan.classList.add("following")
            unfollowSpan.classList.remove("follow")
          }
        })
      })
    }
  });

  window.addEventListener("click", (e) => {
    if (!followContainer.contains(e.target) && e.target !== followingsBtn) {
      followContainer.style.display = "none";
    }
  });
}
showFollowingsUser();

// =============show followers user==========
function showFollowersUser() {
  const followersBtn = document.querySelector(".followers");
  const followersContainer = document.querySelector("#followersContainer");
  const followersContainerSet = document.querySelector(".followersContainerSet");

  followersBtn.addEventListener("click", async () => {
    followersContainer.style.display = 'block';
    followersContainerSet.innerHTML = "";

    const res = await fetch(`/users/followersList`);
    const data = await res.json();

    if (data.status) {
      const listUser = data.followersDetails;
      listUser.forEach((list) => {
        console.log(list.userName);
        const followContent = document.createElement('div');
        followContent.classList.add('userBox');
        followContent.innerHTML = `
          <div class="profilePic"><img src="${list.dp ? list.dp : "/images/profilePic.png"}" alt=""></div>
          <p class="userName">${list.userName}</p>
          <div class="followBtn" >
            
          </div>
        `;
        // Append the created element to the container
        followersContainerSet.appendChild(followContent)
      });
    }
  });

  window.addEventListener("click", (e) => {
    if (!followersContainer.contains(e.target) && e.target !== followersBtn) {
      followersContainer.style.display = "none";
    }
  });
}
showFollowersUser();
// ==============Flash Messages============
function flashMsgsTiming() {
  const errorMsgBox = document.querySelector("#errorMsgFromBackend");
  const successMsgFromBackend = document.querySelector("#successMsgFromBackend");
  const msgTimeCircle = document.querySelector(".circle");
  let count = 4;

  if (errorMsgBox) {
    errorMsgBox.style.display = 'flex';
    const timeInt = setInterval(() => {
      count--;
      msgTimeCircle.innerHTML = count;
      if (count === 0) {
        clearInterval(timeInt);

        errorMsgBox.style.transition = "opacity 0.5s, transform 0.5s";
        errorMsgBox.style.opacity = "0";
        errorMsgBox.style.transform = "translateY(-20%)";

        setTimeout(() => {
          errorMsgBox.style.display = 'none';
        }, 500);
      }
    }, 1000);
  }
  if (successMsgFromBackend) {
    successMsgFromBackend.style.display = 'flex';
    const timeInt = setInterval(() => {
      count--;
      msgTimeCircle.innerHTML = count;
      if (count === 0) {
        clearInterval(timeInt);

        successMsgFromBackend.style.transition = "opacity 0.5s, transform 0.5s";
        successMsgFromBackend.style.opacity = "0";
        successMsgFromBackend.style.transform = "translateY(-20%)";

        setTimeout(() => {
          successMsgFromBackend.style.display = 'none';
        }, 500);
      }
    }, 1000);
  }
}
flashMsgsTiming();