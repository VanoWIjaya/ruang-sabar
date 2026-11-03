/**
 * Ruang Sabar - Interactive JavaScript Engine
 * Fitur:
 * 1. Dynamic Year
 * 2. Mobile Navigation Toggle & Smooth Scroll
 * 3. Educational Modal Dialog System
 * 4. Interactive Practical Checklist Tracker
 * 5. "Think Before You Post" Interactive Quiz System
 * 6. Back-to-Top Button & Scroll Spy
 */

document.addEventListener('DOMContentLoaded', () => {
  initCopyrightYear();
  initMobileMenu();
  initSmoothScroll();
  initEducationalModals();
  initPracticalChecklist();
  initQuiz();
  initScrollEffects();
  
  // Inisialisasi ikon Lucide jika library dimuat
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

/* ==========================================================================
   1. Dynamic Copyright Year
   ========================================================================== */
function initCopyrightYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/* ==========================================================================
   2. Mobile Navigation Toggle
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const navLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

  if (!menuBtn || !mobileMenu) return;

  function toggleMenu(show) {
    const isOpen = show !== undefined ? show : !mobileMenu.classList.contains('open');
    if (isOpen) {
      mobileMenu.classList.add('open');
      menuBtn.setAttribute('aria-expanded', 'true');
      if (menuIcon) {
        menuIcon.setAttribute('data-lucide', 'x');
      }
    } else {
      mobileMenu.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      if (menuIcon) {
        menuIcon.setAttribute('data-lucide', 'menu');
      }
    }
    if (window.lucide) window.lucide.createIcons();
  }

  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Tutup menu saat link diklik
  navLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Tutup jika klik di luar navbar
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
      toggleMenu(false);
    }
  });
}

/* ==========================================================================
   3. Smooth Scroll dengan Offset Sticky Header
   ========================================================================== */
function initSmoothScroll() {
  const anchors = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  const navbar = document.querySelector('header');
  const navHeight = navbar ? navbar.offsetHeight : 80;

  anchors.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ==========================================================================
   4. Educational Modal Dialog System
   ========================================================================== */
const educationDatabase = {
  'mengenal-ujaran': {
    badge: 'Konsep & Definisi',
    badgeColor: 'bg-blue-100 text-navy-900',
    title: 'Mengenal Ujaran Kebencian (Hate Speech)',
    subtitle: 'Memahami batas tegas antara kebebasan berekspresi, kritik yang membangun, dan ujaran permusuhan.',
    content: `
      <div class="space-y-6 text-slate-700 text-sm md:text-base leading-relaxed">
        <div class="p-4 bg-slate-50 border-l-4 border-navy-900 rounded-r-lg">
          <h4 class="font-bold text-navy-900 mb-1 text-base">Apa itu Ujaran Kebencian?</h4>
          <p>
            Ujaran kebencian (*hate speech*) adalah segala bentuk komunikasi lisan, tulisan, simbol, atau perilaku yang menyerang, merendahkan, menghasut diskriminasi, atau menyulut permusuhan terhadap individu atau kelompok berdasarkan identitas bawaan seperti suku, agama, ras, antargolongan (SARA), kebangsaan, atau kekurangan fisik.
          </p>
        </div>

        <div>
          <h4 class="font-bold text-navy-900 mb-2 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            Bentuk-Bentuk Ujaran Kebencian di Dunia Digital:
          </h4>
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            <li class="p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
              <strong class="text-navy-900 block text-xs uppercase tracking-wide">1. Penghinaan Personal (Ad Hominem)</strong>
              Menyerang fisik, martabat pribadi, atau keluarga seseorang saat kalah berargumen dalam sebuah diskusi.
            </li>
            <li class="p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
              <strong class="text-navy-900 block text-xs uppercase tracking-wide">2. Provokasi & Hasutan SARA</strong>
              Mengobarkan sentimen rasial atau keagamaan untuk menciptakan kebencian kolektif terhadap kelompok lain.
            </li>
            <li class="p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
              <strong class="text-navy-900 block text-xs uppercase tracking-wide">3. Doxxing & Witch-Hunting</strong>
              Menyebarkan data pribadi seseorang secara sepihak untuk memancing perundungan massal (*cyberbullying*).
            </li>
            <li class="p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
              <strong class="text-navy-900 block text-xs uppercase tracking-wide">4. Fitnah & Pembunuhan Karakter</strong>
              Membuat atau menyebarkan tuduhan palsu yang direkayasa untuk menghancurkan kehormatan seseorang.
            </li>
          </ul>
        </div>

        <div class="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
          <h4 class="font-bold text-emerald-900 mb-2 flex items-center gap-2">
            <i data-lucide="scale" class="w-5 h-5 text-emerald-600"></i>
            Perbedaan Mendasar: Kritik Santun vs Ujaran Kebencian
          </h4>
          <div class="overflow-x-auto mt-2">
            <table class="w-full text-xs md:text-sm text-left border-collapse">
              <thead>
                <tr class="border-b border-emerald-200 text-emerald-900">
                  <th class="py-2 pr-4 font-semibold">Parameter</th>
                  <th class="py-2 pr-4 font-semibold text-emerald-700">Kritik Santun</th>
                  <th class="py-2 font-semibold text-rose-600">Ujaran Kebencian</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-emerald-100">
                <tr>
                  <td class="py-2 pr-4 font-medium">Fokus Sorotan</td>
                  <td class="py-2 pr-4 text-slate-700">Gagasan, kebijakan, karya, atau tindakan.</td>
                  <td class="py-2 text-rose-700">Identitas diri, fisik, latar belakang, suku, agama.</td>
                </tr>
                <tr>
                  <td class="py-2 pr-4 font-medium">Tujuan Utama</td>
                  <td class="py-2 pr-4 text-slate-700">Perbaikan bersama (*ishlah*) & evaluasi.</td>
                  <td class="py-2 text-rose-700">Menjatuhkan, mempermalukan, atau membinasakan.</td>
                </tr>
                <tr>
                  <td class="py-2 pr-4 font-medium">Gaya Bahasa</td>
                  <td class="py-2 pr-4 text-slate-700">Objektif, berbasis data, beradab, dan tertata.</td>
                  <td class="py-2 text-rose-700">Emosional, kasar, sarkastik, dan menghina.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `
  },
  'dampak-ujaran': {
    badge: 'Konsekuensi & Realita',
    badgeColor: 'bg-amber-100 text-amber-900',
    title: 'Dampak Nyata Ujaran Kebencian',
    subtitle: 'Kata-kata yang dilempar tanpa kendali tidak pernah menguap tanpa korban. Dampaknya meluas dari psikis hingga kebangsaan.',
    content: `
      <div class="space-y-6 text-slate-700 text-sm md:text-base leading-relaxed">
        <p>
          Seringkali seseorang berdalih, <em>"Ah, itu kan cuma komentar di internet, jangan baper!"</em>. Padahal di balik layar gawai, terdapat manusia nyata dengan hati dan psikologis yang bisa terluka parah.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div class="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center font-bold mb-2">1</div>
            <h4 class="font-bold text-navy-900 mb-1">Dampak Psikologis Korban</h4>
            <p class="text-xs md:text-sm text-slate-600">
              Menyebabkan trauma emosional, serangan kecemasan (*anxiety*), depresi klinis, penurunan prestasi, hilangnya kepercayaan diri, hingga dorongan melukai diri sendiri.
            </p>
          </div>

          <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div class="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center font-bold mb-2">2</div>
            <h4 class="font-bold text-navy-900 mb-1">Kerusakan Hubungan Sosial</h4>
            <p class="text-xs md:text-sm text-slate-600">
              Memutuskan tali silaturahmi, memicu prasangka buruk (*su'uzhan*), dan memicu polarisasi tajam antar-teman, keluarga, dan tetangga hanya karena beda pandangan.
            </p>
          </div>

          <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div class="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold mb-2">3</div>
            <h4 class="font-bold text-navy-900 mb-1">Ancaman Persatuan Bangsa</h4>
            <p class="text-xs md:text-sm text-slate-600">
              Menyulut api konflik horizontal, memecah belah bangsa, serta mengancam keharmonisan kebinekaan yang telah dibangun puluhan tahun.
            </p>
          </div>

          <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold mb-2">4</div>
            <h4 class="font-bold text-navy-900 mb-1">Ruang Digital yang Beracun (Toxic)</h4>
            <p class="text-xs md:text-sm text-slate-600">
              Membuat orang-orang bijak enggan bersuara (*silencing effect*), sehingga ruang publik hanya diisi oleh narasi provokatif, hoaks, dan kegaduhan nirfaedah.
            </p>
          </div>
        </div>

        <div class="p-4 bg-slate-900 text-white rounded-xl">
          <p class="text-xs md:text-sm italic text-slate-200">
            "Lidah itu tidak bertulang, namun ia mampu meremukkan hati lebih dalam daripada pedang tertajam. Bijaklah sebelum jari menyentuh tombol kirim."
          </p>
        </div>
      </div>
    `
  },
  'islam-kedamaian': {
    badge: 'Nilai & Spiritualitas',
    badgeColor: 'bg-emerald-100 text-emerald-900',
    title: 'Islam Mengajarkan Kedamaian & Penjagaan Lisan',
    subtitle: 'Fondasi akhlak Islam dalam menata ucapan, memuliakan manusia, dan merawat harmoni sosial.',
    content: `
      <div class="space-y-6 text-slate-700 text-sm md:text-base leading-relaxed">
        <div class="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-lg">
          <h4 class="font-bold text-emerald-950 mb-1 text-base">Prinsip Hifzhul Lisan (Menjaga Lisan)</h4>
          <p class="text-xs md:text-sm text-emerald-900">
            Dalam Islam, lisan adalah timbangan kualitas iman seseorang. Rasulullah ﷺ bersabda:
          </p>
          <blockquote class="mt-2 text-xs md:text-sm italic font-semibold text-emerald-950">
            "Seorang muslim yang sejati adalah dia yang orang-orang muslim lainnya merasa aman dan selamat dari gangguan lisan serta tangannya."
          </blockquote>
          <span class="text-xs text-emerald-700 mt-1 block">(HR. Bukhari no. 10 & Muslim no. 40)</span>
        </div>

        <div>
          <h4 class="font-bold text-navy-900 mb-3 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            6 Etika Berbicara dalam Al-Qur'an (Qur'anic Communication):
          </h4>
          <div class="space-y-2.5">
            <div class="p-3 bg-white border border-slate-200 rounded-lg">
              <span class="font-bold text-navy-900 text-xs md:text-sm">1. Qaulan Sadida (QS. Al-Ahzab: 70)</span>
              <p class="text-xs text-slate-600 mt-0.5">Perkataan yang benar, jujur, berbasis fakta, dan tidak manipulatif.</p>
            </div>
            <div class="p-3 bg-white border border-slate-200 rounded-lg">
              <span class="font-bold text-navy-900 text-xs md:text-sm">2. Qaulan Baligha (QS. An-Nisa: 63)</span>
              <p class="text-xs text-slate-600 mt-0.5">Perkataan yang membekas pada jiwa, lugas, santun, dan menyentuh hati nurani.</p>
            </div>
            <div class="p-3 bg-white border border-slate-200 rounded-lg">
              <span class="font-bold text-navy-900 text-xs md:text-sm">3. Qaulan Ma'rufa (QS. Al-Baqarah: 235)</span>
              <p class="text-xs text-slate-600 mt-0.5">Perkataan yang pantas, selaras dengan norma kebaikan dan kepatutan sosial.</p>
            </div>
            <div class="p-3 bg-white border border-slate-200 rounded-lg">
              <span class="font-bold text-navy-900 text-xs md:text-sm">4. Qaulan Karima (QS. Al-Isra: 23)</span>
              <p class="text-xs text-slate-600 mt-0.5">Perkataan yang mulia, penuh adab penghormatan, dan tidak merendahkan orang lain.</p>
            </div>
            <div class="p-3 bg-white border border-slate-200 rounded-lg">
              <span class="font-bold text-navy-900 text-xs md:text-sm">5. Qaulan Layyina (QS. Thaha: 44)</span>
              <p class="text-xs text-slate-600 mt-0.5">Perkataan yang lemah lembut, bahkan ketika berhadapan dengan orang yang memusuhi kita.</p>
            </div>
            <div class="p-3 bg-white border border-slate-200 rounded-lg">
              <span class="font-bold text-navy-900 text-xs md:text-sm">6. Qaulan Maysura (QS. Al-Isra: 28)</span>
              <p class="text-xs text-slate-600 mt-0.5">Perkataan yang mudah dipahami, melegakan, dan menumbuhkan harapan baik.</p>
            </div>
          </div>
        </div>

        <div class="p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <h4 class="font-bold text-navy-900 mb-1">Prinsip Karamah Insaniyyah</h4>
          <p class="text-xs md:text-sm text-slate-700">
            Islam memandang setiap manusia memiliki martabat bawaan yang dimuliakan oleh Allah (QS. Al-Isra: 70). Menghina fisik atau keyakinan orang lain hakikatnya meremehkan ciptaan Allah Yang Maha Kuasa.
          </p>
        </div>
      </div>
    `
  }
};

function initEducationalModals() {
  const modalOverlay = document.getElementById('education-modal');
  const modalContainer = document.getElementById('modal-card');
  const modalBadge = document.getElementById('modal-badge');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalBody = document.getElementById('modal-body');
  const closeBtns = document.querySelectorAll('.close-modal-btn');
  const openBtns = document.querySelectorAll('[data-open-modal]');

  if (!modalOverlay) return;

  function openModal(topicKey) {
    const data = educationDatabase[topicKey];
    if (!data) return;

    modalBadge.className = `inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${data.badgeColor}`;
    modalBadge.textContent = data.badge;
    modalTitle.textContent = data.title;
    modalSubtitle.textContent = data.subtitle;
    modalBody.innerHTML = data.content;

    if (window.lucide) window.lucide.createIcons();

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // cegah scroll background
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const topic = btn.getAttribute('data-open-modal');
      openModal(topic);
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  // Tutup bila klik di luar container
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Tutup dengan keyboard Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   5. Interactive Practical Checklist Tracker
   ========================================================================== */
function initPracticalChecklist() {
  const checklistItems = document.querySelectorAll('.guide-card-btn');
  const progressText = document.getElementById('checklist-progress-text');
  const progressBar = document.getElementById('checklist-progress-bar');
  const badgeCelebration = document.getElementById('checklist-celebration');

  if (!checklistItems.length || !progressText || !progressBar) return;

  let completedCount = 0;
  const totalCount = checklistItems.length;

  function updateChecklistUI() {
    progressText.textContent = `${completedCount} dari ${totalCount} Langkah Dipraktikkan`;
    const percentage = Math.round((completedCount / totalCount) * 100);
    progressBar.style.width = `${percentage}%`;

    if (badgeCelebration) {
      if (completedCount === totalCount) {
        badgeCelebration.classList.remove('hidden');
      } else {
        badgeCelebration.classList.add('hidden');
      }
    }
  }

  checklistItems.forEach(btn => {
    btn.addEventListener('click', function() {
      const isChecked = this.getAttribute('data-checked') === 'true';
      const checkIcon = this.querySelector('.check-indicator');
      const textLabel = this.querySelector('.check-label');

      if (!isChecked) {
        this.setAttribute('data-checked', 'true');
        this.classList.add('bg-emerald-500', 'text-white', 'border-emerald-600');
        this.classList.remove('bg-white', 'text-slate-700', 'border-slate-300');
        if (textLabel) textLabel.textContent = 'Sudah Dipahami & Diterapkan ✓';
        completedCount++;
      } else {
        this.setAttribute('data-checked', 'false');
        this.classList.remove('bg-emerald-500', 'text-white', 'border-emerald-600');
        this.classList.add('bg-white', 'text-slate-700', 'border-slate-300');
        if (textLabel) textLabel.textContent = 'Tandai Telah Dipahami';
        completedCount--;
      }

      updateChecklistUI();
    });
  });

  updateChecklistUI();
}

/* ==========================================================================
   6. "Think Before You Post" Interactive Quiz Engine
   ========================================================================== */
const quizQuestions = [
  {
    id: 1,
    title: 'Situasi 1: Perbedaan Pandangan di Kolom Komentar',
    scenario: 'Seseorang mengunggah opini atau interpretasi yang sangat bertolak belakang dengan sudut pandangmu pada sebuah utas media sosial yang sedang ramai dibahas.',
    question: 'Apa langkah yang paling bijak untuk kamu lakukan?',
    options: [
      {
        text: 'A. Membaca argumennya secara utuh, berdiskusi dengan sopan jika relevan dan membawa faedah, atau melewatinya jika hanya berujung debat kusir.',
        isCorrect: true,
        score: 20,
        explanation: 'Sangat bijak! Dalam Islam kita diajarkan adab ikhtilaf (menghargai perbedaan) dan menjauhi perdebatan yang tidak menghasilkan kebaikan. Menahan diri dari debat kusir menjaga kebersihan hati.'
      },
      {
        text: 'B. Menulis balasan dengan sindiran tajam dan sarkas agar ia merasa malu di depan warganet lainnya.',
        isCorrect: false,
        score: 0,
        explanation: 'Kurang tepat. Menghina atau mempermalukan orang lain secara terbuka termasuk perbuatan mencela (lamz) yang dilarang keras dalam QS. Al-Hujurat: 11.'
      },
      {
        text: 'C. Mengambil tangkapan layar (screenshot) lalu menyebarkannya ke grup WhatsApp agar teman-temanmu ikut menertawakan orang tersebut.',
        isCorrect: false,
        score: 0,
        explanation: 'Keliru. Menyebarkan percakapan orang lain untuk dijadikan bahan olok-olok melanggar amanah percakapan dan tergolong mengolok-olok (sukhriyah) serta ghibah digital.'
      }
    ]
  },
  {
    id: 2,
    title: 'Situasi 2: Beredar Video Potongan yang Memicu Kemarahan',
    scenario: 'Beredar video viral berdurasi 10 detik yang memperlihatkan seorang tokoh masyarakat seolah-olah mengucapkan pernyataan yang sangat kontroversial dan memecah belah.',
    question: 'Bagaimana seharusnya refleks digitalmu bekerja?',
    options: [
      {
        text: 'A. Langsung menyebarkan video tersebut ke status medsos dengan keterangan kemarahan agar semua orang segera tahu.',
        isCorrect: false,
        score: 0,
        explanation: 'Sangat berbahaya. Menyebarkan informasi sebelum diverifikasi dapat menjerumuskan kita menjadi penyebar fitnah dan hoaks, yang merugikan banyak pihak.'
      },
      {
        text: 'B. Menerapkan prinsip Tabayyun (cek & ricek), mencari konteks video utuh dari sumber terpercaya, dan menahan diri dari berkomentar menghakimi sebelum fakta jelas.',
        isCorrect: true,
        score: 20,
        explanation: 'Tepat sekali! QS. Al-Hujurat: 6 mengajarkan kita untuk bertabayyun (klarifikasi) ketika mendengar suatu kabar dari orang fasik agar tidak menimpakan celaka pada orang lain karena kebodohan.'
      },
      {
        text: 'C. Menghujat tokoh tersebut di kolom komentar video karena merasa terpanggil untuk membela kebenaran.',
        isCorrect: false,
        score: 0,
        explanation: 'Kurang tepat. Membela kebenaran tidak pernah boleh dilakukan dengan cara mencaci maki atau menggunakan kata-kata kotor. Niat baik harus diiringi dengan cara yang beradab.'
      }
    ]
  },
  {
    id: 3,
    title: 'Situasi 3: Rekan Salah Memberi Informasi di Grup',
    scenario: 'Di grup percakapan komunitas, salah seorang anggota secara tidak sengaja salah menyebutkan data penting. Beberapa anggota lain mulai mengejek kekurangan fisiknya secara berlebihan.',
    question: 'Tindakan mana yang paling mencerminkan akhlak terpuji?',
    options: [
      {
        text: 'A. Mengirim stiker tertawa agar terlihat akrab dan tidak dianggap terlalu kaku oleh anggota grup yang sedang bersenang-senang.',
        isCorrect: false,
        score: 0,
        explanation: 'Kurang bijak. Mengamini atau menertawakan perundungan orang lain berarti kita ikut menjadi bagian dari budaya merendahkan sesama (cyberbullying).'
      },
      {
        text: 'B. Membalas dengan kata-kata kasar dan mengutuk semua anggota yang mengejek agar mereka diam.',
        isCorrect: false,
        score: 5,
        explanation: 'Niat membela teman sudah baik, namun membalas keburukan dengan caci maki justru menambah kekeruhan. Islam mengajarkan menolak keburukan dengan cara yang lebih baik (ahsan).'
      },
      {
        text: 'C. Mengingatkan dengan santun bahwa salah itu wajar dan larangan mengejek fisik sesama, lalu membantu meluruskan data yang keliru dengan ramah.',
        isCorrect: true,
        score: 20,
        explanation: 'Luar biasa! Inilah cerminan amar ma\'ruf nahi munkar bil hikmah (mengajak kebaikan dengan bijaksana). Kamu melindungi martabat saudaramu sekaligus memperbaiki kesalahan tanpa merusak suasana.'
      }
    ]
  },
  {
    id: 4,
    title: 'Situasi 4: Menerima Komentar Pedas dan Menyerang Pribadi',
    scenario: 'Kamu membagikan sebuah karya atau pandangan positif di akun pribadimu, namun tiba-tiba ada akun asing yang menulis komentar kasar bernada menghina dirimu secara personal.',
    question: 'Bagaimana cara terbaik kamu merespons?',
    options: [
      {
        text: 'A. Mengajak para pengikutmu untuk bersama-sama menyerang balik dan meretas akun penghina tersebut.',
        isCorrect: false,
        score: 0,
        explanation: 'Keliru. Tindakan doxxing atau memprovokasi serangan balik massal hanya akan melahirkan lingkaran kebencian yang tidak ada habisnya dan berpotensi melanggar hukum.'
      },
      {
        text: 'B. Menarik napas dalam-dalam, menahan amarah, tidak membalas dengan emosi, serta memanfaatkan fitur sembunyikan/blokir/laporkan demi menjaga ketenangan jiwa.',
        isCorrect: true,
        score: 20,
        explanation: 'Sangat tepat! Rasulullah ﷺ mengajarkan bahwa orang kuat bukanlah yang menang dalam berkelahi, melainkan orang yang mampu mengendalikan amarahnya. Mengabaikan provokator adalah obat terbaik untuk mematikan fitnah.'
      },
      {
        text: 'C. Membalas dengan tulisan panjang penuh sindiran tajam di status berikutnya selama berhari-hari.',
        isCorrect: false,
        score: 5,
        explanation: 'Kurang bijak. Sikap pasif-agresif hanya akan menguras energimu sendiri dan menciptakan aura negatif pada lingkungan sekitarmu.'
      }
    ]
  },
  {
    id: 5,
    title: 'Situasi 5: Meme Menghina Logat Kedaerahan atau Fisik',
    scenario: 'Ada konten lelucon (meme) viral yang lucu dan banyak dibagikan orang, tetapi inti kontennya adalah menertawakan aksen bahasa daerah tertentu atau kekurangan fisik seseorang.',
    question: 'Sikap apa yang harus kamu ambil?',
    options: [
      {
        text: 'A. Menyadari bahwa humor yang merendahkan martabat bertentangan dengan ajaran Islam (QS. Al-Hujurat 11), sehingga tidak ikut menertawakan dan tidak membagikannya.',
        isCorrect: true,
        score: 20,
        explanation: 'MasyaAllah, sangat bijak! Tidak semua hal yang lucu itu halal atau etis ditertawakan. Memutus rantai penyebaran lelucon yang merendahkan manusia adalah bentuk nyata penjagaan lisan di era digital.'
      },
      {
        text: 'B. Ikut membagikannya karena merasa itu hanya hiburan ringan dan tidak ada niat jahat sama sekali.',
        isCorrect: false,
        score: 0,
        explanation: 'Kurang tepat. Menormalisasi candaan yang meremehkan suku atau fisik akan mengikis rasa empati dan melanggengkan stereotip diskriminatif di masyarakat.'
      },
      {
        text: 'C. Mengunduh videonya untuk disimpan dan diceritakan kembali saat berkumpul dengan teman-teman.',
        isCorrect: false,
        score: 0,
        explanation: 'Keliru. Menjadikan celaan fisik atau identitas budaya orang lain sebagai bahan obrolan santai tetap tergolong mengolok-olok ciptaan Allah.'
      }
    ]
  }
];

function initQuiz() {
  const quizBox = document.getElementById('quiz-box');
  const questionNumberEl = document.getElementById('quiz-question-number');
  const questionTotalEl = document.getElementById('quiz-question-total');
  const questionCategoryEl = document.getElementById('quiz-category');
  const scenarioTextEl = document.getElementById('quiz-scenario');
  const questionPromptEl = document.getElementById('quiz-prompt');
  const optionsContainerEl = document.getElementById('quiz-options-container');
  const feedbackCardEl = document.getElementById('quiz-feedback-card');
  const feedbackStatusEl = document.getElementById('quiz-feedback-status');
  const feedbackTextEl = document.getElementById('quiz-feedback-text');
  const nextBtn = document.getElementById('quiz-next-btn');
  const progressBarEl = document.getElementById('quiz-progress-bar');
  
  const resultCardEl = document.getElementById('quiz-result-card');
  const resultScoreEl = document.getElementById('quiz-result-score');
  const resultBadgeEl = document.getElementById('quiz-result-badge');
  const resultSummaryEl = document.getElementById('quiz-result-summary');
  const restartBtn = document.getElementById('quiz-restart-btn');

  if (!quizBox || !optionsContainerEl) return;

  let currentQuestionIndex = 0;
  let totalScore = 0;
  let hasAnsweredCurrent = false;

  function loadQuestion(index) {
    hasAnsweredCurrent = false;
    const q = quizQuestions[index];

    // Reset UI
    feedbackCardEl.classList.add('hidden');
    nextBtn.classList.add('hidden');

    // Header info
    questionNumberEl.textContent = index + 1;
    questionTotalEl.textContent = quizQuestions.length;
    questionCategoryEl.textContent = q.title;
    scenarioTextEl.textContent = q.scenario;
    questionPromptEl.textContent = q.question;

    // Progress bar
    const progressPercent = ((index) / quizQuestions.length) * 100;
    progressBarEl.style.width = `${progressPercent}%`;

    // Render options
    optionsContainerEl.innerHTML = '';
    q.options.forEach((opt, optIndex) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'quiz-option-btn w-full text-left p-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all font-medium text-slate-800 text-sm md:text-base flex items-start gap-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-navy-900';
      button.innerHTML = `
        <span class="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 text-navy-900 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
          ${String.fromCharCode(65 + optIndex)}
        </span>
        <span class="flex-1">${opt.text}</span>
      `;

      button.addEventListener('click', () => selectAnswer(opt, button));
      optionsContainerEl.appendChild(button);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  function selectAnswer(selectedOption, clickedButton) {
    if (hasAnsweredCurrent) return;
    hasAnsweredCurrent = true;

    totalScore += selectedOption.score;

    // Nonaktifkan semua opsi
    const allOptionBtns = optionsContainerEl.querySelectorAll('button');
    allOptionBtns.forEach(btn => {
      btn.disabled = true;
      btn.classList.remove('hover:bg-slate-50');
    });

    // Sorot opsi yang dipilih
    if (selectedOption.isCorrect) {
      clickedButton.classList.remove('bg-white', 'border-slate-200');
      clickedButton.classList.add('bg-emerald-50', 'border-emerald-500', 'text-emerald-950');
      
      feedbackCardEl.className = 'mt-6 p-5 rounded-xl border border-emerald-300 bg-emerald-50/90 transition-all';
      feedbackStatusEl.innerHTML = `
        <div class="flex items-center gap-2 text-emerald-800 font-bold text-base md:text-lg mb-1">
          <i data-lucide="check-circle" class="w-5 h-5 text-emerald-600"></i>
          Pilihan Sangat Bijak! (+${selectedOption.score} Poin)
        </div>
      `;
    } else {
      clickedButton.classList.remove('bg-white', 'border-slate-200');
      clickedButton.classList.add('bg-rose-50', 'border-rose-400', 'text-rose-950');

      feedbackCardEl.className = 'mt-6 p-5 rounded-xl border border-rose-300 bg-rose-50/90 transition-all';
      feedbackStatusEl.innerHTML = `
        <div class="flex items-center gap-2 text-rose-800 font-bold text-base md:text-lg mb-1">
          <i data-lucide="alert-circle" class="w-5 h-5 text-rose-600"></i>
          Refleksi: Pilihan Kurang Tepat (+${selectedOption.score} Poin)
        </div>
      `;
    }

    feedbackTextEl.textContent = selectedOption.explanation;
    feedbackCardEl.classList.remove('hidden');
    nextBtn.classList.remove('hidden');

    if (window.lucide) window.lucide.createIcons();
  }

  nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      currentQuestionIndex++;
      loadQuestion(currentQuestionIndex);
    } else {
      showQuizResults();
    }
  });

  function showQuizResults() {
    quizBox.classList.add('hidden');
    resultCardEl.classList.remove('hidden');

    // Update bar ke 100%
    progressBarEl.style.width = '100%';

    resultScoreEl.textContent = totalScore;

    let badgeText = '';
    let badgeClass = '';
    let summaryText = '';

    if (totalScore >= 90) {
      badgeText = '🌟 Duta Damai Digital (Tingkat Teladan)';
      badgeClass = 'bg-emerald-100 text-emerald-900 border border-emerald-300';
      summaryText = 'Luar biasa! Kamu memiliki kepekaan emosional dan adab digital yang sangat matang. Kamu memahami esensi menjaga lisan (hifzhul lisan), tabayyun, dan toleransi. Jadilah inspirasi kebaikan bagi ekosistem digital di sekitarmu!';
    } else if (totalScore >= 70) {
      badgeText = '🌿 Penjaga Lisan Bijak (Tingkat Baik)';
      badgeClass = 'bg-blue-100 text-navy-900 border border-blue-300';
      summaryText = 'Sangat baik! Sebagian besar refleks digitalmu sudah selaras dengan nilai kesantunan dan kedamaian Islam. Terus latih kesabaran ketika menghadapi provokasi dan bias berita viral.';
    } else if (totalScore >= 50) {
      badgeText = '🌱 Sahabat Refleksi (Tingkat Berkembang)';
      badgeClass = 'bg-amber-100 text-amber-900 border border-amber-300';
      summaryText = 'Cukup baik, namun kamu masih terkadang terpancing oleh emosi sesaat atau dorongan membalas perlakuan buruk orang lain. Ingatlah bahwa memadamkan api tidak bisa dengan api, melainkan dengan air kesejukan.';
    } else {
      badgeText = '⚠️ Perlu Introspeksi & Belajar Lagi';
      badgeClass = 'bg-rose-100 text-rose-900 border border-rose-300';
      summaryText = 'Jangan berkecil hati! Ini adalah kesempatan emas untuk belajar. Jadikan panduan di Ruang Sabar sebagai pengingat untuk berpikir sebelum bertindak dan menahan diri dari menyebarkan ujaran kebencian.';
    }

    resultBadgeEl.className = `inline-block px-4 py-1.5 rounded-full text-sm font-bold ${badgeClass}`;
    resultBadgeEl.textContent = badgeText;
    resultSummaryEl.textContent = summaryText;

    if (window.lucide) window.lucide.createIcons();
  }

  restartBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    totalScore = 0;
    resultCardEl.classList.add('hidden');
    quizBox.classList.remove('hidden');
    loadQuestion(0);
  });

  // Mulai kuis awal
  loadQuestion(0);
}

/* ==========================================================================
   7. Scroll Effects & Back to Top
   ========================================================================== */
function initScrollEffects() {
  const backToTopBtn = document.getElementById('back-to-top');
  const header = document.querySelector('header');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Header shadow on scroll
    if (header) {
      if (scrollPos > 40) {
        header.classList.add('shadow-sm', 'border-b', 'border-slate-200/80');
      } else {
        header.classList.remove('shadow-sm', 'border-b', 'border-slate-200/80');
      }
    }

    // Back to top visibility
    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.remove('opacity-100');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}
