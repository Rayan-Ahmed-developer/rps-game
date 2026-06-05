const emojis = { rock: '🪨', paper: '📄', scissors: '✂️' };
const choices = ['rock', 'paper', 'scissors'];
let us = 0, cs = 0, history = [];

function play(u) {
  const c = choices[Math.floor(Math.random() * 3)];

  const ud = document.getElementById('user-disp');
  const cd = document.getElementById('comp-disp');

  ud.textContent = emojis[u];
  cd.textContent = emojis[c];

  ud.classList.remove('pulse');
  void ud.offsetWidth;
  ud.classList.add('pulse');

  cd.classList.remove('pulse');
  void cd.offsetWidth;
  cd.classList.add('pulse');

  const msg = document.getElementById('msg');
  msg.className = '';

  let result, cls, dot;

  if (u === c) {
    result = "Tie — same move!";
    cls = 'tie';
    dot = 't';
  } else if (
    (u === 'rock'     && c === 'scissors') ||
    (u === 'paper'    && c === 'rock')     ||
    (u === 'scissors' && c === 'paper')
  ) {
    us++;
    result = 'You win! 🎉';
    cls = 'win';
    dot = 'w';
  } else {
    cs++;
    result = 'Computer wins 😬';
    cls = 'lose';
    dot = 'l';
  }

  document.getElementById('user-score').textContent = us;
  document.getElementById('comp-score').textContent = cs;
  msg.textContent = result;
  msg.classList.add(cls);

  history.push(dot);
  if (history.length > 10) history.shift();
  renderStreak();
}

function renderStreak() {
  document.getElementById('streak-bar').innerHTML =
    history.map(d => `<div class="dot ${d}"></div>`).join('');
}

function reset() {
  us = 0;
  cs = 0;
  history = [];
  document.getElementById('user-score').textContent = 0;
  document.getElementById('comp-score').textContent = 0;
  document.getElementById('user-disp').textContent = '🤜';
  document.getElementById('comp-disp').textContent = '🤖';
  const msg = document.getElementById('msg');
  msg.className = '';
  msg.textContent = 'Choose a move to start';
  renderStreak();
}