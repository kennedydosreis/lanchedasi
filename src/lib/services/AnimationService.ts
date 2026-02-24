import { spring } from 'svelte/motion';

/**
 * AnimationService centralizes spring physics configurations for UI consistency.
 */
export const AnimationService = {
  // Configurações padrão de mola para movimentos fluidos
  springs: {
    // Para movimentos suaves de entrada/saída (e.g. modais, menus)
    gentle: {
      stiffness: 0.1,
      damping: 0.25
    },
    // Para feedback tátil rápido (e.g. hover de botões, badges)
    snappy: {
      stiffness: 0.2,
      damping: 0.4
    },
    // Para elementos pesados (e.g. cards do Bento Grid)
    bouncy: {
      stiffness: 0.15,
      damping: 0.3
    }
  },

  /**
   * Cria uma mola reativa baseada no tipo solicitado
   */
  createSpring(value: any, type: keyof typeof AnimationService.springs = 'gentle') {
    return spring(value, this.springs[type]);
  }
};
