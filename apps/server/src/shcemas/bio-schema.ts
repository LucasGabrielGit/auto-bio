import z from "zod";

const linkSchema = z
    .string()
    .refine((val) => {
        try {
            new URL(val);
            return true;
        } catch {
            return false;
        }
    }, "URL inválida");


export const createBioSchema = z.object({
    title: z.string().min(3, "Título deve ter ao menos 3 caracteres"),
    style: z.enum(["criativo", "profissional", "divertido", "neutro", "tecnológico"]),
    links: z.array(linkSchema).optional(),
})

export const updateBioSchema = z.object({
    title: z.string().min(3, "Título deve ter ao menos 3 caracteres").optional(),
    style: z.enum(["criativo", "profissional", "divertido", "neutro", "tecnológico"]).optional(),
    links: z.array(linkSchema).optional(),
    content: z.string().optional(),
})

export type CreateBioType = z.infer<typeof createBioSchema>
export type UpdateBioType = z.infer<typeof updateBioSchema>
