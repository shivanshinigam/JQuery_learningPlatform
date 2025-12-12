/* app.js — Super-simple lessons + full walkthroughs (Lessons 1–4)
   Drop this file next to index.html. jQuery-only.
*/

/* =========================
   STATE and PERSISTENCE
   ========================= */
const state = {
  xp: parseInt(localStorage.getItem('lq_xp') || '0'),
  coins: parseInt(localStorage.getItem('lq_coins') || '0'),
  name: localStorage.getItem('lq_name') || '',
  badges: JSON.parse(localStorage.getItem('lq_badges') || '{"beginner":false,"quizMaster":false,"shopBadge":false,"streaker":false,"levelUp":false}'),
  lastVisit: localStorage.getItem('lq_lastVisit') || null,
  streak: parseInt(localStorage.getItem('lq_streak') || '0'),
  leaderboard: JSON.parse(localStorage.getItem('lq_lb') || '[]')
};
const XP_PER_LEVEL = 100;
const SHOP_PRICE = 40;

/* -------------------------
   Helper functions
   ------------------------- */
function saveState(){
  localStorage.setItem('lq_xp', state.xp);
  localStorage.setItem('lq_coins', state.coins);
  localStorage.setItem('lq_name', state.name);
  localStorage.setItem('lq_badges', JSON.stringify(state.badges));
  localStorage.setItem('lq_lastVisit', state.lastVisit);
  localStorage.setItem('lq_streak', state.streak);
  localStorage.setItem('lq_lb', JSON.stringify(state.leaderboard));
}
function levelFromXp(xp){ return Math.floor(xp / XP_PER_LEVEL) + 1; }
function xpProgressPercent(){ return (state.xp % XP_PER_LEVEL) / XP_PER_LEVEL * 100; }
function shuffleArray(arr){ for(let i = arr.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; } return arr; }

