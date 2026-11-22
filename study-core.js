/* 학습 기록의 채점·버전·이관·합치기·단어 복습 규칙 (study-core.js)
   화면 코드(index.html)와 자동 테스트(tests/)가 함께 쓴다. 화면(DOM)에 의존하지 않는다. */
(function (root) {
  'use strict';
  const SCHEMA = 2;            // 학습 기록 구조 버전(sv). v:1 키는 이전 앱과의 호환을 위해 그대로 둔다.
  const WORD_INT = [1, 3, 7, 14]; // 알아요: 단계 1→2→3→4 의 다음 복습 간격(일). 4단계 = 장기 복습 중(14일 간격 반복)
  const LONG = 4;

  const isObj = x => !!x && typeof x === 'object' && !Array.isArray(x);
  const clone = x => JSON.parse(JSON.stringify(x));

  /* ---------- 문항 버전과 채점 ---------- */
  function meta(QMETA, qid) { return (QMETA && QMETA[qid]) || null; }
  function curV(QMETA, qid) { const m = meta(QMETA, qid); return m ? m.v : 1; }
  // 질문·보기의 뜻이 바뀐 뒤의 옛 답안인가(통계 제외 + 다시 풀기 대상)
  function isStale(QMETA, qid, ver) { const m = meta(QMETA, qid); return !!(m && m.redo && (ver || 1) < m.v); }
  // true/false = 정답/오답, null = 채점 제외(수정 전 문항에 대한 답)
  function grade(QMETA, qid, choice, ver, answerIdx) {
    ver = ver || 1;
    const m = meta(QMETA, qid);
    if (!m || ver >= m.v) return choice === answerIdx;
    if (m.redo) return null;
    const o = m.old && m.old[ver];
    return (o && Array.isArray(o.accept) ? o.accept : [0]).includes(choice);
  }
  // 수정 전 문장에서 정당했던 답인가(다시 풀기 안내 문구용)
  function wasAccepted(QMETA, qid, choice, ver) {
    const m = meta(QMETA, qid); if (!m) return false;
    const o = m.old && m.old[ver || 1];
    return !!(o && Array.isArray(o.accept) && o.accept.includes(choice));
  }

  /* ---------- LC: 날짜별 기록에서 문항별 '첫 풀이(최신 버전 우선)'를 모은다 ---------- */
  function lcAnswerMap(days) {
    const out = {};
    Object.keys(days || {}).sort().forEach(k => {
      const d = days[k]; if (!isObj(d) || !isObj(d.lc)) return;
      for (const q in d.lc) {
        const v = (d.lcv && d.lcv[q]) || 1;
        const cur = out[q];
        if (!cur || v > cur.v) out[q] = { c: d.lc[q], v, k };
      }
    });
    return out;
  }

  /* ---------- 단어 복습(간격 반복) ---------- */
  // w를 바꾼다. 같은 날 여러 번 눌러도 단계는 하루에 한 칸까지만 오르내린다.
  function wordDecide(w, known, t, addDays) {
    if (typeof w.s !== 'number') w.s = 0;
    if (w.ld !== t) { w.s0 = w.s; w.ld = t; }
    const base = typeof w.s0 === 'number' ? w.s0 : w.s;
    w.r = (w.r || 0) + 1;
    w.h = ((w.h || '') + (known ? '1' : '0')).slice(-10);
    if (known) { w.s = Math.min(base + 1, LONG); w.d = addDays(t, WORD_INT[w.s - 1]); }
    else { w.s = Math.max(base - 1, 0); w.d = addDays(t, 1); }
    return w;
  }
  function wordStage(w) {
    if (!w) return 'new';
    if (w.m) return 'skip';                 // 사용자가 '이미 아는 단어'로 표시(이전 버전의 외움 체크 포함)
    if ((w.s || 0) >= LONG) return 'long';  // 장기 복습 중
    return 'learn';
  }

  /* ---------- 기록 구조 이관 ---------- */
  function blank() {
    return { v: 1, sv: SCHEMA, u: 0, next: 0, words: {}, days: {}, wrong: {}, rc: {}, rv: {}, un: {}, ex: {}, pk: {}, mig: {}, fx: {},
      set: { newPerDay: 15, rate: 1, showP2: false, mode: 'practice' } };
  }
  // 옛 기록(sv 없음)을 새 구조로 옮긴다. 기존 값은 지우지 않는다.
  function migrate(st, ctx) {
    const QMETA = (ctx && ctx.QMETA) || {}, today = ctx && ctx.today;
    const b = blank();
    for (const k of ['words', 'days', 'wrong', 'rc', 'rv', 'un', 'ex', 'pk', 'mig', 'fx']) if (!isObj(st[k])) st[k] = b[k];
    if (!isObj(st.set)) st.set = b.set;
    for (const k in b.set) if (st.set[k] === undefined) st.set[k] = b.set[k];
    // 단어: 날짜별 정답 이력이 없으므로 단계(s)는 0에서 시작한다. 다음 복습일(d)과 외움 체크(m)는 그대로 둔다.
    for (const id in st.words) { const w = st.words[id]; if (isObj(w) && typeof w.s !== 'number') w.s = 0; }
    // 정답 키만 바로잡은 문항: 이전 답안을 바른 정답으로 다시 채점해 오답노트를 맞춘다(한 번만).
    for (const qid in QMETA) {
      const m = QMETA[qid];
      if (m.redo || m.kind !== 'key' || (st.mig[qid] || 1) >= m.v) continue;
      const olds = [];
      if (qid[0] === 'r') {
        const d = +qid.slice(1).split('-')[0], rec = st.rc[d];
        if (isObj(rec) && isObj(rec.a) && qid in rec.a) olds.push({ c: rec.a[qid], v: (rec.av && rec.av[qid]) || 1 });
      } else {
        const a = lcAnswerMap(st.days)[qid]; if (a) olds.push(a);
      }
      for (const o of olds) {
        if (o.v >= m.v) continue;
        const ok = grade(QMETA, qid, o.c, o.v, null);
        const w = st.wrong[qid], active = !!w && String(w)[0] !== 'x';
        if (ok && active) st.wrong[qid] = 'x' + today;
        if (!ok && !active) st.wrong[qid] = today;
        st.fx[qid] = today;
      }
      st.mig[qid] = m.v;
    }
    st.sv = SCHEMA;
    return st;
  }

  /* ---------- 두 기록 합치기(이 기기 a, 계정/백업 b): 어느 쪽 학습도 잃지 않는다 ---------- */
  const wDate = v => String(v || '').replace(/^x/, '');
  const activity = d => d ? (d.pos || 0) + Object.keys(d.lc || {}).length + (d.rcn || 0) : 0;
  function mergeAns(xa, xv, ya, yv) {
    const a = {}, v = {};
    for (const q of new Set([...Object.keys(ya || {}), ...Object.keys(xa || {})])) {
      const hx = !!xa && q in xa, hy = !!ya && q in ya;
      const vx = (xv && xv[q]) || 1, vy = (yv && yv[q]) || 1;
      const useX = hx && (!hy || vx >= vy);
      a[q] = useX ? xa[q] : ya[q];
      const vv = useX ? vx : vy; if (vv > 1) v[q] = vv;
    }
    return { a, v };
  }
  function unionList(x, y) {
    const seen = new Set();
    return [...(x || []), ...(y || [])].filter(e => { const k = JSON.stringify(e); if (seen.has(k)) return false; seen.add(k); return true; });
  }
  function mergeListMap(x, y) { const m = {}; for (const q of new Set([...Object.keys(x || {}), ...Object.keys(y || {})])) m[q] = unionList(x && x[q], y && y[q]); return m; }
  function mergeDated(x, y) { // wrong / un : 날짜가 늦은 쪽, 같은 날이면 '완료(x)'
    const m = {};
    for (const q of new Set([...Object.keys(x || {}), ...Object.keys(y || {})])) {
      const p = x && x[q], r = y && y[q];
      if (!p || !r) { m[q] = p || r; continue; }
      const dp = wDate(p), dr = wDate(r);
      m[q] = dp !== dr ? (dp > dr ? p : r) : (String(p)[0] === 'x' ? p : r);
    }
    return m;
  }
  function mergeState(a, b, initial) {
    a = Object.assign(blank(), a); b = Object.assign(blank(), b);
    if ((a.r0 || 0) !== (b.r0 || 0)) return clone((a.r0 || 0) > (b.r0 || 0) ? a : b);
    const m = blank(); m.r0 = a.r0 || 0;
    m.u = Math.max(a.u || 0, b.u || 0);
    if (a.bk || b.bk) m.bk = Math.max(a.bk || 0, b.bk || 0);
    m.next = Math.max(a.next || 0, b.next || 0);
    m.set = Object.assign({}, blank().set, ((a.u || 0) > (b.u || 0) ? a : b).set);
    for (const id of new Set([...Object.keys(a.words), ...Object.keys(b.words)])) {
      const x = a.words[id], y = b.words[id];
      m.words[id] = clone(!x ? y : !y ? x : ((x.t || 0) !== (y.t || 0) ? ((x.t || 0) > (y.t || 0) ? x : y) : ((x.r || 0) > (y.r || 0) ? x : y)));
    }
    for (const k of new Set([...Object.keys(a.days), ...Object.keys(b.days)])) {
      const x = a.days[k], y = b.days[k];
      if (initial && !y && activity(x) === 0) continue;
      const base = !y ? x : !x ? y : (activity(x) > activity(y) ? x : y), other = base === x ? y : x;
      const d = clone(base);
      const lc = mergeAns(base.lc, base.lcv, other && other.lc, other && other.lcv);
      d.lc = lc.a; if (Object.keys(lc.v).length) d.lcv = lc.v; else delete d.lcv;
      if ((base.lco || (other && other.lco))) d.lco = mergeListMap(base.lco, other && other.lco);
      d.rcn = Math.max(x && x.rcn || 0, y && y.rcn || 0);
      m.days[k] = d;
    }
    for (const k of new Set([...Object.keys(a.rc || {}), ...Object.keys(b.rc || {})])) {
      const x = (a.rc || {})[k] || { a: {} }, y = (b.rc || {})[k] || { a: {} };
      const ans = mergeAns(x.a, x.av, y.a, y.av);
      const r = { a: ans.a };
      if (Object.keys(ans.v).length) r.av = ans.v;
      if (x.old || y.old) r.old = mergeListMap(x.old, y.old);
      if (x.ex || y.ex) r.ex = unionList(x.ex, y.ex);
      const t0 = [x.t0, y.t0].filter(Boolean), t1 = [x.t1, y.t1].filter(Boolean);
      if (t0.length) r.t0 = Math.min(...t0); if (t1.length) r.t1 = Math.min(...t1);
      m.rc[k] = r;
    }
    m.wrong = mergeDated(a.wrong, b.wrong);
    m.un = mergeDated(a.un, b.un);
    m.rv = mergeListMap(a.rv, b.rv);
    for (const q in m.rv) m.rv[q].sort((p, r) => String(p.d).localeCompare(String(r.d)));
    for (const k of new Set([...Object.keys(a.ex), ...Object.keys(b.ex)])) {
      const x = a.ex[k], y = b.ex[k]; m.ex[k] = clone(!x ? y : !y ? x : ((x.u || 0) >= (y.u || 0) ? x : y));
    }
    m.pk = Object.assign({}, b.pk, a.pk);
    for (const k of new Set([...Object.keys(a.mig), ...Object.keys(b.mig)])) m.mig[k] = Math.max(a.mig[k] || 1, b.mig[k] || 1);
    m.fx = Object.assign({}, b.fx, a.fx);
    m.sv = SCHEMA;
    return m;
  }

  /* ---------- 백업 읽기: 검증을 모두 통과해야만 새 상태를 돌려준다 ---------- */
  function parseBackupText(text) {
    let t = String(text || '').trim(), json;
    if (t.startsWith('{')) json = t;
    else {
      t = t.replace(/\s+/g, '').replace(/^T8B1:/, ''); if (!t) return null;
      const bin = atob(t);
      json = new TextDecoder('utf-8', { fatal: true }).decode(Uint8Array.from(bin, c => c.charCodeAt(0)));
    }
    return JSON.parse(json);
  }
  function validateState(o, ctx) {
    if (!isObj(o) || o.v !== 1 || !isObj(o.words) || !isObj(o.days)) return null;
    if (o.sv !== undefined && (typeof o.sv !== 'number' || o.sv > SCHEMA)) return null; // 더 새 버전 앱에서 만든 백업
    for (const d of Object.values(o.days)) if (!isObj(d)) return null;
    for (const w of Object.values(o.words)) if (w !== null && !isObj(w)) return null;
    if (o.rc !== undefined && !isObj(o.rc)) return null;
    for (const r of Object.values(o.rc || {})) if (!isObj(r) || (r.a !== undefined && !isObj(r.a))) return null;
    const n = Object.assign(blank(), clone(o));
    for (const k of ['wrong', 'rc', 'set', 'rv', 'un', 'ex', 'pk', 'mig', 'fx']) if (!isObj(n[k])) n[k] = blank()[k];
    return migrate(n, ctx);
  }
  function decodeBackup(text, ctx) { try { return validateState(parseBackupText(text), ctx); } catch (e) { return null; } }

  const api = { SCHEMA, WORD_INT, LONG, isObj, clone, meta, curV, isStale, grade, wasAccepted, lcAnswerMap,
    wordDecide, wordStage, blank, migrate, activity, mergeState, decodeBackup, validateState };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.Core = api;
})(typeof window !== 'undefined' ? window : globalThis);
