import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
	const { theme, setTheme } = useTheme();

	const handleChangeTheme = () => {
		console.log(theme)
		if (theme === "light") {
			setTheme("dark");
		} else if (theme === "dark") {
			setTheme("light");
		} else {
			setTheme("dark");
		}
	};

	return (
		<Button variant="outline" size="icon" onClick={handleChangeTheme} type="button">
			<Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 font-medium" />
			<Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 font-medium" />
			<span className="sr-only">Alterar tema</span>
		</Button>
	);
}
