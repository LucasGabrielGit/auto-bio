import type { FastifyInstance } from "fastify";
import { BioController } from "../controllers/bio";
import { authMiddleware } from "../middlewares/auth";

export async function bioRoutes(fastify: FastifyInstance) {
    const bioController = new BioController();
    fastify.post("/save", {
        preHandler: authMiddleware,
        handler: bioController.create,
    })
    fastify.get("/u/:slug", {
        preHandler: authMiddleware,
        handler: bioController.get,
    })
    fastify.get("/all", {
        preHandler: authMiddleware,
        handler: bioController.list,
    })
    fastify.put("/update/:slug", {
        preHandler: authMiddleware,
        handler: bioController.update,
    })
    fastify.delete("/delete/:slug", {
        preHandler: authMiddleware,
        handler: bioController.delete,
    })

}