/* =========================
   LESSONS (1–4)
*/
const LESSONS = [
  {
    id: 'html-lesson',
    title: 'Lesson 1 — HTML (super simple)',
    reward: { xp: 20, coins: 8 },
    content: (function(){
      return `
<div>
  <h3>What is HTML? (short)</h3>
  <p>HTML is like the bones of a web page. It says what is on the page and where.</p>

  <h4>1) Page shape</h4>
  <p>&lt;head&gt; contains info and scripts. &lt;body&gt; has what you see.</p>

  <h4>2) Tags we use</h4>
  <ul>
    <li>&lt;aside&gt; — side boxes (left & right)</li>
    <li>&lt;main&gt; — the main lesson area</li>
    <li>&lt;button&gt; — clicks</li>
    <li>&lt;input&gt; — type your name</li>
  </ul>

  <h4>3) Attributes</h4>
  <p><strong>id</strong> = unique; <strong>class</strong> = group; <strong>data-*</strong> = small notes for scripts.</p>

  <h4>4) Quick fix exercise</h4>
  <pre>&lt;div&gt;
  &lt;h3&gt;Title&lt;/h3&gt;
  &lt;p&gt;Paragraph 1
  &lt;p class="note"Some note&lt;/p&gt;
&lt;/div&gt;</pre>
  <p>Fix: close the missing &lt;p&gt; and add quotes: &lt;p&gt;Paragraph 1&lt;/p&gt; &lt;p class="note"&gt;Some note&lt;/p&gt;</p>
</div>`;
    })(),
    quiz: [
      { q: "Where does the page title belong?", options:["body","head","main","aside"], correct:1 },
      { q: "Which attribute stores a small custom value like data-idx?", options:["id","class","data-*","style"], correct:2 },
      { q: "Which tag is the main content area?", options:["aside","header","main","footer"], correct:2 }
    ],
    liveSnippet: {
      type: 'html',
      title: 'Edit simple HTML',
      code: `<h2>Lesson 1 — Edit this heading</h2>\n<p>Change the text and Run to preview.</p>`
    }
  },

  {
    id: 'jquery-lesson',
    title: 'Lesson 2 — jQuery (super simple)',
    reward: { xp: 30, coins: 12 },
    content: (function(){
      return `
<div>
  <h3>What is jQuery? (short)</h3>
  <p>jQuery helps you point to page items and change them easily.</p>

  <h4>1) Selectors</h4>
  <pre>$('#id'), $('.class'), $('tag')</pre>

  <h4>2) Clicks</h4>
  <pre>$('.btn').click(function(){ /* code */ })</pre>

  <h4>3) Change content</h4>
  <pre>$('#lesson-pane').html('&lt;h2&gt;New&lt;/h2&gt;')</pre>

  <h4>4) Save data</h4>
  <pre>localStorage.setItem('lq_xp', state.xp)</pre>
</div>`;
    })(),
    quiz: [
      { q: "How to select by id 'app'?", options:["$('.app')","$('#app')","$('app')","$('div.app')"], correct:1 },
      { q: "Which sets inner HTML?", options:[".text()", ".html()", ".val()", ".data()"], correct:1 },
      { q: "How to save persistently?", options:["localStorage.setItem","session.save","cookie.set","window.store"], correct:0 }
    ],
    liveSnippet: {
      type: 'js',
      title: 'Click demo item to alert data-idx',
      code:
`$('.xitem').off('click.demo').on('click.demo', function(){ const idx = $(this).data('idx'); alert('You clicked item with data-idx=' + idx); });`
    }
  },

  {
    id: 'html-walkthrough',
    title: 'Lesson 3 — HTML Walkthrough (this app)',
    reward: { xp: 25, coins: 10 },
    content: (function(){
      return `
<div>
  <h3>Goal: See exactly where the HTML pieces live and what they do</h3>

  <h4>1) Left sidebar (lessons list)</h4>
  <pre>&lt;aside class="sidebar"&gt; ... &lt;/aside&gt;</pre>
  <p>What it does: shows the lessons. Each lesson is a &lt;div class="lesson-item" data-idx="N"&gt;.</p>
  <p>Why important: jQuery finds .lesson-item and reads data-idx to open the right lesson.</p>

  <h4>2) Main area (lesson pane)</h4>
  <pre>&lt;main class="main"&gt;
  &lt;div id="lesson-pane"&gt;...&lt;/div&gt;
&lt;/main&gt;</pre>
  <p>What it does: #lesson-pane is where lesson HTML is injected. The script does $('#lesson-pane').html(...).</p>

  <h4>3) Right panel (profile, shop, annotated code)</h4>
  <pre>&lt;aside class="right"&gt; ... &lt;/aside&gt;</pre>
  <p>What it does: shows profile, coins, badges, and the annotated code view. The tabs switch content inside the panel.</p>

  <h4>4) Modal (level up)</h4>
  <pre>&lt;div id="level-modal" class="modal"&gt; ... &lt;/div&gt;</pre>
  <p>What it does: hidden by default; shown when the player levels up (script fades it in).</p>

  <h4>5) Buttons and inputs</h4>
  <p>Examples: &lt;button id="btn-complete"&gt; triggers completing the current lesson. &lt;input id="player-name"&gt; holds the player's name.</p>

  <h4>6) Live Editor area</h4>
  <p>Inside each lesson we render a textarea (id=live-editor) and a preview (id=live-preview). Running the snippet updates preview or runs JS that interacts with demo items.</p>

  <h4>7) Mini exercise</h4>
  <p>Find the element with id 'lesson-pane' in index.html and look which tag contains it (it's &lt;main&gt;). Good job!</p>
</div>`;
    })(),
    quiz: [
      { q: "Where does the lesson HTML get injected?", options:["#badges-list","#lesson-pane","#leaderboard","#player-name"], correct:1 },
      { q: "Which element is used for the right profile panel?", options:["header","aside","footer","main"], correct:1 },
      { q: "What shows on level up?", options:["#leaderboard","#level-modal","#badges-list","#lesson-pane"], correct:1 }
    ],
    liveSnippet: {
      type: 'html',
      title: 'Preview the lesson pane HTML (edit and Run)',
      code: `<h2>Preview: Lesson Pane</h2>\n<p>Edit this and Run to see it appear in the preview.</p>`
    }
  },

  {
    id: 'appjs-walkthrough',
    title: 'Lesson 4 — app.js Walkthrough (step-by-step)',
    reward: { xp: 35, coins: 16 },
    content: (function(){
      return `
<div>
  <h3>Goal: Understand each part of app.js in simple steps</h3>

  <h4>1) State</h4>
  <p>The state object stores XP, coins, player name, badges, lastVisit, streak, and leaderboard. We save it to localStorage so it stays across reloads.</p>

  <h4>2) Helpers</h4>
  <p><strong>saveState()</strong> writes state to localStorage. <strong>levelFromXp()</strong> computes player level. <strong>shuffleArray()</strong> randomizes questions.</p>

  <h4>3) Rendering UI</h4>
  <p><strong>renderLessonsList()</strong> fills the left sidebar with lesson items. <strong>renderRightPanel()</strong> updates coins, badges, and annotated code.</p>

  <h4>4) Opening a lesson</h4>
  <p><strong>openLesson(idx)</strong> marks the lesson active, sets title, inserts lesson HTML, and sets up quiz + live editor.</p>

  <h4>5) Quiz flow</h4>
  <p><strong>renderLessonQuiz()</strong> shows one question at a time, prevents double clicks, awards small XP for correct answers, and awards full reward if perfect.</p>

  <h4>6) Gamification</h4>
  <p><strong>addXP()</strong> increases state.xp, awards coins, shows floating XP, and checks for level up.</p>

  <h4>7) Live editor runner</h4>
  <p><strong>runSnippet()</strong> injects HTML or executes JS snippets to let you experiment.</p>

  <h4>8) Initialization</h4>
  <p>At the end, the app wires all event handlers and opens Lesson 1 automatically.</p>
</div>`;
    })(),
    quiz: [
      { q: "Which function injects lesson HTML into the page?", options:["renderRightPanel","openLesson","saveState","spawnConfetti"], correct:1 },
      { q: "Which awards XP and checks level up?", options:["renderLessonQuiz","addXP","runSnippet","renderLessonsList"], correct:1 },
      { q: "What does runSnippet() do for html snippets?", options:["saves to localStorage","replaces preview HTML","opens a modal","appends to leaderboard"], correct:1 }
    ],
    liveSnippet: {
      type: 'js',
      title: 'Quick trace demo — click demo items after Run',
      code:
`$('.xitem').off('click.demoWalk').on('click.demoWalk', function(){ $(this).css('background','rgba(74,108,247,0.18)').fadeOut(120).fadeIn(120); const idx = $(this).data('idx'); console.log('demo clicked', idx); });`
    }
  }
];

