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

//       // ------------following or unfollow the user---------------
//       if (profileUser !== userPost.user._id) {
//         function followUnfollowUser() {
//           const followBtn = document.querySelector(".followBtn")
//           const followBtnA = document.querySelector(".followBtn span")
//           followBtn.addEventListener("click", async () => {
//             checkFollowBtnNotclicked = false;
//             const res = await fetch(`/users/followingOrRemove/${userPost.user._id}`)

//             const data = await res.json();
//             if (res.ok) {
//               console.log(data.following);
//               if (data.following === true) {
//                 followBtnA.classList.remove("follow")
//                 followBtnA.classList.add("following")
//                 followBtnA.innerHTML = "following"
//                 if(data.followedId){
//                   followersList.push(data.followedId)
//                   // console.log(data.followedId);
//                 }
//               }
//               else {
//                 followBtnA.classList.remove("following")
//                 followBtnA.classList.add("follow")
//                 followBtnA.innerHTML = "follow"
//                 if(data.followedId){
//                   followersList.splice(data.followedId,1)
//                   // console.log(data.followedId);

//                 }
//               }
//             }
//           })
//         }
//         followUnfollowUser()
//       }
//       // -----------------Detailed post Thubmnail img change-------------
//       function thumbnailImgChange() {
//         const thumbnail = document.querySelector(".postThumbnail img");
//         const multiImgs = document.querySelectorAll(".pics img");

//         multiImgs.forEach((img) => {
//           img.addEventListener("click", () => {
//             const selectedImg = img.src;
//             const oldThumbnailImg = thumbnail.src;

//             thumbnail.src = selectedImg;
//             img.src = oldThumbnailImg;
//           });
//         });
//       }
//       thumbnailImgChange();

//       //  ---------------close post Detail----------------
//       const closeBtn = document.querySelector(".closeBtn")
//       closeBtn.addEventListener("click", () => {

//         postDetailedBox.style.display = "none"
//       })
//     })

//     window.addEventListener("click", (e) => {
//       if (e.target === postDetailedBox) {

//         postDetailedBox.style.display = "none"
//       }
//     })
//   })
// }
// postDetail()
// ---------------post see button--------------
function postSeeBtn() {
  const seeBtns = document.querySelectorAll(".seeContainer");
  const postDetailedBox = document.querySelector("#postDetailedBox");

  seeBtns.forEach((seeBtn) => {
    seeBtn.addEventListener("click", async () => {
      const postId = seeBtn.getAttribute("post");
      const profileUser = seeBtn.getAttribute("profileUser");
      console.log(profileUser);

      const response = await fetch(`/users/seeDetailPost/${postId}`);
      // console.log("Post ID: ", postId);
      const postData = await response.json();
      console.log(postData.postUserId);
      
      let followAndDownBtn = "";
      if (!profileUser) {
        followAndDownBtn = `<div class="followBtn">
              <span class="follow">Follow</span>
            </div>
            <div class="downloadBtn">
              <a href="">Download</a>
            </div>`
      }
      else {
        if (profileUser !== postData.postUserId) {
          // console.log("user is not");
          let follow
          if (postData.followers.indexOf(profileUser) === -1) {
            console.log("user is not following");
            follow = `<span class="follow">Follow</span>`
          }
          else {
            console.log("in following list");
            follow = `<span class="following">following</span>`
          }
          // const follow = followingList.indexOf(profileUser) === -1
          // ? `<span class="follow">Follow</span>`
          // : `<span class="following">Following</span>`;

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
        <div class="commentsContainer"></div>
      </div>
    </div>
  </div>
`;
// ------------following or unfollow the user---------------
      if (profileUser !== postData.postUserId) {
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
