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

// ==============Post Detail===============

// let checkFollowBtnNotclicked = true;
// let followersList
// function postDetail() {
//   const postSeebtn = document.querySelectorAll(".seeContainer");
//   postSeebtn.forEach((btn) => {
//     btn.addEventListener("click", async () => {
//       const postDetailedBox = document.querySelector("#postDetailedBox")
//       postDetailedBox.style.display = "block"
//       const profileUser = (btn.getAttribute("profileUser"))
//       // console.log(profileUser);
//       const userPostId = btn.getAttribute("post")
//       const res = await fetch("/users/postDetailed")
//       if(checkFollowBtnNotclicked){
//        followersList = userPost.user.followers.map((list)=> list)
//         console.log(followersList);
//       }
//       // ------set follow and download button---------
//       let followAndDownBtn = "";

//       if (profileUser !== userPost.user._id) {
//         // console.log("user is not");
//         let follow
//         if(followersList.indexOf(profileUser) === -1){
//           console.log("user is not following");

//           follow = `<span class="follow">Follow</span>`
//         }
//         else{
//           console.log("in following list");

//            follow = `<span class="following">Follow</span>`
//         }
//         // const follow = followingList.indexOf(profileUser) === -1
//         // ? `<span class="follow">Follow</span>`
//         // : `<span class="following">Following</span>`;

//         followAndDownBtn = `
//     <div class="followBtn">
//       ${follow}
//     </div>
//     <div class="downloadBtn">
//       <a href="">Download</a>
//     </div>`;
//       } else {
//         followAndDownBtn = "";
//       }

//       postDetailedBox.innerHTML = `<div class="postDetailedBoxSet">
//           <div class="postBox">
//             <div class="closeBtn">
//               <p>&#x2702;</p>
//             </div>
//             <div class="postInfoBox">

//               <div class="postThumbnail">
//                 <img src="${userPost.thumbnail}" alt="">
//               </div>
//               <div class="multiPicPostBox">
//               ${userPost.images.map((img) => `
//                 <div class="pics">
//                   <img src="${img.url}" alt="">
//                 </div>
//               `).join('')}
//              </div>
//               <div class="userAndPostInfoBox">
//                 <div class="likeBox">
//                   <div class="likeContainer">

//                     </span>
//                   </div>
//                 </div>
//                 <div class="userInfo">
//                   <div class="profilePic">
//                     <img src="${userPost.user.dp ? userPost.user.dp : "/images/profilePic.png"}" alt="">
//                   </div>
//                   <div class="userName"><h2>${userPost.user.userName}</h2></div>
//                 </div>
//                 <div class="postInfo">
//                   <div class="postName">
//                     <h1>${userPost.postName}</h1>
//                   </div>
//                 </div>
//                 <div class="followBtnAndDownloadBtn">
//                   ${followAndDownBtn}
//                 </div>

//               </div>
//             </div>
//             <div class="commentBox">
//               <div class="commentHeader">
//                 <h3>Comments</h3>
//               </div>
//               <div class="commentsContainer">
//                 <div class="commentsContainerSet">

//                 </div>
//               </div>
//               <div class="addCommentBox">
//               <textarea placeholder="Add a comment..." rows="3"></textarea>
//               <button type="button" class="submitCommentBtn">
//                 <i class="fas fa-paper-plane"></i>
//               </button>
//             </div>

//             </div>
//           </div>
//       </div>`


// ---------------post see button--------------
function postSeeBtn() {
  const seeBtns = document.querySelectorAll(".seeContainer");
  const postDetailedBox = document.querySelector("#postDetailedBox");

  seeBtns.forEach((seeBtn) => {
    seeBtn.addEventListener("click", async () => {
      const postId = seeBtn.getAttribute("post");
      const profileUser = JSON.parse(seeBtn.getAttribute("profileUser"));
      // console.log(profileUser.comment);

      const response = await fetch(`/users/seeDetailPost/${postId}`);
      // console.log("Post ID: ", postId);
      const postData = await response.json();
      // console.log(postData.postUserId);


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
              <a href="">Download</a>
            </div>`
      }
      else {
        if (profileUser._id !== postData.postUserId) {
          // console.log("user is not");
          let follow
          if (postData.followers.indexOf(profileUser) === -1) {
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
      if (profileUser) {
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
      if(profileUser.comment.length > 0){
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
      // ------------following or unfollow the user---------------
      if (profileUser) {
        if (profileUser._id !== postData.postUserId) {
          function followUnfollowUser() {
            const followBtn = document.querySelector(".followBtn")
            const followBtnA = document.querySelector(".followBtn span")
            followBtn.addEventListener("click", async () => {
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
    console.log("clicked");

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