/* =========================
   Annotated text for right panel
*/
const ANNOTATED_FULL = (function(){
  return `// app.js — annotated (beginner-friendly)
// Key functions:
// - openLesson(idx): load lesson into #lesson-pane, setup quiz + live editor.
// - renderLessonQuiz(lessonIdx, show): quiz UI and scoring.
// - addXP(amount): update XP, coins, and handle level up.
// - runSnippet(lessonIdx): run the live snippet (html or js).
// - init block: wire event handlers and open lesson 1.
`;
})();

/* =========================
   UI helpers
*/
let activeLessonIdx = 0;

function renderLessonsList(){
  const $list = $('#lessons-list').empty();
  LESSONS.forEach((ls, idx) => {
    const $it = $(`<div class="lesson-item" data-idx="${idx}">${ls.title}</div>`);
    $list.append($it);
  });
}

function renderRightPanel(){
  $('#coins').text(state.coins + ' coins');
  $('#profile-name-display').text(state.name || 'You');
  $('#badges-list').empty();
  Object.keys(state.badges).forEach(k=>{
    if(state.badges[k]) $('#badges-list').append(`<div style="margin-top:6px;"><span class="badge-pill">${k}</span></div>`);
  });
  renderLeaderboard();
  $('#annotated-code').text(ANNOTATED_FULL);
}

