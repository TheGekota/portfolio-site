// ...existing code...

// Loader logic
window.addEventListener('DOMContentLoaded', function() {
  const loader = document.getElementById('loader-overlay');
  // Wait for frog hop + title fade (about 2s), then fade out loader
  setTimeout(() => {
    document.body.classList.add('loaded');
    setTimeout(() => {
      if (loader) loader.style.display = 'none';
    }, 700); // matches CSS transition
  }, 2000);
});

// ...existing code...


// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: 'smooth'
      });
    }
  });
});

// Fade-slide scroll animation (robust)
const fadeElements = document.querySelectorAll('.fade-slide');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    // Entry is visible
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } 
    // Entry is out of view
    else {
      entry.target.classList.remove('visible');
    }
  });
}, {
  threshold: 0.1,               // Trigger earlier
  rootMargin: '0px 0px -10% 0px' // Extra bottom margin
});

fadeElements.forEach(el => observer.observe(el));
window.addEventListener('scroll', () => {
  fadeElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
      el.classList.add('visible');
    } else {
      el.classList.remove('visible');
    }
  });
});



// Frog logo hover effect
document.addEventListener('DOMContentLoaded', () => {
  const frogLogo = document.getElementById('frog-logo');
  if (frogLogo) {
    frogLogo.addEventListener('mouseenter', () => {
      frogLogo.src = 'frog/frog_blush.png';
    });
    frogLogo.addEventListener('mouseleave', () => {
      frogLogo.src = 'frog/frog.png';
    });
  }
});


// Sidebar toggle logic
function showSidebar() {
  document.body.classList.add('sidebar-open');
  const sidebar = document.querySelector('.sidebar');
  sidebar.style.display = 'flex';
}



// Function to hide sidebar
function hideSidebar() {
  document.body.classList.remove('sidebar-open');
  const sidebar = document.querySelector('.sidebar');
  sidebar.style.display = 'none';
}

// Add event listeners for sidebar toggle
document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        hideSidebar();
      });
    });
  }
});



// Frog scroll animation and click to projects

document.addEventListener('DOMContentLoaded', function() {
  const frog = document.getElementById('scroll-frog');
  if (!frog) return;

  // Make frog scroll to projects on click
  frog.addEventListener('click', function() {
    const projects = document.getElementById('projects');
    if (projects) {
      projects.scrollIntoView({ behavior: 'smooth' });
    }
  });

  let hasBlushed = false;

  window.addEventListener('scroll', function() {
    if (window.scrollY > 10) {
      frog.classList.add('faded');
      if (!hasBlushed) {
        frog.src = 'frog/frog_blush.png';
        hasBlushed = true;
      }
    } else {
      frog.classList.remove('faded');
      frog.src = 'frog/frog.png';
      hasBlushed = false;
    }
  });
});



// Floating triangles animation

document.addEventListener('DOMContentLoaded', function() {
  const about = document.getElementById('about');
  const triangles = document.querySelectorAll('.floating-triangle');
  // Predefined positions and angles for 5 triangles
  const positions = [
    { left: '20%', top: '10%', angle: -30 },
    { left: '55%', top: '15%', angle: 20 },
    { left: '35%', top: '72%', angle: 40 },
    { left: '5%', top: '55%', angle: -15 },
    { left: '75%', top: '35%', angle: 95 }
  ];

  triangles.forEach((triangle, i) => {
    const pos = positions[i % positions.length];
    triangle.style.left = pos.left;
    triangle.style.top = pos.top;
    triangle.style.transform = `rotate(${pos.angle}deg)`;

    // Sway amount can vary for each triangle
    const sway = 10 + (i % 3) * 5; // px

    // Animate floating and swaying
    triangle.animate([
      { transform: `rotate(${pos.angle}deg) translateY(0px) translateX(0px)` },
      { transform: `rotate(${pos.angle}deg) translateY(-30px) translateX(${sway}px)` },
      { transform: `rotate(${pos.angle}deg) translateY(0px) translateX(0px)` },
      { transform: `rotate(${pos.angle}deg) translateY(30px) translateX(-${sway}px)` },
      { transform: `rotate(${pos.angle}deg) translateY(0px) translateX(0px)` }
    ], {
      duration: 8000 + i * 1000,
      iterations: Infinity,
      direction: 'alternate',
      delay: i * 500,
      easing: 'ease-in-out'
    });

  });
});



