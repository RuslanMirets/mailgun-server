import { MailService } from "./mail.service";
import { Body, Controller, Post } from "@nestjs/common";
import { CreateMailDto } from "./dto/create-mail.dto";

@Controller("mail")
export class MailController {
	constructor(private mailService: MailService) {}

	@Post("send")
	async create(@Body() dto: CreateMailDto) {
		return this.mailService.create(dto);
	}
}
