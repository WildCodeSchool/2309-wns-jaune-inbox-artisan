import nodemailer from 'nodemailer';

const sendMail = async (receiver: string, email: string) => {
	console.log(process.env.SMTP_SENDIN, process.env.SMTP_PORT_SENDIN);

	const transporter = nodemailer.createTransport({
		host: process.env.SMTP_SENDIN,
		port: Number(process.env.SMTP_PORT_SENDIN),
		secure: false,
		auth: {
			user: process.env.SMTP_SENDIN_USER,
			pass: process.env.SMTP_SENDIN_PASSWORD,
		},
	});

	const mailOptions = {
		from: 'artisaninbox@gmail.com',
		to: receiver, //this is the address to which the email will be sent
		subject: 'this is an test email form inbox artisan.',
		html: email,
		body: email,
	};

	const send = await transporter.sendMail(mailOptions);

	console.log('send mail :', send);
};

export default sendMail;
