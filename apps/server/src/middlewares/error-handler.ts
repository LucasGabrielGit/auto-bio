import type { FastifyError, FastifyRequest, FastifyReply } from "fastify";
import { ZodError } from "zod";

export interface AppError extends Error {
  statusCode?: number;
  code?: string;
}

export class CustomError extends Error implements AppError {
  public statusCode: number;
  public code?: string;

  constructor(message: string, statusCode: number = 500, code?: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.name = "CustomError";
  }
}

export const errorHandler = (
  error: FastifyError | AppError | ZodError,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  // Log do erro para monitoramento
  request.log.error({
    error: {
      message: error.message,
      stack: error.stack,
      statusCode: (error as AppError).statusCode,
    },
    request: {
      method: request.method,
      url: request.url,
      headers: request.headers,
      ip: request.ip,
    },
  }, "Request error");

  // Tratamento específico para erros de validação Zod
  if (error instanceof ZodError) {
    return reply.status(400).send({
      error: "Validation Error",
      message: "Dados inválidos fornecidos",
      details: error.issues.map(err => ({
        field: err.path.join("."),
        message: err.message,
        code: err.code,
      })),
      statusCode: 400,
    });
  }

  // Tratamento para erros customizados
  if (error instanceof CustomError) {
    return reply.status(error.statusCode).send({
      error: error.name,
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
    });
  }

  // Tratamento para erros do Fastify
  if ("statusCode" in error && error.statusCode) {
    return reply.status(error.statusCode).send({
      error: error.name || "Request Error",
      message: error.message,
      statusCode: error.statusCode,
    });
  }

  // Tratamento para erros de JWT
  if (error.message?.includes("jwt") || error.message?.includes("token")) {
    return reply.status(401).send({
      error: "Authentication Error",
      message: "Token inválido ou expirado",
      statusCode: 401,
    });
  }

  // Tratamento para erros de banco de dados
  if (error.message?.includes("Prisma") || error.message?.includes("database")) {
    return reply.status(500).send({
      error: "Database Error",
      message: "Erro interno do servidor",
      statusCode: 500,
    });
  }

  // Erro genérico do servidor
  return reply.status(500).send({
    error: "Internal Server Error",
    message: "Erro interno do servidor",
    statusCode: 500,
  });
};

// Middleware para capturar erros não tratados
export const notFoundHandler = (request: FastifyRequest, reply: FastifyReply) => {
  return reply.status(404).send({
    error: "Not Found",
    message: `Rota ${request.method} ${request.url} não encontrada`,
    statusCode: 404,
  });
};