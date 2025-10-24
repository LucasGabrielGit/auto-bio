import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { motion } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  Sparkles,
  Shield,
  Zap,
  CheckCircle,
  ArrowRight,
  AlertCircle
} from 'lucide-react'
import { useState } from 'react'

// Zod Schema for form validation
const registrationSchema = z.object({
  firstName: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(50, 'Nome deve ter no máximo 50 caracteres'),
  lastName: z.string()
    .min(2, 'Sobrenome deve ter pelo menos 2 caracteres')
    .max(50, 'Sobrenome deve ter no máximo 50 caracteres'),
  email: z.string()
    .email('Email inválido')
    .min(1, 'Email é obrigatório'),
  password: z.string()
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Senha deve conter pelo menos uma letra minúscula, uma maiúscula e um número'),
  confirmPassword: z.string()
    .min(1, 'Confirmação de senha é obrigatória'),
  acceptTerms: z.boolean()
    .refine(val => val === true, 'Você deve aceitar os termos de uso'),
  acceptNewsletter: z.boolean().optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"],
})

type RegistrationForm = z.infer<typeof registrationSchema>

export const Route = createFileRoute('/(public)/_layout/registro')({
  component: RegistroComponent,
})

function RegistroComponent() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    getValues
  } = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      acceptNewsletter: true,
      acceptTerms: false
    }
  })

  const onSubmit = async (data: RegistrationForm) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('Registration data:', data)
      // Here you would typically send the data to your backend
    } catch (error) {
      console.error('Registration error:', error)
    }
  }

  const benefits = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Criação Instantânea",
      description: "Bio profissional em segundos"
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "IA Avançada",
      description: "Tecnologia de ponta para resultados únicos"
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "100% Seguro",
      description: "Seus dados protegidos com criptografia"
    }
  ]

  const features = [
    "✨ Gerador de bio com IA",
    "🎨 Templates personalizáveis",
    "📱 Página responsiva",
    "🔗 URL personalizada",
    "📊 Analytics básicos",
    "🎯 SEO otimizado"
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <Badge variant="secondary" className="text-sm px-4 py-2">
                <UserPlus className="h-4 w-4 mr-2" />
                Junte-se a nós
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold">
                Crie sua conta no
                <span className="bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent"> AutoBio</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Comece gratuitamente e transforme sua presença digital em minutos.
                Mais de 50.000 profissionais já confiam em nós.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Features List */}
            <div className="bg-linear-to-r from-primary/5 to-purple-600/5 rounded-2xl p-6">
              <h3 className="font-semibold mb-4">O que você ganha gratuitamente:</h3>
              <div className="grid grid-cols-2 gap-2">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    className="text-sm text-muted-foreground"
                  >
                    {feature}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Registration Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 shadow-2xl">
              <CardHeader className="text-center space-y-4">
                <CardTitle className="text-2xl">Criar Conta</CardTitle>
                <CardDescription>
                  Preencha os dados abaixo para começar sua jornada
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Social Login */}
                <div className="space-y-3">
                  <Button variant="outline" className="w-full" size="lg">
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Continuar com Google
                  </Button>

                  <Button variant="outline" className="w-full" size="lg">
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Continuar com Facebook
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Ou registre-se com email
                    </span>
                  </div>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nome</label>
                      <div className="relative">
                        <User className="absolute left-3 top-5 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...register('firstName')}
                          placeholder="Seu nome"
                          className={`pl-10 ${errors.firstName ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {errors.firstName && (
                        <div className="flex items-center space-x-1 text-red-500 text-xs">
                          <AlertCircle className="h-3 w-3" />
                          <span>{errors.firstName.message}</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Sobrenome</label>
                      <div className="relative">
                        <User className="absolute left-3 top-5 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...register('lastName')}
                          placeholder="Seu sobrenome"
                          className={`pl-10 ${errors.lastName ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {errors.lastName && (
                        <div className="flex items-center space-x-1 text-red-500 text-xs">
                          <AlertCircle className="h-3 w-3" />
                          <span>{errors.lastName.message}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-5 h-4 w-4 text-muted-foreground" />
                      <Input
                        {...register('email')}
                        type="email"
                        placeholder="seu@email.com"
                        className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.email && (
                      <div className="flex items-center space-x-1 text-red-500 text-xs">
                        <AlertCircle className="h-3 w-3" />
                        <span>{errors.email.message}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Senha</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-5 h-4 w-4 text-muted-foreground" />
                      <Input
                        {...register('password')}
                        type={showPassword ? "text" : "password"}
                        placeholder="Crie uma senha forte"
                        className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.password && (
                      <div className="flex items-center space-x-1 text-red-500 text-xs">
                        <AlertCircle className="h-3 w-3" />
                        <span>{errors.password.message}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Confirmar Senha</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-5 h-4 w-4 text-muted-foreground" />
                      <Input
                        {...register('confirmPassword')}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirme sua senha"
                        className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <div className="flex items-center space-x-1 text-red-500 text-xs">
                        <AlertCircle className="h-3 w-3" />
                        <span>{errors.confirmPassword.message}</span>
                      </div>
                    )}
                  </div>

                  {/* Terms and Newsletter */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        {...register('acceptTerms')}
                        onCheckedChange={(checked) => setValue('acceptTerms', checked as boolean)}
                        className="mt-1"
                      />
                      <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                        Eu aceito os{' '}
                        <Link to="/termos" className="text-primary hover:underline">
                          Termos de Uso
                        </Link>
                        {' '}e a{' '}
                        <Link to="/privacidade" className="text-primary hover:underline">
                          Política de Privacidade
                        </Link>
                      </label>
                    </div>
                    {errors.acceptTerms && (
                      <div className="flex items-center space-x-1 text-red-500 text-xs">
                        <AlertCircle className="h-3 w-3" />
                        <span>{errors.acceptTerms.message}</span>
                      </div>
                    )}

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="newsletter"
                        {...register('acceptNewsletter')}
                        onCheckedChange={(checked) => setValue('acceptNewsletter', checked as boolean)}
                        defaultChecked={true}
                        className="mt-1"
                      />
                      <label htmlFor="newsletter" className="text-sm text-muted-foreground leading-relaxed">
                        Quero receber dicas, novidades e ofertas especiais por email
                      </label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Criando conta...
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Criar Conta Gratuita
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>

                {/* Login Link */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Já tem uma conta?{' '}
                    <Link to="/login" className="text-primary hover:underline font-medium">
                      Fazer login
                    </Link>
                  </p>
                </div>

                {/* Security Note */}
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-green-800 dark:text-green-200">
                        Seus dados estão seguros
                      </p>
                      <p className="text-green-700 dark:text-green-300 mt-1">
                        Utilizamos criptografia de ponta e nunca compartilhamos suas informações pessoais.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
