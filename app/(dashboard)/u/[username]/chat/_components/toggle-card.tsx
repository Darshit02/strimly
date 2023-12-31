"use client"
import {toast} from "sonner"
import { startTransition, useTransition } from "react"
import { updateStream } from "@/actions/stream"
import { Switch } from "@/components/ui/switch"
import { Skeleton } from "@/components/ui/skeleton"

type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly"

interface ToggleCardProps {
    feild : FieldTypes
    value : boolean
    label : string
}
const ToggleCard = ({feild , value = false , label} : ToggleCardProps) => {
    const [isPending,startTransition] = useTransition()
  const onChange = () => {
    startTransition(() => {
        updateStream({ [feild] : !value })
        .then(() => {
            toast.success("Chat Setting Upadated")
        })
        .catch(() => {
            toast.error("Something went Wrong")
        })
    })
  }
    return (
    <div className="rounded-xl bg-muted p-6">
        <div className="flex items-center justify-between">
            <p className="font-semibold shrink-0">
                {label}
            </p>
            <div className="space-y-2">
                <Switch  checked={value} 
                onCheckedChange={onChange}
                disabled={isPending}
                >
                    {value ? "On" : "Off"}
                </Switch>
            </div>
        </div>
    </div>
  )
}

export default ToggleCard

export const ToggleCardSkeleton = () => {
    return (
        <Skeleton className="rounded-xl w-full p-6"/>
    )

}