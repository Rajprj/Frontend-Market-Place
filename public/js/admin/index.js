

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

// ==================Show Update User info Profile==============
function showAdminInfoBox() {
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
showAdminInfoBox();

// ==================Show Update User info Profile==============
function showAddAdminBox() {
  const addAdminBtn = document.querySelector(".addAdmin");
  const addAdminBox = document.querySelector(".modalAddAdmin");
  const closeBtn = document.querySelector(".closeBtnAddAdmin");

  // console.log(updateProfileBox);

  addAdminBtn.addEventListener("click", (event) => {
    event.preventDefault();
    addAdminBox.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    addAdminBox.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === addAdminBox) {
      addAdminBox.style.display = "none";
    }
  });
}
showAddAdminBox();
function showSendMsgBox() {
  const msgBtn = document.querySelectorAll(".userMessage");
  const msgBox = document.querySelector(".modalSendMsg");


  // console.log(updateProfileBox);
msgBtn.forEach((btn)=>{
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    
    const user = JSON.parse(btn.getAttribute("userId"))
    console.log(user);
    
    msgBox.innerHTML = `<div class="modal-content">
            <span id="closeBtn" class="closeBtnSendMsg">&#x2702;</span>
            <h2>Add Admin</h2>
            <form action="/admin/sendMailUser" method="POST">
                
                <input type="email" name="email" placeholder="Email" value="${user.email}" readonly>
                <textarea name="msg" id="" placeholder="send message" required></textarea>
                <div class="submitBtn">
                    <button type="submit">Sent</button>
                </div>
            </form>

        </div>`

        msgBox.style.display = "block";
const closeBtn = document.querySelector(".closeBtnSendMsg");
console.log(closeBtn);

  closeBtn.addEventListener("click", () => {
    msgBox.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === msgBox) {
      msgBox.style.display = "none";
    }
  });
  });
})

}
showSendMsgBox();

// ===========Dashboard show boxes============
function dashboardTableShow() {
  // HTML elements for the dashboard boxes
  const developerBox = document.getElementById("developerBox");
  const viewerBox = document.getElementById("viewerBox");
  const postBox = document.getElementById("postBox");

  // HTML elements for the tables
  const developerTable = document.getElementById("developerTable");
  const viewerTable = document.getElementById("viewerTable");
  const postTable = document.getElementById("postTable");

  // Function to hide all tables
  function hideAllTables() {
    developerTable.style.display = "none";
    viewerTable.style.display = "none";
    postTable.style.display = "none";
  }
  // Show developer table when developer box is clicked
  developerBox.addEventListener("click", function () {
    hideAllTables();
    developerTable.style.display = "block";
  });

  // Show viewer table when viewer box is clicked
  viewerBox.addEventListener("click", function () {
    hideAllTables();
    viewerTable.style.display = "block";
  });

  // Show post table when post box is clicked
  postBox.addEventListener("click", function () {
    hideAllTables();
    postTable.style.display = "block";
  });
}
dashboardTableShow();

// ================Sidebar List show============
function sidebarListContainerShow() {
  // HTML elements for sidebar options
  const adminDashboard = document.getElementById("adminDashboard");
  const developerManagement = document.getElementById("developerManagement");
  const viewerManagement = document.getElementById("viewerManagement");

  // HTML elements for containers
  const dashboardContainer = document.getElementById("dashboardContainer");
  const developerContainer = document.getElementById("developerContainer");
  const viewerContainer = document.getElementById("viewerContainer");

  // Function to hide all containers
  function hideAllContainers() {
    dashboardContainer.style.display = "none";
    developerContainer.style.display = "none";
    viewerContainer.style.display = "none";
  }

  // Show dashboard container when Admin Dashboard is clicked
  adminDashboard.addEventListener("click", function () {
    hideAllContainers();
    dashboardContainer.style.display = "block"; // Show the main dashboard
  });

  // Show developer container when Developer Management is clicked
  developerManagement.addEventListener("click", function () {
    hideAllContainers();
    developerContainer.style.display = "block"; // Show the developer management section
  });

  viewerManagement.addEventListener("click", () => {
    hideAllContainers();
    viewerContainer.style.display = "block";
  });

  // Initially hide the developerContainer
  document.addEventListener("DOMContentLoaded", function () {
    hideAllContainers(); // Hide everything
    dashboardContainer.style.display = "block"; // Show only the admin dashboard initially
  });
}
sidebarListContainerShow();

