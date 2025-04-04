import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpire: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "0f601b0dadbc91",
        pass: "2ba5bf10a5f918",
      },
    });

    const mailOptions = {
      from: "aigen@tec.ai", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
      text: "mail content", // plain text body
      html: `<p>click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email " : "reset your password"
      } or copy and paste the link below in your browser <br> ${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}</p>`, // html body
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
