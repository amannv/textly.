import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-fixed min-h-30 w-full resize-none rounded-md border border-border/60 bg-white/70 backdrop-blur-sm px-2 py-2 text-sm text-foreground transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 md:text-xs/relaxed dark:border-input dark:bg-input/30 dark:backdrop-blur-none dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 scrollbar-none whitespace-pre-wrap wrap-break-word",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
