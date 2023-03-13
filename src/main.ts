import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { PrismaService } from "./prisma.service";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const prismaService = app.get(PrismaService);
	await prismaService.enableShutdownHooks(app);

	app.enableCors();

	app.setGlobalPrefix("api");

	app.useGlobalPipes(new ValidationPipe());

	await app.listen(5000);
	console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
