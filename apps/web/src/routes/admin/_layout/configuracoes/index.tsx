import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { plans } from '@/routes/(public)/_layout/planos'
import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import {
  AlertTriangle,
  Bell,
  Check,
  CreditCard,
  Crown,
  Download,
  Eye,
  EyeOff,
  Lock,
  Palette,
  Save,
  Shield,
  Star,
  Trash2,
  User,
  Zap
} from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export const Route = createFileRoute('/admin/_layout/configuracoes/')({
  component: ConfiguracoesComponent,
})

function ConfiguracoesComponent() {
  const [activeTab, setActiveTab] = useState('profile')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [userData, setUserData] = useState({
    name: 'João Silva',
    email: 'joao@exemplo.com',
    plan: 'premium',
    avatar: '',
    bio: 'Desenvolvedor Full Stack apaixonado por tecnologia e inovação.',
    website: 'https://joaosilva.dev',
    location: 'São Paulo, Brasil'
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    marketingEmails: false,
    weeklyReports: true,
    publicProfile: true,
    showAnalytics: true,
    theme: 'system',
    language: 'pt-BR'
  })

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: <User className="h-4 w-4" /> },
    { id: 'security', label: 'Segurança', icon: <Shield className="h-4 w-4" /> },
    { id: 'notifications', label: 'Notificações', icon: <Bell className="h-4 w-4" /> },
    { id: 'preferences', label: 'Preferências', icon: <Palette className="h-4 w-4" /> },
    { id: 'billing', label: 'Plano & Cobrança', icon: <CreditCard className="h-4 w-4" /> },
    { id: 'data', label: 'Dados', icon: <Download className="h-4 w-4" /> }
  ]

  const handleSaveProfile = async () => {
    setIsSaving(true)
    setTimeout(() => {
      toast.success('Perfil atualizado com sucesso!')
      setIsSaving(false)
    }, 1000)
  }

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('As senhas não coincidem')
      return
    }

    if (passwordData.newPassword.length < 8) {
      toast.error('A nova senha deve ter pelo menos 8 caracteres')
      return
    }

    setIsSaving(true)
    setTimeout(() => {
      toast.success('Senha alterada com sucesso!')
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setIsSaving(false)
    }, 1000)
  }

  const handleSavePreferences = async () => {
    setIsSaving(true)
    setTimeout(() => {
      toast.success('Preferências salvas com sucesso!')
      setIsSaving(false)
    }, 1000)
  }

  const handleDeleteAccount = async () => {
    toast.success('Solicitação de exclusão enviada. Você receberá um email de confirmação.')
  }

  const handleExportData = () => {
    toast.success('Seus dados estão sendo preparados. Você receberá um email com o link de download.')
  }

  return (
    <div className="container mx-auto py-8 px-4 space-y-6 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie sua conta, preferências e configurações de privacidade
          </p>
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:w-64"
        >
          <Card>
            <CardContent className="p-2">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </motion.div>

        <div className="flex-1 space-y-6">
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Informações do Perfil</CardTitle>
                  <CardDescription>
                    Atualize suas informações pessoais e de contato
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input
                        id="name"
                        value={userData.name}
                        onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userData.email}
                        onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Biografia</Label>
                    <Textarea
                      id="bio"
                      placeholder="Conte um pouco sobre você..."
                      value={userData.bio}
                      onChange={(e) => setUserData(prev => ({ ...prev, bio: e.target.value }))}
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        placeholder="https://seusite.com"
                        value={userData.website}
                        onChange={(e) => setUserData(prev => ({ ...prev, website: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Localização</Label>
                      <Input
                        id="location"
                        placeholder="Cidade, País"
                        value={userData.location}
                        onChange={(e) => setUserData(prev => ({ ...prev, location: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleSaveProfile} disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Salvando...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Salvar Alterações
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Crown className="h-5 w-5 text-yellow-500" />
                    <span>Plano Atual</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between w-3xl">
                    <div>
                      <Badge className="mb-2 bg-linear-to-r from-yellow-500 to-orange-500">
                        {userData.plan === 'premium' ? 'Premium' : 'Gratuito'}
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        {userData.plan === 'premium'
                          ? 'Acesso completo a todos os recursos'
                          : 'Recursos limitados - Faça upgrade para desbloquear mais'
                        }
                      </p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" onClick={() => { }}>
                          <Zap className="mr-2 h-4 w-4" />
                          {userData.plan === 'premium' ? 'Gerenciar Plano' : 'Fazer Upgrade'}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className='max-w-5xl w-[95vw] max-h-[90vh] overflow-y-auto'>
                        <DialogHeader>
                          <DialogTitle>
                            {userData.plan === 'premium' ? 'Gerenciar Plano' : 'Fazer Upgrade'}
                          </DialogTitle>
                        </DialogHeader>
                        <DialogDescription>
                          {userData.plan === 'premium'
                            ? 'Confirme o cancelamento do seu plano premium'
                            : 'Confirme o upgrade para o plano premium'
                          }
                        </DialogDescription>

                        <div className="flex flex-col items-center">
                          <div className="bg-card p-3 rounded-lg shadow-sm w-full max-w-xs mx-auto mb-4 text-center">
                            <p className="text-lg text-muted-foreground">Plano Atual</p>
                            <p className="text-base font-bold text-foreground">
                              {userData.plan === 'premium' ? 'Premium' : 'Gratuito'}
                            </p>
                          </div>

                          <h2 className="text-xl font-bold text-foreground mb-3">Planos Disponíveis</h2>
                          <Separator className='mb-4' />
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                            {plans.map((plan, index) => {
                              const isCurrentPlan = (userData.plan === 'premium' && plan.name === 'Premium') ||
                                (userData.plan === 'pro' && plan.name === 'Pro') ||
                                (userData.plan === 'free' && plan.name === 'Free')

                              return (
                                <motion.div
                                  key={plan.name}
                                  className={`relative bg-card rounded-lg shadow-md border-2 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${plan.popular
                                    ? 'border-primary ring-2 ring-primary/20'
                                    : isCurrentPlan
                                      ? 'border-green-500 ring-2 ring-green-500/20'
                                      : 'border-border hover:border-primary/50'
                                    }`}
                                  initial={{ opacity: 0, y: 20 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.6, delay: index * 0.1 }}
                                  viewport={{ once: true }}
                                >
                                  {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                                      <Badge className="bg-linear-to-r from-primary to-purple-600 text-white px-3 py-1 text-xs shadow-md">
                                        <Star className="h-3 w-3 mr-1" />
                                        Mais Popular
                                      </Badge>
                                    </div>
                                  )}

                                  {isCurrentPlan && (
                                    <div className="absolute -top-3 right-3 z-10">
                                      <Badge className="bg-linear-to-r from-green-500 to-emerald-600 text-white px-2 py-1 text-xs shadow-md">
                                        <Check className="h-3 w-3 mr-1" />
                                        Atual
                                      </Badge>
                                    </div>
                                  )}

                                  <div className="p-4 h-full flex flex-col">
                                    <div className="text-center mb-4">
                                      <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-3 ${plan.name === 'Free' ? 'bg-blue-100 text-blue-600' :
                                        plan.name === 'Pro' ? 'bg-purple-100 text-purple-600' :
                                          'bg-yellow-100 text-yellow-600'
                                        }`}>
                                        {plan.icon}
                                      </div>
                                      <h3 className="text-lg font-bold text-foreground mb-1">{plan.name}</h3>
                                      <p className="text-xs text-muted-foreground mb-3">{plan.description}</p>
                                      <div className="flex items-baseline justify-center gap-1">
                                        <span className="text-2xl font-bold text-foreground">{plan.price}</span>
                                        <span className="text-xs text-muted-foreground">{plan.price === "R$0" ? null : plan.period}</span>
                                      </div>
                                    </div>

                                    <div className="flex-1 mb-4">
                                      <div className="space-y-2">
                                        <p className="font-semibold text-xs text-foreground">✨ Incluído:</p>
                                        <ul className="space-y-1">
                                          {plan.features.slice(0, 3).map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-start gap-2 text-xs">
                                              <Check className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                                              <span className="text-muted-foreground leading-tight">{feature}</span>
                                            </li>
                                          ))}
                                          {plan.features.length > 3 && (
                                            <li className="text-xs text-muted-foreground pl-5">
                                              +{plan.features.length - 3} recursos adicionais
                                            </li>
                                          )}
                                        </ul>

                                        {plan.limitations && plan.limitations.length > 0 && (
                                          <div className="pt-2 border-t border-border/50">
                                            <p className="font-semibold text-xs text-muted-foreground mb-1">❌ Limitações:</p>
                                            <ul className="space-y-1">
                                              {plan.limitations.slice(0, 2).map((limitation, limitIndex) => (
                                                <li key={limitIndex} className="flex items-start gap-2 text-xs text-muted-foreground">
                                                  <span className="text-red-400 mt-0.5">×</span>
                                                  <span className="leading-tight">{limitation}</span>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    <Button
                                      className={`w-full ${isCurrentPlan
                                        ? 'bg-green-500 hover:bg-green-600 text-white'
                                        : plan.popular
                                          ? 'bg-linear-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg'
                                          : ''
                                        }`}
                                      variant={isCurrentPlan ? 'default' : plan.popular ? 'default' : 'outline'}
                                      size="sm"
                                      onClick={() => {
                                        if (isCurrentPlan) {
                                          toast.success('Este já é seu plano atual!')
                                        } else {
                                          toast.info(`Redirecionando para ${plan.name}...`)
                                          // Todo: implementar a lógica de upgrade/downgrade
                                        }
                                      }}
                                      disabled={isCurrentPlan}
                                    >
                                      {isCurrentPlan ? (
                                        <>
                                          <Check className="mr-1 h-3 w-3" />
                                          Plano Atual
                                        </>
                                      ) : plan.name === 'Free' ? (
                                        <>
                                          <Zap className="mr-1 h-3 w-3" />
                                          Downgrade
                                        </>
                                      ) : (
                                        <>
                                          <Crown className="mr-1 h-3 w-3" />
                                          {plan.popular ? 'Escolher' : 'Upgrade'}
                                        </>
                                      )}
                                    </Button>
                                  </div>
                                </motion.div>
                              )
                            })}
                          </div>
                        </div>

                        <div className="flex justify-end space-x-2">
                          <Button type="submit" variant="destructive" onClick={() => { }}>
                            Confirmar
                          </Button>
                          <DialogClose>
                            Cancelar
                          </DialogClose>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Alterar Senha</CardTitle>
                  <CardDescription>
                    Mantenha sua conta segura com uma senha forte
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Senha Atual</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nova Senha</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? 'text' : 'password'}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleChangePassword} disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Alterando...
                        </>
                      ) : (
                        <>
                          <Lock className="mr-2 h-4 w-4" />
                          Alterar Senha
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Preferências de Notificação</CardTitle>
                  <CardDescription>
                    Configure como e quando você quer receber notificações
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Notificações por Email</Label>
                        <p className="text-sm text-muted-foreground">
                          Receba atualizações importantes por email
                        </p>
                      </div>
                      <Switch
                        checked={preferences.emailNotifications}
                        onCheckedChange={(checked) =>
                          setPreferences(prev => ({ ...prev, emailNotifications: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Emails de Marketing</Label>
                        <p className="text-sm text-muted-foreground">
                          Receba dicas, novidades e ofertas especiais
                        </p>
                      </div>
                      <Switch
                        checked={preferences.marketingEmails}
                        onCheckedChange={(checked) =>
                          setPreferences(prev => ({ ...prev, marketingEmails: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Relatórios Semanais</Label>
                        <p className="text-sm text-muted-foreground">
                          Resumo semanal das suas biografias e estatísticas
                        </p>
                      </div>
                      <Switch
                        checked={preferences.weeklyReports}
                        onCheckedChange={(checked) =>
                          setPreferences(prev => ({ ...prev, weeklyReports: checked }))
                        }
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleSavePreferences} disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Salvando...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Salvar Preferências
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'preferences' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Preferências Gerais</CardTitle>
                  <CardDescription>
                    Personalize sua experiência na plataforma
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Tema</Label>
                      <Select
                        value={preferences.theme}
                        onValueChange={(value) =>
                          setPreferences(prev => ({ ...prev, theme: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Claro</SelectItem>
                          <SelectItem value="dark">Escuro</SelectItem>
                          <SelectItem value="system">Sistema</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Idioma</Label>
                      <Select
                        value={preferences.language}
                        onValueChange={(value) =>
                          setPreferences(prev => ({ ...prev, language: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                          <SelectItem value="en-US">English (US)</SelectItem>
                          <SelectItem value="es-ES">Español</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Perfil Público</Label>
                        <p className="text-sm text-muted-foreground">
                          Permitir que outros usuários vejam seu perfil
                        </p>
                      </div>
                      <Switch
                        checked={preferences.publicProfile}
                        onCheckedChange={(checked) =>
                          setPreferences(prev => ({ ...prev, publicProfile: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Mostrar Análises</Label>
                        <p className="text-sm text-muted-foreground">
                          Exibir estatísticas detalhadas das suas biografias
                        </p>
                      </div>
                      <Switch
                        checked={preferences.showAnalytics}
                        onCheckedChange={(checked) =>
                          setPreferences(prev => ({ ...prev, showAnalytics: checked }))
                        }
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleSavePreferences} disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Salvando...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Salvar Preferências
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'data' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Exportar Dados</CardTitle>
                  <CardDescription>
                    Baixe uma cópia de todos os seus dados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Dados da Conta</p>
                      <p className="text-sm text-muted-foreground">
                        Inclui perfil, biografias, estatísticas e configurações
                      </p>
                    </div>
                    <Button variant="outline" onClick={handleExportData}>
                      <Download className="mr-2 h-4 w-4" />
                      Exportar
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-600 flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5" />
                    <span>Zona de Perigo</span>
                  </CardTitle>
                  <CardDescription>
                    Ações irreversíveis que afetam permanentemente sua conta
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                      <div>
                        <p className="font-medium text-red-600">Excluir Conta</p>
                        <p className="text-sm text-muted-foreground">
                          Remove permanentemente sua conta e todos os dados associados
                        </p>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir Conta
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Tem certeza absoluta?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta ação não pode ser desfeita. Isso excluirá permanentemente sua conta
                              e removerá todos os seus dados de nossos servidores.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleDeleteAccount}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Sim, excluir conta
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}