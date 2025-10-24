import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifyHelmet from "@fastify/helmet";
import fastifyRateLimit from "@fastify/rate-limit";
import fastifySensible from "@fastify/sensible";

import { env } from "./lib/env";
import { userRoutes } from "./routes/auth";
import { healthRoutes } from "./routes/health";
import { errorHandler, notFoundHandler } from "./middlewares/error-handler";
import { sanitizationMiddleware } from "./middlewares/validation";

const app = fastify({
  logger: {
    level: env.LOG_LEVEL,
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
});

async function bootstrap() {
  try {
    await app.register(fastifyHelmet, {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
        },
      },
    });

    await app.register(fastifyCors, {
      origin: env.CORS_ORIGIN === "*" ? true : env.CORS_ORIGIN.split(","),
      credentials: true,
    });

    await app.register(fastifyRateLimit, {
      max: parseInt(env.RATE_LIMIT_MAX),
      timeWindow: env.RATE_LIMIT_WINDOW,
      errorResponseBuilder: (_request, context) => {
        return {
          error: "Rate Limit Exceeded",
          message: `Muitas requisições. Tente novamente em ${Math.round(context.ttl / 1000)} segundos.`,
          statusCode: 429,
        };
      },
    });

    await app.register(fastifySensible);

    await app.register(fastifyJwt, {
      secret: env.JWT_SECRET,
      sign: {
        expiresIn: env.JWT_EXPIRES_IN,
      },
    });

    app.addHook("preHandler", sanitizationMiddleware);

    await app.register(healthRoutes);
    await app.register(userRoutes, { prefix: "/auth" });

    app.setNotFoundHandler(notFoundHandler);
    app.setErrorHandler(errorHandler);

    const port = parseInt(env.PORT);
    await app.listen({ port, host: "0.0.0.0" });

    app.log.info(`🚀 Servidor rodando na porta ${port}`);
    app.log.info(`📊 Health check disponível em http://localhost:${port}/health`);

  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

process.on("SIGINT", async () => {
  app.log.info("Recebido SIGINT, encerrando servidor...");
  await app.close();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  app.log.info("Recebido SIGTERM, encerrando servidor...");
  await app.close();
  process.exit(0);
});

bootstrap();