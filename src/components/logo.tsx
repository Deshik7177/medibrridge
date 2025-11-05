import Image from 'next/image';
import type { ComponentProps } from 'react';

export function Logo(props: Omit<ComponentProps<typeof Image>, 'src' | 'alt' | 'width' | 'height'>) {
  return (
    <Image
      src="/logo.png"
      alt="Medibridge Logo"
      width={120}
      height={32}
      {...props}
    />
  );
}
