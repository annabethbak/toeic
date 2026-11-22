/* 문항 버전 (data-meta.js)
   - 여기 없는 문항은 v1(최초 공개본)이며 정답은 원본 보기 0번(RC는 문항의 a 값이 있으면 그 값)이다.
   - redo:false → 같은 문제를 고친 것(정답 키·해설·표현·공통 스크립트). 이전 답안은 old[버전].accept 기준으로 그대로 채점한다.
   - redo:true  → 질문·보기의 뜻이 바뀐 것. 이전 답안은 기록으로만 남기고 정답률·점수에서 빼며, 새 문항으로 다시 풀도록 안내한다.
     old[버전].accept는 '그 버전 문장에서 정당했던 답'으로, 다시 풀기 안내 문구에만 쓴다.
   - a: 정답 인덱스(원본 보기 기준). 있으면 문항 데이터보다 우선한다(RC 파일을 읽기 전에도 같은 기준으로 채점하기 위해 rc.json의 a와 같은 값을 둔다). */
const DATA_VERSION = '2026-11-22.1';
const QMETA = {
  'r12-8-2':  {v:2, a:1, kind:'key', redo:false, old:{1:{accept:[1]}}},
  'r24-9-1':  {v:2, kind:'question', redo:true,  old:{1:{accept:[0,1]}}},
  'r11-8-3':  {v:2, kind:'choices',  redo:true,  old:{1:{accept:[0,1]}}},
  'r20-8-3':  {v:2, kind:'choices',  redo:true,  old:{1:{accept:[0,2,3]}}},
  'r14-5-0':  {v:2, kind:'question', redo:true,  old:{1:{accept:[0,3]}}},
  'r20-1-0':  {v:2, kind:'choices',  redo:true,  old:{1:{accept:[0,1]}}},
  'r10-8-2':  {v:2, kind:'choices',  redo:true,  old:{1:{accept:[0,1]}}},
  'r22-3-0':  {v:2, kind:'choices',  redo:true,  old:{1:{accept:[0,1]}}},
  'r21-6-0':  {v:2, kind:'choices',  redo:true,  old:{1:{accept:[0,1]}}},
  'r19-8-3':  {v:2, kind:'choices',  redo:true,  old:{1:{accept:[0,1]}}},
  'r14-8-2':  {v:2, kind:'choices',  redo:true,  old:{1:{accept:[0]}}},
  'r24-0-0':  {v:2, kind:'question', redo:true,  old:{1:{accept:[0,1]}}},
  'r9-5-0':   {v:2, kind:'choices',  redo:true,  old:{1:{accept:[0,2]}}},
  'r10-8-3':  {v:2, kind:'choices',  redo:true,  old:{1:{accept:[0,1]}}},
  'r6-0-0':   {v:2, kind:'question', redo:true,  old:{1:{accept:[0]}}},
  'r13-10-4': {v:2, kind:'wording',  redo:false, old:{1:{accept:[0]}}},
  'r15-10-3': {v:2, kind:'explain',  redo:false, old:{1:{accept:[0]}}},
  'r22-10-4': {v:2, kind:'question', redo:true,  old:{1:{accept:[0]}}},
  'p2-66':    {v:2, kind:'choices',  redo:true,  old:{1:{accept:[0,2]}}},
  'p2-124':   {v:2, kind:'choices',  redo:true,  old:{1:{accept:[0,2]}}},
  'p3-22-0':  {v:2, kind:'script',   redo:false, old:{1:{accept:[0]}}},
  'p3-22-1':  {v:2, kind:'script',   redo:false, old:{1:{accept:[0]}}},
  'p3-22-2':  {v:2, kind:'script',   redo:false, old:{1:{accept:[0]}}},
  'p2-141':   {v:2, kind:'context',  redo:false, old:{1:{accept:[0]}}},
  'p3-37-0':  {v:2, kind:'script',   redo:false, old:{1:{accept:[0]}}},
  'p3-37-1':  {v:2, kind:'script',   redo:false, old:{1:{accept:[0]}}},
  'p3-37-2':  {v:2, kind:'script',   redo:false, old:{1:{accept:[0]}}}
};
if (typeof module !== 'undefined') module.exports = { DATA_VERSION, QMETA };
