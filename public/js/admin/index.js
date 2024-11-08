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
  const developerPostBtn = document.querySelectorAll(".postCountBtn");


  developerPostBtn.forEach((btns) => {
    btns.addEventListener("click", () => {
      postContainer.style.display = "block";
      const user = btns.getAttribute("user")
      console.log(user);
      user.posts.forEach((post)=>{
        console.log(post);
        
      })
      
      
      
      postContainer.innerHTML = `
                    <div class="eachDeveloperPostsClose">
                        <div class="closeBtn">&#x2702;</div>
                    </div>
                    <div class="developerPost-row">
                        <div class="developerPost-box">
                            <img src="" alt="Profile Picture" class="postThumbnail">
                            <p>ID: 3</p>
                            <p>Username: Bob Brown</p>
                            <p>Email: bob@example.com</p>
                            <div class="postBtns">
                                <button class="postMsgBtn">Message</button>
                                <button class="postDeleteBtn">Delete</button>
                            </div>
                        </div>
                    </div>`
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
