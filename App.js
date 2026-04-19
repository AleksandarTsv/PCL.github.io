const LCA = {
  beef:      { land: 164,  water: 15400, feed: 20.0, color: '#db2b2b', name: 'Beef',      tag: 'Bovine' },
  pork:      { land: 11,   water: 5990,  feed: 9.1,  color: '#e8a0cc', name: 'Pork',      tag: 'Swine' },
  chicken:   { land: 7.1,  water: 4300,  feed: 3.1,  color: '#f5c842', name: 'Chicken',   tag: 'Poultry' },
  lamb: { land: 185, water: 10400, feed: 11.0, color: '#0000e4', name: 'Lamb', tag: 'Ovine' },
   crickets:  { land: 15,   water: 2300,  feed: 2.1,  color: '#a8e063', name: 'Crickets',  tag: 'Insect' },
  mealworms: { land: 14,   water: 4000,  feed: 2.2,  color: '#5ecfb1', name: 'Mealworms', tag: 'Insect' },
};

let selected = 'beef';

function selectProtein(key, btn) {
  selected = key;
  document.querySelectorAll('.protein-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  update();
}

function fmt(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(2) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return Math.round(n).toLocaleString();
}

function renderBars(containerId, metric, amt) {
  const container = document.getElementById(containerId);
  const entries = Object.entries(LCA);
  const vals = entries.map(([k, v]) => ({ key: k, val: v[metric] * amt, color: v.color, name: v.name }));
  const max = Math.max(...vals.map(v => v.val));

  container.innerHTML = vals.map(({ key, val, color, name }) => {
    const pct = Math.round((val / max) * 100);
    const isActive = key === selected;
    return `
      <div class="bar-row">
        <span class="bar-name${isActive ? ' active' : ''}">${name}</span>
        <div class="bar-track">
          <div class="bar-fill" style="width:${pct}%; background:${color}; opacity:${isActive ? 1 : 0.3};"></div>
        </div>
        <span class="bar-val${isActive ? ' active' : ''}">${fmt(val)}</span>
      </div>`;
  }).join('');
}

function update() {
  const amt = parseInt(document.getElementById('amtSlider').value);
  document.getElementById('amtVal').textContent = amt;

  const p = LCA[selected];

  document.getElementById('valLand').textContent = fmt(p.land * amt);
  document.getElementById('valWater').textContent = fmt(p.water * amt);
  document.getElementById('valFeed').textContent = fmt(p.feed * amt);

  ['cardLand', 'cardWater', 'cardFeed'].forEach(id => {
    document.getElementById(id).style.setProperty('--card-color', p.color);
  });

  renderBars('landBars', 'land', amt);
  renderBars('waterBars', 'water', amt);
  renderBars('feedBars', 'feed', amt);
}

update();