function renderLeaderboard(){
  const lb = state.leaderboard.slice().sort((a,b)=>b.xp - a.xp).slice(0,7);
  $('#leaderboard').empty();
  if(lb.length === 0){ $('#leaderboard').append('<div class="meta" style="color:#9aa4b2">No saved scores</div>'); return; }
  lb.forEach((e,i)=> {
    $('#leaderboard').append(`<div style="padding:8px 6px; border-bottom:1px solid rgba(255,255,255,0.02);">
      <div style="font-weight:700">${i+1}. ${e.name || 'Anon'}</div>
      <div style="color:var(--muted); font-size:13px;">XP: ${e.xp} • Coins: ${e.coins}</div>
    </div>`);
  });
}

function renderDashTop(){
  $('#xp').text(state.xp);
  $('#level').text(levelFromXp(state.xp));
  $('#xp-percent').text(Math.round(xpProgressPercent()) + '%');
}

/* Visual helpers */
function showFloatingXP(x,y,amount){
  const $f = $(`<div class="float-xp">+${amount} XP</div>`);
  $('body').append($f);
  $f.css({left:x-10, top:y-10});
  $f.animate({top: y-70, opacity:0}, 900, function(){ $f.remove(); });
}
function spawnConfetti(){
  const colors = ['#ff6b6b','#ffd166','#4A6CF7','#6FB3FF','#8AE6B8'];
  for(let i=0;i<18;i++){
    const $c = $('<div></div>').css({
      position:'fixed', width:6+Math.random()*8, height:10+Math.random()*8,
      left: Math.random()*window.innerWidth, top:-10-Math.random()*50,
      background: colors[Math.floor(Math.random()*colors.length)],
      transform: 'rotate(' + (Math.random()*360) + 'deg)', zIndex:8000, opacity:0.95
    }).appendTo('body');
    $c.animate({ top: window.innerHeight + 40, left: '+=' + (Math.random()*200-100) }, 1400+Math.random()*900, 'linear', function(){ $c.remove(); });
  }
}
function showLevelUpModal(newLevel){
  $('#modal-level').text('You reached Level ' + newLevel);
  $('#level-modal').fadeIn(180);
  spawnConfetti();
}

/* Gamification */
function addXP(amount, event){
  const oldLevel = levelFromXp(state.xp);
  state.xp += amount;
  state.coins += Math.floor(amount/3);
  if(event && event.pageX) showFloatingXP(event.pageX, event.pageY, amount);
  else { const off = $('.main-head').offset() || { left:200, top:80 }; showFloatingXP(off.left + 120, off.top + 10, amount); }

  if(state.xp > 0) state.badges.beginner = true;
  const newLevel = levelFromXp(state.xp);
  if(newLevel > oldLevel){ state.badges.levelUp = true; showLevelUpModal(newLevel); }
  saveState(); renderDashTop(); renderRightPanel();
}

function completeLessonByIdx(idx){
  const ls = LESSONS[idx];
  if(!ls) return;
  addXP(ls.reward.xp);
  state.coins += ls.reward.coins;
  state.badges.beginner = true;
  saveState(); renderRightPanel();
  alert(`Completed: ${ls.title} — +${ls.reward.xp} XP, +${ls.reward.coins} coins`);
}

/* Lesson rendering, quiz, live editor */
function openLesson(idx){
  activeLessonIdx = idx;
  $('.lesson-item').removeClass('active');
  $(`.lesson-item[data-idx="${idx}"]`).addClass('active');
  const ls = LESSONS[idx];
  $('#main-title').text(ls.title);
  $('#main-sub').text('Read, experiment, and test your understanding.');

  let html = ls.content;
  html += `<div style="margin-top:14px;" class="lesson-controls">
    <button class="btn" id="take-quiz">Take Quiz</button>
    <button class="btn" id="complete-lesson">Mark Complete</button>
  </div>`;
  html += `<div class="quiz-area" style="margin-top:12px;"></div>`;
  html += `<div style="margin-top:14px;">
    <div style="font-weight:700; margin-bottom:6px;">Live Editor — ${ls.liveSnippet ? ls.liveSnippet.title : 'No snippet'}</div>
    <textarea id="live-editor" class="editor">${ls.liveSnippet ? ls.liveSnippet.code : ''}</textarea>
    <div style="display:flex; gap:8px; margin-top:8px;">
      <button class="btn" id="run-snippet">Run</button>
      <button class="btn" id="reset-snippet" style="background:#6b7280;">Reset</button>
    </div>
    <div class="preview" id="live-preview">Preview will appear here (HTML) or demo items for JS snippets.</div>
  </div>`;

  $('#lesson-pane').html(html);
  initLivePreview(idx);
  renderLessonQuiz(idx, false);
}

