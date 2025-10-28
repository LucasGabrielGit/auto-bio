import type { Bio } from "@/lib/api/bios"
import { motion } from "framer-motion"
import {
    Brush,
    Camera,
    ExternalLink,
    Facebook,
    Github,
    Globe,
    Heart,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    Palette,
    Rainbow,
    Sparkles,
    Star,
    Twitter,
    Youtube,
    Zap
} from "lucide-react"
import type { JSX } from "react"
import ReactMarkdown from "react-markdown"

type TemplateCriativoProps = {
    bio: Bio
}

export const TemplateCriativo = ({ bio }: TemplateCriativoProps) => {
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
        <div className="min-h-screen bg-linear-to-br from-pink-100 via-purple-50 to-indigo-100 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        rotate: 360,
                        x: [0, 100, 0],
                        y: [0, -50, 0]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-20 left-10 w-20 h-20 bg-linear-to-br from-pink-400 to-purple-500 rounded-full opacity-20"
                />
                <motion.div
                    animate={{
                        rotate: -360,
                        x: [0, -80, 0],
                        y: [0, 60, 0]
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-1/3 right-20 w-16 h-16 bg-linear-to-br from-cyan-400 to-blue-500 rounded-full opacity-20"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute bottom-32 left-1/4 w-12 h-12 bg-linear-to-br from-yellow-400 to-orange-500 rounded-full opacity-25"
                />
            </div>

            <div className="container mx-auto px-4 py-12 max-w-5xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                    className="relative mb-12"
                >
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border-4 border-linear-to-r from-pink-300 via-purple-300 to-indigo-300">
                        <div className="bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 px-8 py-12 text-white relative">
                            <div className="absolute top-4 right-4">
                                <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
                            </div>
                            <div className="absolute bottom-4 left-4">
                                <Star className="w-5 h-5 text-pink-200 animate-bounce" />
                            </div>

                            <div className="flex items-center space-x-6">
                                <motion.div
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="relative"
                                >
                                    <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                                        <Palette className="w-8 h-8" />
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                                        <Zap className="w-3 h-3 text-yellow-800" />
                                    </div>
                                </motion.div>
                                <div>
                                    <motion.h1
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-4xl font-bold mb-2 text-shadow-lg"
                                    >
                                        {bio.title}
                                    </motion.h1>
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="flex items-center space-x-4 text-pink-100"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <Brush className="w-4 h-4 text-yellow-300" />
                                            <span>Por {bio.user?.name || 'Usuário'}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Rainbow className="w-4 h-4 text-cyan-300" />
                                            <span>{new Date(bio.createdAt).toLocaleDateString('pt-BR')}</span>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 border-2 border-purple-200"
                >
                    <div className="prose prose-lg max-w-none">
                        <div className="text-gray-700 leading-relaxed">
                            <ReactMarkdown
                                components={{
                                    h1: ({ children }) => (
                                        <h1 className="text-3xl font-bold bg-linear-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4 flex items-center">
                                            <Star className="w-6 h-6 text-yellow-500 mr-2" />
                                            {children}
                                        </h1>
                                    ),
                                    h2: ({ children }) => (
                                        <h2 className="text-2xl font-semibold bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3 flex items-center">
                                            <Sparkles className="w-5 h-5 text-pink-500 mr-2" />
                                            {children}
                                        </h2>
                                    ),
                                    h3: ({ children }) => (
                                        <h3 className="text-xl font-medium bg-linear-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent mb-2 flex items-center">
                                            <Zap className="w-4 h-4 text-yellow-500 mr-2" />
                                            {children}
                                        </h3>
                                    ),
                                    p: ({ children }) => (
                                        <p className="mb-4 text-gray-600 leading-relaxed text-lg">
                                            {children}
                                        </p>
                                    ),
                                    ul: ({ children }) => <ul className="list-none mb-4 space-y-3">{children}</ul>,
                                    li: ({ children }) => (
                                        <li className="text-gray-600 flex items-start">
                                            <span className="text-2xl mr-3">✨</span>
                                            <span className="pt-1">{children}</span>
                                        </li>
                                    ),
                                    strong: ({ children }) => (
                                        <strong className="font-bold bg-linear-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                                            {children}
                                        </strong>
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
                        className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 border-2 border-pink-200"
                    >
                        <h2 className="text-3xl font-bold bg-linear-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-8 flex items-center justify-center">
                            <Rainbow className="w-8 h-8 text-pink-500 mr-3" />
                            Conecte-se Comigo
                            <Sparkles className="w-6 h-6 text-purple-500 ml-3 animate-pulse" />
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {bio.links.map((link, index) => (
                                <motion.a
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                        type: "spring",
                                        bounce: 0.4
                                    }}
                                    whileHover={{
                                        scale: 1.05,
                                        rotate: 2,
                                        transition: { duration: 0.2 }
                                    }}
                                    className="group relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-linear-to-r from-pink-400 via-purple-500 to-indigo-500 rounded-2xl"></div>
                                    <div className="relative bg-white m-1 rounded-xl p-6 transition-all duration-300 group-hover:bg-gray-50">
                                        <div className="flex items-center space-x-4">
                                            <div className="p-3 bg-linear-to-br from-pink-500 to-purple-600 text-white rounded-xl group-hover:from-pink-400 group-hover:to-purple-500 transition-all duration-300 shadow-lg">
                                                {getPlatformIcon(link.label)}
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-bold text-gray-800 text-lg">{link.label}</div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Star className="w-4 h-4 text-yellow-500 animate-pulse" />
                                                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                                            </div>
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
                    className="text-center bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border-2 border-indigo-200"
                >
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex items-center justify-center space-x-3 text-gray-600 mb-4"
                    >
                        <Heart className="w-6 h-6 text-red-500" />
                        <span className="text-lg font-semibold bg-linear-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                            Feito com amor no AutoBio
                        </span>
                        <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
                    </motion.div>
                    <p className="text-gray-500">
                        Crie sua biografia única em{' '}
                        <a href="/" className="font-bold bg-linear-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent hover:from-pink-500 hover:to-purple-500 transition-all duration-300">
                            autobio.app
                        </a>
                        {' '}✨
                    </p>
                </motion.div>
            </div>
        </div>
    )
}