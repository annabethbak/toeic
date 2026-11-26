/* English800 실전 모의고사 1회 (하프 100문항). 모든 문항·지문·그림은 이 사이트가 새로 만든 연습용이며 ETS 문항이 아니다.
   c[0]이 정답(따로 a가 있으면 a). 화면의 보기 순서는 mockOrder()가 정한다(정답 위치가 고르게 나오도록).
   x = 해설, t = 함정 포인트. 음성은 scripts/make-mock-audio.py가 data-mock-audio.js와 audio/mock/에 만든다. */
const MOCK = {
id: 'mock1',
title: '실전 모의고사 1회',
min: 60,  // 권장 시간(분)

/* ---------------- LC Part 1: 그림 묘사 ---------------- */
P1: [
 {alt: '건물 앞 자전거 거치대에 자전거 세 대가 세워져 있고, 오른쪽에 빈 벤치와 나무가 있는 그림',
  svg: 'bikes',
  c: ['Some bicycles have been left in a rack.', 'A cyclist is locking a bicycle to a post.', 'Some bicycles are being loaded onto a truck.', 'A bench is occupied by some pedestrians.'],
  x: '사람이 없는 그림에서는 "이미 그렇게 되어 있는 상태(have been + p.p.)"를 말하는 문장이 정답이 되기 쉽습니다. 자전거가 거치대에 세워져 있습니다.',
  t: 'is locking, are being loaded는 사람이 지금 동작 중이어야 맞는 표현입니다. 벤치는 비어 있습니다.'},
 {alt: '사무실 책상 위에 노트북이 열려 있고 서류철이 쌓여 있으며, 창틀에 화분이 놓이고 블라인드가 반쯤 내려진 그림',
  svg: 'desk',
  c: ['A potted plant has been placed on a windowsill.', 'The window blinds are being lowered.', 'A laptop is being packed into a case.', 'Some folders are scattered across the floor.'],
  x: '창틀 위 화분은 "놓여 있는 상태"이므로 has been placed가 맞습니다.',
  t: '블라인드가 반쯤 내려져 있어도, are being lowered는 누군가 지금 내리고 있다는 뜻이라 사람이 없는 그림과 맞지 않습니다. 서류철은 바닥이 아니라 책상 위에 있습니다.'},
 {alt: '매장 진열대 앞에서 여자가 맨 위 칸의 상자를 향해 팔을 뻗고 있고, 옆에 빈 쇼핑 카트가 서 있는 그림',
  svg: 'shelf',
  c: ['A woman is reaching for an item on a shelf.', 'A woman is pushing a cart down an aisle.', 'Some shelves are being assembled.', 'A woman is stacking boxes on the floor.'],
  x: '여자가 진열대 위 칸의 물건을 향해 팔을 뻗고 있습니다(reach for).',
  t: '카트가 그림에 있지만 여자는 카트를 밀고 있지 않습니다. 그림에 보이는 사물을 넣은 보기가 가장 끌리는 함정입니다.'}
],

/* ---------------- LC Part 2: 질의응답 ---------------- */
P2: [
 {q: "Who's going to lead the training session now that Mr. Okafor has transferred?",
  c: ["The director's still choosing between two candidates.", 'He transferred to the Lisbon office.', 'The session lasted about two hours.'],
  x: 'Who 질문에 이름 대신 "아직 정하는 중"이라고 답한 우회 응답입니다.', t: 'transferred를 그대로 반복한 보기는 이미 질문에 나온 정보일 뿐 누가 맡는지 답하지 않습니다.'},
 {q: "You've already submitted the expense report, haven't you?",
  c: ["I'm still waiting on a receipt from the hotel.", 'The report was very expensive.', "Yes, I'll submit it to Ms. Lee."],
  x: '부가 의문문에 "아직 영수증을 기다리는 중", 즉 아직 내지 않았다고 돌려 말했습니다.', t: "Yes 뒤에 앞으로 내겠다(I'll submit)고 하면 '이미 냈다'는 뜻의 Yes와 모순됩니다. expense–expensive 파생어 함정도 있습니다."},
 {q: 'How did the product demonstration go yesterday?',
  c: ['Three clients asked for a follow-up meeting.', 'On the fifth floor, I think.', "I'll demonstrate it for you."],
  x: '결과를 묻는 How 질문에 "고객 세 곳이 후속 미팅을 요청했다"로 잘 됐음을 알렸습니다.', t: 'demonstrate는 질문의 demonstration을 동사로 바꾼 반복 함정입니다.'},
 {q: 'Would you rather take the train or drive to the conference?',
  c: ['Parking near the venue is quite limited.', 'Yes, that would be fine.', 'The trainer was very helpful.'],
  x: '선택 의문문에 "행사장 근처 주차가 어렵다"는 근거로 기차를 고른 셈입니다.', t: '둘 중 하나를 고르는 질문에는 Yes/No로 답하지 않습니다. train–trainer 유사 발음도 함정입니다.'},
 {q: "I can't seem to log in to the new scheduling system.",
  c: ['Have you reset your password since the update?', 'The log was delivered this morning.', 'Sure, I can schedule it for you.'],
  x: '문제를 말하는 평서문에 해결 방법을 되묻는 응답이 자연스럽습니다.', t: 'log(통나무)·schedule처럼 질문의 단어를 다른 뜻으로 반복했습니다.'},
 {q: 'When will the renovated lobby be open to guests?',
  c: ['The contractor sent an updated timeline today.', 'Through the main entrance.', 'It was renovated by a local firm.'],
  x: '날짜를 직접 말하지 않고 "새 일정표가 왔다(확인해 보자)"고 우회했습니다.', t: '누가 공사했는지(by a local firm)는 When 질문의 답이 아닙니다.'},
 {q: "Isn't the quarterly budget meeting supposed to start at ten?",
  c: ["It's been moved to the afternoon.", 'Yes, a budget of ten thousand dollars.', "It's a meeting room on the third floor."],
  x: '부정 의문문은 긍정 의문문처럼 풀면 됩니다. "10시 아니에요?"에 "오후로 옮겨졌다"고 답했습니다.', t: 'ten, budget을 반복한 Yes 보기는 시간과 금액을 섞은 함정입니다.'},
 {q: "Why don't we ask the marketing team for their input on the logo?",
  c: ["They're busy with the product launch until Friday.", 'Because it was designed in-house.', 'The logo is blue and white.'],
  x: "Why don't we ~?는 이유가 아니라 제안입니다. 제안에 '그 팀은 금요일까지 바쁘다'는 사정으로 답했습니다.", t: 'Because로 시작하는 보기는 Why에 끌려 고르기 쉬운 대표 함정입니다.'},
 {q: 'Which supplier offered the lowest price for the printer cartridges?',
  c: ["I haven't compared the quotes yet.", 'Yes, the prices went up last month.', 'Near the copy machine.'],
  x: '"아직 견적을 비교하지 않았다"는 모른다는 뜻의 우회 응답입니다.', t: 'Which 의문사 질문에는 Yes/No로 답하지 않습니다.'},
 {q: "The keynote speaker's flight has been delayed by three hours.",
  c: ['Then we should switch the order of the presentations.', 'The flight attendant was very kind.', "I'll speak to him about it at three."],
  x: '문제 상황을 알리는 말에 대책(발표 순서 바꾸기)으로 반응했습니다.', t: 'flight·three·speaker(speak)를 반복한 보기는 소리만 비슷합니다.'},
 {q: 'Do you know if the warehouse is open on weekends?',
  c: ['Only during the holiday season.', 'Yes, I know the way.', "It's a much larger warehouse."],
  x: 'Do you know if ~? 간접 의문문의 핵심은 "주말에 여는지"입니다. "성수기에만"이 답이 됩니다.', t: 'Yes, I know는 질문의 know에만 반응한 응답입니다.'},
 {q: 'Where can I find the updated safety guidelines?',
  c: ["They'll be e-mailed to everyone this afternoon.", 'Safety is our top priority.', 'I found it in the second drawer.'],
  x: '장소 대신 "오후에 모두에게 메일로 온다"고 얻는 방법을 알려 준 우회 응답입니다.', t: 'I found it은 질문자가 아닌 응답자가 찾았다는 엉뚱한 내용이고, 단수 it도 guidelines와 맞지 않습니다.'},
 {q: 'Should we hire a caterer for the retirement party, or prepare the food ourselves?',
  c: ['Most of the staff would rather just relax and enjoy it.', "He's retiring after thirty years.", 'Yes, the food was delicious.'],
  x: '"직원들이 그냥 쉬며 즐기고 싶어 한다"는 말로 음식 업체를 쓰자는 쪽을 골랐습니다.', t: 'retirement–retiring 반복, 선택 의문문에 Yes로 답한 보기가 함정입니다.'},
 {q: "Hasn't the client approved the final draft yet?",
  c: ["She's asked for one more revision to the cover.", 'A draft of the contract.', 'The final round is tomorrow.'],
  x: '"표지를 한 번 더 고쳐 달라고 했다", 즉 아직 승인하지 않았다는 뜻입니다.', t: 'draft·final을 반복했지만 승인 여부와 관계가 없습니다.'}
],

/* ---------------- LC Part 3: 짧은 대화 ---------------- */
P3: [
 {lines: [
   ['W', "Kenji, facilities just told me the movers can't come on Saturday. The earliest they can do is next Tuesday."],
   ['M', "Tuesday? That's when we're hosting the auditors from headquarters."],
   ['W', "I know. I suggested moving the finance team first and the rest of the floor later, but apparently the freight elevator can only be reserved for one day."],
   ['M', "Then let's keep the auditors in the current conference room and have finance work from the third-floor lounge until the move is finished."],
   ['W', "Good idea. I'll ask Ms. Hartley to approve using the lounge."]],
  qs: [
   {q: 'What problem does the woman mention?', c: ['A moving date has been pushed back.', 'An elevator is out of service.', 'An audit has been canceled.', 'A conference room is too small.'],
    x: "movers can't come on Saturday. The earliest ... next Tuesday → 이사 날짜가 미뤄졌습니다.", t: '엘리베이터는 고장 난 것이 아니라 하루만 예약할 수 있는 것입니다.'},
   {q: 'Why does the man say, "That\'s when we\'re hosting the auditors from headquarters"?', c: ['To express concern about a scheduling conflict', 'To suggest that the auditors help with the move', 'To correct a date the woman gave', 'To explain why he will be absent'],
    x: '이사 날과 감사팀 방문 날이 겹친다는 걱정을 나타냅니다.', t: '남자는 날짜를 바로잡지 않았습니다. 여자가 말한 화요일을 그대로 받아 문제를 지적했습니다.'},
   {q: 'What will the woman most likely do next?', c: ['Request permission to use a space', 'Reserve an elevator for a second day', 'Contact the auditors\' office', 'Reschedule a finance meeting'],
    x: 'ask Ms. Hartley to approve using the lounge → 라운지 사용 허가를 요청합니다.', t: '엘리베이터는 하루만 예약된다고 이미 말했으므로 이틀 예약은 불가능합니다.'}]},

 {lines: [
   ['M', "Thanks for meeting with us, Ms. Duarte. Raj and I wanted to talk about the olive oil we order for our restaurants."],
   ['W', "Of course. Was there a problem with the last shipment?"],
   ['M2', "Not with the quality. But our customers keep asking where our ingredients come from, and your labels don't list the farm of origin."],
   ['W', "Ah, our new packaging will include that starting in May. In the meantime, I could send you a certificate for each batch."],
   ['M', "That would help. We could display them near the entrance."],
   ['M2', "And if it's not too much trouble, could you include a short description of each farm? We'd like to print it on our menus."]],
  qs: [
   {q: 'What is the main topic of the conversation?', c: ['Information about where a product is sourced', 'The quality of a recent shipment', 'The price of a bulk order', 'A delayed delivery to a restaurant'],
    x: '손님들이 재료 원산지(farm of origin)를 묻는다는 것이 대화의 중심입니다.', t: '"Was there a problem with the last shipment?"에 품질 문제는 아니라고(Not with the quality) 답했습니다.'},
   {q: 'What does the woman say will happen in May?', c: ['Product packaging will be updated.', 'A new farm will begin supplying oil.', 'Prices will increase.', 'A restaurant will open.'],
    x: 'our new packaging will include that starting in May → 포장이 바뀝니다.', t: 'farm이 대화에 자주 나오지만 새 농장이 생긴다는 말은 없습니다.'},
   {q: 'What does Raj request?', c: ['Descriptions to use on menus', 'A discount on the next order', 'Samples of a new product', 'A tour of a farm'],
    x: '첫 남자가 "Raj and I"라고 했으므로 Raj는 두 번째 남자입니다. 그는 메뉴에 넣을 농장 설명을 부탁했습니다.', t: '증명서를 입구에 두자는 말은 첫 번째 남자가 했습니다. 3인 대화는 누가 말했는지까지 들어야 합니다.'}]},

 {graphic: {title: 'Rush Courier — Delivery Options', rows: [['Standard (3–5 days)', '$12'], ['Two-Day', '$25'], ['Overnight', '$40'], ['Same-Day (city only)', '$60']]},
  lines: [
   ['W', "Hi, I need to send these architectural drawings to a client in Brookfield. They have to reach her before her presentation on Thursday morning."],
   ['M', "Today's Tuesday, so overnight delivery would get them there tomorrow."],
   ['W', "Actually, she won't be back in her office until Wednesday evening, so tomorrow is too early. Something that arrives Thursday by nine would be ideal."],
   ['M', "Then our two-day option is what you want. It's guaranteed by nine a.m."],
   ['W', "Perfect. And could you pack them in a rigid tube? They can't be folded."]],
  qs: [
   {q: 'What is the woman sending?', c: ['Building designs', 'Signed contracts', 'Product samples', 'Presentation slides'],
    x: 'architectural drawings(건축 도면)를 Building designs로 바꿔 말했습니다.', t: 'presentation이 들렸다고 Presentation slides를 고르면 안 됩니다. 발표는 고객이 할 일입니다.'},
   {q: 'Look at the graphic. How much will the woman pay for delivery?', c: ['$25', '$12', '$40', '$60'],
    x: '목요일 9시까지 도착하는 two-day 옵션 → 표에서 $25입니다.', t: '남자가 먼저 꺼낸 overnight($40)는 여자가 "너무 이르다"며 거절했습니다.'},
   {q: 'What does the woman ask the man to do?', c: ['Use a special container', 'Fold the documents carefully', 'Call the client before delivery', 'Deliver the package to a home address'],
    x: 'pack them in a rigid tube → 단단한 통에 담아 달라고 했습니다.', t: "They can't be folded라고 했으니 접어 달라는 보기는 정반대입니다."}]},

 {lines: [
   ['M', "Natalia, the registration numbers for the logistics conference just came in. We're at four hundred and ten."],
   ['W', "Wow, that's well over what the Bayview ballroom holds. Have you checked whether the convention center has anything open that weekend?"],
   ['M', "I did. Hall C is available, but it's twice the rent, and the projectors there are pretty old."],
   ['W', "Well, we can always rent projectors. Paying more for space is better than turning people away."],
   ['M', "True. I'll call them this afternoon, then. Should I ask about catering, too?"],
   ['W', "No need. Our usual caterer has already agreed to serve any venue in the city."]],
  qs: [
   {q: 'What are the speakers mainly discussing?', c: ['Choosing a larger venue', 'Hiring a new caterer', 'Lowering registration fees', 'Repairing some equipment'],
    x: '등록자가 기존 연회장 수용 인원을 넘어 더 큰 장소(Hall C)를 정하는 대화입니다.', t: '케이터링은 마지막에 잠깐 나오고, 기존 업체를 그대로 쓴다고 했습니다.'},
   {q: 'What disadvantage of Hall C does the man mention?', c: ['It costs more to rent.', 'It is far from the city.', 'It has limited seating.', 'It is not available that weekend.'],
    x: "it's twice the rent → 대관료가 두 배입니다.", t: 'Hall C는 그 주말에 비어 있다(available)고 했습니다.'},
   {q: 'Why does the woman say, "we can always rent projectors"?', c: ['To indicate that a problem is easy to solve', 'To suggest canceling a reservation', 'To complain about the cost of equipment', 'To explain why a presentation was delayed'],
    x: '오래된 프로젝터는 빌리면 그만이라는, 문제가 크지 않다는 뜻입니다.', t: 'rent가 들어 있어 비용 불평처럼 들리지만, 바로 뒤에서 돈을 더 내는 편이 낫다고 했습니다.'}]},

 {lines: [
   ['W', "Mr. Feld, thanks for coming in. I see from your résumé that you managed a bookstore for six years."],
   ['M', "That's right. I handled everything from staff scheduling to ordering inventory. The store closed last spring when the owner retired."],
   ['W', "Our gift shop is a bit different. Most of our sales come from prints and handmade jewelry by the artists we exhibit."],
   ['M', "I actually organized monthly book signings with local writers, so I'm used to working directly with creators."],
   ['W', "That's exactly the kind of experience we need. The position starts in two weeks, but we'd like you to shadow our current shop manager this Saturday first. Would that work?"],
   ['M', "Saturday's fine. What time should I be here?"]],
  qs: [
   {q: 'Where does the woman most likely work?', c: ['At an art gallery', 'At a bookstore', 'At a jewelry factory', 'At a publishing company'],
    x: 'the artists we exhibit(우리가 전시하는 작가들)와 gift shop으로 미술관임을 추론합니다.', t: '서점은 남자의 이전 직장입니다.'},
   {q: 'Why did the man leave his previous job?', c: ['His workplace closed.', 'He wanted a higher salary.', 'He moved to a new city.', 'His contract ended.'],
    x: 'The store closed last spring → 가게가 문을 닫았습니다.', t: 'retired는 남자가 아니라 가게 주인이 한 일입니다.'},
   {q: 'What will the man do on Saturday?', c: ['Observe an employee at work', 'Attend a book signing', 'Sign an employment contract', 'Meet some local artists'],
    x: 'shadow our current shop manager = 현재 매니저를 따라다니며 일을 보고 배운다 → Observe an employee.', t: 'shadow는 "그림자"가 아니라 "옆에서 보고 배우다"라는 뜻입니다. 사인회는 과거 경력입니다.'}]},

 {lines: [
   ['M', "Have you tried the new inventory software yet? It went live this morning."],
   ['W', "I did, but it took me twenty minutes to find the reorder screen. The old system had a button right on the main page."],
   ['M', "I had the same trouble. I think the training video skipped that part."],
   ['W', "Should we let Dana know? She's the one who chose the vendor."],
   ['M', "She's actually holding a feedback session on Friday. It might be better to bring a list of issues then, rather than sending them one at a time."],
   ['W', "Good point. I'll start a shared document so everyone in the department can add to it."]],
  qs: [
   {q: 'What are the speakers having trouble with?', c: ['Locating a function in some software', 'Installing a new program', 'Placing an order with a vendor', 'Accessing a training video'],
    x: '재주문(reorder) 화면을 찾는 데 20분이 걸렸다 → 기능 찾기가 어렵습니다.', t: 'reorder, vendor가 들렸다고 주문·업체 보기를 고르면 안 됩니다.'},
   {q: 'What does the man suggest?', c: ['Collecting problems to discuss at a meeting', 'Contacting a vendor directly', 'Watching a video again', 'Returning to the old system'],
    x: 'bring a list of issues then(금요일 피드백 회의에) → 문제를 모아 회의에서 말하자는 제안입니다.', t: '하나씩 보내지 말자고 했으므로 지금 바로 연락하는 보기는 반대입니다.'},
   {q: 'What will the woman do next?', c: ['Create a document for coworkers', 'Schedule a training session', 'Send an e-mail to Dana', 'Update some inventory records'],
    x: "I'll start a shared document → 부서원이 함께 쓰는 문서를 만듭니다.", t: 'Dana에게 바로 알리자는 말은 남자의 제안으로 바뀌었습니다.'}]}
],

/* ---------------- LC Part 4: 짧은 담화 ---------------- */
P4: [
 {kind: 'telephone message', sp: 'F',
  talk: "Hi, this is Marisol from Greenway Print Shop, calling about your order of five hundred event programs. We noticed that the file you uploaded uses a font our printers don't support, so some of the headings came out as blank boxes on our proof. We could replace it with a similar font at no charge, but I know you mentioned the design was approved by your board. If you'd prefer to keep the original, you'd need to upload a version with the text converted to outlines. Either way, we'll need your decision by noon tomorrow to keep your Friday pickup date. You can reach me at extension two-oh-four.",
  qs: [
   {q: 'What problem does the speaker mention?', c: ['A file contains an unsupported font.', 'An order quantity is incorrect.', 'A machine needs to be repaired.', 'A payment was declined.'],
    x: "a font our printers don't support → 지원하지 않는 글꼴이 문제입니다.", t: 'printers가 나와 기계 고장처럼 들리지만, 고장이 아니라 글꼴을 지원하지 않는 것입니다.'},
   {q: 'Why does the speaker say, "I know you mentioned the design was approved by your board"?', c: ['To acknowledge that the listener may not want changes', 'To ask for a copy of a contract', 'To explain why a price increased', 'To confirm a meeting time'],
    x: '이미 승인된 디자인이라 바꾸기 싫을 수 있다는 점을 헤아리고, 원본을 유지하는 방법을 이어서 안내합니다.', t: '바로 뒤 문장(If you\'d prefer to keep the original)이 의도를 알려 주는 단서입니다.'},
   {q: 'What will happen if the listener does not respond by noon tomorrow?', c: ['A pickup date may be delayed.', 'An order will be canceled.', 'An extra fee will be charged.', 'A different font will be used automatically.'],
    x: 'decision by noon tomorrow to keep your Friday pickup date → 답이 늦으면 금요일 수령이 어렵습니다.', t: '대체 글꼴은 무료로 해 줄 수 있다는 선택지일 뿐 자동으로 바뀐다는 말은 없습니다.'}]},

 {kind: 'introduction', sp: 'M',
  graphic: {title: 'Saturday Workshops', rows: [['9:30', 'Budgeting Basics', 'Room 101'], ['11:00', 'Social Media for Small Business', 'Room 204'], ['1:30', 'Negotiating with Suppliers', 'Room 310'], ['3:00', 'Hiring Your First Employee', 'Room 115']]},
  talk: "Good morning, and welcome to Small Business Day at Corbin Community College. Before we begin, there's one change to your printed schedule. Our social media presenter, Ayesha Grant, has had a family emergency, so she's swapped time slots with our speaker on negotiating with suppliers. That means Mr. Lindqvist will give his talk this morning, and Ms. Grant will join us after lunch by video. The rooms haven't changed, so follow the speaker, not the time. Also, your lunch vouchers are in your welcome packets. The cafeteria accepts them only until two o'clock, so please don't wait until the last session ends to use them.",
  qs: [
   {q: 'Who most likely are the listeners?', c: ['Small business owners', 'College professors', 'Cafeteria workers', 'Job applicants'],
    x: 'Small Business Day 행사 참가자이고 워크숍 주제(예산, 공급업체 협상, 첫 직원 채용)도 소상공인 대상입니다.', t: '장소가 대학(Community College)일 뿐 청중이 교수인 것은 아닙니다.'},
   {q: 'Look at the graphic. Where will Mr. Lindqvist give his talk?', c: ['In Room 310', 'In Room 204', 'In Room 101', 'In Room 115'],
    x: 'Lindqvist는 공급업체 협상 강연자입니다. 시간만 11시로 바뀌고 방은 그대로라 Room 310입니다.', t: '"follow the speaker, not the time" — 11:00 칸의 Room 204를 고르면 함정에 걸립니다.'},
   {q: 'What does the speaker remind listeners to do?', c: ['Use their lunch vouchers before a deadline', 'Pick up a revised schedule', 'Register for a video session', 'Return their welcome packets'],
    x: 'only until two o\'clock → 식권을 2시 전에 쓰라고 당부합니다.', t: '바뀐 일정표를 새로 나눠 준다는 말은 없습니다. 말로만 안내했습니다.'}]},

 {kind: 'news report', sp: 'F',
  talk: "In business news, Halvorsen Foods announced yesterday that it will close its frozen-meal plant in Dunmore by the end of the year. However, the company stressed that no jobs will be lost. All one hundred and eighty employees will be offered positions at its new facility in nearby Carrick, which is set to open in September. Halvorsen says the new plant will use about forty percent less energy, thanks to solar panels installed on its roof. For workers without cars, the company will run a free shuttle between the two towns for the first two years. Local officials, who had initially been worried by the announcement, said they welcomed the plan.",
  qs: [
   {q: 'What is the news report mainly about?', c: ['A company moving its operations', 'A new frozen-meal product', 'A local election', 'A rise in energy prices'],
    x: 'Dunmore 공장을 닫고 Carrick의 새 시설로 옮긴다는 소식입니다.', t: 'frozen-meal, energy가 들리지만 신제품이나 에너지 가격 이야기가 아닙니다.'},
   {q: 'What is mentioned about the new facility?', c: ['It will be more energy efficient.', 'It will hire 180 additional workers.', 'It is located in Dunmore.', 'It opened in September.'],
    x: 'about forty percent less energy → 에너지 효율이 더 높습니다.', t: '180명은 새로 뽑는 인원이 아니라 기존 직원 수입니다. 9월은 앞으로 문을 열 예정(is set to open)입니다.'},
   {q: 'What will the company provide for some employees?', c: ['Transportation', 'Housing', 'Training courses', 'Bonus payments'],
    x: 'free shuttle for workers without cars → 교통편입니다.', t: '구체적인 shuttle을 Transportation이라는 넓은 말로 바꿔 말했습니다.'}]},

 {kind: 'excerpt from a meeting', sp: 'M',
  talk: "Okay, let's look at the survey results from our loyalty-card members. Satisfaction with checkout speed rose to eighty-one percent. That's up from sixty-four last year, mostly thanks to the self-service kiosks. But comments about our produce section were less positive. Several shoppers wrote that our fruit goes bad within a day or two of purchase. Now, our supplier hasn't changed, so I suspect the issue is how long items sit in our storage room. Starting next week, I'd like each shift supervisor to record the delivery date on every crate. Bernard will send out a simple form this afternoon.",
  qs: [
   {q: 'Where do the listeners most likely work?', c: ['At a supermarket', 'At a farm', 'At a bank', 'At a kiosk manufacturer'],
    x: '계산대(checkout), 농산물 코너(produce section), 단골 카드 → 슈퍼마켓입니다.', t: 'kiosks는 매장에 둔 기계일 뿐 키오스크를 만드는 회사가 아닙니다.'},
   {q: 'What does the speaker suggest is causing a problem?', c: ['Products are stored for too long.', 'A supplier was replaced.', 'Some kiosks are broken.', 'Staff have not been trained.'],
    x: 'how long items sit in our storage room → 창고에 너무 오래 둔 것이 원인이라고 봅니다.', t: "our supplier hasn't changed라고 했으므로 공급업체 교체는 반대 내용입니다."},
   {q: 'What will Bernard do this afternoon?', c: ['Distribute a form', 'Contact a supplier', 'Conduct a survey', 'Inspect a storage room'],
    x: 'Bernard will send out a simple form → 양식을 나눠 줍니다.', t: '설문은 이미 끝나 결과를 보고 있습니다.'}]},

 {kind: 'announcement', sp: 'F',
  talk: "Welcome aboard the Riverside Heritage cruise. Over the next ninety minutes we'll pass eleven historic bridges, and I'll tell you a little about each one. Just so you know, the upper deck will be closed for the first half hour while the crew finishes cleaning up after this morning's rain. Seats on the lower deck are first come, first served, but honestly, the windows on the left side give the best view of the old mill. Refreshments are sold at the back, cash only, since our card reader is being repaired. And for those of you who booked through the city pass program, please hold on to your tickets. You'll need them for a discount at the maritime museum.",
  qs: [
   {q: 'Why is the upper deck closed?', c: ['It is being cleaned.', 'It is reserved for a private group.', 'The weather is too windy.', 'It is under renovation.'],
    x: 'while the crew finishes cleaning up → 청소 중입니다.', t: '비(rain)는 아침에 왔던 것이고, 지금 날씨 때문에 닫은 것이 아닙니다.'},
   {q: 'Why does the speaker say, "the windows on the left side give the best view of the old mill"?', c: ['To recommend where listeners should sit', 'To explain a change in the route', 'To point out a building straight ahead', 'To apologize for a closed area'],
    x: '자리는 선착순이라는 말 바로 뒤라, 왼쪽에 앉으라는 추천입니다.', t: '경로가 바뀐다는 말은 없습니다. 앞 문장(first come, first served)과 이어서 들어야 합니다.'},
   {q: 'What does the speaker tell some listeners to keep?', c: ['Their tickets', 'Their receipts', 'Their cash', 'Their maps'],
    x: 'hold on to your tickets → 표를 버리지 말고 가지고 있으라고 했습니다.', t: 'cash only는 매점 결제 방법이지 현금을 남겨 두라는 말이 아닙니다.'}]}
],

/* ---------------- RC Part 5: 단문 빈칸 ---------------- */
P5: [
 {q: "The board's decision to ___ the expansion plan was met with considerable skepticism from shareholders.", c: ['shelve', 'shelter', 'shelf', 'shell'],
  x: 'shelve a plan = 계획을 보류하다. to 뒤 동사원형 자리이고 뜻도 맞습니다.', t: '철자가 비슷한 shelf(명사)·shelter(피신하다)·shell을 섞었습니다.'},
 {q: '___ had the new policy been announced than employees began submitting questions.', c: ['No sooner', 'Hardly', 'Scarcely', 'Rarely'],
  x: 'No sooner + had + 주어 + p.p. ~ than ...: ~하자마자 ...했다. 뒤의 than이 단서입니다.', t: 'Hardly·Scarcely도 "~하자마자" 구문이지만 than이 아니라 when/before와 짝을 이룹니다.'},
 {q: 'Had the shipment arrived on schedule, the store ___ its quarterly sales target.', c: ['would have met', 'will meet', 'had met', 'would meet'],
  x: 'Had + 주어 + p.p.는 If가 생략된 가정법 과거완료입니다. 주절은 would have p.p.입니다.', t: 'would meet은 가정법 과거(현재 사실의 반대)라 지난 분기 이야기와 맞지 않습니다.'},
 {q: 'Visitors must be ___ by a staff member at all times while in the laboratory.', c: ['accompanied', 'accommodated', 'acquainted', 'accomplished'],
  x: 'be accompanied by ~ = ~와 동행하다.', t: '모두 ac-로 시작하는 과거분사라 품사로는 못 고르고 뜻으로 골라야 합니다.'},
 {q: "The museum's new wing is expected to draw crowds ___ in size to those of the main gallery.", c: ['comparable', 'compatible', 'considerable', 'comprehensive'],
  x: 'comparable to ~ = ~에 필적하는. 뒤의 to those가 단서입니다.', t: 'compatible은 with와 짝을 이루고, considerable은 to와 어울리지 않습니다.'},
 {q: 'Neither the director nor her assistants ___ aware of the scheduling conflict until this morning.', c: ['were', 'was', 'has been', 'is'],
  x: 'neither A nor B는 동사를 B(her assistants, 복수)에 맞춥니다. until this morning이니 과거 were입니다.', t: '앞의 the director(단수)에 끌려 was를 고르기 쉽습니다.'},
 {q: 'The revised contract, ___ terms were negotiated over three months, will take effect on July 1.', c: ['whose', 'which', 'that', 'its'],
  x: '빈칸 뒤 명사 terms를 꾸미며 contract를 받는 소유격 관계대명사 whose입니다.', t: "that은 콤마 뒤에 못 쓰고, its는 접속 기능이 없어 문장이 두 개가 됩니다."},
 {q: 'Applicants are asked to refrain ___ contacting the hiring committee directly.', c: ['from', 'to', 'of', 'against'],
  x: 'refrain from -ing = ~을 삼가다.', t: '"~에 반대하여"라는 뜻 때문에 against가 그럴듯해 보이지만 refrain과 짝이 아닙니다.'},
 {q: 'Only after the safety inspection had been completed ___ allowed to resume full production.', c: ['was the factory', 'the factory was', 'the factory has been', 'had the factory'],
  x: 'Only after ~ 가 문장 앞에 오면 주절이 도치됩니다(was + 주어). 수동태 be allowed to의 be가 앞으로 나왔습니다.', t: 'had the factory는 도치 모양이지만 "had allowed to"가 되어 수동의 뜻이 사라집니다.'},
 {q: "Ms. Navarro's proposal was praised for being both cost-effective and ___ to implement.", c: ['straightforward', 'straightforwardly', 'straightness', 'more straightforward'],
  x: 'both A and B 병렬 구조: cost-effective(형용사)와 같은 형용사가 와야 합니다.', t: '비교 표현이 없으니 more를 붙일 이유가 없습니다.'},
 {q: 'The CEO insisted that the quarterly figures ___ before the board meeting.', c: ['be verified', 'are verified', 'were verifying', 'will verify'],
  x: '주장·요구 동사(insist) 뒤 that절에서 "~해야 한다"는 뜻이면 (should) + 동사원형을 씁니다. 수치는 검증되는 대상이라 수동 be verified.', t: 'insist가 "~라는 사실을 주장하다"일 때만 직설법을 씁니다. 여기서는 당위의 뜻입니다.'},
 {q: '___ the unexpected surge in demand, the company managed to fulfill every order on time.', c: ['Despite', 'Although', 'Because of', 'Even so'],
  x: '뒤에 명사구가 오므로 전치사, "수요 급증에도 불구하고 해냈다(managed to)"는 양보의 뜻이라 Despite.', t: 'Although는 접속사라 절이 와야 합니다. Because of는 문법은 맞지만 뜻이 맞지 않습니다.'},
 {q: 'The marketing team is ___ confident that the new campaign will exceed its targets.', c: ['reasonably', 'reasonable', 'reason', 'reasoned'],
  x: '형용사 confident를 꾸미는 부사 자리입니다.', t: 'be동사 바로 뒤라 형용사 reasonable을 고르기 쉽지만, 이미 confident가 보어입니다.'},
 {q: 'Of the three proposals submitted, the one from Delmar Consulting was by far the ___ detailed.', c: ['most', 'more', 'much', 'very'],
  x: 'Of the three(셋 중에서) + the → 최상급. by far는 최상급을 강조합니다.', t: 'by far는 비교급도 꾸밀 수 있어 more가 끌리지만, 셋 이상 비교와 the가 최상급을 요구합니다.'},
 {q: 'Ticket holders will be ___ a full refund should the performance be canceled.', c: ['entitled to', 'eligible', 'responsible for', 'capable of'],
  x: 'be entitled to + 명사 = ~을 받을 자격이 있다. should + 주어 + 동사원형은 If가 생략된 가정 표현입니다.', t: 'eligible은 for와 함께 써야 합니다(eligible for a refund).'}
],

/* ---------------- RC Part 6: 장문 빈칸 ---------------- */
P6: [
 {kind: 'Memo',
  text: "To: All Staff\nFrom: Building Management\nSubject: Garage resurfacing\n\nBeginning Monday, March 9, the east parking garage will be closed for resurfacing. The work is expected to take approximately three weeks, {1} weather conditions. During this period, staff may park in the overflow lot on Fenwick Avenue. {2}\n\nPlease note that vehicles left in the east garage after 7 P.M. on Sunday, March 8, will be towed at the owner's {3}. We appreciate your patience and apologize for any inconvenience. Once the project is complete, the garage will offer brighter lighting and {4} marked spaces for electric vehicles.",
  qs: [
   {c: ['depending on', 'depended on', 'to depend', 'dependence'], x: 'depending on ~ = ~에 따라. 날씨에 따라 3주 정도 걸린다는 뜻입니다.', t: 'depended on(과거형)은 앞 절과 접속사 없이 이어질 수 없습니다.'},
   {c: ['A shuttle will run between the lot and the main entrance every fifteen minutes.', 'The garage was originally built in 1998.', 'Please submit your expense reports by the end of the month.', 'The resurfacing was completed ahead of schedule.'],
    x: '바로 앞 문장(임시 주차장 안내)과 이어지는 편의 정보가 들어가야 자연스럽습니다.', t: '공사가 이미 끝났다는 문장은 "3월 9일부터 시작한다"는 내용과 모순됩니다.'},
   {c: ['expense', 'expensive', 'expend', 'expenditures'], x: "at the owner's expense = 소유자 비용으로.", t: '소유격 owner\'s 뒤는 명사 자리지만, 관용 표현은 단수 expense입니다.'},
   {c: ['clearly', 'clear', 'clearness', 'clearer'], x: '과거분사 marked를 꾸미는 부사 자리입니다(clearly marked spaces).', t: 'spaces 앞이라 형용사 clear를 고르기 쉽지만, clear가 꾸밀 대상은 marked입니다.'}]},
 {kind: 'Notice',
  text: "Fernhill Public Library is pleased to announce the return of its Saturday Tech Help program. Volunteers from Fernhill Polytechnic will once again {1} residents with questions about smartphones, tablets, and laptops. Sessions are free, but space is limited, so {2} is strongly recommended.\n\nLast year, more than 300 residents attended the sessions. {3} For this reason, the library has added a second room and extended the hours to run from 10 A.M. to 2 P.M.\n\nResidents interested in volunteering as interpreters for non-English speakers are also {4} to contact the front desk.",
  qs: [
   {c: ['assist', 'inform', 'consult', 'provide'], x: 'assist A with B = A가 B하는 것을 돕다. 질문이 있는 주민을 돕는다는 뜻입니다.', t: 'provide A with B는 "A에게 B를 주다"라 "주민에게 질문을 준다"는 이상한 뜻이 됩니다.'},
   {c: ['registration', 'register', 'registered', 'registers'], x: '동사 is의 주어 자리 → 명사 registration.', t: '동사원형 register는 주어가 될 수 없습니다.'},
   {c: ['Many of them had to be turned away because the room was full.', 'The program was canceled due to a lack of interest.', 'Volunteers are required to bring their own laptops.', 'The library will be closed on national holidays.'],
    x: '뒤 문장 "For this reason, 방을 하나 더 늘렸다"의 이유가 되어야 합니다 → 자리가 없어 돌려보낸 사람이 많았다.', t: '관심이 없어 취소됐다는 문장은 300명 넘게 왔다는 앞 문장과 맞지 않습니다.'},
   {c: ['encouraged', 'encouraging', 'encouragement', 'encourage'], x: 'be encouraged to do = ~하도록 권장되다(수동태).', t: '주민이 권장을 받는 쪽이므로 능동 encouraging은 맞지 않습니다.'}]}
],

/* ---------------- RC Part 7: 독해 ---------------- */
P7: [
 {docs: [{h: 'Text message chain', b: "Hana Moore (9:12 A.M.)\nThe courier just dropped off the banners for the Aldridge launch, but they say \"Aldrige.\"\n\nVictor Salas (9:14 A.M.)\nUgh. Is it our file or their printing?\n\nHana Moore (9:15 A.M.)\nI checked the proof we approved. The spelling was correct.\n\nVictor Salas (9:16 A.M.)\nThen I'll call them. The event starts at four, though.\n\nHana Moore (9:17 A.M.)\nThey have a same-day reprint service. I used it last spring.\n\nVictor Salas (9:18 A.M.)\nGreat. Send me the order number and I'll handle it."}],
  qs: [
   {q: 'What problem does Ms. Moore report?', c: ['Some printed materials contain an error.', 'A delivery has not arrived.', 'An event has been rescheduled.', 'A proof was not approved.'],
    x: '배너에 회사 이름 철자가 틀리게(Aldrige) 인쇄됐습니다.', t: '배송은 이미 왔습니다(just dropped off).'},
   {q: 'At 9:17 A.M., what does Ms. Moore most likely mean when she writes, "I used it last spring"?', c: ['She believes the problem can be fixed in time.', 'She would prefer a different printing company.', 'She has already placed a new order.', 'She attended the event last spring.'],
    x: '행사가 4시라 걱정하는 말에, 당일 재인쇄 서비스를 써 봤으니 시간 안에 해결된다는 뜻입니다.', t: '새 주문은 아직 하지 않았습니다. 주문 번호를 보내 달라는 말은 기존 주문 번호입니다.'}]},

 {docs: [{h: 'Notice', b: "Coastline Fitness: Member Notice\n\nOur pool will be closed from June 2 to June 15 so that new filtration equipment can be installed. During this period, members may use the pool at our Harbor Street location at no additional cost; simply show your membership card at the front desk.\n\nGroup swimming lessons will also move to Harbor Street. Please note that the 6 P.M. class will start at 6:30 P.M. to allow time for travel. All other facilities, including the weight room and sauna, will remain open with normal hours."}],
  qs: [
   {q: 'Why will the pool be closed?', c: ['New equipment will be installed.', 'It will be expanded.', 'A competition will be held.', 'Staff will receive training.'],
    x: 'so that new filtration equipment can be installed → 새 여과 장비 설치.', t: '확장 공사라는 말은 없습니다.'},
   {q: 'What is indicated about the swimming lessons?', c: ['One of them will begin later than usual.', 'They will be canceled for two weeks.', 'They will be free of charge.', 'They will be held in the weight room.'],
    x: '6시 수업이 6시 30분으로 늦춰집니다.', t: '추가 비용이 없는 것은 다른 지점 수영장 이용이지, 수업이 무료라는 뜻이 아닙니다.'}]},

 {docs: [{h: 'E-mail', b: "To: Customer Service <support@lumenhome.com>\nFrom: Graham Whitfield\nDate: October 14\nSubject: Order #58213\n\nI purchased a Lumen desk lamp from your Web site on September 30. It arrived on October 3, but the dimmer switch stopped working after a week. I took it to your store in Ashford, where I was told that items purchased online cannot be exchanged in person.\n\nAccording to your Web site, products returned within 30 days of delivery qualify for a full refund, while those returned later are eligible only for store credit. However, I would prefer a replacement to a refund, as I like the lamp's design. Could you tell me how to send it back? I still have the original box.\n\nGraham Whitfield"}],
  qs: [
   {q: 'Why did Mr. Whitfield write the e-mail?', c: ['To arrange the return of a defective item', 'To complain about a late delivery', 'To order an additional lamp', 'To ask about store hours'],
    x: '고장 난 스탠드를 돌려보내는(교환) 방법을 묻는 메일입니다.', t: '배송은 늦지 않았습니다.'},
   {q: "What is suggested about Mr. Whitfield's purchase?", c: ['It qualifies for a full refund.', 'It was bought at the Ashford store.', 'It was delivered on September 30.', 'It is eligible only for store credit.'],
    x: '배송일 10월 3일 → 메일 날짜 10월 14일은 30일 이내라 전액 환불 대상입니다.', t: '9월 30일은 주문일이고 배송일이 아닙니다. 30일 기준은 "배송일"부터입니다.'},
   {q: 'What does Mr. Whitfield request?', c: ['Instructions for sending a product back', 'A refund to his credit card', 'A lamp in a different design', 'A replacement box'],
    x: 'Could you tell me how to send it back? → 반송 방법을 알려 달라고 했습니다.', t: '환불보다 교환을 원한다고 했고, 디자인이 마음에 든다고 했습니다.'}]},

 {docs: [{h: 'Article', b: "Ridgeway Bakery to Open Second Shop\nBy Tomas Ilunga\n\nRIDGEWAY (May 6) — Ridgeway Bakery, known for its sourdough loaves, will open a second location on Canal Street next month. — [1] — Owner Celia Brandt started the business in her home kitchen eight years ago, selling bread at the Saturday farmers' market. — [2] —\n\nThe new shop will be roughly twice the size of the original and will include a seating area for thirty customers. — [3] — Ms. Brandt also plans to offer weekend baking classes, a long-standing request from regular customers.\n\n\"We've had a waiting list for classes for years,\" she said. \"Now we finally have room for them.\" — [4] — The Canal Street location will hire twelve new employees, most of whom will be trained at the original shop."}],
  qs: [
   {q: 'What is the article mainly about?', c: ['The opening of a new business location', 'A farmers\' market schedule', 'A change in bakery ownership', 'A cooking competition'],
    x: '빵집이 Canal Street에 2호점을 연다는 기사입니다.', t: '농산물 시장은 창업 초기 이야기로만 나옵니다.'},
   {q: 'What is indicated about Ms. Brandt?', c: ['She first sold her products at a market.', 'She will close the original shop.', 'She teaches classes at a college.', 'She recently moved to Ridgeway.'],
    x: "selling bread at the Saturday farmers' market → 처음에는 시장에서 팔았습니다.", t: '직원을 기존 매장에서 교육한다고 했으니 1호점은 계속 엽니다.'},
   {fixed: true, q: 'In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n"Within two years, demand had grown enough for her to rent a storefront on Mill Road."', c: ['[1]', '[2]', '[3]', '[4]'], a: 1,
    x: '집 부엌·시장에서 시작했다는 [2] 앞 문장 다음에 "2년 만에 가게를 얻었다"가 이어져야 시간 순서가 맞습니다.', t: '[3]은 새 매장 설명 사이라 과거 이야기가 끼어들면 흐름이 끊깁니다.'}]},

 {docs: [{h: 'Web page', b: "Harlow Botanical Garden: Seasonal Positions\n\nVisitor Guide (April–October)\nLead guided walks through the garden's collections for groups of up to 25 visitors. Applicants should be comfortable speaking in front of groups and standing for long periods. Knowledge of plants is helpful but not required; all guides complete a two-week training course before the season begins.\n\nWeekend availability is essential. Guides who speak a second language receive an additional $2 per hour.\n\nTo apply, submit a résumé and a brief statement explaining your interest by March 1. Selected applicants will be invited to lead a short practice tour as part of the interview."}],
  qs: [
   {q: 'What is a requirement for the position?', c: ['Availability on weekends', 'A degree in botany', 'Previous teaching experience', 'Fluency in two languages'],
    x: 'Weekend availability is essential → 주말 근무 가능이 필수입니다.', t: '제2외국어는 필수가 아니라 시급을 더 받는 조건입니다. 식물 지식도 필수가 아닙니다.'},
   {q: 'What is mentioned about the training?', c: ['It takes place before the season starts.', 'It is optional for experienced applicants.', 'It is held on weekends only.', 'It is paid at a higher rate.'],
    x: 'a two-week training course before the season begins.', t: 'all guides complete → 경력과 관계없이 모두 받습니다.'},
   {q: 'What will some applicants be asked to do?', c: ['Give a sample tour', 'Submit a letter of reference', 'Take a written exam', 'Plant a garden bed'],
    x: 'Selected applicants will be invited to lead a short practice tour → 연습 투어를 진행합니다.', t: '제출 서류는 이력서와 짧은 지원 동기뿐입니다.'}]},

 {docs: [{h: 'Letter to the editor', b: "To the editor:\n\nI read with interest last week's article on the city's plan to turn the old Delancey rail yard into a public park. As a resident of the neighborhood for over twenty years, I fully support more green space. However, the article left out an important point.\n\nThe proposal also calls for removing the Delancey Street bus stop, which many elderly residents rely on to reach the clinic on Ferris Avenue. The city's planning office has said that a new stop will be added two blocks north, but that location has no shelter and sits at the top of a steep hill.\n\nI urge the city to address this before construction begins in the spring. A public meeting is scheduled for January 18 at the Delancey Community Center, and I hope many of my neighbors will attend and voice their concerns.\n\nOdette Ferrand"}],
  qs: [
   {q: 'Why did Ms. Ferrand write the letter?', c: ['To point out a concern about a city plan', 'To oppose the creation of a park', 'To correct the date of a meeting', 'To apply for a job with the planning office'],
    x: '공원 계획에 빠진 문제(버스 정류장 철거)를 지적하는 편지입니다.', t: 'I fully support more green space → 공원 자체에는 찬성합니다.'},
   {q: 'What is indicated about the new bus stop location?', c: ['It lacks protection from the weather.', 'It is next to the clinic.', 'It will be built after the park opens.', 'It is closer to the rail yard.'],
    x: 'has no shelter → 비바람을 피할 곳이 없습니다.', t: '병원 옆인 것은 없어질 기존 정류장의 장점입니다.'},
   {q: 'The word "address" in paragraph 3, line 1, is closest in meaning to', c: ['deal with', 'speak to', 'send to', 'locate'],
    x: 'address a problem = 문제를 처리하다, 다루다.', t: '"연설하다(speak to)", "주소(send to)" 뜻을 떠올리게 만든 보기입니다.'},
   {q: 'What does Ms. Ferrand encourage her neighbors to do?', c: ['Attend a public meeting', 'Write to a newspaper', 'Visit a clinic', 'Sign a petition'],
    x: 'I hope many of my neighbors will attend → 공청회 참석을 권합니다.', t: '본인이 신문에 편지를 쓴 것이지, 이웃에게 쓰라고 한 것은 아닙니다.'}]},

 {docs: [
   {h: 'E-mail', b: "From: Lorraine Batista, Events Manager, Kestrel Harbour Hotel\nTo: Devon Achebe, Brightline Analytics\nDate: March 3\nSubject: Spring retreat options\n\nThank you for considering us for your spring retreat. Here are the rooms still available on April 17 and 18:\n\n• Tidewater Hall: seats 120; built-in sound system; $1,400 per day\n• Marina Room: seats 60; can be divided into two rooms of 30; $850 per day\n• Lantern Suite: seats 40; private terrace; $700 per day\n\nBookings confirmed by March 15 receive complimentary coffee service throughout the event. Please note that the hotel is hosting a regional conference on April 18, so the main parking garage will be reserved for conference guests that day. Your guests may use the overflow lot on Pier Street, a ten-minute walk away."},
   {h: 'E-mail', b: "From: Devon Achebe\nTo: Lorraine Batista\nDate: March 16\nSubject: RE: Spring retreat options\n\nThank you for the details. We expect about 55 attendees. On the first afternoon we will split into two workshop groups of roughly equal size, so the flexible layout you described suits us well. I would like to confirm the booking today.\n\nSeveral of our staff have limited mobility. Is there any way to arrange a shuttle from the overflow lot on the second day?"}],
  qs: [
   {q: 'Which room will Mr. Achebe most likely book?', c: ['The Marina Room', 'Tidewater Hall', 'The Lantern Suite', 'Both the Marina Room and the Lantern Suite'],
    x: '연계: 55명(60석 이하) + 둘로 나눌 수 있는 방 → Marina Room.', t: 'Tidewater Hall도 55명이 들어가지만 둘로 나눌 수 있다는 조건에 맞지 않습니다.'},
   {q: "What is suggested about Brightline Analytics' booking?", c: ['It will not include free coffee service.', 'It was confirmed by March 15.', 'It includes the use of a private terrace.', 'It is for a single day.'],
    x: '연계: 무료 커피는 3월 15일까지 확정한 예약만 받습니다. Achebe 씨는 3월 16일에 확정합니다.', t: '첫 메일의 혜택 문장만 보면 무료 커피가 포함된 것처럼 보입니다. 두 번째 메일 날짜를 확인해야 합니다.'},
   {q: 'Why will some guests need to use the Pier Street lot?', c: ['Another event is taking place at the hotel.', 'The main garage is under construction.', 'Parking at the hotel is too expensive.', 'The retreat has more guests than expected.'],
    x: '4월 18일에 호텔에서 지역 콘퍼런스가 열려 주 주차장이 그쪽 손님용으로 예약됩니다.', t: '"공사 중"은 지문에 없는 이유입니다.'},
   {q: 'In the second e-mail, the word "suits" in paragraph 1, line 3, is closest in meaning to', c: ['works well for', 'dresses', 'resembles', 'requests'],
    x: 'A suits B = A가 B에게 알맞다.', t: 'suit의 "정장, 옷을 입히다" 뜻(dresses)을 떠올리게 만든 보기입니다.'},
   {q: 'What does Mr. Achebe ask about?', c: ['Transportation for some attendees', 'A discount for an early booking', 'An audio system', 'Catering options'],
    x: '거동이 불편한 직원을 위해 주차장에서 오는 셔틀이 가능한지 묻습니다.', t: '음향 시설(sound system)은 Tidewater Hall 설명에만 나옵니다.'}]},

 {docs: [
   {h: 'Web page', b: "Northfield Design Summit: Registration\n\nFull pass (both days, all sessions): $320\nSingle-day pass: $190\nStudent pass (both days; valid student ID required at check-in): $120\n\nRegister by August 31 to receive 15% off any pass. Members of the Northfield Design Association receive an additional $20 off, which may be combined with the early registration discount.\n\nDay 2 workshops have limited seating and must be reserved separately at no extra cost."},
   {h: 'Schedule', b: "Day 2 Workshops: Saturday, October 4\n\n9:00–10:30  Color Theory for Interfaces · Leah Moretti · Room A (30 seats)\n11:00–12:30  Typography in Motion · Sam Okoye · Room B (20 seats)\n2:00–3:30  Accessible Design Basics · Ines Carvalho · Room A (30 seats)\n4:00–5:30  Portfolio Reviews · Panel · Main Hall (60 seats)"},
   {h: 'E-mail', b: "From: Ruth Abara\nTo: registration@northfieldsummit.org\nDate: September 12\nSubject: Workshop change\n\nHello,\n\nI registered for a full pass last week and reserved a seat in the 11:00 workshop on Day 2. However, I've just learned that my flight home on October 4 leaves at 12:15 P.M. Could I switch to the workshop that begins at nine instead? I can still attend that session before heading to the airport.\n\nAlso, I am a member of the Design Association, but I don't think the member discount was applied to my payment. Could you check?\n\nRuth Abara"}],
  qs: [
   {q: 'According to the Web page, what is true about the workshops?', c: ['They require a separate reservation.', 'They cost an additional fee.', 'They are open only to students.', 'They take place on both days.'],
    x: 'must be reserved separately at no extra cost → 따로 예약해야 하고 추가 비용은 없습니다.', t: 'at no extra cost를 놓치면 추가 요금 보기를 고르게 됩니다. 워크숍은 Day 2에만 있습니다.'},
   {q: 'Which workshop does Ms. Abara want to attend?', c: ['Color Theory for Interfaces', 'Typography in Motion', 'Accessible Design Basics', 'Portfolio Reviews'],
    x: '연계: "9시에 시작하는 워크숍" → 일정표에서 9:00 Color Theory for Interfaces.', t: 'Typography in Motion은 원래 예약한 11시 워크숍입니다.'},
   {q: 'How much did Ms. Abara most likely expect to pay for her pass?', c: ['$300', '$252', '$272', '$320'],
    x: '연계: 메일(9월 12일)의 "지난주" 등록은 8월 31일 이후라 조기 할인 없음 → $320에서 회원 할인 $20만 빼면 $300.', t: '$252는 조기 할인 15%와 회원 할인을 모두 적용한 값입니다. 등록 시점을 확인해야 합니다.'},
   {q: 'What is suggested about Ms. Abara?', c: ['She will leave the summit early on its second day.', 'She is a student.', 'She registered before August 31.', 'She will lead a workshop.'],
    x: '10월 4일(2일째) 12시 15분 비행기라 오후 일정 전에 떠납니다.', t: '학생 할인이 아니라 일반 full pass로 등록했습니다.'},
   {q: 'In the e-mail, the word "check" in paragraph 2, line 2, is closest in meaning to', c: ['look into', 'pay', 'mark', 'stop'],
    x: 'Could you check? = 확인해 주시겠어요? → look into(조사하다, 알아보다).', t: 'check의 "수표(pay)", "체크 표시(mark)" 뜻을 이용한 보기입니다.'}]}
]
};

