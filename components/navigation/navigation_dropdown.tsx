import React from 'react'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type NavigationItem = {
  name: string;
  href: string;
}

interface NavigationDropdownProps {
  name: string;
  items: NavigationItem[];
  active?: boolean;
  className?: string;
}

const navUnderlineClassName =
  "pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] origin-left rounded-full bg-[#B300FF] shadow-[0_0_14px_rgba(179,0,255,0.55)] transition-transform duration-300 group-hover:scale-x-100 group-data-[state=open]:scale-x-100"

const NavigationDropdown: React.FC<NavigationDropdownProps> = ({ 
  name, 
  items, 
  active = false,
  className 
}) => {
  return (
    <NavigationMenu className="relative">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn(
            "relative h-auto bg-transparent px-0 py-0 font-[family-name:var(--font-satoshi)] text-[1.45rem] font-semibold tracking-normal text-white/72 shadow-none transition-colors duration-300 hover:bg-transparent hover:text-white focus:bg-transparent focus:text-white data-[state=open]:bg-transparent data-[state=open]:text-white",
            active && "text-white",
            className
          )}>
            <span
              className="relative inline-flex items-center pb-[0.22em]"
            >
              {name}
              <span
                className={cn(
                  navUnderlineClassName,
                  active ? "scale-x-100" : "scale-x-0"
                )}
              />
            </span>
          </NavigationMenuTrigger>
          <NavigationMenuContent className="z-50 min-w-[18rem] w-fit border border-white/10 bg-black/80 p-0 text-left backdrop-blur-md [border-top:1px_solid_rgba(179,0,255,0.30)]">
            {items.map(item => (
              <NavigationMenuLink asChild key={item.name}>
                <Link
                  href={item.href}
                  className="block min-w-[18rem] border-b border-white/10 px-5 py-4 font-[family-name:var(--font-satoshi)] text-[1.75rem] tracking-tight text-white/90 transition-colors duration-300 last:border-b-0 hover:text-[#4DFF94]"
                >
                  {item.name}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default NavigationDropdown
