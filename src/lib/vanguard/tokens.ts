/**
 * THE VANGUARD SYSTEM
 * 
 * Princípios do Código de Vanguarda (Kennedy's Vision):
 * 1. Atomic Design 2.0: Componentes cientes de contexto via CSS Variables e Container Queries.
 * 2. Animações Declarativas: Orquestração baseada em estado funcional.
 * 3. TypeScript Puro: Tipagem nominal e exaustiva para evitar erros de design em runtime.
 * 4. CSS Variables Avançadas: Design Tokens dinâmicos que se adaptam ao tema e ao componente pai.
 */

// Example: Abstracting Context-Aware Tokens
export type ThemeToken = {
  readonly light: string;
  readonly dark: string;
  readonly highContrast?: string;
};

export type VanguardDesignSystem = {
  spacing: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', string>;
  colors: Record<'primary' | 'secondary' | 'accent' | 'surface', ThemeToken>;
  motion: {
    duration: Record<'fast' | 'normal' | 'slow', string>;
    easing: string;
  };
};

export const VANGUARD_TOKENS: VanguardDesignSystem = {
  spacing: {
    xs: 'var(--space-1)',
    sm: 'var(--space-2)',
    md: 'var(--space-4)',
    lg: 'var(--space-8)',
    xl: 'var(--space-16)',
  },
  colors: {
    primary: { light: '#0070f3', dark: '#3291ff' },
    secondary: { light: '#666', dark: '#888' },
    accent: { light: '#f81ce5', dark: '#ff0080' },
    surface: { light: '#ffffff', dark: '#000000' },
  },
  motion: {
    duration: { fast: '150ms', normal: '300ms', slow: '600ms' },
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  }
};
