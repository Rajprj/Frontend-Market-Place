import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true, 
  auth: {
    user: "frontendmarketplace561@gmail.com",
    pass: "vgkv eepf vzij swij" // Ensure you use App Password or enable Less Secure App Access
  },
});

// async..await is not allowed in global scope, must use a wrapper
export async function sendMail(email,data) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "frontendmarketplace561@gmail.com", // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    // text:"Revivemart otp:",otp // plain text body
    html: data, // html body

  });

}


