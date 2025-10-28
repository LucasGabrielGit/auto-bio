import type { Bio } from "@/lib/api/bios"
import { motion } from "framer-motion"
import {
    Camera,
    Circle,
    Dot,
    ExternalLink,
    Facebook,
    Github,
    Globe,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    Minus,
    Plus,
    Square,
    Triangle,
    Twitter,
    Youtube
} from "lucide-react"
import type { JSX } from "react"
import ReactMarkdown from "react-markdown"

type TemplateNeutroProps = {
    bio: Bio
}

export const TemplateNeutro = ({ bio }: TemplateNeutroProps) => {

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
        <div className="min-h-screen bg-linaer-to-br from-gray-50 via-stone-50 to-slate-100 relative">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        rotate: [0, 360],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-20 right-20 w-32 h-32 border border-gray-200 rounded-full"
                />

                <motion.div
                    animate={{
                        rotate: [360, 0],
                        opacity: [0.05, 0.15, 0.05]
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute bottom-32 left-16 w-24 h-24 border border-gray-300"
                />

                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/2 left-1/4 w-16 h-16 bg-gray-200 rounded-full"
                />
            </div>

            <div className="container mx-auto px-6 py-16 max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative mb-16"
                >
                    <div className="bg-white/70 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 overflow-hidden">
                        <div className="px-12 py-16 text-center">
                            <div className="flex items-center justify-center mb-8">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                                    className="relative"
                                >
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
                                        <Circle className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gray-300 rounded-full"></div>
                                </motion.div>
                            </div>

                            <motion.h1
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                className="text-4xl font-light mb-4 text-gray-800 tracking-wide"
                            >
                                {bio.title}
                            </motion.h1>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.7, duration: 0.6 }}
                                className="flex items-center justify-center space-x-6 text-sm text-gray-500"
                            >
                                <div className="flex items-center space-x-2">
                                    <Dot className="w-3 h-3 text-gray-400" />
                                    <span>{bio.user?.name || 'Usuário'}</span>
                                </div>
                                <div className="w-px h-4 bg-gray-300"></div>
                                <div className="flex items-center space-x-2">
                                    <Dot className="w-3 h-3 text-gray-400" />
                                    <span>{new Date(bio.createdAt).toLocaleDateString('pt-BR')}</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-white/70 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 p-12 mb-12"
                >
                    <div className="prose prose-lg prose-gray max-w-none">
                        <div className="text-gray-700 leading-relaxed">
                            <ReactMarkdown
                                components={{
                                    h1: ({ children }) => (
                                        <h1 className="text-2xl font-light text-gray-800 mb-6 pb-3 border-b border-gray-200 flex items-center">
                                            <Minus className="w-4 h-4 text-gray-400 mr-3" />
                                            {children}
                                        </h1>
                                    ),
                                    h2: ({ children }) => (
                                        <h2 className="text-xl font-light text-gray-700 mb-4 flex items-center">
                                            <Plus className="w-4 h-4 text-gray-400 mr-3" />
                                            {children}
                                        </h2>
                                    ),
                                    h3: ({ children }) => (
                                        <h3 className="text-lg font-light text-gray-600 mb-3 flex items-center">
                                            <Dot className="w-3 h-3 text-gray-400 mr-3" />
                                            {children}
                                        </h3>
                                    ),
                                    p: ({ children }) => (
                                        <p className="mb-6 text-gray-600 leading-relaxed text-base font-light">
                                            {children}
                                        </p>
                                    ),
                                    ul: ({ children }) => <ul className="list-none mb-6 space-y-3">{children}</ul>,
                                    li: ({ children }) => (
                                        <li className="text-gray-600 flex items-start font-light">
                                            <span className="w-2 h-2 bg-gray-300 rounded-full mt-2 mr-4 shrink-0"></span>
                                            <span>{children}</span>
                                        </li>
                                    ),
                                    strong: ({ children }) => (
                                        <strong className="font-medium text-gray-800">
                                            {children}
                                        </strong>
                                    ),
                                    blockquote: ({ children }) => (
                                        <blockquote className="border-l-2 border-gray-300 pl-6 italic text-gray-600 my-6">
                                            {children}
                                        </blockquote>
                                    ),
                                }}
                            >
                                {bio.content}
                            </ReactMarkdown>
                        </div>
                    </div>
                </motion.div>

                {bio.links && bio.links.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="bg-white/70 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 p-12 mb-12"
                    >
                        <h2 className="text-2xl font-light text-gray-800 mb-8 text-center pb-4 border-b border-gray-200 flex items-center justify-center">
                            <Square className="w-5 h-5 text-gray-400 mr-3" />
                            Conexões
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {bio.links.map((link, index) => (
                                <motion.a
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.1,
                                        ease: "easeOut"
                                    }}
                                    whileHover={{
                                        y: -2,
                                        transition: { duration: 0.2 }
                                    }}
                                    className="group"
                                >
                                    <div className="bg-white border border-gray-200 rounded-lg p-6 transition-all duration-300 group-hover:border-gray-300 group-hover:shadow-sm">
                                        <div className="flex items-center space-x-4">
                                            <div className="p-3 bg-gray-50 text-gray-600 rounded-lg group-hover:bg-gray-100 transition-all duration-300">
                                                {getPlatformIcon(link.label)}
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium text-gray-800 text-base">{link.label}</div>
                                                <div className="text-sm text-gray-500 font-light">{link.platform}</div>
                                            </div>
                                            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                                        </div>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-center bg-white/70 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 p-8"
                >
                    <div className="flex items-center justify-center space-x-3 text-gray-500 mb-3">
                        <Triangle className="w-3 h-3 text-gray-400" />
                        <span className="text-sm font-light">
                            Criado com AutoBio
                        </span>
                        <Triangle className="w-3 h-3 text-gray-400 rotate-180" />
                    </div>
                    <p className="text-xs text-gray-400 font-light">
                        Crie sua biografia em{' '}
                        <a href="/" className="text-gray-600 hover:text-gray-800 transition-colors underline decoration-gray-300 hover:decoration-gray-500">
                            autobio.app
                        </a>
                    </p>
                </motion.div>
            </div>
        </div>
    )
}