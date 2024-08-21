import React, { ReactNode } from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface TooltipProps {
    title: string | ReactNode,
    text: string
}

const Tool = ({ title, text }: TooltipProps) => {
    return (
        <div>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>{title}</TooltipTrigger>
                    <TooltipContent>
                        <p>{text}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

        </div>
    )
}

export default Tool