/* ===== Google AdSense 설정 (모든 페이지가 이 파일 하나를 함께 씀) =====
   1) client: AdSense 게시자 ID (ca-pub-로 시작)
   2) slots: AdSense에서 만든 광고 단위의 data-ad-slot 번호
      - top: 소개·문의 페이지의 맨 위 광고
      - bottom: 모든 광고 페이지의 맨 아래 광고
   3) domains: 실제 광고를 불러올 내 도메인. 여기 적힌 주소에서 열릴 때만 광고를 불러온다.

   광고 자리는 설정을 채우기 전에는 화면에 나타나지 않는다(빈 상자가 보이지 않도록).
   자리를 미리 보고 싶으면 주소 끝에 #ad-preview 를 붙여 열면 된다. 예: https://english800.kr/about.html#ad-preview */
// TODO: AdSense 승인 후 광고 단위를 만들고 slots 값을 채우세요
const ADS = { client: 'ca-pub-8541021859032223', slots: { top: '', bottom: '' }, domains: ['english800.kr'] };

(function () {
  const slots = [...document.querySelectorAll('.ad-slot')];
  if (!slots.length) return;
  const h = location.hostname;
  const preview = location.hash === '#ad-preview' || h === 'localhost' || h === '127.0.0.1';
  const live = ADS.client && ADS.domains.some(d => h === d || h.endsWith('.' + d));
  if (!live) {
    if (preview) slots.forEach(el => el.classList.add('preview'));
    return;
  }
  const on = slots.filter(el => ADS.slots[el.dataset.slot]);
  if (!on.length) return;
  on.forEach(el => {
    el.classList.add('live');
    el.innerHTML = '<ins class="adsbygoogle" style="display:block" data-ad-client="' + ADS.client +
      '" data-ad-slot="' + ADS.slots[el.dataset.slot] + '" data-ad-format="auto" data-full-width-responsive="true"></ins>';
  });
  // 각 페이지 <head>에 AdSense 코드가 이미 있으면 다시 불러오지 않는다
  if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
  const s = document.createElement('script');
  s.async = true; s.crossOrigin = 'anonymous';
  s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + encodeURIComponent(ADS.client);
  document.head.appendChild(s);
  }
  on.forEach(() => { (window.adsbygoogle = window.adsbygoogle || []).push({}); });
})();
