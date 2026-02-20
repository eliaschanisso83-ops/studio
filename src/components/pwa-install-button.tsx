
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Smartphone } from 'lucide-react';
import { usePWAInstall } from '@/hooks/use-pwa-install';
import { cn } from '@/lib/utils';

interface PWAInstallButtonProps {
  className?: string;
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  showIconOnly?: boolean;
}

export function PWAInstallButton({ 
  className, 
  variant = "outline", 
  size = "default",
  showIconOnly = false 
}: PWAInstallButtonProps) {
  const { isInstallable, handleInstallClick } = usePWAInstall();

  if (!isInstallable) return null;

  return (
    <Button
      onClick={handleInstallClick}
      variant={variant}
      size={size}
      className={cn("gap-2 font-headline font-bold uppercase tracking-widest text-[10px]", className)}
    >
      {showIconOnly ? (
        <Download className="h-4 w-4 text-primary" />
      ) : (
        <>
          <Smartphone className="h-4 w-4 text-primary" />
          Install_Engine_Native
        </>
      )}
    </Button>
  );
}
