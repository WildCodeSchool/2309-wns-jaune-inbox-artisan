import {ReactNode} from 'react'

export type AuthLayoutProps = {
  children: ReactNode;
  description?: ReactNode;
  fullWidthImage?: boolean;
  imageSrc?: string;
  title: string;
  subtitle?: string;
};