import { ConfigModule, ConfigService } from "@nestjs/config";
import { MailgunModule } from "nestjs-mailgun";
import { Module } from "@nestjs/common";
import { MailService } from "./mail.service";
import { MailController } from "./mail.controller";
import { getMailgunConfig } from "src/config/mailgun.config";

@Module({
	imports: [
		ConfigModule.forRoot(),
		MailgunModule.forAsyncRoot({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMailgunConfig,
		}),
	],
	providers: [MailService],
	controllers: [MailController],
	exports: [MailService],
})
export class MailModule {}