function initLivePreview(lessonIdx){
  const ls = LESSONS[lessonIdx];
  const $preview = $('#live-preview').empty();
  if(!ls.liveSnippet){ $preview.text('No live snippet for this lesson.'); return; }
  if(ls.liveSnippet.type === 'html'){ $preview.html(ls.liveSnippet.code); }
  else if(ls.liveSnippet.type === 'js'){
    const demo = `<div><div class="meta" style="color:#9aa4b2">Demo items for JS snippet — click them after running JS.</div>
      <ul style="margin-top:8px;">
        <li class="xitem" data-idx="1">Demo item 1</li>
        <li class="xitem" data-idx="2">Demo item 2</li>
        <li class="xitem" data-idx="3">Demo item 3</li>
      </ul></div>`;
    $preview.html(demo);
  }
}

function runSnippet(lessonIdx){
  const ls = LESSONS[lessonIdx];
  const code = $('#live-editor').val();
  const $preview = $('#live-preview');
  if(ls.liveSnippet.type === 'html'){
    $preview.html(code);
  } else if(ls.liveSnippet.type === 'js'){
    try{
      const fn = new Function(code);
      fn();
      $preview.append('<div style="margin-top:8px;color:#7ee787">JS executed (check interactions or console)</div>');
    } catch(err){
      $preview.append(`<div style="margin-top:8px;color:#ff9b9b">Error: ${String(err)}</div>`);
    }
  }
}

/* Quiz logic */
function renderLessonQuiz(lessonIdx, show){
  const ls = LESSONS[lessonIdx];
  const $wrap = $('#lesson-pane .quiz-area').empty();
  if(!show){
    $wrap.html('<div class="meta" style="color:#9aa4b2">Quiz hidden. Click "Take Quiz" to attempt.</div>');
    return;
  }
  if(!ls.quiz || ls.quiz.length === 0){
    $wrap.html('<div class="meta" style="color:#9aa4b2">No quiz for this lesson.</div>');
    return;
  }
  let qIndex = 0;
  let correctCount = 0;
  const order = shuffleArray(Array.from(Array(ls.quiz.length).keys()));

  function renderQ(){
    const qObj = ls.quiz[order[qIndex]];
    const $q = $(`<div>
      <div style="font-weight:700;">${qObj.q}</div>
      <div class="quiz-options"></div>
      <div id="q-result" style="margin-top:10px; font-weight:700;"></div>
      <div style="margin-top:10px;"><button class="btn" id="next-q">Next</button></div>
    </div>`);
    $wrap.html($q);
    const optsOrder = shuffleArray(Array.from(Array(qObj.options.length).keys()));
    optsOrder.forEach(i=>{
      const $opt = $(`<div class="opt" data-idx="${i}">${qObj.options[i]}</div>`);
      $q.find('.quiz-options').append($opt);
    });

    let answered = false;
    $q.on('click', '.opt', function(){
      if(answered) return;
      answered = true;
      const chosen = parseInt($(this).attr('data-idx'));
      if(chosen === qObj.correct){
        $(this).addClass('correct');
        $('#q-result').text('Correct! +10 XP').css('color','#7ee787');
        addXP(10, { pageX: $(this).offset().left, pageY: $(this).offset().top });
        correctCount++;
      } else {
        $(this).addClass('wrong');
        $('#q-result').text('Wrong ❌').css('color','#ff9b9b');
        $q.find('.opt').each(function(){
          if(parseInt($(this).attr('data-idx')) === qObj.correct) $(this).addClass('correct');
        });
      }
    });

    $q.find('#next-q').on('click', function(){
      qIndex++;
      if(qIndex >= ls.quiz.length){
        $wrap.html(`<div style="font-weight:700;">Quiz finished — score ${correctCount} / ${ls.quiz.length}</div>
          <div style="margin-top:10px;"><button class="btn" id="finish-quiz">Finish</button></div>`);
        $('#finish-quiz').on('click', function(){
          if(correctCount === ls.quiz.length){
            addXP(ls.reward.xp, null);
            state.coins += ls.reward.coins;
            state.badges.quizMaster = true;
            saveState(); renderRightPanel();
            alert(`Perfect! You earned lesson reward: +${ls.reward.xp} XP and +${ls.reward.coins} coins`);
          } else {
            alert(`Quiz done — you got ${correctCount}/${ls.quiz.length}. Mark complete to get the lesson reward.`);
          }
        });
        return;
      } else renderQ();
    });
  }

  renderQ();
}

