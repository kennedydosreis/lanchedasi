/**
 * VANGUARD BENTO GRID TOKENS (HSL DYNAMIC)
 * Baseado no conceito "Código como Arte" - Day 16.
 */

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export type BentoCellVariant = 'default' | 'accent' | 'glass';

export interface BentoTheme {
  primary: HSL;
  surface: HSL;
  accent: HSL;
  glowStrength: number;
}

export const VANGUARD_BENTO_THEME: BentoTheme = {
  primary: { h: 220, s: 90, l: 56 }, // Vibrant Blue
  surface: { h: 240, s: 10, l: 4 },  // Deep Dark
  accent: { h: 280, s: 80, l: 60 },  // Electric Purple
  glowStrength: 0.15,
};

/**
 * Utilitário para converter HSL em String CSS com variáveis
 */
export const toHSLString = (hsl: HSL, alpha: number = 1): string => {
  return `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${alpha})`;
};

export const BENTO_GRID_CONFIG = {
  gap: '1.5rem',
  borderRadius: '1.25rem',
  animation: {
    hoverDuration: '400ms',
    hoverEasing: 'cubic-bezier(0.23, 1, 0.32, 1)',
  }
};
