import { ConfigService } from "@nestjs/config";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { MailgunService } from "nestjs-mailgun";
import { CreateMailDto } from "./dto/create-mail.dto";

@Injectable()
export class MailService {
	constructor(
		private mailgunService: MailgunService,
		private configService: ConfigService,
	) {}

	async create(dto: CreateMailDto) {
		const domain = this.configService.get("MAILGUN_DOMAIN");

		const data = {
			from: "Excited User <mailgun@sandbox-123.mailgun.org>",
			to: [`${dto.email}`],
			subject: `${dto.subject}`,
			html: `<p>${dto.message}</p>`,
		};

		return await this.mailgunService
			.createEmail(domain, data)
			.catch((error) => {
				throw new ForbiddenException(error);
			});
	}
}
