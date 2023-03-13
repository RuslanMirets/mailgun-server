import { ConfigService } from "@nestjs/config";

export const getMailgunConfig = async (configService: ConfigService) => ({
	username: "api",
	key: configService.get("MAILGUN_API_KEY"),
});
