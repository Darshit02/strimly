"use client";


import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogTrigger
} from "@/components/ui/dialog"
import {
    Alert,
    AlertTitle,
    AlertDescription
} from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react";
import {
    Select,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectItem
} from "@/components/ui/select"

const ConnectModel = () => {
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline" className="bg-blue-400">
        Generate connection
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Generate connection</DialogTitle>
      </DialogHeader>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Ingress Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="RTMP">RTMP</SelectItem>
          <SelectItem value="WHIP">WHIP</SelectItem>
        </SelectContent>
      </Select>
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Warning!</AlertTitle>
        <AlertDescription>
          This action will reset all active streams using the current connection
        </AlertDescription>
      </Alert>
      <div className="flex justify-between">
        <DialogClose>
          <Button variant="ghost">
            Cancel
          </Button>
        </DialogClose>
        <Button
          onClick={() => {}}
          variant="outline"
        className="bg-blue-400"
        
        >
          Generate
        </Button>
      </div>
    </DialogContent>
  </Dialog>
  )
}

export default ConnectModel