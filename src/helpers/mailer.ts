import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs'
export const sendEmail= async( {email,emailType,userId}:any)=>{
    try {
       const hashedToken = await bcryptjs.hash(userId.toString(),10)
        if(emailType==="VERIFY"){
          console.log("Verify Section")  
         
         const updatedUser = await User.findByIdAndUpdate
         (userId,{
            $set:{verifyToken:hashedToken,

              verifyTokenEpiry:new Date(Date.now()+3600000)}});
              console.log("updated User for Verify",updatedUser)



      }else if(emailType==="RESET"){
        await User.findByIdAndUpdate(userId,{
          $set:{forgotPasswordToken:hashedToken,
          forgotPasswordTokenExpiry:new Date(Date.now()+3600000)} 
      })};



      const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "a698066d5acf45",//
          pass: "********c1e2"//
        }
      });
          const mailOptions={
            from: 'nnpervez333@gmail.com', // sender address
            to: email, // list of receivers
            subject:emailType==='VERIFY'? 'Verify your email':"Reset your password", // Subject line
            html:`<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to 
            ${emailType==="VERIFY" ? "verify your email": 
            "reset your password"}
            or copy and paste the link below in your browser.<br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`,
          }
          const mailResponse = await transport.sendMail(mailOptions)
          return mailResponse

    } catch (error:any) {
        throw new Error (error.message)
        
    }
}