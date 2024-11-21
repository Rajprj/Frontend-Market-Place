const submitUserName = document.querySelector(".submitUserName")
const otpBox = document.querySelector(".otpBox")
submitUserName.addEventListener("click",async ()=>{
    const username = document.querySelector('input[name="userName"]').value.trim();
    
    const res = await fetch(`/users/forgetPasswordUser/${username}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({}) // Pass an empty body or necessary data
    });
    if (res.status) {
        const userEmail = await res.json();
        if(userEmail.email){
            const maskEmail = (email) => {
                const [name, domain] = email.split("@");
                const maskedName = name[0] + name.slice(1, 3) + "*".repeat(name.length - 3)
                return `${maskedName}@${domain}`;
            };
            const maskedEmail = maskEmail(userEmail.email);
            otpBox.innerHTML = `<p style="margin-bottom: 10px;">otp send on this email ${maskedEmail}</p>
                    <div class="input_fields">
                        <span><img src="/images/sidebarImages/user.png" alt=""></span>
                        <input type="number" name="userName" placeholder="Submit otp..." required>
                    </div>
                    <div class="submit_btn">
                        <button type="submitOtp">Submit</button>
                        <button type="resendOtp">resend?</button>
                    </div>`
        }
        const generateOTP = () => {
            return Math.floor(1000 + Math.random() * 9000);
        };
        const otp = generateOTP();
          
    } else {
        const error = await res.json();
        console.error("Error:", error.message);
    }
    
    
})