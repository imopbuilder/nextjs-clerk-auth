'use client';

import { buttonVariants } from '@/components/ui/button';
import { inputVariants } from '@/components/ui/input';
import { labelVariants } from '@/components/ui/label';
import { cn } from '@/lib/utils/cn';
import { ClerkProvider as Provider } from '@clerk/nextjs';
import { ReactNode } from 'react';

export function ClerkProvider({ children }: { children: ReactNode }) {
  return (
    <Provider
      appearance={{
        elements: {
          // Card
          card: 'bg-background dark:border dark:border-border',

          // Header
          headerTitle: 'text-foreground',
          headerSubtitle: 'text-sm text-muted-foreground',

          // Social buttons
          socialButtonsBlockButton: cn(buttonVariants({ variant: 'outline', size: 'lg', className: 'hover:bg-muted text-foreground' })),
          socialButtonsProviderIcon__github: 'dark:invert',

          // Divider
          dividerLine: 'bg-border',
          dividerText: 'text-muted-foreground',

          // Form
          formButtonPrimary: cn(buttonVariants({ size: 'lg', className: 'text-xs' })),
          formFieldInput: cn(inputVariants({ className: 'text-foreground' })),
          formFieldLabel: cn(labelVariants({ className: 'text-foreground mb-1' })),

          // Footer
          footerActionText: 'text-xs text-muted-foreground',
          footerActionLink: cn(
            buttonVariants({ variant: 'link', size: 'sm', className: 'p-0 h-auto text-muted-foreground hover:text-foreground duration-0' }),
          ),
        },
      }}
    >
      {children}
    </Provider>
  );
}
