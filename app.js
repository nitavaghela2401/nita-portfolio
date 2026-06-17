document.addEventListener('DOMContentLoaded', () => {
  // Activate Lucide icons rendering
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  
  // Set up testimonials slide initial positioning
  updateTestimonialSlider();
});

// Floating Sticky Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Scroll Spy: Highlight active navigation link
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  let currentActive = 'hero';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (window.scrollY >= sectionTop) {
      currentActive = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentActive}`) {
      link.classList.add('active');
    }
  });
});

// Mobile Hamburger Menu Toggle
const hamburgerMenu = document.getElementById('hamburgerMenu');
const navMenu = document.getElementById('navMenu');

hamburgerMenu.addEventListener('click', () => {
  hamburgerMenu.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close Mobile Menu when links are clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburgerMenu.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Testimonials Carousel Logic
let currentSlide = 0;
const totalSlides = 4;
const testimonialTrack = document.getElementById('testimonialTrack');
const testimonialDots = document.querySelectorAll('#testimonialDots .testimonial-dot');

function updateTestimonialSlider() {
  testimonialTrack.style.transform = `translateX(-${currentSlide * 25}%)`;
  
  // Update Dot indicators
  testimonialDots.forEach((dot, idx) => {
    dot.classList.remove('active');
    if (idx === currentSlide) {
      dot.classList.add('active');
    }
  });
}

function slideNext() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateTestimonialSlider();
}

function slidePrev() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateTestimonialSlider();
}

function goToSlide(index) {
  currentSlide = index;
  updateTestimonialSlider();
}

// Auto play testimonials slide every 8 seconds
let testimonialTimer = setInterval(slideNext, 8000);
function resetTestimonialTimer() {
  clearInterval(testimonialTimer);
  testimonialTimer = setInterval(slideNext, 8000);
}

document.querySelectorAll('.testimonial-arrow, .testimonial-dot').forEach(el => {
  el.addEventListener('click', resetTestimonialTimer);
});

// Creative Work Gallery Filtering
function filterGallery(category, button) {
  // Highlight active filter button
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  filterBtns.forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');

  // Loop through gallery items and show/hide
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    const categories = item.getAttribute('data-category').split(' ');
    if (category === 'all' || categories.includes(category)) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
}

// Case Studies Popup System Data
const caseStudies = {
  aapka: {
    tag: "Travel Industry",
    title: "Aapka Holidays Ltd. - Content Scaling",
    img: "logo.png", // Using logo or a custom placeholder SVG inside modal
    useSVG: true,
    description: "Designed conversion-focused social media creatives, tourist package itineraries, and promotional content strategy.",
    challenge: "The client needed to stand out in a crowded travel booking market and capture direct package inquiries rather than relying entirely on third-party aggregators.",
    strategy: "Formulated a weekly content pillar structure focusing on 'hidden gems' destinations. Designed high-contrast Canva carousels detailing pricing options, travel perks, and tourist feedback. Ran organic Instagram optimization loops.",
    results: "Drove 140% growth in organic link clicks to booking forms, generating over 120+ monthly direct vacation package leads.",
    kpi: "+140% Link Clicks",
    tools: "Canva, Gemini AI, Instagram Growth Kits",
    duration: "3 Months"
  },
  shethwala: {
    tag: "FMCG Retail",
    title: "Shethwala & Sons - Food Campaign",
    img: "work-pizza.jpg",
    useSVG: false,
    description: "Launched high-retention food creatives, festival discount campaigns, and product placement branding.",
    challenge: "Traditional wholesale networks were saturated. The client required direct-to-consumer digital visibility to support local retail placements.",
    strategy: "Designed scroll-stopping food graphic sets (including 'Pizza Delight' promos). Automated captions copy generations via ChatGPT. Structured reels hooks showing retail packaging drops.",
    results: "+280% increase in brand search impressions, boosting direct local retail wholesale inquiries by 34% QoQ.",
    kpi: "3.4x Search Visibility",
    tools: "ChatGPT, CapCut, Canva, Meta Ads",
    duration: "4 Months"
  },
  suvidha: {
    tag: "Healthcare Retail",
    title: "Suvidha Chemist - Local Pharmacy Marketing",
    img: "work-suvidha.jpg",
    useSVG: false,
    description: "Developed localized healthcare awareness posts, wellness infographics, and Google Maps local SEO integration.",
    challenge: "A retail pharmacy store in Vadodara needed to expand its local prescription delivery database and local Google Maps actions.",
    strategy: "Created helpful wellness infographics (like 'Summer 3 Common Problems' health advice). Structured local SEO directory backlinks, set up automated maps directions prompts, and targeted local neighborhood groups.",
    results: "Google Maps direct directions requests rose by 180%, driving over 800+ new verified store visits and walk-ins.",
    kpi: "+180% Maps Actions",
    tools: "Google Local Listings, Canva, Flow AI",
    duration: "Ongoing Consultant"
  },
  elegance: {
    tag: "Beauty Industry",
    title: "Elegance Beauty Salon - Luxury Branding",
    img: "work-beauty.jpg",
    useSVG: false,
    description: "Formulated luxury beauty brand aesthetics, product commercial posts, and localized offer campaigns.",
    challenge: "Competing beauty salons were cutting prices. Elegance Salon needed a high-end visual positioning to charge premium service rates.",
    strategy: "Generated photorealistic cosmetic mockups (Glow Radiance Cream style) using Midjourney diffusion models. Created stylized grid formats in pink/silver colors matching the physical salon interior aesthetics.",
    results: "Increased average customer ticket size by 24% and booked out weekend salon reservation slots 3 weeks in advance.",
    kpi: "+24% Avg Ticket Size",
    tools: "Midjourney, Canva, CapCut, Instagram Reels",
    duration: "2 Months"
  }
};

const caseStudyModal = document.getElementById('caseStudyModal');
const modalBody = document.getElementById('modalCaseStudyBody');

function openCaseStudyModal(projectId) {
  const data = caseStudies[projectId];
  if (!data) return;

  // Render SVG or Image
  let visualHTML = '';
  if (data.useSVG) {
    visualHTML = `
      <div class="modal-visual-frame">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 40%; height: 40%; opacity: 0.85;">
          <rect x="20" y="20" width="60" height="60" rx="10" fill="#12182d" stroke="var(--accent-color)" stroke-width="2" />
          <path d="M40 45 L50 35 L60 45 M50 35 V65" stroke="var(--accent-color)" stroke-width="3" stroke-linecap="round" />
          <circle cx="50" cy="50" r="15" stroke="rgba(255, 255, 255, 0.05)" />
        </svg>
      </div>
    `;
  } else {
    visualHTML = `
      <div class="modal-visual-frame">
        <img src="${data.img}" alt="${data.title}" class="modal-visual-img">
      </div>
    `;
  }

  modalBody.innerHTML = `
    <span class="modal-hdr-tag">${data.tag}</span>
    <h3 class="modal-main-title">${data.title}</h3>
    
    ${visualHTML}
    
    <div class="modal-grid">
      <div class="modal-narrative">
        <h4>Overview & Challenge</h4>
        <p>${data.challenge}</p>
        
        <h4>Marketing Strategy & Execution</h4>
        <p>${data.strategy}</p>
        
        <h4>ROI Impact & Results</h4>
        <p>${data.results}</p>
      </div>
      
      <div class="modal-specs-box">
        <div class="modal-spec-row">
          <span class="spec-lbl">Primary Success KPI</span>
          <span class="spec-val" style="color: var(--accent-color); font-size: 1.15rem; font-family: var(--font-title); font-weight: 800;">${data.kpi}</span>
        </div>
        <div class="modal-spec-row">
          <span class="spec-lbl">Campaign Duration</span>
          <span class="spec-val">${data.duration}</span>
        </div>
        <div class="modal-spec-row">
          <span class="spec-lbl">Tools Deployed</span>
          <span class="spec-val" style="color: var(--text-slate); font-weight: 400;">${data.tools}</span>
        </div>
      </div>
    </div>
  `;

  caseStudyModal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Lock background scrolling
  
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

function closeCaseStudyModal() {
  caseStudyModal.classList.remove('active');
  document.body.style.overflow = 'auto'; // Unlock background scrolling
}

// Click outside modal content box to close
caseStudyModal.addEventListener('click', (e) => {
  if (e.target === caseStudyModal) {
    closeCaseStudyModal();
  }
});

// Intake Form Submission Mock handler
function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const successCard = document.getElementById('formSuccessCard');
  
  const originalText = submitBtn.innerHTML;
  
  submitBtn.disabled = true;
  submitBtn.style.opacity = '0.7';
  submitBtn.innerHTML = 'Submitting Proposal Request...';
  
  setTimeout(() => {
    successCard.classList.add('show');
    form.reset();
    submitBtn.disabled = false;
    submitBtn.style.opacity = '1';
    submitBtn.innerHTML = originalText;
    
    // Auto hide success card after 6 seconds
    setTimeout(() => {
      successCard.classList.remove('show');
    }, 6000);
  }, 1400);
}

// Dynamic YouTube Hero Video Player on click
function playHeroVideo() {
  const cover = document.getElementById('heroVideoCover');
  const playBtn = document.getElementById('heroPlayBtn');
  const iframeContainer = document.getElementById('heroVideoIframeContainer');
  const container = document.getElementById('heroVideoContainer');

  if (cover && playBtn && iframeContainer) {
    cover.style.opacity = '0';
    cover.style.pointerEvents = 'none';
    playBtn.style.display = 'none';
    iframeContainer.style.display = 'block';
    iframeContainer.innerHTML = `
      <iframe width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/o5FyckqbjZI?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="border: none;"></iframe>
    `;
    if (container) {
      container.onclick = null;
      container.style.cursor = 'default';
    }
  }
}
