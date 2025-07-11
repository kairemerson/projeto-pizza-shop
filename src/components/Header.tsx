import { Home, Pizza, UtensilsCrossed } from "lucide-react";
import { Separator } from "./ui/separator";
import { NavLink } from "./NavLink";
import { ModeToggle } from "./theme/mode-toggle";
import { AccountMenu } from "./account-menu";


export function Header() {
    return(
        <div className="border-b">
            <div className="flex h-16 items-center gap-6 px-6">
                <Pizza className="w-6 h-6"/>
                <Separator orientation="vertical" className="h-6"/>
                <nav className="flex items-center space-x-4 lg:space-x-6">
                    <NavLink to="/">
                        <Home className="h-4 w-4"/>
                        Início
                    </NavLink>
                    <NavLink to="/orders">
                        <UtensilsCrossed className="h-4 w-4"/>
                        Pedido
                    </NavLink>
                </nav>

                <div className="ml-auto flex items-center gap-2">
                    <ModeToggle/>
                    <AccountMenu/>
                </div>
            </div>
        </div>
    )
}