// Shine effect on text

document.addEventListener('DOMContentLoaded', function() {
  // Shine effect every 5 seconds
  const shineText = document.querySelector('.shine-text');
  if (shineText) {
    setInterval(() => {
      shineText.classList.add('shine-animate');
      setTimeout(() => {
        shineText.classList.remove('shine-animate');
      }, 1000); // match animation duration
    }, 5000);
  }
});

// Project accordion expand/collapse with fade-in order
document.addEventListener('DOMContentLoaded', function() {
  const projectTitles = document.querySelectorAll('.project-title');
  projectTitles.forEach(title => {
    title.addEventListener('click', function() {
      const item = this.closest('.project-item');
      // Close others
      document.querySelectorAll('.project-item').forEach(i => {
        if (i !== item) {
          i.classList.remove('open');
          // Reset fade-in for closed items
          i.querySelectorAll('.fade-in-item').forEach(el => {
            el.style.transitionDelay = '';
            el.style.opacity = '';
            el.style.transform = '';
          });
        }
      });
      // Toggle this one
      const isOpening = !item.classList.contains('open');
      item.classList.toggle('open');
      const fadeItems = item.querySelectorAll('.fade-in-item');
      if (isOpening) {
        // Stagger fade-in
        fadeItems.forEach((el, idx) => {
          el.style.transitionDelay = (0.2 + idx * 0.2) + 's';
          // Reset to trigger animation
          el.style.opacity = '0';
          el.style.transform = 'translateY(20px)';
          // Force reflow to restart animation
          void el.offsetWidth;
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        });
      } else {
        // Reset when closing
        fadeItems.forEach(el => {
          el.style.transitionDelay = '';
          el.style.opacity = '';
          el.style.transform = '';
        });
      }
    });
  });
});

// Copy email to clipboard on icon click with animation
document.addEventListener('DOMContentLoaded', function() {
  const emailBtn = document.getElementById('copy-email');
  const copiedMsg = document.getElementById('copied-message');
  if (emailBtn && copiedMsg) {
    emailBtn.addEventListener('click', function(e) {
      e.preventDefault();
      navigator.clipboard.writeText('gekotasnook@gmail.com'); // Replace with your email
      copiedMsg.classList.add('show');
      setTimeout(() => {
        copiedMsg.classList.remove('show');
      }, 800);
    });
  }
});

// Smooth mouse-based parallax for grid backgrounds
(function() {
  const gridSections = ['about', 'projects', 'content'];
  const parallaxStrength = 40; // px, adjust for more/less movement

  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;
  let autoParallax = window.innerWidth <= 1050;

  function updateParallaxMode() {
    autoParallax = window.innerWidth <= 1050;
    if (!autoParallax) {
      targetX = 0;
      targetY = 0;
    }
  }

  window.addEventListener('resize', updateParallaxMode);

  document.addEventListener('mousemove', function(e) {
    if (!autoParallax) {
      targetX = (e.clientX / window.innerWidth - 0.5) * parallaxStrength;
      targetY = (e.clientY / window.innerHeight - 0.5) * parallaxStrength;
    }
  });

  function animateParallax() {
    if (autoParallax) {
      // Animate in a slow circle
      targetX = 0;
      targetY = 0;
    }
    // Easing: move 10% closer to target each frame
    currentX += (targetX - currentX) * 0.1;
    currentY += (targetY - currentY) * 0.1;

    // Only move the grid layers, keep gradient static
    gridSections.forEach(id => {
      const section = document.getElementById(id);
      if (section) {
        section.style.backgroundPosition =
          `${30 + Math.round(currentX)}px ${30 + Math.round(currentY)}px, ` + // grid 1
          `${30 + Math.round(currentX)}px ${30 + Math.round(currentY)}px, ` + // grid 2
          `50% 50%`; // gradient stays centered/static
      }
    });
    requestAnimationFrame(animateParallax);
  }

  animateParallax();
})();



