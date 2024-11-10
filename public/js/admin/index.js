

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
      
      postContainerRow.innerHTML = `
    
    ${user.posts.map(post => {
        return `
            
                <div class="developerPost-box">
                    <img src="${post.thumbnail}" alt="Profile Picture" class="postThumbnail">
                    <p>ID: ${post._id}</p>
                    <p>Username: ${user.userName}</p>
                    <p>Postname: ${post.postName}</p>
                    <div class="postBtns">
                        
                        <button class="postDeleteBtn">Delete</button>
                    </div>
                </div>
                
            
        `;
    }).join('')}
`;

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
          <span id="closeBtn" class="closeBtnUserProfile">&times;</span>
          <h2>Update User A/c</h2>
          <form  onsubmit="return submitForm(event)" >
            <input type="text" name="userName" placeholder="userName" value="${userId.userName}">
            <input type="text" name="fullName" placeholder="fullName" value="${userId.fullName}">
            <input type="email" name="email" placeholder="Email" value="${userId.email}">
            <select name="role" value="${userId.role}">
              <option value="developer">developer</option>
              <option value="viewer">viewer</option>
            </select>
            <div class="submitBtn">
              <button type="submit" >Submit</button>
            </div>
          </form>

        </div>`
        userEditForm.style.display = "block"
        function submitForm(event){
          event.preventDefault();
          return false;
        }

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
  let count = 0;

  if (errorMsgBox) { 
    errorMsgBox.style.display = 'flex'; 
    const timeInt = setInterval(() => {
      count++;
      msgTimeCircle.innerHTML = count;
      if (count === 5) {
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
      count++;
      msgTimeCircle.innerHTML = count;
      if (count === 3) {
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