/* 화면 보기 순서: 같은 보기 수(3·4개)끼리 문항을 차례로 묶어, 묶음마다 정답 위치가 한 번씩 나오게 섞는다. */
function mockRng(seed){ let s = (seed >>> 0) || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
function mockShuffle(a, r){ a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
/* 모든 문항을 순서대로 펼친 목록: {no, part, id, q, c, a, x, t, show, set} */
function mockItems(M){
  M = M || MOCK; const out = []; const cnt = {3: 0, 4: 0}; let no = 0;
  const add = (part, id, q, set) => {
    const n = q.c.length, a = q.a || 0; let show;
    if (q.fixed) show = q.c.map((_, i) => i);
    else {
      const k = cnt[n]++, blk = Math.floor(k / n);
      const pos = mockShuffle([...Array(n).keys()], mockRng(blk * 97 + n * 13 + 7))[k % n];
      const rest = mockShuffle([...Array(n).keys()].filter(i => i !== a), mockRng(k * 31 + n));
      show = []; let j = 0; for (let p = 0; p < n; p++) show.push(p === pos ? a : rest[j++]);
    }
    out.push({no: ++no, part, id, q: q.q || '', c: q.c, a, x: q.x, t: q.t, show, set});
  };
  M.P1.forEach((q, i) => add(1, 'p1-' + i, q, null));
  M.P2.forEach((q, i) => add(2, 'p2-' + i, q, null));
  M.P3.forEach((s, i) => s.qs.forEach((q, j) => add(3, `p3-${i}-${j}`, q, 'p3-' + i)));
  M.P4.forEach((s, i) => s.qs.forEach((q, j) => add(4, `p4-${i}-${j}`, q, 'p4-' + i)));
  M.P5.forEach((q, i) => add(5, 'p5-' + i, q, null));
  M.P6.forEach((s, i) => s.qs.forEach((q, j) => add(6, `p6-${i}-${j}`, q, 'p6-' + i)));
  M.P7.forEach((s, i) => s.qs.forEach((q, j) => add(7, `p7-${i}-${j}`, q, 'p7-' + i)));
  return out;
}
/* 음성으로 읽을 줄: {재생 id: [[화자, 문장, 성별 F|M], ...]} */
function mockAudioLines(M){
  M = M || MOCK; const items = mockItems(M), byId = Object.fromEntries(items.map(it => [it.id, it])), L = 'ABCD', out = {};
  M.P1.forEach((q, i) => { const it = byId['p1-' + i]; out['p1-' + i] = it.show.map((o, p) => ['N', L[p] + '. ' + q.c[o], i % 2 ? 'M' : 'F']); });
  M.P2.forEach((q, i) => { const it = byId['p2-' + i], ask = i % 2 ? 'W' : 'M', ans = ask === 'W' ? 'M' : 'W', g = s => s === 'W' ? 'F' : 'M';
    out['p2-' + i] = [[ask, q.q, g(ask)], ...it.show.map((o, p) => [ans, L[p] + '. ' + q.c[o], g(ans)])]; });
  const range = (part, i) => { const ns = items.filter(it => it.set === part + '-' + i).map(it => it.no); return [ns[0], ns[ns.length - 1]]; };
  M.P3.forEach((s, i) => { const [a, b] = range('p3', i), three = new Set(s.lines.map(l => l[0])).size > 2;
    const intro = `Questions ${a} through ${b} refer to the following conversation${three ? ' with three speakers' : ''}${s.graphic ? ' and graphic' : ''}.`;
    out['p3-' + i] = [['N', intro, 'F'], ...s.lines.map(([sp, t]) => [sp, t, sp[0] === 'W' ? 'F' : 'M'])]; });
  M.P4.forEach((s, i) => { const [a, b] = range('p4', i);
    const intro = `Questions ${a} through ${b} refer to the following ${s.kind}${s.graphic ? ' and graphic' : ''}.`;
    const sents = []; s.talk.match(/[^.!?]+[.!?]+["']?(\s+|$)/g).map(x => x.trim()).forEach(x => {
      if (sents.length && /\b(Mr|Ms|Mrs|Dr)\.$/.test(sents[sents.length - 1])) sents[sents.length - 1] += ' ' + x; else sents.push(x); });
    out['p4-' + i] = [['N', intro, 'F'], ...sents.map(t => ['S', t, s.sp])]; });
  return out;
}
if (typeof module !== 'undefined') module.exports = {MOCK, mockItems, mockAudioLines};
