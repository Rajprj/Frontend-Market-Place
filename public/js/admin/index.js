
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
        dashboardContainer.style.display = "block";  // Show the main dashboard
    });

    // Show developer container when Developer Management is clicked
    developerManagement.addEventListener("click", function () {
        hideAllContainers();
        developerContainer.style.display = "block";  // Show the developer management section
    });

    viewerManagement.addEventListener("click", () => {
        hideAllContainers();
        viewerContainer.style.display = "block";
    })

    // Initially hide the developerContainer
    document.addEventListener("DOMContentLoaded", function () {
        hideAllContainers(); // Hide everything
        dashboardContainer.style.display = "block"; // Show only the admin dashboard initially
    });
}
sidebarListContainerShow();


// ======================Developer Post Container================
function eachDeveloperPostShow() {
    const postContainer = document.querySelector('.eachDeveloperPosts');
    const developerPostBtn = document.querySelectorAll('.post-count-btn');
    const postContainerCloseBtn = document.querySelector('.eachDeveloperPostsClose .closeBtn');

    developerPostBtn.forEach((btns) => {
        btns.addEventListener("click", () => {
            postContainer.style.display = "block";
        })
    })

    postContainerCloseBtn.addEventListener("click", () => {
        postContainer.style.display = "none";
    })
}
eachDeveloperPostShow();
