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


function postDetail() {
  const postSeebtn = document.querySelectorAll(".seeContainer");
  postSeebtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      
      
      
      const postDetailedBox = document.querySelector("#postDetailedBox")
      postDetailedBox.style.display = "block"
      const profileUser = (btn.getAttribute("profileUser"))
      // console.log(profileUser);
      const userPost = JSON.parse(btn.getAttribute("post"))
      
      // ------set follow and download button---------
      let followAndDownBtn = "";
      if(profileUser !== userPost.user._id){
        console.log("user is not");
        
        followAndDownBtn = `
                  <div class="followBtn">
                    <a href="">Follow</a>
                  </div>
                  <div class="downloadBtn">
                    <a href="">Download</a>
                  </div>`
      }
      else{
        followAndDownBtn = ""
      }
      
      postDetailedBox.innerHTML= `<div class="postDetailedBoxSet">
          <div class="postBox">
            <div class="closeBtn">
              <p>&#x2702;</p>
            </div>
            <div class="postInfoBox">
              
              <div class="postThumbnail">
                <img src="${userPost.thumbnail}" alt="">
              </div>
              <div class="multiPicPostBox">
              ${userPost.images.map((img) => `
    <div class="pics">
      <img src="${img.url}" alt="">
    </div>
  `).join('')}
                
                
              </div>
              <div class="userAndPostInfoBox">
                <div class="likeBox">
                  <div class="likeContainer">
                      
                    </span>
                  </div>
                </div>
                <div class="userInfo">
                  <div class="profilePic">
                    <img src="${userPost.user.dp ? userPost.user.dp : "/images/profilePic.png"}" alt="">
                  </div>
                  <div class="userName"><h2>${userPost.user.userName}</h2></div>
                </div>
                <div class="postInfo">
                  <div class="postName">
                    <h1>${userPost.postName}</h1>
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
                  <div class="userCommentBox">
                    <div class="userProfilePic">
                      <img src="/images/userProfile/ut.jpg" alt="">
                    </div>
                    <div class="userNameAndComment">
                      <div class="userName" style="margin-bottom: 12px;"><h4>@Utsav004</h4></div>
                      <div class="comment"><p style="font-size: 15px;">"Amazing work! 😍 The attention to detail is incredible!"</p></div>
                    </div>
                  </div>
                  <div class="userCommentBox">
                    <div class="userProfilePic">
                      <img src="/images/userProfile/ronak.jpg" alt="">
                    </div>
                    <div class="userNameAndComment">
                      <div class="userName" style="margin-bottom: 12px;"><h4>@ronak_prj</h4></div>
                      <div class="comment"><p style="font-size: 15px;">"This is exactly what I needed! 👍 Keep up the awesome work!"</p></div>
                    </div>
                  </div>
                  <div class="userCommentBox">
                    <div class="userProfilePic">
                      <img src="/images/userProfile/sandeep.jpg" alt="">
                    </div>
                    <div class="userNameAndComment">
                      <div class="userName" style="margin-bottom: 12px;"><h4>@sandeep_09</h4></div>
                      <div class="comment"><p style="font-size: 15px;">"Great job! 🎉 Your design skills are on point!"</p></div>
                    </div>
                  </div>
                  <div class="userCommentBox">
                    <div class="userProfilePic">
                      <img src="/images/userProfile/ut.jpg" alt="">
                    </div>
                    <div class="userNameAndComment">
                      <div class="userName" style="margin-bottom: 12px;"><h4>@Utsav004</h4></div>
                      <div class="comment"><p style="font-size: 15px;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia consequuntur accuslaborum labore maxime voluptatum dolore?</p></div>
                    </div>
                  </div>
                  <div class="userCommentBox">
                    <div class="userProfilePic">
                      <img src="/images/userProfile/ronak.jpg" alt="">
                    </div>
                    <div class="userNameAndComment">
                      <div class="userName" style="margin-bottom: 12px;"><h4>@Utsav004</h4></div>
                      <div class="comment"><p style="font-size: 15px;">Lorem ipsum dolor sit amet consectetur adipisicing elit.  dolore?</p></div>
                    </div>
                  </div>
                  <div class="userCommentBox">
                    <div class="userProfilePic">
                      <img src="/images/userProfile/sandeep.jpg" alt="">
                    </div>
                    <div class="userNameAndComment">
                      <div class="userName" style="margin-bottom: 12px;"><h4>@Utsav004</h4></div>
                      <div class="comment"><p style="font-size: 15px;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia consequuntur accuslaborum labore maxime voluptatum dolore?</p></div>
                    </div>
                  </div>
                  <div class="userCommentBox">
                    <div class="userProfilePic">
                      <img src="/images/userProfile/ut.jpg" alt="">
                    </div>
                    <div class="userNameAndComment">
                      <div class="userName" style="margin-bottom: 12px;"><h4>@Utsav004</h4></div>
                      <div class="comment"><p style="font-size: 15px;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia consequuntur accuslaborum labore maxime voluptatum dolore?</p></div>
                    </div>
                  </div>
                  <div class="userCommentBox">
                    <div class="userProfilePic">
                      <img src="/images/userProfile/ronak.jpg" alt="">
                    </div>
                    <div class="userNameAndComment">
                      <div class="userName" style="margin-bottom: 12px;"><h4>@Utsav004</h4></div>
                      <div class="comment"><p style="font-size: 15px;">Lorem ipsum dolor sit amet consectetur adipisicing elit.  dolore?</p></div>
                    </div>
                  </div>
                  <div class="userCommentBox">
                    <div class="userProfilePic">
                      <img src="/images/userProfile/sandeep.jpg" alt="">
                    </div>
                    <div class="userNameAndComment">
                      <div class="userName" style="margin-bottom: 12px;"><h4>@Utsav004</h4></div>
                      <div class="comment"><p style="font-size: 15px;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia consequuntur accuslaborum labore maxime voluptatum dolore?</p></div>
                    </div>
                  </div>
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
            </div>`

            

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
    
  //  ---------------close post Detail----------------   
  const closeBtn = document.querySelector(".closeBtn")
  closeBtn.addEventListener("click", () => {
    
    
    postDetailedBox.style.display = "none"
  })
})

window.addEventListener("click",(e)=>{
  if(e.target === postDetailedBox){
    
    postDetailedBox.style.display = "none"
  }
})
})
}
postDetail()

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
      window.location.href = '/login';
    }
  });
});


