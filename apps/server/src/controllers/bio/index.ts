import type { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../../lib/prisma/client/db";
import { createBioSchema, updateBioSchema, generateContentSchema, type CreateBioType, type UpdateBioType, type GenerateContentType } from "../../shcemas/bio-schema";
import { openai } from "../../utils/openai";

export class BioController {

    async create(req: FastifyRequest<{ Body: CreateBioType }>, res: FastifyReply) {
        try {
            const data = createBioSchema.parse(req.body);

            const publicUrl = data.publicUrl || `${req.user.id.slice(0, 5)}-${data.title.toLowerCase().replace(/\s+/g, "-")}`

            const bio = await db.bio.create({
                data: {
                    userId: req.user.id,
                    title: data.title,
                    content: data.content,
                    style: data.style,
                    template: data.template || "minimalista",
                    links: data.links || [],
                    publicUrl: publicUrl,
                    isPublic: data.isPublic || false,
                }
            })

            return res.status(201).send({
                message: "Bio criada com sucesso",
                bio,
            })
        } catch (error: any) {
            if (error instanceof Error && "issues" in error) {
                return res.status(400).send({
                    message: "Erro na validação dos dados",
                    errors: error.issues,
                })
            }

            return res.status(500).send({
                message: "Erro interno no servidor",
                error: error?.message ?? "Falha na comunicação com o modelo de IA",
            })
        }
    }

    async generateContent(req: FastifyRequest<{ Body: GenerateContentType }>, res: FastifyReply) {
        try {
            const data = generateContentSchema.parse(req.body);
            const prompt = `Crie uma bio ${data.style} para redes sociais com o título: ${data.title}. Deve soar natural e atrativa!`

            const completion = await openai?.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [{ role: "system", content: "Você é um assistente que cria bios para redes sociais." }, { role: "user", content: prompt }],
            })

            const generatedBio = completion?.choices[0]?.message.content ?? "Não foi possível gerar uma bio."
            return res.status(200).send({
                message: "Bio gerada com sucesso",
                bio: generatedBio,
            })
        } catch (error: any) {
            if (error instanceof Error && "issues" in error) {
                return res.status(400).send({
                    message: "Erro na validação dos dados",
                    errors: error.issues,
                })
            }
        }
    }

    async get(req: FastifyRequest<{ Params: { slug: string } }>, res: FastifyReply) {
        try {
            const bio = await db.bio.findUnique({
                where: { publicUrl: req.params.slug }, select: {
                    id: true,
                    title: true,
                    content: true,
                    style: true,
                    template: true,
                    links: true,
                    publicUrl: true,
                    isPublic: true,
                    views: true,
                    createdAt: true,
                    updatedAt: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                        }
                    }
                }
            });
            if (!bio) return res.status(404).send({ message: "Bio não encontrada" });

            await db.bio.update({
                where: { id: bio.id },
                data: { views: { increment: 1 } }
            });

            return res.send(bio);
        } catch (error) {
            return res.status(500).send({ message: "Erro ao buscar bio" });
        }
    }

    async list(req: FastifyRequest, res: FastifyReply) {
        try {
            const bios = await db.bio.findMany({
                where: { userId: req.user.id },
                orderBy: { createdAt: "desc" },
                select: {
                    id: true,
                    title: true,
                    content: true,
                    style: true,
                    template: true,
                    links: true,
                    publicUrl: true,
                    isPublic: true,
                    views: true,
                    createdAt: true,
                    updatedAt: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                        }
                    }
                }
            });
            return res.send(bios);
        } catch (error) {
            return res.status(500).send({ message: "Erro ao listar bios" });
        }
    }

    async delete(req: FastifyRequest<{ Params: { slug: string } }>, res: FastifyReply) {
        try {
            const bio = await db.bio.findUnique({ where: { publicUrl: req.params.slug } });
            if (!bio) return res.status(404).send({ message: "Bio não encontrada" });
            if (bio.userId !== req.user.id)
                return res.status(403).send({ message: "Sem permissão para excluir esta bio" });

            await db.bio.delete({ where: { publicUrl: req.params.slug } });
            return res.status(200).send({ message: "Bio excluída com sucesso" });
        } catch (error) {
            return res.status(500).send({ message: "Erro ao excluir bio" });
        }
    }

    async update(
        req: FastifyRequest<{ Params: { slug: string }; Body: UpdateBioType }>,
        res: FastifyReply
    ) {
        try {
            const data = updateBioSchema.parse(req.body);

            const bio = await db.bio.findUnique({ where: { publicUrl: req.params.slug } });

            if (!bio) return res.status(404).send({ message: "Bio não encontrada" });
            if (bio.userId !== req.user.id)
                return res.status(403).send({ message: "Sem permissão para editar esta bio" });

            const updated = await db.bio.update({
                where: { id: bio.id },
                data: {
                    title: data.title ?? bio.title,
                    style: data.style ?? bio.style,
                    template: data.template ?? bio.template,
                    content: data.content ?? bio.content,
                    publicUrl: data.publicUrl ?? bio.publicUrl,
                    isPublic: data.isPublic ?? bio.isPublic,
                    links: data.links ? JSON.parse(JSON.stringify(data.links)) : bio.links,
                },
            });

            return res.send({ message: "Bio atualizada com sucesso", bio: updated });
        } catch (error: any) {
            if (error instanceof Error && "issues" in error) {
                return res.status(400).send({
                    message: "Erro na validação dos dados",
                    errors: error.issues,
                })
            }
            return res.status(500).send({ message: "Erro ao atualizar bio" });
        }
    }

    async getById(req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply) {
        try {
            const id = req.params.id;

            const bio = await db.bio.findUnique({
                where: {
                    id,
                }
            })

            if (!bio) {
                return res.status(404).send({
                    message: "Bio não encontrada",
                })
            }

            return res.status(200).send({
                message: "Bio encontrada com sucesso",
                bio,
            })
        } catch (error) {
            return res.status(500).send({
                message: "Erro interno no servidor",
            })
        }
    }
}
