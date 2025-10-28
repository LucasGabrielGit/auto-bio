
import type { Bio } from "@/lib/api/bios"
import { motion } from "framer-motion"
import {
    ExternalLink,
    Heart,
    Github,
    Twitter,
    Instagram,
    Facebook,
    Youtube,
    Linkedin,
    Mail,
    MapPin,
    Camera,
    Globe,
    Briefcase,
    Award,
    Building
} from "lucide-react"
import ReactMarkdown from "react-markdown"
import { Separator } from "../ui/separator"
import type { JSX } from "react"

type TemplateProfissionalProps = {
    bio: Bio
}

export const TemplateProfissional = ({ bio }: TemplateProfissionalProps) => {

    const getPlatformIcon = (label: string) => {
        const iconMap: Record<string, JSX.Element> = {
            github: <Github className="w-5 h-5" />,
            twitter: <Twitter className="w-5 h-5" />,
            instagram: <Instagram className="w-5 h-5" />,
            facebook: <Facebook className="w-5 h-5" />,
            youtube: <Youtube className="w-5 h-5" />,
            linkedin: <Linkedin className="w-5 h-5" />,
            email: <Mail className="w-5 h-5" />,
            website: <Globe className="w-5 h-5" />,
            portfolio: <Camera className="w-5 h-5" />,
            other: <MapPin className="w-5 h-5" />
        }
        return iconMap[label.toLowerCase()] || <Globe className="w-5 h-5" />
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-gray-50 to-slate-100">
            <div className="container mx-auto px-4 py-12 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white shadow-lg rounded-lg overflow-hidden mb-8"
                >
                    <div className="bg-linear-to-r from-slate-700 to-slate-900 px-8 py-12 text-white">
                        <div className="flex items-center space-x-6">
                            <div className="bg-white/10 p-4 rounded-full">
                                <Briefcase className="w-8 h-8" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold mb-2">{bio.title}</h1>
                                <div className="flex items-center space-x-4 text-slate-200">
                                    <div className="flex items-center space-x-2">
                                        <Building className="w-4 h-4" />
                                        <span>Criado por {bio.user?.name || 'Usuário'}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Award className="w-4 h-4" />
                                        <span>{new Date(bio.createdAt).toLocaleDateString('pt-BR')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white shadow-lg rounded-lg p-8 mb-8"
                >
                    <div className="prose prose-lg prose-slate max-w-none">
                        <div className="text-slate-700 leading-relaxed">
                            <ReactMarkdown
                                components={{
                                    h1: ({ children }) => <h1 className="text-2xl font-bold text-slate-800 mb-4">{children}</h1>,
                                    h2: ({ children }) => <h2 className="text-xl font-semibold text-slate-700 mb-3">{children}</h2>,
                                    h3: ({ children }) => <h3 className="text-lg font-medium text-slate-600 mb-2">{children}</h3>,
                                    p: ({ children }) => <p className="mb-4 text-slate-600 leading-relaxed">{children}</p>,
                                    ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
                                    li: ({ children }) => <li className="text-slate-600">{children}</li>,
                                    strong: ({ children }) => <strong className="font-semibold text-slate-800">{children}</strong>,
                                }}
                            >
                                {bio.content}
                            </ReactMarkdown>
                        </div>
                    </div>
                </motion.div>

                {bio.links && bio.links.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-white shadow-lg rounded-lg p-8 mb-8"
                    >
                        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                            <Globe className="w-6 h-6 mr-3 text-slate-600" />
                            Contatos Profissionais
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {bio.links.map((link) => (
                                <a
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center p-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 rounded-lg transition-all duration-300 hover:shadow-md"
                                >
                                    <div className="p-2 bg-slate-600 text-white rounded-lg group-hover:bg-slate-700 transition-colors">
                                        {getPlatformIcon(link.label)}
                                    </div>
                                    <div className="flex-1 ml-4">
                                        <div className="font-semibold text-slate-800">{link.label}</div>
                                        <div className="text-sm text-slate-500">{link.platform}</div>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-center bg-white shadow-lg rounded-lg p-6"
                >
                    <div className="flex items-center justify-center space-x-2 text-slate-600 mb-2">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="text-sm font-medium">Criado com AutoBio</span>
                    </div>
                    <p className="text-xs text-slate-500">
                        Crie sua biografia profissional em{' '}
                        <a href="/" className="text-slate-700 hover:text-slate-900 font-medium hover:underline transition-colors">
                            autobio.app
                        </a>
                    </p>
                </motion.div>
            </div>
        </div>
    )
}
