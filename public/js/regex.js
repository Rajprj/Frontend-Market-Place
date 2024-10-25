function testInput() {

  // -----zipRegex test-----

  let regexInput = document.querySelector("#zip");
  let textRegex = /^\d{6}$/;
  let resZip = document.querySelector(".result")
  regexInput.addEventListener("input", function () {
    let inputs = regexInput.value;
    
    if (inputs) {
      if (textRegex.test(inputs)) {
        resZip.innerHTML = "You entered valid ZIP code";
        resZip.style.backgroundColor = "green";
        resZip.style.color = "#fff";
      } else {
        resZip.innerHTML = "It's not valid ZIP code!";
        resZip.style.backgroundColor = "red";
        resZip.style.color = "#fff";
      }
    } else {
      resZip.innerHTML = "Enter valid ZIP code..";
      resZip.style.backgroundColor = "#d0cece";
      resZip.style.color = "#000";
    }
  });
  
  
  // -------DateRegex test-----------
  
  let dateInput = document.querySelector("#date");
  const dateRegex = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/;
  
  let resDate = document.querySelector(".dateres");
//   let result = document.querySelector(".result");

  dateInput.addEventListener("input", function () {
    let inputs = dateInput.value;

    if (inputs) {
     
      if (dateRegex.test(inputs)) {
        resDate.innerHTML = "You entered valid Date formate";
        resDate.style.backgroundColor = "green";
        resDate.style.color = "#fff";
      } else {
        resDate.innerHTML = "It's not valid Date formate!";
        resDate.style.backgroundColor = "red";
        resDate.style.color = "#fff";
      }
    } else {
      resDate.innerHTML = "Enter valid Date formate..";
      resDate.style.backgroundColor = "#d0cece";
      resDate.style.color = "#000";
    }
  });


  // ----------phoneRegex test-------------

  const phoneInput = document.querySelector("#phone")
  const phoneRegex = /^[6-9]\d{9}$/
  const resPhone = document.querySelector(".phoneRes")

  phoneInput.addEventListener("input", function () {
    let inputs = phoneInput.value;

    if (inputs) {
     
      if (phoneRegex.test(inputs)) {
        resPhone.innerHTML = "You entered valid phone formate";
        resPhone.style.backgroundColor = "green";
        resPhone.style.color = "#fff";
      } else {
        resPhone.innerHTML = "It's not valid phone formate!";
        resPhone.style.backgroundColor = "red";
        resPhone.style.color = "#fff";
      }
    } else {
      resPhone.innerHTML = "Enter valid phone formate..";
      resPhone.style.backgroundColor = "#d0cece";
      resPhone.style.color = "#000";
    }
  });

  // -----------email regex---------

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const emailInput = document.querySelector("#email")
  const resEmail = document.querySelector(".emailRes")

  emailInput.addEventListener("input", function () {
    let inputs = emailInput.value;

    if (inputs) {
     
      if (emailRegex.test(inputs)) {
        resEmail.innerHTML = "You entered valid email formate";
        resEmail.style.backgroundColor = "green";
        resEmail.style.color = "#fff";
      } else {
        resEmail.innerHTML = "It's not valid email formate!";
        resEmail.style.backgroundColor = "red";
        resEmail.style.color = "#fff";
      }
    } else {
      resEmail.innerHTML = "Enter valid email..";
      resEmail.style.backgroundColor = "#d0cece";
      resEmail.style.color = "#000";
    }
  });
  
 
}

testInput();

function showRegexBox(){

  const sideBtn = document.querySelectorAll(".parts");
  const dataBox = document.querySelectorAll(".regexParts");
  const regexBody = document.querySelector('#regexBody')
  
  sideBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetedBox = btn.getAttribute("tartget_box");
  
      dataBox.forEach((box) => {
        if(targetedBox == 'dateRegex'){
          regexBody.style.height = '190vh'
        }
        box.style.display = box.id === targetedBox ? "block" : "none";
      });
  
      sideBtn.forEach((btnClr) => {
        if (btnClr === btn) {
          btnClr.classList.add("bg_clr");
        } else {
          btnClr.classList.remove("bg_clr");
        }
      });
    });
  });
}

showRegexBox()

document.querySelectorAll('.menu ul li').forEach((item, index) => {
  item.style.setProperty('--order', index);
});