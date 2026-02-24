<script lang="ts">
  import BentoCell from '../atoms/BentoCell.svelte';

  export let title: string = "Dashboard Vanguarda";
</script>

<section class="vanguard-bento-grid" aria-labelledby="grid-title">
  <h2 id="grid-title" class="sr-only">{title}</h2>
  
  <div class="grid-container">
    <!-- Célula de Elite 1: Destaque Principal -->
    <BentoCell 
      title="Performance Neural" 
      description="Otimização de tempo real via IA vanguardista."
      colSpan={2}
      rowSpan={2}
      variant="accent"
    />

    <!-- Célula de Elite 2: Status -->
    <BentoCell 
      title="Status" 
      description="Sistemas operacionais: 100%"
      variant="glass"
    />

    <!-- Célula de Elite 3: Segurança -->
    <BentoCell 
      title="Criptografia" 
      description="End-to-end com padrão militar."
    />

    <!-- Célula de Elite 4: Rede -->
    <BentoCell 
      title="Conectividade" 
      description="Latência global reduzida em 40%."
      colSpan={2}
    />
  </div>
</section>

<style>
  .vanguard-bento-grid {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(180px, auto);
    gap: 1.5rem;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  /* Responsividade */
  @media (max-width: 768px) {
    .grid-container {
      grid-template-columns: 1fr;
    }
  }
</style>