/* Daily streak, shop, leaderboard helpers */
function dailyVisitCheck(){
  const today = (new Date()).toISOString().slice(0,10);
  if(state.lastVisit === today) return;
  if(state.lastVisit){
    const y = new Date(); y.setDate(y.getDate()-1);
    const yStr = y.toISOString().slice(0,10);
    if(state.lastVisit === yStr) state.streak = (state.streak || 0) + 1;
    else state.streak = 1;
  } else state.streak = 1;
  state.lastVisit = today;
  if(state.streak >= 3) state.badges.streaker = true;
  saveState();
}
function buyShopBadge(){
  if(state.badges.shopBadge){ alert('You already have this badge.'); return; }
  if(state.coins >= SHOP_PRICE){
    if(confirm('Spend ' + SHOP_PRICE + ' coins to buy Shiny Badge?')){
      state.coins -= SHOP_PRICE; state.badges.shopBadge = true; saveState(); renderRightPanel(); alert('Purchased!');
    }
  } else alert('Not enough coins.');
}
function saveMyScore(){
  state.name = $('#player-name').val().trim() || 'Anonymous';
  state.leaderboard.push({ name: state.name, xp: state.xp, coins: state.coins, t: Date.now() });
  state.leaderboard = state.leaderboard.slice(-50);
  saveState(); renderRightPanel(); alert('Score saved.');
}

/* Initialization */
$(function(){
  renderLessonsList(); renderDashTop(); renderRightPanel(); dailyVisitCheck();

  // open Lesson 1 by default
  openLesson(0);

  // Lesson selection
  $('#lessons-list').on('click', '.lesson-item', function(){
    openLesson(parseInt($(this).attr('data-idx')));
  });

  // Controls
  $('#btn-complete').on('click', function(){ completeLessonByIdx(activeLessonIdx); });
  $('#lesson-pane').on('click', '#take-quiz', function(){ renderLessonQuiz(activeLessonIdx, true); });
  $('#lesson-pane').on('click', '#complete-lesson', function(){ completeLessonByIdx(activeLessonIdx); });

  // Run / Reset live editor
  $('#lesson-pane').on('click', '#run-snippet', function(){ runSnippet(activeLessonIdx); });
  $('#lesson-pane').on('click', '#reset-snippet', function(){
    const ls = LESSONS[activeLessonIdx];
    if(ls && ls.liveSnippet) $('#live-editor').val(ls.liveSnippet.code);
    initLivePreview(activeLessonIdx);
  });

  // Right panel tabs
  $('.tab').on('click', function(){
    $('.tab').removeClass('active');
    $(this).addClass('active');
    const t = $(this).data('tab');
    if(t==='profile'){ $('#tab-profile').show(); $('#tab-code').hide(); } else { $('#tab-profile').hide(); $('#tab-code').show(); }
  });

  // Annotated code copy helper
  $('#annotated-code').on('click', function(){
    const txt = window.getSelection().toString();
    if(txt){ navigator.clipboard?.writeText(txt).then(()=> alert('Copied selection to clipboard')); }
  });

  $('#buy-badge').on('click', buyShopBadge);
  $('#save-score').on('click', saveMyScore);
  $('#close-modal').on('click', function(){ $('#level-modal').fadeOut(120); });

  $('#player-name').val(state.name);
  $('#player-name').on('change', function(){ state.name = $(this).val().trim(); saveState(); renderRightPanel(); });

  // quick XP test
  $('.title').on('dblclick', function(e){ addXP(50, e); });

  saveState();
});
