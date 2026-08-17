// تفعيل الإعلانات الثابتة (البانر العلوي + الإعلان الجانبي)
(adsbygoogle = window.adsbygoogle || []).push({});
(adsbygoogle = window.adsbygoogle || []).push({});

(function(){

   
    // =========================================================
    const NEWS_API_KEY = "pub_b6a25a7b862a4f2cbaa881cb1ef07c18";
    const NEWS_API_URL =
      `https://newsdata.io/api/1/latest?apikey=${NEWS_API_KEY}&country=eg&category=health&language=ar`;

    const FALLBACK_IMG = 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=640&h=360&fit=crop&auto=format';

    let articlesStore = [];

    // ---- محتوى تجريبي (يظهر أول ما تفتح الصفحة أو لو الـ API مش شغال) ----
    const demoArticles = [
      {
        time: '08:42', category: 'عاجل', urgent: true,
        title: 'ارتفاع ملحوظ في حالات الإنفلونزا الموسمية بالمستشفيات',
        desc: 'الجهات الصحية توصي بالتطعيم المبكر وتجنب الأماكن المزدحمة للفئات الأكثر عرضة للخطر.',
        text: 'سجّلت المستشفيات خلال الأسابيع الأخيرة زيادة واضحة في عدد الحالات المصابة بالإنفلونزا الموسمية، خاصة بين كبار السن والأطفال دون الخامسة.\n\nويؤكد المسؤولون الصحيون أن التطعيم قبل بداية الموسم يظل الوسيلة الأكثر فعالية للوقاية، إلى جانب غسل اليدين بانتظام وتجنّب الأماكن المزدحمة عند ظهور أي أعراض تنفسية.',
        image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=640&h=360&fit=crop&auto=format',
        source: 'وزارة الصحة', link: '#'
      },
      {
        time: '07:15', category: 'أبحاث',
        title: 'الذكاء الاصطناعي يساعد في الكشف المبكر عن سرطان الثدي',
        desc: 'نماذج تحليل الصور الإشعاعية تحقق دقة تفوق التشخيص اليدوي التقليدي في دراسات أولية.',
        text: 'أظهرت دراسات حديثة أن نماذج الذكاء الاصطناعي المدرَّبة على آلاف صور الماموغرام قادرة على رصد العلامات المبكرة لسرطان الثدي بدقة أعلى من التشخيص اليدوي التقليدي في بعض الحالات.\n\nويرى الباحثون أن هذه الأدوات لن تحل محل الطبيب، لكنها يمكن أن تعمل كخط دعم إضافي يقلل من فرص التشخيص المتأخر.',
        image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=640&h=360&fit=crop&auto=format',
        source: 'مجلة أبحاث طبية', link: '#'
      },
      {
        time: '06:20', category: 'نصيحة', tip: true,
        title: 'نصائح لتخفيف آلام الظهر أثناء العمل المكتبي',
        desc: 'تمارين بسيطة كل ساعة وضبط ارتفاع الشاشة يقللان الضغط على الفقرات القطنية.',
        text: 'الجلوس لساعات طويلة أمام الشاشة من أكثر أسباب آلام أسفل الظهر شيوعًا بين موظفي المكاتب.\n\nينصح أخصائيو العلاج الطبيعي بالوقوف والتمدد كل 45–60 دقيقة، وضبط ارتفاع الشاشة عند مستوى العين، ودعم أسفل الظهر بوسادة صغيرة أثناء الجلوس لتقليل الضغط على الفقرات القطنية.',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=640&h=360&fit=crop&auto=format',
        source: 'نور صحة', link: '#'
      },
      {
        time: '05:48', category: 'وقاية',
        title: 'نقص فيتامين د يرتبط بضعف المناعة في فصل الشتاء',
        desc: 'الأطباء ينصحون بجرعات معتدلة من التعرض للشمس ومتابعة مستويات الفيتامين دوريًا.',
        text: 'يرتبط انخفاض مستويات فيتامين د في الدم بضعف الاستجابة المناعية، وهو ما يفسّر جزئيًا زيادة معدلات الإصابة بنزلات البرد في فصل الشتاء.\n\nيوصي الأطباء بالتعرض المعتدل لأشعة الشمس لعشر إلى خمس عشرة دقيقة يوميًا، إلى جانب إجراء فحص دوري لمستويات الفيتامين، خاصة لمن يقضون معظم وقتهم في أماكن مغلقة.',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=640&h=360&fit=crop&auto=format',
        source: 'نور صحة', link: '#'
      },
      {
        time: '23:55', category: 'أبحاث',
        title: 'اكتشاف علاقة وثيقة بين صحة الأمعاء والصحة النفسية',
        desc: 'دراسة حديثة تربط بين توازن البكتيريا المعوية وانخفاض أعراض القلق والاكتئاب.',
        text: 'كشفت دراسة حديثة عن ارتباط وثيق بين تنوع البكتيريا النافعة في الأمعاء وانخفاض أعراض القلق والاكتئاب لدى المشاركين.\n\nيعتقد الباحثون أن ما يُعرف بـ"محور الأمعاء والدماغ" قد يفتح الباب أمام علاجات نفسية مكمّلة تعتمد على تعديل النظام الغذائي والبروبيوتيك.',
        image: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=640&h=360&fit=crop&auto=format',
        source: 'مجلة أبحاث طبية', link: '#'
      },
      {
        time: '21:30', category: 'نصيحة', tip: true,
        title: 'هل القهوة صحية؟ إليك ما تقوله الأبحاث الحديثة',
        desc: 'الاعتدال هو المفتاح: كوبان إلى ثلاثة يوميًا مرتبطان بفوائد أكثر من الأضرار لدى معظم البالغين.',
        text: 'تشير أحدث المراجعات العلمية إلى أن تناول كوبين إلى ثلاثة أكواب من القهوة يوميًا مرتبط بفوائد صحية تفوق أضراره لدى معظم البالغين الأصحاء، منها انخفاض طفيف في خطر بعض أمراض القلب والكبد.\n\nمع ذلك، يبقى الاعتدال هو المفتاح، ويُنصح أصحاب اضطرابات القلق أو مشاكل النوم بتقليل الجرعة أو تجنبها في ساعات المساء.',
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=640&h=360&fit=crop&auto=format',
        source: 'نور صحة', link: '#'
      },
      {
        time: '19:05', category: 'أطفال',
        title: 'قلة النوم تزيد من مخاطر السمنة لدى الأطفال، بحسب أطباء الأطفال',
        desc: 'تنظيم مواعيد النوم وتقليل وقت الشاشات قبل النوم يحسّنان الوزن الصحي على المدى الطويل.',
        text: 'ربطت دراسات طبية حديثة بين قلة عدد ساعات النوم عند الأطفال وزيادة خطر الإصابة بالسمنة في مرحلة لاحقة من الطفولة.\n\nيوصي أطباء الأطفال بالحفاظ على مواعيد نوم ثابتة، وتقليل وقت استخدام الشاشات قبل النوم بساعة على الأقل، لما لذلك من أثر إيجابي على الوزن الصحي والنمو العام للطفل.',
        image: 'https://images.unsplash.com/photo-1503457574465-4ce3a5bab1fd?w=640&h=360&fit=crop&auto=format',
        source: 'أطباء الأطفال', link: '#'
      },
      {
        time: '17:40', category: 'صحة',
        title: 'دراسة: المشي 30 دقيقة يوميًا يقلل خطر أمراض القلب بنسبة 25%',
        desc: 'خبراء القلب يؤكدون أن النشاط المعتدل المنتظم لا يقل أهمية عن التمارين المكثفة.',
        text: 'وجدت دراسة واسعة شملت آلاف المشاركين أن المشي بانتظام لمدة 30 دقيقة يوميًا يرتبط بانخفاض خطر الإصابة بأمراض القلب والشرايين بنسبة تصل إلى 25% مقارنة بالأشخاص الأقل حركة.\n\nويشدد خبراء القلب على أن النشاط المعتدل المستمر، مثل المشي السريع، لا يقل أهمية عن التمارين الرياضية المكثفة على المدى الطويل.',
        image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=640&h=360&fit=crop&auto=format',
        source: 'جمعية القلب', link: '#'
      }
    ];

    // ---- Slider controls (rebuildable) ----
    const slidesEl = document.getElementById('slides');
    const dotsWrap = document.getElementById('dots');
    const frame = document.getElementById('sliderFrame');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const INTERVAL = 10000;
    let index = 0, timer = null, total = 0, dots = [];

    function renderSlide(){
      slidesEl.style.transform = `translateX(${index * 100}%)`;
      for(let i=0;i<total;i++) dots[i].classList.toggle('active', i === index);
    }
    function goTo(i){ index = (i + total) % total; renderSlide(); restart(); }
    function next(){ goTo(index + 1); }
    function prev(){ goTo(index - 1); }
    function restart(){ clearInterval(timer); if(total>1) timer = setInterval(next, INTERVAL); }

    function initSlider(){
      total = slidesEl.children.length;
      index = 0;
      dotsWrap.innerHTML = '';
      for(let i=0;i<total;i++){
        const b = document.createElement('button');
        b.innerHTML = '<span class="fill"></span>';
        b.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(b);
      }
      dots = dotsWrap.children;
      renderSlide();
      restart();
    }

    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);
    frame.addEventListener('mouseenter', () => clearInterval(timer));
    frame.addEventListener('mouseleave', restart);

    // ---- Live BPM readout ----
    const bpmEl = document.getElementById('bpmValue');
    setInterval(() => {
      bpmEl.textContent = 68 + Math.floor(Math.random() * 9);
    }, 2200);

    // =========================================================
    // النافذة المنبثقة لتفاصيل الخبر (صورة + نص كامل + رابط المصدر)
    // =========================================================
    const modalOverlay = document.getElementById('modalOverlay');
    const modalImage = document.getElementById('modalImage');
    const modalCat = document.getElementById('modalCat');
    const modalTime = document.getElementById('modalTime');
    const modalTitle = document.getElementById('modalTitle');
    const modalText = document.getElementById('modalText');
    const modalSource = document.getElementById('modalSource');
    const modalLink = document.getElementById('modalLink');

    function openModal(idx){
      const item = articlesStore[idx];
      if(!item) return;
      modalImage.src = item.image || FALLBACK_IMG;
      modalImage.onerror = () => { modalImage.src = FALLBACK_IMG; };
      modalCat.textContent = item.category || 'صحة';
      modalCat.classList.toggle('urgent', !!item.urgent);
      modalTime.textContent = item.time || '';
      modalTitle.textContent = item.title || 'خبر طبي';
      modalText.textContent = item.text || item.desc || '';
      modalSource.textContent = item.source ? `المصدر: ${item.source}` : '';
      modalLink.href = item.link && item.link !== '#' ? item.link : '#';
      modalLink.style.display = (item.link && item.link !== '#') ? 'inline-flex' : 'none';
      modalOverlay.classList.add('open');
      clearInterval(timer);
    }
    function closeModal(){
      modalOverlay.classList.remove('open');
      restart();
    }
    document.getElementById('modalClose').addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => { if(e.target === modalOverlay) closeModal(); });
    document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeModal(); });

    // =========================================================
    // بناء عناصر الواجهة (سلايدر + سجل الأخبار + الأكثر قراءة)
    // كل عنصر بيحمل data-index بيربطه بالنافذة المنبثقة
    // =========================================================
    function buildSlideHTML(item, idx){
      const img = item.image || FALLBACK_IMG;
      return `
        <div class="slide" data-index="${idx}">
          <img class="slide-bg" src="${img}" alt="" loading="lazy" onerror="this.src='${FALLBACK_IMG}'">
          <svg class="ecg-bg" viewBox="0 0 800 400" preserveAspectRatio="none"><path d="M0 200 H260 L280 80 L305 320 L330 200 H800" /></svg>
          <div class="slide-body">
            <div class="slide-meta">
              <span class="slide-tag${item.urgent ? ' red' : ''}">${item.category || 'صحة'}</span>
              <span class="slide-time mono">${item.time || ''}</span>
            </div>
            <h2>${item.title || 'خبر طبي'}</h2>
            <p>${item.desc || ''}</p>
          </div>
        </div>`;
    }

    const AD_SLIDE_HTML = `
      <div class="slide ad-slide">
        <ins class="adsbygoogle"
             style="display:block; width:100%; height:100%;"
             data-ad-client="ca-pub-8670933246814171"
             data-ad-slot="XXXXXXXXXX"
             data-ad-format="rectangle"
             data-full-width-responsive="true"></ins>
      </div>`;

    function buildRowHTML(item, idx){
      const rowClass = item.urgent ? 'urgent' : (item.tip ? 'tip' : '');
      const img = item.image || FALLBACK_IMG;
      return `
        <div class="log-row ${rowClass}" data-index="${idx}">
          <div class="time mono">${item.time || ''}</div>
          <div class="dotcol"><i></i></div>
          <div class="content">
            <span class="cat">${item.category || 'صحة'}</span>
            <h3>${item.title || 'خبر طبي'}</h3>
            <p>${item.desc || ''}</p>
          </div>
          <img class="thumb" src="${img}" alt="" loading="lazy" onerror="this.src='${FALLBACK_IMG}'">
        </div>`;
    }

    function buildRankHTML(item, idx, n){
      return `
        <div class="rank-item" data-index="${idx}">
          <span class="n mono">${String(n).padStart(2,'0')}</span>
          <h4>${item.title || 'خبر طبي'}</h4>
        </div>`;
    }

    // بتفعّل أي إعلانات AdSense اتضافت للصفحة بعد التحميل الأول (زي إعلان السلايدر وإعلان سجل الأخبار)
    function pushAds(container){
      container.querySelectorAll('ins.adsbygoogle').forEach(ins => {
        try{ (adsbygoogle = window.adsbygoogle || []).push({}); }
        catch(e){ console.warn('AdSense push failed:', e); }
      });
    }

    function attachClickHandlers(container){
      container.querySelectorAll('[data-index]').forEach(el => {
        el.addEventListener('click', () => openModal(Number(el.getAttribute('data-index'))));
      });
    }

    function renderAll(articles){
      articlesStore = articles;

      // --- السلايدر: أول 4 أخبار + إعلان في المنتصف ---
      const heroItems = articles.slice(0, 4);
      if(heroItems.length){
        const slidesHTML = heroItems.map((item, i) => buildSlideHTML(item, i));
        const adPos = Math.min(2, slidesHTML.length);
        slidesHTML.splice(adPos, 0, AD_SLIDE_HTML);
        slidesEl.innerHTML = slidesHTML.join('');
        attachClickHandlers(slidesEl);
        initSlider();
        pushAds(slidesEl);
      }

      // --- سجل الأخبار: أول 8 أخبار + إعلان بعد الثاني ---
      const listItems = articles.slice(0, 8);
      const logList = document.getElementById('logList');
      const rowsHTML = listItems.map((item, i) => buildRowHTML(item, i));
      const AD_ROW_HTML = `
        <div class="log-row ad-row" id="adRowMid">
          <ins class="adsbygoogle"
               style="display:block; min-height:60px;"
               data-ad-client="ca-pub-8670933246814171"
               data-ad-slot="XXXXXXXXXX"
               data-ad-format="horizontal"
               data-full-width-responsive="true"></ins>
        </div>`;
      if(rowsHTML.length > 2) rowsHTML.splice(2, 0, AD_ROW_HTML);
      logList.innerHTML = rowsHTML.join('');
      attachClickHandlers(logList);
      pushAds(logList);

      // --- الأكثر قراءة: أول 5 أخبار ---
      const rankItems = articles.slice(0, 5);
      const rankList = document.getElementById('rankList');
      rankList.innerHTML = rankItems.map((item, i) => buildRankHTML(item, i, i + 1)).join('');
      attachClickHandlers(rankList);
    }

    renderAll(demoArticles); // يبدأ بالمحتوى التجريبي (بصور وتفاصيل) أول ما تفتح الصفحة

    // =========================================================
    // جلب الأخبار الحقيقية من NewsData.io
    // =========================================================
    function formatTime(pubDate){
      try{
        const d = new Date(pubDate.replace(' ', 'T') + 'Z');
        return d.toLocaleTimeString('ar-EG', { hour:'2-digit', minute:'2-digit', timeZone:'Africa/Cairo' });
      }catch(e){ return ''; }
    }

    // NewsData.io على الخطة المجانية بيرجّع النص ده بدل المحتوى الحقيقي —
    // لازم نستبعده ونستخدم الوصف (description) بدل منه
    function isUsableContent(text){
      if(!text) return false;
      const t = text.trim().toUpperCase();
      return t !== 'ONLY AVAILABLE IN PAID PLANS' && !t.includes('ONLY AVAILABLE IN PAID PLANS');
    }

    function normalizeApiItem(item, categoryLabel){
      const isUrgent = /عاجل|طارئ|تحذير/.test(item.title || '');
      const desc = (item.description || '').trim();
      const content = isUsableContent(item.content) ? item.content.trim() : '';
      return {
        time: formatTime(item.pubDate),
        category: isUrgent ? 'عاجل' : (categoryLabel || 'صحة'),
        urgent: isUrgent,
        title: item.title || 'خبر طبي',
        desc: desc.slice(0, 160),
        // نفضّل المحتوى الكامل لو متاح، وإلا نعرض الوصف كامل كنص التفاصيل
        text: content || desc || 'لا يتوفر نص إضافي لهذا الخبر — يمكنك قراءة التفاصيل من المصدر الأصلي.',
        image: (isUsableContent(item.image_url) ? item.image_url : '') || FALLBACK_IMG,
        source: item.source_name || item.source_id || '',
        link: item.link || '#'
      };
    }

    // =========================================================
    // تصفية الأخبار حسب التصنيف (أبحاث / تغذية / وقاية / صحة نفسية)
    // =========================================================

    // كلمات بحث بنبعتها لـ NewsData.io لكل تصنيف (لجلب أخبار حقيقية متعلقة بيه)
    const CATEGORY_MAP = {
      all:        { label: 'سجل الأخبار', query: '' },
      research:   { label: 'أبحاث',       query: 'دراسة OR بحث علمي OR اكتشاف طبي' },
      nutrition:  { label: 'تغذية',       query: 'تغذية OR نظام غذائي OR فيتامين' },
      prevention: { label: 'وقاية',       query: 'وقاية OR الوقاية من الأمراض' },
      mental:     { label: 'صحة نفسية',   query: 'صحة نفسية OR اكتئاب OR قلق نفسي' }
    };

    // كلمات مطابقة محليًا على المحتوى التجريبي (تُستخدم لو الـ API مش متاح أو فشل الطلب)
    const CATEGORY_KEYWORDS = {
      research:   ['أبحاث', 'دراسة', 'باحث'],
      nutrition:  ['تغذية', 'غذائي', 'فيتامين', 'قهوة', 'غذاء'],
      prevention: ['وقاية'],
      mental:     ['نفسية', 'قلق', 'اكتئاب', 'الأمعاء والدماغ']
    };

    let currentCat = 'all';

    function setActiveNav(catKey){
      currentCat = catKey;
      document.querySelectorAll('#catsNav a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('data-cat') === catKey);
      });
    }

    function filterDemoByCategory(catKey){
      const kws = CATEGORY_KEYWORDS[catKey];
      if(!kws) return demoArticles;
      const filtered = demoArticles.filter(a =>
        kws.some(k => `${a.category} ${a.title} ${a.desc}`.includes(k))
      );
      return filtered.length ? filtered : demoArticles;
    }

    function buildApiUrl(query){
      let url = `https://newsdata.io/api/1/latest?apikey=${NEWS_API_KEY}&country=eg&category=health&language=ar`;
      if(query) url += `&q=${encodeURIComponent(query)}`;
      return url;
    }

    async function loadCategory(catKey){
      const cat = CATEGORY_MAP[catKey] || CATEGORY_MAP.all;
      setActiveNav(catKey);
      const label = document.getElementById('listLabel');
      if(label) label.textContent = cat.label;
      const status = document.getElementById('apiStatus');

      if(!NEWS_API_KEY || NEWS_API_KEY === 'YOUR_API_KEY'){
        renderAll(filterDemoByCategory(catKey));
        if(status) status.style.display = 'block';
        return; // يفضل المحتوى التجريبي المفلتر محليًا
      }

      try{
        const res = await fetch(buildApiUrl(cat.query));
        const data = await res.json();
        if(data.status !== 'success' || !data.results || !data.results.length){
          throw new Error('empty results');
        }
        const results = data.results.filter(r => r.title).map(item => normalizeApiItem(item, cat.label));
        renderAll(results);
        if(status) status.style.display = 'none';
      }catch(err){
        console.warn(`تعذر جلب أخبار "${cat.label}" من NewsData.io، سيتم عرض محتوى تجريبي مطابق:`, err);
        renderAll(filterDemoByCategory(catKey));
        if(status){
          status.textContent = `تعذر جلب أخبار "${cat.label}" حاليًا — يتم عرض محتوى تجريبي مطابق مؤقتًا.`;
          status.style.display = 'block';
        }
      }
    }

    // ربط روابط التصنيفات في الهيدر بالتصفية
    document.querySelectorAll('#catsNav a').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const catKey = a.getAttribute('data-cat');
        if(catKey === 'all'){
          document.getElementById('slider').scrollIntoView({ behavior: 'smooth' });
        }
        loadCategory(catKey);
      });
    });

    loadCategory('all'); // يبدأ بجلب أحدث الأخبار العامة عند فتح الصفحة
  })();
