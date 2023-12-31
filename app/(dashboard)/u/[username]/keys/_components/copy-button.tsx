"use client"

import { Button } from '@/components/ui/button';
import { CheckCheck, Copy } from 'lucide-react';
import React,{useState  } from 'react'

interface CopyButtonProps {
    value?: string;
    }

const CopyButton = ({value} : CopyButtonProps) => {
    const [isCopied, setIsCopied] = useState(false)

    const onCopy = () => {
        if (!value) {
            return
        }
        setIsCopied(true)
        navigator.clipboard.writeText(value)
        setTimeout(() => {
            setIsCopied(false)
        }, 2000)
    }
    const Icon = isCopied ? CheckCheck : Copy;
  return (
    <Button 
    onClick={onCopy}
    disabled={!value || isCopied}
    variant="ghost"
    >
     <Icon className='h-4 w-4' />   
    </Button>
  )
}

export default CopyButton