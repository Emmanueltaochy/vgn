const { useEffect } = React;

const GRADES = [
  { name: 'Jaune VGN',  accent: '#ffe500', warm: '#fff45c' },
  { name: 'Périwinkle', accent: '#8290d6', warm: '#a4afe4' },
  { name: 'Bleu nuit',  accent: '#5b6ebd', warm: '#8290d6' },
  { name: 'Blanc',      accent: '#f4f4f6', warm: '#ffffff' },
];

function CineTweaks() {
  const defaults = window.__VGN_TWEAK_DEFAULTS__;
  const [t, setTweak] = useTweaks(defaults);

  useEffect(() => { window.__VGN_APPLY_TWEAKS__(t); }, [t]);

  const gi = Math.max(0, GRADES.findIndex(g => g.accent.toLowerCase() === (t.accent || '').toLowerCase()));

  return (
    <TweaksPanel title="Étalonnage">
      <TweakSection title="Couleur de marque">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {GRADES.map((g, i) => (
            <button key={g.name} title={g.name}
              onClick={() => setTweak({ accent: g.accent, accentWarm: g.warm })}
              style={{
                aspectRatio: '1 / 1', borderRadius: 2, cursor: 'pointer', padding: 0,
                border: i === gi ? `1px solid ${g.accent}` : '1px solid rgba(255,255,255,0.12)',
                outline: i === gi ? `3px solid ${g.accent}33` : 'none',
                background: `linear-gradient(160deg, ${g.warm}, ${g.accent})`,
              }} />
          ))}
        </div>
        <div style={{ marginTop: 10, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.55 }}>
          {GRADES[gi]?.name || 'Custom'}
        </div>
      </TweakSection>

      <TweakSection title="Pellicule">
        <TweakToggle label="Grain argentique" hint="Texture film sur toute la page"
          value={t.grain} onChange={(v) => setTweak('grain', v)} />
        <TweakToggle label="Letterbox" hint="Bandes cinéma sur le plan d'ouverture"
          value={t.letterbox} onChange={(v) => setTweak('letterbox', v)} />
        <TweakToggle label="Vignettage" hint="Assombrissement des bords"
          value={t.vignette} onChange={(v) => setTweak('vignette', v)} />
      </TweakSection>

      <TweakSection title="Mouvement">
        <TweakToggle label="Ken Burns" hint="Zoom lent sur les photogrammes"
          value={t.kenburns} onChange={(v) => setTweak('kenburns', v)} />
      </TweakSection>
    </TweaksPanel>
  );
}

const cineRoot = document.createElement('div');
document.body.appendChild(cineRoot);
ReactDOM.createRoot(cineRoot).render(<CineTweaks />);
