// ECHOES OF DAWN - 共通スクリプト
document.addEventListener("DOMContentLoaded", () => {
  // スマートフォン用ナビゲーション
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
    mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }));
  }

  // ページ上部へ戻るボタン
  const backTopFloat = document.getElementById("backTopFloat");
  if (backTopFloat) {
    backTopFloat.addEventListener("click", event => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    const updateBackTop = () => backTopFloat.classList.toggle("is-visible", window.scrollY > 300);
    window.addEventListener("scroll", updateBackTop, { passive: true });
    updateBackTop();
  }

  // TOPへ戻る際の小さな光の演出
  document.querySelectorAll('a[href="index.html"], a[href="index.html#top"]').forEach(link => {
    link.addEventListener("click", () => {
      const hero = document.querySelector(".hero");
      if (!hero) return;
      hero.classList.remove("is-dawn-flash");
      void hero.offsetWidth;
      hero.classList.add("is-dawn-flash");
      window.setTimeout(() => hero.classList.remove("is-dawn-flash"), 1200);
    });
  });

  // キャラクター一覧・プロフィール切り替え（CHARACTERSページのみ）
  const characters = [
    {en:"ELLIOTT HARWOOD",jp:"エリオット・ハーウッド",art:"images/characters/elliott.webp",portrait:"images/characters/elliott-face.webp",meta:"27歳｜銃・付与魔法",desc:"冷静な判断力と鋭い観察眼を持つ青年。古代の遺跡や文献の調査に携わり、状況を見極めながら的確に行動する。仲間を支えることにも長けており、銃による遠距離攻撃と付与魔法を使い分け、戦況を有利に導く。"},
    {en:"REESE HARWOOD",jp:"リース・ハーウッド",art:"images/characters/reese.webp",portrait:"images/characters/reese-face.webp",meta:"22歳｜双剣",desc:"気さくで面倒見がよく、思い立ったらまず行動する青年。兄のエリオットを信頼する一方、無理をしがちな兄のことを気にかけている。素早い身のこなしと双剣による連続攻撃で敵陣へ切り込み、持ち前の行動力で戦況を切り開く。"},
    {en:"CLARICE WERNER",jp:"クラリス・ヴェルナー",art:"images/characters/clarice.webp",portrait:"images/characters/clarice-face.webp",meta:"22歳｜杖",desc:"騎士団に所属する治癒術師で、冷静かつ現実的な判断を重んじる女性。率直で少々辛辣な物言いをすることもあるが、仲間を見捨てることはない。治癒や状態異常の回復を得意とし、防御面の支援によって仲間の生存を支える。"},
    {en:"VIVIAN ROCHE",jp:"ヴィヴィアン・ロッシェ",art:"images/characters/vivian.webp",portrait:"images/characters/vivian-face.webp",meta:"17歳｜魔導書",desc:"好奇心旺盛で明るく、物怖じしない自信家の魔法使い。学園では研究に必要な資料が不足していることから、自ら休学を選び、独自に魔法の研究を続けている。魔導書を用いた攻撃魔法を得意とし、知識と探究心を戦闘でも発揮する。"},
    {en:"GARETH IRONWOOD",jp:"ガレス・アイアンウッド",art:"images/characters/gareth.webp",portrait:"images/characters/gareth-face.webp",meta:"41歳｜両手盾",desc:"王国の騎士団に所属する、重装備の騎士隊長。大きな盾を二枚携え、仲間を守ることを重視した戦い方をする。両手盾を生かした堅牢な防御で敵の攻撃を受け止め、前線を支える。"},
    {en:"MORGAN ASHCROFT",jp:"モルガン・アシュクロフト",art:"images/characters/morgan.webp",portrait:"images/characters/morgan-face.webp",meta:"32歳｜鞭",desc:"古代遺跡を巡る、謎めいた旅人。長い黒髪と琥珀色の瞳を持ち、落ち着いた物腰の中に、過去や旅の目的を簡単には明かさない一面を秘めている。古代の遺物を前にすると、何かを知っているかのような反応を見せることもある。"},
    {en:"MABEL FAIRCROFT",jp:"メイベル・フェアクロフト",art:"images/characters/mabel.webp",portrait:"images/characters/mabel-face.webp",meta:"16歳｜杖",desc:"血のつながらない両親のもとで育った少女。本人もまだ知らない力を秘めており、初めて治癒能力が現れたときも、意識して使ったものではなかった。思いがけず発現したその力が、彼女の歩む道にどのような変化をもたらすのかは、物語の中で描かれていく。"},
    {en:"REMY",jp:"レミー",art:"images/characters/remy.webp",portrait:"images/characters/remy-face.webp",meta:"25歳｜短剣・弓",desc:"軽口と気さくな笑顔で人の懐に入り込む、色気たっぷりの情報屋。女性を口説くことも日常茶飯事だが、相手が嫌がればすぐに引き下がる紳士的な一面も持つ。かつて自らが渡した情報によって誰かを危険にさらした経験から、情報を売ることの責任を強く意識している。戦闘では短剣と弓を使い分け、軽薄な言動の裏に譲れない信念を秘めている。"},
    {en:"LIONEL ARANGAST",jp:"リオネル・アランガスト",art:"images/characters/lionel.webp",portrait:"images/characters/lionel-face.webp",meta:"24歳｜剣",desc:"王族としての立場を持ち、剣を手に戦う王子。幼い頃から自分に仕えてきたエドガーとは、長い年月をともに過ごしている。王子としての役割と、戦いに身を投じる者としての立場を背負いながら、物語に関わっていく。"},
    {en:"EDGAR WINSLET",jp:"エドガー・ウィンスレット",art:"images/characters/edgar.webp",portrait:"images/characters/edgar-face.webp",meta:"54歳｜短剣",desc:"幼い頃からリオネル王子に仕えてきた、経験豊かな従者。長年にわたり王子のそばで仕えてきたからこそ、その歩みを見守る立場にある。戦闘では短剣を扱い、長年の経験を生かして戦場に臨む."}
  ];
  const selector = document.getElementById("characterSelector");
  if (selector) {
    let selectedCharacter = 0;
    const showCharacter = index => {
      selectedCharacter = (index + characters.length) % characters.length;
      const character = characters[selectedCharacter];
      document.getElementById("characterNumber").textContent = `CHARACTER ${String(selectedCharacter + 1).padStart(2, "0")}`;
      document.getElementById("characterEnglish").textContent = character.en;
      document.getElementById("characterJapanese").textContent = character.jp;
      document.getElementById("characterMeta").textContent = character.meta;
      document.getElementById("characterDescription").textContent = character.desc;
      const characterArt = document.getElementById("characterArt");
      characterArt.classList.remove("coming-soon");
      characterArt.classList.add("character-detail__art--has-image");
      characterArt.innerHTML = `<img class="character-detail__full-image" src="${character.art}" alt="${character.jp}の立ち絵">`;
      const info = document.getElementById("characterInfo");
      info.style.animation = "none";
      void info.offsetWidth;
      info.style.animation = "";
      [...selector.querySelectorAll("button")].forEach((button, i) => button.setAttribute("aria-pressed", String(i === selectedCharacter)));
    };
    characters.forEach((character, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "character-selector__button";
      button.setAttribute("aria-pressed", String(index === 0));
      button.setAttribute("aria-label", `${character.jp}のプロフィールを表示`);
      button.innerHTML = `<span class="character-selector__portrait"><img src="${character.portrait}" alt="" loading="lazy"></span><span class="character-selector__name">${character.jp}</span>`;
      button.addEventListener("click", () => {
        showCharacter(index);
        const artTarget = document.getElementById("characterArt");
        if (artTarget) artTarget.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      selector.appendChild(button);
    });
    document.getElementById("prevCharacter").addEventListener("click", () => showCharacter(selectedCharacter - 1));
    document.getElementById("nextCharacter").addEventListener("click", () => showCharacter(selectedCharacter + 1));
    showCharacter(0);
  }

  // マウス操作ができる端末だけ、光の粒を表示
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const magicCursor = document.createElement("div");
    magicCursor.className = "magic-cursor";
    magicCursor.setAttribute("aria-hidden", "true");
    document.body.appendChild(magicCursor);
    const cursorStyle = document.createElement("style");
    cursorStyle.textContent = ".magic-cursor{position:fixed;left:0;top:0;z-index:200;width:22px;height:22px;border:1px solid rgba(214,173,88,.82);border-radius:50%;pointer-events:none;opacity:0;transform:translate(-50%,-50%);transition:width .18s,height .18s,border-color .18s,background .18s,opacity .18s}.magic-cursor::before,.magic-cursor::after{content:'';position:absolute;left:50%;top:50%;background:var(--gold);transform:translate(-50%,-50%) rotate(45deg)}.magic-cursor::before{width:1px;height:8px}.magic-cursor::after{width:8px;height:1px}.magic-cursor.is-visible{opacity:.9}.magic-cursor.is-hover{width:34px;height:34px;background:rgba(113,155,192,.12);box-shadow:0 0 18px rgba(113,155,192,.25)}.sparkle-trail{position:fixed;z-index:199;pointer-events:none;width:5px;height:5px;border-radius:50%;background:#D6AD58;box-shadow:0 0 8px rgba(214,173,88,.9),0 0 14px rgba(113,155,192,.5);animation:sparkle-drift .7s ease-out forwards}@keyframes sparkle-drift{from{opacity:.95;transform:translate(-50%,-50%) scale(1)}to{opacity:0;transform:translate(calc(-50% + var(--drift-x)),calc(-50% + var(--drift-y))) scale(.1)}}@media(hover:none),(pointer:coarse){.magic-cursor,.sparkle-trail{display:none!important}}";
    document.head.appendChild(cursorStyle);
    let lastSparkleAt = 0;
    document.addEventListener("mousemove", event => {
      magicCursor.style.left = `${event.clientX}px`;
      magicCursor.style.top = `${event.clientY}px`;
      magicCursor.classList.add("is-visible");
      magicCursor.classList.toggle("is-hover", Boolean(event.target.closest("a,button")));
      const now = performance.now();
      if (now - lastSparkleAt < 34) return;
      lastSparkleAt = now;
      const sparkle = document.createElement("span");
      sparkle.className = "sparkle-trail";
      sparkle.style.left = `${event.clientX + (Math.random() - .5) * 10}px`;
      sparkle.style.top = `${event.clientY + (Math.random() - .5) * 10}px`;
      sparkle.style.setProperty("--drift-x", `${(Math.random() - .5) * 34}px`);
      sparkle.style.setProperty("--drift-y", `${Math.random() * 30 + 8}px`);
      document.body.appendChild(sparkle);
      sparkle.addEventListener("animationend", () => sparkle.remove(), { once: true });
    });
    document.addEventListener("mouseleave", () => magicCursor.classList.remove("is-visible"));
    document.addEventListener("mouseenter", () => magicCursor.classList.add("is-visible"));
  }
});
