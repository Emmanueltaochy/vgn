const { useEffect } = React;

const ACCENT_PALETTES = [
  { name: 'Bleu électrique', accent: '#4a6cf7', glow: '74,108,247' },
  { name: 'Cyan halo',       accent: '#22b8ff', glow: '34,184,255' },
  { name: 'Violet aurore',   accent: '#8a5cff', glow: '138,92,255' },
  { name: 'Vert tropical',   accent: '#2acc6d', glow: '42,204,109' },
];

function VGNTweaks() {
  const defaults = window.__VGN_TWEAK_DEFAULTS__;
  const [t, setTweak] = useTweaks(defaults);

  useEffect(() => {
    window.__VGN_APPLY_TWEAKS__(t);
  }, [t]);

  const currentPaletteIndex = Math.max(0, ACCENT_PALETTES.findIndex(p => p.accent.toLowerCase() === (t.accent || '').toLowerCase()));

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Couleur d'accent">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {ACCENT_PALETTES.map((p, i) => {
            const active = i === currentPaletteIndex;
            return (
              <button
                key={p.name}
                onClick={() => setTweak({ accent: p.accent, accentGlow: p.glow })}
                title={p.name}
                style={{
                  position: 'relative',
                  aspectRatio: '1 / 1',
                  borderRadius: 12,
                  border: active ? `2px solid ${p.accent}` : '1px solid rgba(255,255,255,0.12)',
                  background: `linear-gradient(180deg, ${p.accent}, ${p.accent}55)`,
                  cursor: 'pointer',
                  boxShadow: active ? `0 0 0 4px ${p.accent}33, 0 12px 30px -10px ${p.accent}88` : 'none',
                  padding: 0,
                }}
              />
            );
          })}
        </div>
        <div style={{ marginTop: 8, fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.6 }}>
          {ACCENT_PALETTES[currentPaletteIndex]?.name || 'Custom'}
        </div>
      </TweakSection>

      <TweakSection title="Ambiance">
        <TweakToggle
          label="Effets de glow"
          hint="Halos bleus sur les éléments interactifs"
          value={t.showGlow}
          onChange={(v) => setTweak('showGlow', v)}
        />
        <TweakToggle
          label="Grille tech"
          hint="Quadrillage subtil en arrière-plan"
          value={t.showGrid}
          onChange={(v) => setTweak('showGrid', v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.createRoot(root).render(<VGNTweaks />);
