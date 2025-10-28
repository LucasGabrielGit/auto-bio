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
    Code,
    Terminal,
    Cpu,
    Zap,
    Database,
    Wifi
} from "lucide-react"
import ReactMarkdown from "react-markdown"
import type { JSX } from "react"

type TemplateTecnologicoProps = {
    bio: Bio
}

export const TemplateTecnologico = ({ bio }: TemplateTecnologicoProps) => {
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
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-gray-900 to-black text-white">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <div className="absolute top-40 right-20 w-1 h-1 bg-green-400 rounded-full animate-ping"></div>
                <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-linear-to-r from-slate-800/80 to-gray-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden mb-8"
                >
                    <div className="relative px-8 py-12">
                        <div className="absolute top-4 right-4 text-xs text-green-400 font-mono opacity-60">
                            &gt; whoami
                        </div>

                        <div className="flex items-center space-x-6">
                            <div className="relative">
                                <div className="bg-linear-to-br from-cyan-500 to-blue-600 p-4 rounded-2xl">
                                    <Terminal className="w-8 h-8" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold mb-2 bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                    {bio.title}
                                </h1>
                                <div className="flex items-center space-x-4 text-slate-300">
                                    <div className="flex items-center space-x-2">
                                        <Code className="w-4 h-4 text-cyan-400" />
                                        <span className="font-mono text-sm">dev: {bio.user?.name || 'Usuário'}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Database className="w-4 h-4 text-green-400" />
                                        <span className="font-mono text-sm">
                                            created: {new Date(bio.createdAt).toLocaleDateString('pt-BR')}
                                        </span>
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
                    className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 mb-8"
                >
                    <div className="flex items-center space-x-2 mb-6 pb-4 border-b border-slate-700">
                        <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-slate-400 text-sm font-mono ml-4">~/bio/content.md</span>
                    </div>

                    <div className="prose prose-lg prose-invert max-w-none">
                        <div className="text-slate-200 leading-relaxed font-mono">
                            <ReactMarkdown
                                components={{
                                    h1: ({ children }) => (
                                        <h1 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center">
                                            <span className="text-green-400 mr-2">#</span>
                                            {children}
                                        </h1>
                                    ),
                                    h2: ({ children }) => (
                                        <h2 className="text-xl font-semibold text-blue-400 mb-3 flex items-center">
                                            <span className="text-green-400 mr-2">##</span>
                                            {children}
                                        </h2>
                                    ),
                                    h3: ({ children }) => (
                                        <h3 className="text-lg font-medium text-purple-400 mb-2 flex items-center">
                                            <span className="text-green-400 mr-2">###</span>
                                            {children}
                                        </h3>
                                    ),
                                    p: ({ children }) => (
                                        <p className="mb-4 text-slate-300 leading-relaxed">
                                            <span className="text-green-400 mr-2">&gt;</span>
                                            {children}
                                        </p>
                                    ),
                                    ul: ({ children }) => <ul className="list-none mb-4 space-y-2">{children}</ul>,
                                    li: ({ children }) => (
                                        <li className="text-slate-300 flex items-start">
                                            <span className="text-cyan-400 mr-2">•</span>
                                            {children}
                                        </li>
                                    ),
                                    strong: ({ children }) => (
                                        <strong className="font-semibold text-cyan-300">{children}</strong>
                                    ),
                                    code: ({ children }) => (
                                        <code className="bg-slate-700 text-green-400 px-2 py-1 rounded text-sm">
                                            {children}
                                        </code>
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
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 mb-8"
                    >
                        <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center font-mono">
                            <Wifi className="w-6 h-6 mr-3 text-green-400" />
                            ./connect --links
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {bio.links.map((link, index) => (
                                <motion.a
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="group flex items-center p-4 bg-linear-to-r from-slate-700/50 to-gray-700/50 hover:from-slate-600/50 hover:to-gray-600/50 border border-slate-600 hover:border-cyan-500/50 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
                                >
                                    <div className="p-2 bg-linear-to-br from-cyan-500 to-blue-600 text-white rounded-lg group-hover:from-cyan-400 group-hover:to-blue-500 transition-all">
                                        {getPlatformIcon(link.label)}
                                    </div>
                                    <div className="flex-1 ml-4">
                                        <div className="font-semibold text-cyan-300 font-mono">{link.label}</div>
                                        <div className="text-sm text-slate-400 font-mono">{link.platform}</div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Zap className="w-3 h-3 text-green-400 animate-pulse" />
                                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-center bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-6"
                >
                    <div className="flex items-center justify-center space-x-2 text-slate-400 mb-2 font-mono">
                        <Cpu className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm">powered by AutoBio</span>
                        <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                    </div>
                    <p className="text-xs text-slate-500 font-mono">
                        <span className="text-green-400">$</span> create your own bio at{' '}
                        <a href="/" className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors">
                            autobio.app
                        </a>
                    </p>
                </motion.div>
            </div>
        </div>
    )
}