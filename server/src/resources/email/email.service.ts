import nodemailer from 'nodemailer'

class EmailService {
	private transporter

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: Number(process.env.SMTP_PORT),
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD
			}
		})
	}

	async sendVerifyingEmail(emailTo: string, link: string) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to: emailTo,
			subject: `Account verifying on ${process.env.API_URL}`,
			text: '',
			html: `
                <div>
                    <h1>For verifying follow the <a href="${link}">link</a></h1>
                </div>
            `
		})
	}
}

export default new EmailService()
