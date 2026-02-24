<script>
  import { useVanguardMouse } from '../../vanguard/animation-service';

  export let title = '';
  export let description = '';
  export let variant = 'default';
  export let ariaLabel = undefined;
  export let colSpan = 1;
  export let rowSpan = 1;

  const { x: mouseX, y: mouseY, update: updateMouse } = useVanguardMouse();
  let isHovered = false;

  function handleMouseMove(e) {
    updateMouse(e, e.currentTarget);
  }

  $: role = (variant === 'accent' || variant === 'glass') ? 'region' : 'article';
  $: computedAriaLabel = ariaLabel || `${title}: ${description}`;
</script>

<div
  class="vanguard-bento-cell variant-{variant}"
  role={role}
  aria-label={computedAriaLabel}
  style:--col-span={colSpan}
  style:--row-span={rowSpan}
  style:--mouse-x="{$mouseX}%"
  style:--mouse-y="{$mouseY}%"
  on:mousemove={handleMouseMove}
  on:mouseenter={() => isHovered = true}
  on:mouseleave={() => isHovered = false}
>
  <div class="content-wrapper">
    {#if title}
      <h3 class="cell-title">{title}</h3>
    {/if}
    {#if description}
      <p class="cell-description">{description}</p>
    {/if}
    <slot />
  </div>

  <!-- Glow Effect (Artistic Element) -->
  <div class="glow-layer" aria-hidden="true"></div>
</div>

<style>
  :root {
    --bento-h: 220;
    --bento-s: 15%;
    --bento-l: 10%;
    --bento-bg: hsla(var(--bento-h), var(--bento-s), var(--bento-l), 1);
    --bento-border: hsla(var(--bento-h), var(--bento-s), 25%, 0.3);
    --bento-accent-h: 280;
    --bento-radius: 1.5rem;
  }

  .vanguard-bento-cell {
    grid-column: span var(--col-span, 1);
    grid-row: span var(--row-span, 1);
    position: relative;
    background: var(--bento-bg);
    border: 1px solid var(--bento-border);
    border-radius: var(--bento-radius);
    padding: 2rem;
    overflow: hidden;
    transition: 
      transform 400ms cubic-bezier(0.23, 1, 0.32, 1),
      border-color 400ms ease,
      box-shadow 400ms ease;
    outline: none;
    cursor: pointer;
  }

  .vanguard-bento-cell:hover, .vanguard-bento-cell:focus-visible {
    transform: translateY(-4px);
    border-color: hsla(var(--bento-accent-h), 80%, 60%, 0.5);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  }

  .vanguard-bento-cell:focus-visible {
    box-shadow: 0 0 0 3px hsla(var(--bento-accent-h), 80%, 60%, 0.6);
  }

  .content-wrapper {
    position: relative;
    z-index: 2;
  }

  .cell-title {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 1.25rem;
    font-weight: 600;
    color: white;
    margin: 0 0 0.5rem 0;
    letter-spacing: -0.02em;
  }

  .cell-description {
    font-size: 0.9375rem;
    color: hsla(0, 0%, 100%, 0.6);
    line-height: 1.6;
    margin: 0;
  }

  /* Variant Styles */
  .variant-accent {
    --bento-bg: hsla(var(--bento-accent-h), 40%, 15%, 1);
    --bento-border: hsla(var(--bento-accent-h), 60%, 40%, 0.3);
  }

  .variant-glass {
    background: hsla(var(--bento-h), var(--bento-s), 10%, 0.4);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  /* Glow Layer (The "Art" aspect) */
  .glow-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    opacity: 0;
    background: radial-gradient(
      800px circle at var(--mouse-x) var(--mouse-y),
      hsla(var(--bento-accent-h), 80%, 60%, 0.15),
      transparent 40%
    );
    transition: opacity 500ms ease;
  }

  .vanguard-bento-cell:hover .glow-layer,
  .vanguard-bento-cell:focus-visible .glow-layer {
    opacity: 1;
  }
</style>
