
let currentPage = "home";
let currentEraId = "era-origin";
let currentEventId = "creation";
let currentTab = "summary";
let viewerScale = 1;

const $ = (s)=>document.querySelector(s);
const $$ = (s)=>Array.from(document.querySelectorAll(s));

function getEventTitle(id){
  if(EVENTS[id]) return EVENTS[id].title;
  return ALL_EVENT_TITLES[id] || id;
}
function getEventSummary(id){
  if(EVENTS[id]) return EVENTS[id].summary;
  const title = getEventTitle(id);
  return EVENT_SUMMARIES[title] || `${title} 핵심사건 상세 탭카드는 인포그래픽 확보 후 추가할 수 있습니다.`;
}
function setHeader(title, sub){
  $("#headerTitle").textContent = title;
  $("#headerSub").textContent = sub || "CEN Bible 2.0 통합용 독립 PWA";
}
function go(page){
  currentPage = page;
  $$(".page").forEach(p=>p.classList.remove("active"));
  $("#" + page).classList.add("active");
  $$(".navbtn").forEach(b=>b.classList.toggle("active", b.dataset.page === page));
  if(page==="home") setHeader("성경연대기", "창조부터 새창조까지 흐름으로 탐험");
  if(page==="eras") setHeader("시대별 연대기", "시대 → 사건칩 → 탭카드");
  if(page==="detail") setHeader("핵심사건 상세", "탭카드와 원본 인포그래픽");
  if(page==="settings") setHeader("화면설정", "독립 PWA · 통합 대비 구조");
  window.scrollTo({top:0,behavior:"instant"});
}
function renderHome(){
  $("#eraCount").textContent = ERAS.length;
  $("#eventCount").textContent = ERAS.reduce((a,e)=>a+e.eventIds.length,0);
  $("#readyCount").textContent = Object.keys(EVENTS).length;
  const quick = $("#quickEra");
  quick.innerHTML = ERAS.map((era,i)=>`<button data-era="${era.id}" class="${i===0?'active':''}">${era.title}</button>`).join("");
  quick.addEventListener("click", e=>{
    const b=e.target.closest("button[data-era]");
    if(!b) return;
    currentEraId = b.dataset.era;
    go("eras");
    setTimeout(()=>scrollToEra(currentEraId),30);
  }, {once:true});
}
function renderEras(){
  const box = $("#timeline");
  box.innerHTML = ERAS.map(era=>`
    <article class="era-card" id="${era.id}">
      <div class="era-head">
        <div class="era-title">${era.title}</div>
        <div class="era-year">${era.year}</div>
        <div class="era-scripture">${era.scripture}</div>
      </div>
      <div class="era-summary">${era.summary}</div>
      <div class="event-chip-wrap">
        ${era.eventIds.map(id=>`<button class="event-chip" data-event="${id}">${getEventTitle(id)}</button>`).join("")}
      </div>
      <div class="preview" id="preview-${era.id}">
        <div class="preview-title">핵심사건</div>
        <div class="preview-text small">사건칩을 눌러 요약을 확인하세요.</div>
      </div>
    </article>
  `).join("");
}
function scrollToEra(id){
  const el = document.getElementById(id);
  if(el) el.scrollIntoView({behavior:"smooth", block:"start"});
}
function selectEvent(eventId){
  currentEventId = eventId;
  const era = ERAS.find(e=>e.eventIds.includes(eventId));
  $$(".event-chip").forEach(c=>c.classList.toggle("active", c.dataset.event === eventId));
  if(era){
    const box = $("#preview-" + era.id);
    box.classList.add("show");
    const title = getEventTitle(eventId);
    const summary = getEventSummary(eventId);
    const ready = EVENTS[eventId] ? "상세보기" : "상세 준비중";
    box.innerHTML = `
      <div class="preview-title">${title}</div>
      <div class="preview-text">${summary}</div>
      <div class="small" style="margin-top:6px">시대: ${era.title} · ${era.year}</div>
      <div class="btn-row">
        <button class="cen-btn green" data-detail="${eventId}">${ready}</button>
        <button class="cen-btn secondary" data-toast="related">연결탐험</button>
      </div>
    `;
  }
}


