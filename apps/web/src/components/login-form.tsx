import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Separator } from "./ui/separator";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="space-y-6">
      <form className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="font-medium text-gray-700">
            E-mail
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="off"
            placeholder="Digite seu e-mail"
            className="h-12 bg-gray-100 border-gray-200 focus:bg-white focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="font-medium text-gray-700">
            Senha
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha"
              className="h-12 bg-gray-100 border-gray-200 focus:bg-white focus:border-blue-500 pr-10"
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <div className="flex justify-end">
            <Link to="/recuperar-senha" className="text-base text-blue-600 hover:underline">
              Esqueceu a senha?
            </Link>
          </div>
        </div>
        <Button
          type="submit"
          className="h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg mt-6 w-full"
        >
          Entrar
        </Button>
        <span className="text-sm text-gray-600">
          Ainda não tem uma conta?{" "}
          <Link to="/registro" className="text-blue-600 font-medium hover:underline">
            Cadastre-se
          </Link>
        </span>
      </form>
    </div>
  )
}
