// أضف اختصاراتك هنا. استبدل الرابط برابط المشاركة الذي تنسخه من تطبيق الاختصارات.
const shortcuts = [
  {
    title: "بحث الشاشة عبر Google Lens",
    description: "التقط الشاشة وابحث عن محتوى الصورة مباشرة باستخدام عدسة Google.",
    icon: "⌕",
    color: "#4285f4",
    url: "https://www.icloud.com/shortcuts/fa55dd5857674556a0e5651f446b2565"
  },
  {
    title: "تحويل الصور إلى PDF",
    description: "اجمع الصور المختارة في ملف PDF واحد جاهز للإرسال.",
    icon: "▧",
    color: "#ea438e",
    url: "https://www.icloud.com/shortcuts/c78437c2148344dfb1b8702b7638a123"
  },
  {
    title: "مشاركة الموقع",
    description: "أرسل موقعك الحالي إلى العائلة أو الأصدقاء بسهولة.",
    icon: "⌖",
    color: "#3478f6",
    url: "https://www.icloud.com/shortcuts/141a9a61f8264acbaddf953d4a409e2b"
  },
  {
    title: "إعدادات التطبيق الحالي",
    description: "افتح صفحة إعدادات التطبيق الذي تستخدمه مباشرة بخطوة واحدة.",
    icon: "⚙",
    color: "#636366",
    url: "https://www.icloud.com/shortcuts/5f5572a14d8b4136960e1f85398e6a81"
  }
];

const grid = document.querySelector("#shortcut-grid");
const search = document.querySelector("#search");
const empty = document.querySelector("#empty-state");

function cardTemplate(item) {
  const active = Boolean(item.url);
  return `
    <article class="card" style="--accent:${item.color}">
      <div class="card-icon" aria-hidden="true">${item.icon}</div>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <div class="card-actions">
        <a class="get" href="${active ? item.url : "#"}" ${active ? 'target="_blank" rel="noopener"' : 'aria-disabled="true" title="أضف رابط الاختصار أولًا"'}>
          ${active ? "الحصول على الاختصار" : "الرابط قريبًا"}
        </a>
        ${active ? `<button class="share" type="button" data-share="${item.url}" data-title="${item.title}" aria-label="مشاركة ${item.title}">↗</button>` : ""}
      </div>
    </article>`;
}

function render(query = "") {
  const normalized = query.trim().toLocaleLowerCase("ar");
  const filtered = shortcuts.filter(item => `${item.title} ${item.description}`.toLocaleLowerCase("ar").includes(normalized));
  grid.innerHTML = filtered.map(cardTemplate).join("");
  empty.hidden = filtered.length !== 0;
}

search.addEventListener("input", event => render(event.target.value));

grid.addEventListener("click", async event => {
  const button = event.target.closest("[data-share]");
  if (!button) return;
  const data = { title: button.dataset.title, text: `جرّب اختصار ${button.dataset.title}`, url: button.dataset.share };
  try {
    if (navigator.share) await navigator.share(data);
    else {
      await navigator.clipboard.writeText(data.url);
      const old = button.textContent;
      button.textContent = "✓";
      setTimeout(() => button.textContent = old, 1500);
    }
  } catch (error) {
    if (error.name !== "AbortError") window.prompt("انسخ رابط الاختصار:", data.url);
  }
});

render();