function renderDetail(eventId){
  const data = EVENTS[eventId];
  if(!data){
    const title = getEventTitle(eventId);
    $("#detailRoot").innerHTML = `
      <section class="detail-hero">
        <h2>${title}</h2>
        <div class="detail-meta"><span class="pill light">상세 준비중</span></div>
      </section>
      <section class="scroll-section">
        <div class="section-title">사건 요약</div>
        <div class="section-card">${getEventSummary(eventId)}</div>
      </section>
    `;
    go("detail");
    return;
  }

  const enrich = EVENT_ENRICH[eventId] || {};
  const flow = enrich.flow || data.core.map((x,i)=>[String(i+1), x, ""]);
  const scriptureRefs = enrich.scriptureRefs || [[data.scripture, data.summary]];
  const visualItems = enrich.visualItems || [data.visual];

  $("#detailRoot").innerHTML = `
    <section class="detail-hero detail-scroll-hero">
      <div class="hero-mini">${data.era}</div>
      <h2>${data.title}</h2>
      <div class="detail-meta">
        <span class="pill">${data.year}</span>
        <span class="pill light">${data.scripture}</span>
      </div>
    </section>

    <section class="scroll-section">
      <div class="section-title">1. 사건 요약</div>
      <div class="section-card">
        ${data.summary}
      </div>
    </section>

    <section class="scroll-section">
      <div class="section-title">2. 핵심 의미</div>
      <div class="section-card">
        <ul class="info-list">
          ${data.meaning.map(x=>`<li>${x}</li>`).join("")}
        </ul>
      </div>
    </section>

    <section class="scroll-section">
      <div class="section-title">3. 시대 / 연대</div>
      <div class="section-card">
        <div class="timeline-year">${data.year}</div>
        <div class="timeline-era">${data.era}</div>
        <div class="timeline-scripture">${data.scripture}</div>
      </div>
    </section>

    <section class="scroll-section">
      <div class="section-title">4. 장소</div>
      <div class="section-card">
        <div class="map-title">${data.place}</div>
        <div class="map-note">${data.visual}</div>
      </div>
    </section>

    <section class="scroll-section">
      <div class="section-title">5. 핵심 인물</div>
      <div class="keyword-grid">
        ${data.people.map(x=>`<div class="keyword">${x}</div>`).join("")}
      </div>
    </section>

    <section class="scroll-section">
      <div class="section-title">6. 핵심사건 흐름</div>
      <div class="flow-list">
        ${flow.map(x=>`
          <div class="flow-item">
            <div class="flow-badge">${x[0]}</div>
            <div class="flow-body">
              <div class="flow-text">${x[1]}</div>
              ${x[2] ? `<div class="flow-visual">시각자료: ${x[2]}</div>` : ""}
            </div>
          </div>
        `).join("")}
      </div>
    </section>

    <section class="scroll-section">
      <div class="section-title">7. 관련성경</div>
      <div class="scripture-list">
        ${scriptureRefs.map(x=>`
          <div class="scripture-card">
            <div class="scripture-ref">${x[0]}</div>
            <div class="scripture-text">${x[1]}</div>
          </div>
        `).join("")}
      </div>
    </section>

    <section class="scroll-section">
      <div class="section-title">8. 연결탐험</div>
      <div class="keyword-grid">
        ${data.connect.map(x=>`<button class="keyword">↔ ${x}</button>`).join("")}
      </div>
      <div class="section-card notice-card">
        연결탐험은 성막 · 절기 · 십자가 · 성찬 · 새창조 등 다른 메뉴로 이어지는 탐험 허브 역할을 합니다.
      </div>
    </section>

    <section class="scroll-section">
      <div class="section-title">9. 지도 / 시각자료</div>
      <div class="visual-grid">
        ${visualItems.map(x=>`<div class="visual-chip">${x}</div>`).join("")}
      </div>

      <div class="visual-map">
        <div class="map-title">${data.place}</div>
        <div class="map-note">${data.visual}</div>
      </div>

      <img class="thumb large-thumb" src="${data.image}" alt="${data.title}">
    </section>

    <section class="scroll-section">
      <div class="section-title">원본 인포그래픽</div>
      <div class="btn-row">
        <button class="cen-btn full" data-open-original="${eventId}">
          원본 인포그래픽 크게 보기
        </button>
      </div>
    </section>
  `;
  go("detail");
}
function openViewer(eventId){
  const data = EVENTS[eventId];
  if(!data || !data.image) return;
  viewerScale = 1;
  $("#viewerTitle").textContent = data.title + " 원본 인포그래픽";
  $("#viewerImg").src = data.image;
  $("#viewerImg").style.width = "100%";
  $("#viewer").classList.add("show");
}
function closeViewer(){
  $("#viewer").classList.remove("show");
}
function zoom(delta){
  viewerScale = Math.min(3.2, Math.max(.7, viewerScale + delta));
  $("#viewerImg").style.width = (viewerScale * 100) + "%";
}
function searchEvents(q){
  q = q.trim();
  if(!q){
    renderEras();
    return;
  }
  const matchedEraIds = new Set();
  ERAS.forEach(era=>{
    const text = [era.title, era.year, era.scripture, era.summary, era.people, ...era.eventIds.map(getEventTitle)].join(" ");
    if(text.includes(q)) matchedEraIds.add(era.id);
  });
  const box = $("#timeline");
  box.innerHTML = ERAS.filter(e=>matchedEraIds.has(e.id)).map(era=>`
    <article class="era-card" id="${era.id}">
      <div class="era-head">
        <div class="era-title">${era.title}</div>
        <div class="era-year">${era.year}</div>
        <div class="era-scripture">${era.scripture}</div>
      </div>
      <div class="era-summary">${era.summary}</div>
      <div class="event-chip-wrap">
        ${era.eventIds.map(id=>`<button class="event-chip" data-event="${id}">${getEventTitle(id)}</button>`).join("")}
      </div>
      <div class="preview" id="preview-${era.id}">
        <div class="preview-title">핵심사건</div>
        <div class="preview-text small">사건칩을 눌러 요약을 확인하세요.</div>
      </div>
    </article>
  `).join("") || `<div class="empty">검색 결과가 없습니다.</div>`;
}
function init(){
  renderHome();
  renderEras();

  document.addEventListener("click", e=>{
    const nav = e.target.closest("[data-page]");
    if(nav) go(nav.dataset.page);

    const era = e.target.closest("[data-era]");
    if(era){
      currentEraId = era.dataset.era;
      go("eras");
      setTimeout(()=>scrollToEra(currentEraId),30);
    }

    const chip = e.target.closest("[data-event]");
    if(chip) selectEvent(chip.dataset.event);

    const detail = e.target.closest("[data-detail]");
    if(detail) renderDetail(detail.dataset.detail);

    const tab = e.target.closest("[data-tab]");
    if(tab){
      $$(".tabbtn").forEach(b=>b.classList.remove("active"));
      tab.classList.add("active");
      $$(".panel").forEach(p=>p.classList.remove("active"));
      $("#panel-" + tab.dataset.tab).classList.add("active");
    }

    const original = e.target.closest("[data-open-original]");
    if(original) openViewer(original.dataset.openOriginal);

    const toast = e.target.closest("[data-toast]");
    if(toast) alert("이 기능은 다음 단계에서 CEN Bible 본문·지도·성막 메뉴와 연결됩니다.");

    if(e.target.id === "viewerClose") closeViewer();
    if(e.target.id === "zoomIn") zoom(.25);
    if(e.target.id === "zoomOut") zoom(-.25);
    if(e.target.id === "viewer") closeViewer();
    if(e.target.id === "backBtn"){
      if(currentPage === "detail") go("eras");
      else if(currentPage === "eras" || currentPage === "settings") go("home");
      else alert("성경연대기를 종료하려면 브라우저 뒤로가기를 한 번 더 누르세요.");
    }
  });

  $("#searchInput").addEventListener("input", e=>searchEvents(e.target.value));
  $("#fontUp").addEventListener("click", ()=>{
    const v = Math.min(20, parseInt(getComputedStyle(document.documentElement).getPropertyValue("--font")) + 1);
    document.documentElement.style.setProperty("--font", v+"px");
    localStorage.setItem("chronologyFont", v);
  });
  $("#fontDown").addEventListener("click", ()=>{
    const v = Math.max(14, parseInt(getComputedStyle(document.documentElement).getPropertyValue("--font")) - 1);
    document.documentElement.style.setProperty("--font", v+"px");
    localStorage.setItem("chronologyFont", v);
  });
  $("#cacheReset").addEventListener("click", async ()=>{
    if("caches" in window){
      const keys = await caches.keys();
      await Promise.all(keys.map(k=>caches.delete(k)));
    }
    alert("캐시를 정리했습니다. 새로고침하세요.");
  });

  const savedFont = localStorage.getItem("chronologyFont");
  if(savedFont) document.documentElement.style.setProperty("--font", savedFont+"px");

  if("serviceWorker" in navigator){
    window.addEventListener("load", ()=>navigator.serviceWorker.register("./sw.js"));
  }
}
init();
