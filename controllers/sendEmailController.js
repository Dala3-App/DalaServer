let nodemailer = require('nodemailer');
let Port = require('../config/port');



module.exports = function sendMail(userData, link, message,buttonMessage) {

    // console.log(request.get('host'))
    console.log(userData, "userData")
    let mailerConfig = {
        host: "sg2plcpnl0026s.prod.sin2.secureserver.net",
        secure: true,
        port: 465,
        auth: {
            user: "noreply@dala3.ae",
            pass: "d@l@123456"
        }
    };
    let transporter = nodemailer.createTransport(mailerConfig);

    console.log({
        from: mailerConfig.auth.user,
        to: userData.email,
    }) 

    let mailOptions = {
        from: mailerConfig.auth.user,
        to: userData.email,
        subject: 'verification email',
        html: `<html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
        </head>
        <body>
            <div style="padding-bottom: 5%;background: #07adb9; font-family: Comic Sans MS; color: white;">
                <div style="padding-top: 5%;padding-bottom: 5%;width: 100%;text-align: center;">
                    <div>Verification Email</div>
                </div>
                <center>
                    <form style=" width: 80% ;  background: #07adb9 ; border-radius: 10px;border: 2px solid white;">
                        <img src="http://www.dala3.ae/wp-content/uploads/2019/12/dala3w.png" style="width: 30%;padding: 5%;" alt="Coin Grace" href="./logo.png">
                        <div style="color: black;width: 80%;font-weight: bold;">Hello ${userData.username}</div>
                        <div style="color: black;width: 80%;">${message} </div>
                            <div style=" width: 90%; margin-top: 5%;margin-bottom: 5%;width: 90%;color: white;background: #01a7f0;padding: 5%;border-radius: 12px;border: none; font-family: Comic Sans MS;">
                            <a href=${link} >${buttonMessage}</a>
                            </div>
                        <div style="color: white;width: 100%; font-size: 12px; padding-bottom: 5%">If you did not apply, you can ignore
                            <br />this email.</div>
                            </form>
                </center>
                <div style="color: white; font-size: 12px; padding-top: 12px ; text-align: center">feel free to contact us at
                    any
                    time on info@dala3.ae</div>
            </div>
        </body>
        </html>`
    };


    transporter.sendMail(mailOptions, function (error, success) {
        if (error) {
            console.log('error:', error);
            return error
        } else {
            console.log('good');
            return success
        }
    })


}



// let functions = {


//     // submitEmail: function (sendToEmail, userData, ) {

//     // },


//     sendEmail: function (req, res) {
//         var link = 'www.youtube.com'
//         let mailerConfig = {
//             host: "sg2plcpnl0026.prod.sin2.secureserver.net",
//             secure: true,
//             port: 465,
//             auth: {
//                 user: "noreply@dala3.ae",
//                 pass: "d@l@123456"
//             }
//         };
//         let transporter = nodemailer.createTransport(mailerConfig);

//         let mailOptions = {
//             from: mailerConfig.auth.user,
//             to: 'mzk03464@gmail.com',
//             subject: 'verification email',
//             html: `<html lang="en">
//             <head>
//                 <meta charset="UTF-8">
//                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                 <meta http-equiv="X-UA-Compatible" content="ie=edge">
//             </head>
//             <body>
//                 <div style="padding-bottom: 5%;background: #07adb9; font-family: Comic Sans MS; color: white;">
//                     <div style="padding-top: 5%;padding-bottom: 5%;width: 100%;text-align: center;">
//                         <div>Verification Email</div>
//                     </div>
//                     <center>
//                         <form style=" width: 80% ;  background: #07adb9 ; border-radius: 10px;border: 2px solid white;">
//                             <img src="http://www.dala3.ae/wp-content/uploads/2019/12/dala3w.png" style="width: 30%;padding: 5%;" alt="Coin Grace" href="./logo.png">
//                             <div style="color: black;width: 80%;font-weight: bold;">Hello sabih siddiqui</div>
//                             <div style="color: black;width: 80%;">In order to start using your Dala3 account, you need to activate
//                                 this
//                                 account </div>
//                             <button 
//                                 style="    margin-top: 5%;margin-bottom: 5%;width: 90%;color: white;background: #01a7f0;padding: 5%;border-radius: 12px;border: none; font-family: Comic Sans MS;">Start
//                                 using your Account
//                                 <a href=${link}>Click here to verify</a>
//                                  </button>
//                             <div style="color: white;width: 100%; font-size: 12px; padding-bottom: 5%">If you did not signup for
//                                 this
//                                 account you can ignore
//                                 <br />this email and the account will be deleted soon</div>

//                                 </form>
//                     </center>
//                     <div style="color: white; font-size: 12px; padding-top: 12px ; text-align: center">feel free to contact us at
//                         any
//                         time on info@dala3.ae</div>
//                 </div>
//             </body>
//             </html>`
//         };

//         transporter.sendMail(mailOptions, function (error, success) {
//             if (error) {
//                 console.log('error:', error);
//                 res.send({ error })
//             } else {
//                 console.log('good');
//                 res.send({ success })
//             }
//         })
//     }


// }

// module.exports = functions