// Page fade-in effect on load
  window.addEventListener('DOMContentLoaded', function() {
    const fade = document.querySelector('.page-fade');
    if (fade) {
      // Remove visible in case of bfcache, then force reflow, then add visible
      fade.classList.remove('visible');
      void fade.offsetWidth; // Force reflow
      fade.classList.add('visible');
    }
  });



// Add this to your JS file or in a <script> tag
document.addEventListener("DOMContentLoaded", function () {
  const tocLinks = document.querySelectorAll('.toc-vertical .toc-sub-options a');
  const sections = Array.from(tocLinks).map(link => document.querySelector(link.getAttribute('href')));

  function onScroll() {
    let scrollPos = window.scrollY || window.pageYOffset;
    let offset = 100; // adjust if you have a fixed header

    sections.forEach((section, idx) => {
      if (section) {
        if (section.offsetTop - offset <= scrollPos && section.offsetTop + section.offsetHeight - offset > scrollPos) {
          tocLinks.forEach(link => link.classList.remove('active'));
          tocLinks[idx].classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', onScroll);
  onScroll(); // run on load
});


// --- FROG FEEDING LOGIC ---

document.addEventListener('DOMContentLoaded', function() {
  const frogBtn = document.getElementById('frog-eat-btn');
  const frogImg = document.getElementById('frog-eat-img');
  const coursesSection = document.querySelector('.courses');
  const courseList = coursesSection ? coursesSection.querySelector('ul') : null;
  let eatenCourses = [];
  let autoSpitTimeout = null;

  // Helper: Add or remove squish animation class
  function setFrogSquish(squish) {
    if (!frogImg) return;
    if (squish) {
      frogImg.classList.add('squish');
    } else {
      frogImg.classList.remove('squish');
    }
  }

  // Show frog only when course boxes are visible, and squish when visible
  function checkFrogVisibility() {
    if (!frogBtn || !coursesSection) return;
    const rect = coursesSection.getBoundingClientRect();
    const sectionHeight = rect.height;
    const middleTop = rect.top + sectionHeight / 3;
    const middleBottom = rect.bottom - sectionHeight / 3;
    const isMiddleVisible = middleTop < window.innerHeight && middleBottom > 0;
    frogBtn.style.opacity = isMiddleVisible ? '1' : '0';
    frogBtn.style.pointerEvents = isMiddleVisible ? 'auto' : 'none';
    frogBtn.style.transition = 'opacity 0.4s';
    setFrogSquish(isMiddleVisible);
  }
  checkFrogVisibility();
  window.addEventListener('scroll', checkFrogVisibility);
  window.addEventListener('resize', checkFrogVisibility);

  // Spit out all eaten courses in original order, frog mouth open during spit
  function spitOutCourses() {
    if (!courseList || eatenCourses.length === 0) return;
    frogImg.src = 'frog/frog_open.png';
    frogImg.classList.remove('squish');
    frogImg.style.transition = 'transform 0.25s';
    frogImg.style.transform = 'scale(1.2) rotate(-10deg)';
    setTimeout(() => {
      frogImg.style.transform = 'scale(1)';
    }, 300);

    eatenCourses.sort((a, b) => a.index - b.index);
    eatenCourses.forEach((item, idx) => {
      const temp = document.createElement('div');
      temp.innerHTML = item.html;
      const li = temp.firstElementChild;
      li.style.opacity = '0';
      li.style.transform = 'scale(0.5) translateY(-40px)';
      setTimeout(() => {
        if (item.index >= courseList.children.length) {
          courseList.appendChild(li);
        } else {
          courseList.insertBefore(li, courseList.children[item.index]);
        }
        setTimeout(() => {
          li.style.transition = 'opacity 0.4s, transform 0.4s';
          li.style.opacity = '1';
          li.style.transform = 'scale(1) translateY(0)';
        }, 10);
      }, idx * 120);
    });
    eatenCourses = [];
    setTimeout(() => {
      frogImg.src = 'frog/frog_close.png';
      checkFrogVisibility();
    }, 700);
  }

  // Animate course to frog on "Feed Frog" click, frog mouth open while eating
  coursesSection.addEventListener('click', function(e) {
    const btn = e.target.closest('.collect-btn');
    if (!btn) return;
    const courseBox = btn.closest('.course-box');
    if (!courseBox || !frogImg) return;
    const li = courseBox.parentElement;
    const index = Array.from(courseList.children).indexOf(li);
    eatenCourses.push({ html: li.outerHTML, index });

    const courseRect = courseBox.getBoundingClientRect();
    const frogRect = frogImg.getBoundingClientRect();
    const flying = courseBox.cloneNode(true);
    flying.classList.add('flying-course');
    document.body.appendChild(flying);
    flying.style.left = courseRect.left + 'px';
    flying.style.top = courseRect.top + 'px';
    flying.style.width = courseRect.width + 'px';
    flying.style.height = courseRect.height + 'px';
    void flying.offsetWidth;
    const deltaX = frogRect.left + frogRect.width/2 - (courseRect.left + courseRect.width/2);
    const deltaY = frogRect.top + frogRect.height/2 - (courseRect.top + courseRect.height/2);
    flying.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.2)`;
    flying.style.opacity = '0.2';

    frogImg.src = 'frog/frog_open.png';
    frogImg.classList.remove('squish');
    frogImg.style.transition = 'transform 0.25s';
    setTimeout(() => { frogImg.style.transform = 'scale(1.15)'; }, 200);
    setTimeout(() => { frogImg.style.transform = 'scale(1)'; }, 500);

    setTimeout(() => {
      flying.remove();
      li.remove();
      setTimeout(() => {
        frogImg.src = 'frog/frog_close.png';
        checkFrogVisibility();
      }, 300);
      if (courseList && courseList.children.length === 0 && eatenCourses.length > 0) {
        if (autoSpitTimeout) clearTimeout(autoSpitTimeout);
        autoSpitTimeout = setTimeout(() => { spitOutCourses(); }, 1000);
      }
    }, 800);
  });

  // Spit out courses when frog is clicked (at any time)
  frogBtn.addEventListener('click', function() {
    if (autoSpitTimeout) clearTimeout(autoSpitTimeout);
    spitOutCourses();
  });
});


// Function to show/hide project details on click
function showProjectDetails(id) {
    const details = document.getElementById(`project-details-${id}`);
    if (details.style.display === "block") {
        details.style.display = "none";
    } else {
        // Hide all other details
        document.querySelectorAll('.project-details').forEach(el => el.style.display = "none");
        details.style.display = "block";
    }
  }


// Truly infinite scatter scroll for skills section
window.addEventListener('DOMContentLoaded', () => {
  const scroll = document.getElementById('skills-scroll');
  if (!scroll) return;

  const boxes = Array.from(scroll.children);
  const container = scroll.parentElement;
  const containerHeight = container.offsetHeight;
  const boxWidth = 300; // px, should match your CSS
  const gap = 16; // px, adjust if you want spacing between boxes

  // Scatter each box vertically and horizontally
  boxes.forEach((box, i) => {
    const y = 20 + Math.random() * (containerHeight - 80);
    box.style.left = `${i * (boxWidth + gap)}px`;
    box.style.top = `${y}px`;
    box.style.position = 'absolute';
  });

  // Set container width
  scroll.style.width = `${boxes.length * (boxWidth + gap)}px`;
  scroll.style.position = 'absolute';

  let offset = 0;
  let lastTimestamp = null;
  const speed = 60; // px per second, adjust for scroll speed

  function animateSkillsScroll(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const dt = (timestamp - lastTimestamp) / 1000; // seconds
    lastTimestamp = timestamp;

    offset -= speed * dt;

    // When a box goes off screen, move it to the end
    while (boxes.length) {
      const firstBox = boxes[0];
      const firstBoxLeft = parseFloat(firstBox.style.left) + offset;
      if (firstBoxLeft + boxWidth < 0) {
        // Move to end
        const lastBox = boxes[boxes.length - 1];
        const lastBoxLeft = parseFloat(lastBox.style.left);
        // New left position is after the last box
        const newLeft = lastBoxLeft + boxWidth + gap;
        firstBox.style.left = `${newLeft}px`;
        // Optionally, re-scatter vertically for more randomness
        firstBox.style.top = `${20 + Math.random() * (containerHeight - 80)}px`;
        // Move DOM node to end
        scroll.appendChild(firstBox);
        // Update boxes array
        boxes.push(boxes.shift());
      } else {
        break;
      }
    }

    scroll.style.transform = `translateX(${offset}px)`;

    requestAnimationFrame(animateSkillsScroll);
  }

  requestAnimationFrame(animateSkillsScroll);
});


// Truly infinite scatter scroll for tools section
window.addEventListener('DOMContentLoaded', () => {
  const scroll = document.getElementById('tool-scroll');
  if (!scroll) return;

  const boxes = Array.from(scroll.children);
  const container = scroll.parentElement;
  const containerHeight = container.offsetHeight;
  const boxWidth = 220; // px, should match your CSS
  const gap = 10; // px, adjust if you want spacing between boxes

  // Scatter each box vertically and horizontally
  boxes.forEach((box, i) => {
    const y = 20 + Math.random() * (containerHeight - 80);
    box.style.left = `${i * (boxWidth + gap)}px`;
    box.style.top = `${y}px`;
    box.style.position = 'absolute';
  });

  // Set container width
  scroll.style.width = `${boxes.length * (boxWidth + gap)}px`;
  scroll.style.position = 'absolute';

  let offset = 0;
  let lastTimestamp = null;
  const speed = 80; // px per second, adjust for scroll speed

  function animateToolsScroll(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const dt = (timestamp - lastTimestamp) / 1000; // seconds
    lastTimestamp = timestamp;

    offset -= speed * dt;

    // When a box goes off screen, move it to the end
    while (boxes.length) {
      const firstBox = boxes[0];
      const firstBoxLeft = parseFloat(firstBox.style.left) + offset;
      if (firstBoxLeft + boxWidth < 0) {
        // Move to end
        const lastBox = boxes[boxes.length - 1];
        const lastBoxLeft = parseFloat(lastBox.style.left);
        // New left position is after the last box
        const newLeft = lastBoxLeft + boxWidth + gap;
        firstBox.style.left = `${newLeft}px`;
        // Optionally, re-scatter vertically for more randomness
        firstBox.style.top = `${20 + Math.random() * (containerHeight - 80)}px`;
        // Move DOM node to end
        scroll.appendChild(firstBox);
        // Update boxes array
        boxes.push(boxes.shift());
      } else {
        break;
      }
    }

    scroll.style.transform = `translateX(${offset}px)`;

    requestAnimationFrame(animateToolsScroll);
  }

  requestAnimationFrame(animateToolsScroll);
});


// Frog's toy car finding game logic
document.addEventListener('DOMContentLoaded', function() {
  const grid = document.getElementById('skills-grid');
  const cards = Array.from(grid.querySelectorAll('.skill-card'));
  const frog = document.getElementById('frog-anim');
  let toyCarIndex = -1;
  let found = false;

  function resetCards() {
    // Remove all toy car marks and reset backs
    cards.forEach(card => {
      card.classList.remove('toy-car', 'flipped');
      card.querySelector('.card-back').textContent = '';
      card.style.visibility = '';
    });
    // Shuffle cards visually
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      grid.appendChild(cards[j]);
    }
    // Assign toy car to a random card
    toyCarIndex = Math.floor(Math.random() * cards.length);
    cards[toyCarIndex].classList.add('toy-car');
    cards[toyCarIndex].querySelector('.card-back').textContent = "🚗 Claim Toy";
    found = false;
  }

  // Initial setup
  resetCards();

  // Card flip logic
  cards.forEach((card, idx) => {
    card.addEventListener('mouseenter', function() {
      if (found) return;
      card.classList.add('flipped');
    });
    card.addEventListener('mouseleave', function() {
      if (!found) card.classList.remove('flipped');
    });
    card.addEventListener('click', function() {
      if (found) return;
      card.classList.add('flipped');
      // Only trigger frog if this is the toy car card
      if (card.classList.contains('toy-car')) {
        found = true;
        setTimeout(() => {
          animateFrogToCard(card);
        }, 600); // Wait for flip animation
      }
    });
  });

  function animateFrogToCard(card) {
    // Get card position
    const rect = card.getBoundingClientRect();
    frog.style.display = 'block';
    frog.style.left = '0px';
    frog.style.bottom = '40px';
    frog.style.opacity = '1';

    // Animate frog to card
    setTimeout(() => {
      frog.style.left = (rect.left + rect.width/2 - 40) + 'px';
      frog.style.bottom = (window.innerHeight - rect.bottom + 10) + 'px';
    }, 50);

    // After reaching card, "take" the toy and hop off
    setTimeout(() => {
      card.style.visibility = 'hidden';
      frog.style.left = (window.innerWidth + 100) + 'px';
      frog.style.bottom = '80px';
      frog.style.opacity = '0';
    }, 1300);

    // Reset after animation
    setTimeout(() => {
      frog.style.display = 'none';
      cards.forEach(c => c.classList.remove('flipped'));
      resetCards();
    }, 2200);
  }
});


// Post Array

const posts = [
  {
    username: "Gekota",
    avatar: "frog/frog.png",
    date: "August 12, 2025",
    image: "frog/frog.png",
    content: "Excited to share my latest project! 🐸 Stay tuned for updates.",
    likes: 12,
    comments: 3
  },
  {
    username: "Gekota",
    avatar: "frog/frog.png",
    date: "August 10, 2025",
    image: "frog/sample2.jpg",
    content: "Working on my portfolio site. Loving the new design!",
    likes: 8,
    comments: 1
  },
  {
    username: "Gekota",
    avatar: "frog/frog.png",
    date: "Coming soon",
    image: "",
    content: "More posts coming soon!",
    likes: 0,
    comments: 0
  }
];

// Pin SVG (you can swap for an image if you want)
const pinSVG = `
<svg class="pin" viewBox="0 0 40 40">
  <circle cx="20" cy="12" r="10" fill="#e07a5f" stroke="#3d405b" stroke-width="2"/>
  <rect x="18" y="20" width="4" height="16" rx="2" fill="#3d405b"/>
</svg>
`;

function randomRotation() {
  // Random rotation between -7deg and +7deg
  return `rotate(${(Math.random() * 14 - 7).toFixed(1)}deg)`;
}

// Store base rotation on render
function renderBulletinBoard() {
  const board = document.getElementById('bulletin-board');
  if (!board) return;
  board.innerHTML = '';
  posts.forEach((post, i) => {
    const div = document.createElement('div');
    div.className = 'bulletin-post';
    const baseRot = (Math.random() * 14 - 7).toFixed(1);
    // Random vertical offset between -60px and +120px
    const yOffset = Math.floor(Math.random() * 180) - 60;
    div.style.transform = `rotate(${baseRot}deg) translateY(${yOffset}px)`;
    div.dataset.baseRotation = baseRot;
    div.dataset.baseYOffset = yOffset;
    div.innerHTML = `
      ${pinSVG}
      <img src="${post.avatar}" alt="User Avatar" class="avatar">
      <div class="username">${post.username}</div>
      <div class="post-date">${post.date}</div>
      <div class="post-image">
        ${post.image ? `<img src="${post.image}" alt="Blog Post Image">` : ''}
      </div>
      <div class="post-content">${post.content}</div>
      <div class="post-actions">
        <span>❤️ ${post.likes}</span>
        <span>💬 ${post.comments}</span>
      </div>
    `;
    board.appendChild(div);
  });
}

document.addEventListener('DOMContentLoaded', renderBulletinBoard);