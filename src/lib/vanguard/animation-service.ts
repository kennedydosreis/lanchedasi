/**
 * VANGUARD ANIMATION SERVICE (2026)
 * Unificação de lógica de animação para Svelte (Motion + CSS Custom Properties).
 * Foco: Bundle Size Minimalista e Reuso Atômico.
 */

import { spring, tweened } from 'svelte/motion';
import { cubicOut, quintOut } from 'svelte/easing';

// Configurações padrão de Elite
export const ANIMATION_CONFIG = {
  SPRING_STIFF: 0.15,
  SPRING_DAMP: 0.8,
  TWEEN_DURATION: 400,
  TWEEN_EASING: cubicOut,
};

/**
 * Hook para interatividade de mouse "Glow/Parallax"
 * Retorna stores de spring para suavidade vanguardista.
 */
export function useVanguardMouse(initialX = 50, initialY = 50) {
  const x = spring(initialX, {
    stiffness: ANIMATION_CONFIG.SPRING_STIFF,
    damping: ANIMATION_CONFIG.SPRING_DAMP
  });
  
  const y = spring(initialY, {
    stiffness: ANIMATION_CONFIG.SPRING_STIFF,
    damping: ANIMATION_CONFIG.SPRING_DAMP
  });

  function update(e: MouseEvent, element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    x.set(px);
    y.set(py);
  }

  return { x, y, update };
}

/**
 * Transições de Micro-interação (Vanguarda 2026)
 */
export const transitions = {
  scaleUp: {
    duration: 200,
    easing: quintOut,
    css: (t: number) => `transform: scale(${0.95 + 0.05 * t}); opacity: ${t}`
  },
  
  glitchEffect: () => {
    // Retorna parâmetros para animação de glitch controlada via JS se necessário
    return {
      duration: 300,
      easing: cubicOut
    };
  }
};

/**
 * Service Wrapper para orquestração (se necessário no futuro)
 */
export const AnimationService = {
  config: ANIMATION_CONFIG,
  hooks: {
    useVanguardMouse
  },
  transitions
};