// ======================Developer Post Container================
function eachDeveloperPostShow() {
  const postContainer = document.querySelector(".eachDeveloperPosts");
  const postContainerRow = document.querySelector(".eachDeveloperPosts .developerPost-row");
  const developerPostBtn = document.querySelectorAll(".postCountBtn");


  developerPostBtn.forEach((btns) => {
    btns.addEventListener("click", () => {
      postContainer.style.display = "block";
      const user = JSON.parse(btns.getAttribute("user"));
      if(user.posts.length > 0){
      postContainerRow.innerHTML = `${user.posts.map(post => {
        return `
            
                <div class="developerPost-box">
                    <img src="${post.thumbnail}" alt="Profile Picture" class="postThumbnail">
                    <p>ID: ${post._id}</p>
                    <p>Username: ${user.userName}</p>
                    <p>Postname: ${post.postName}</p>
                    <div class="postBtns">
                        
                        <button class="seePostDetailBtn" postId="${post._id}">See</button>
                        <button class="postDeleteBtn" postId="${post._id}">Delete</button>
                    </div>
                </div>
                
            
        `;}).join('')}`;
      
      // ==============Post Detail===============
      function postDetail(){
        const postSeebtn = document.querySelectorAll(".seePostDetailBtn");
        postSeebtn.forEach((btn)=>{
          btn.addEventListener("click",()=>{
            const postDetailedBox = document.querySelector("#postDetailedBox")
            postDetailedBox.style.display = "block"
            const userPostId = btn.getAttribute("postId")
            // console.log(userPostId);
            
            
            user.posts.forEach((post)=>{
              if(post._id == userPostId){
                let count = 0;
                post.like.forEach((like)=>{
                  count++
                })
                
                postDetailedBox.innerHTML = ` <div class="postDetailedBoxSet">
          <div class="postBox">
            <div class="closeBtn">
              <p>&#x2702;</p>
            </div>
            <div class="postInfoBox">
              
              <div class="postThumbnail">
                <img src="${post.thumbnail}" alt="">
              </div>
              <div class="multiPicPostBox">
              ${post.images.map((img) => `
    <div class="pics">
      <img src="${img.url}" alt="">
    </div>
  `).join('')}
                
                
              </div>
              <div class="userAndPostInfoBox">
                <div class="likeBox">
                  <div class="likeContainer">
                    <span class="likeButton" id="likeButton">
                      <i class="heartIcon" id="heartIcon"></i>
                      <span class="likeCount" id="likeCount">${count}</span>
                    </span>
                  </div>
                </div>
                <div class="userInfo">
                  <div class="profilePic">
                    <img src="${user.dp}" alt="">
                  </div>
                  <div class="userName"><h2>${user.userName}</h2></div>
                </div>
                <div class="postInfo">
                  <div class="postName">
                    <h1>${post.postName}</h1>
                  </div>
                </div>
                <div class="followBtnAndDownloadBtn">
                  
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

                
              }
            })
            

            const closeBtn = document.querySelector(".closeBtn")
            closeBtn.addEventListener("click",()=>{
              postDetailedBox.style.display = "none"
            })
          })
        })
      }
      postDetail()
      //===========Post delete================
      const postDeleteBtn = document.querySelectorAll(".postDeleteBtn")
      postDeleteBtn.forEach((btn)=>{
        btn.addEventListener("click",async ()=>{
          const postId = btn.getAttribute("postId")
          const respons = await fetch(`/admin/userPostDelete/${postId}`)
          if(respons.ok){
            const postBox = btn.closest(".developerPost-box")
            postBox.remove();
          }
          else{
            console.log("post not deleted")
          }
        })
      })
      }else{
        const dontHavePost = document.querySelector(".eachDeveloperPosts h1")
        dontHavePost.style.display = "block";
      }
      const postContainerCloseBtn = document.querySelector(
        ".eachDeveloperPostsClose .closeBtn"
      );
      postContainerCloseBtn.addEventListener("click", () => {
        postContainer.style.display = "none";
      });
    });
  });


}
eachDeveloperPostShow();

//===========userDelete==============
function userDelete(){
  const userDeleteBtn = document.querySelectorAll(".removeUser");

userDeleteBtn.forEach((btn) => {
  btn.addEventListener("click", async () => {
    const userId = btn.getAttribute("userId");

    // Show a confirmation prompt
    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/admin/deleteUser/${userId}`);

      if (res.ok) {
        const userItem = btn.closest(".removeUserBox");
        if (userItem) {
          userItem.remove();
        } else {
          console.warn("user box not found");
        }
      } else {
        console.error("not delete");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
});
}
userDelete();

// ============Edit user detail==========
function editUserDetail(){
  const userEditForm = document.querySelector(".modalUserProfile")
  const editBtn = document.querySelectorAll(".userEditBtn")

  editBtn.forEach((btn)=>{
    btn.addEventListener("click",()=>{
      const userId = JSON.parse(btn.getAttribute("user"))
      // console.log(userId);
      
      userEditForm.innerHTML = `<div class="modal-content">
          <span id="closeBtn" class="closeBtnUserProfile">&#x2702;</span>
          <h2>Update User A/c</h2>
          <form action="/admin/updateUserProfile" method="post">
            <input type="text" name="userId" style="position:absolute; top:-100%;" value="${userId._id}" readonly>
            <input type="text" name="userName" placeholder="Change userName ?" >
                <input type="text" name="fullName" placeholder="Change fullName ?">
                <input type="email" name="email" placeholder="Change Email ?" >
                <select name="role" id="">
                  <option value="" disabled selected>change role?</option>
                  <option value="developer">developer</option>
                  <option value="viewer">viewer</option>
                </select>
            <div class="submitBtn">
              <button type="submit" class="submitForm">Submit</button>
            </div>
          </form>

        </div>`
        userEditForm.style.display = "block"
      
        const closeBtn = document.querySelector(".closeBtnUserProfile");
        closeBtn.addEventListener("click",()=>{
          userEditForm.style.display = "none"
        })

        window.addEventListener("click",(e)=>{
          if(e.target === userEditForm){
            userEditForm.style.display = "none"
          }
        })
    })
  })
}
editUserDetail()
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
  if(successMsgFromBackend){
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
