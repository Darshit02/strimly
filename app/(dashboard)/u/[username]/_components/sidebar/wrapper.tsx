"use client"

import { cn} from "@/lib/utils"
import { useCreaterSidebar } from "@/store/use-creater-sidebar"

interface WrapperProps {
    children: React.ReactNode
    }

const Wrapper = ({
    children
}: WrapperProps) => {
    const { collapsed } = useCreaterSidebar()
  return (
    <aside className={cn("fixed left-0 flex flex-col  w-[70px] lg:w-60 h-full  bg-background border-r border-[#2d2e35] z-50" , collapsed && "lg:w-[70px]")}>
        {children}
    </aside>
  )
}

export default Wrapper