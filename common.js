// Language Switcher Functionality
const btnHindi = document.getElementById('btn-hindi');
const btnEnglish = document.getElementById('btn-english');

function includeHTML(id, file, callback) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
            if (callback) callback();
        });
}

// Load header and footer
includeHTML('header', 'header.html', initHeaderScripts);
includeHTML('footer', 'footer.html');

function initHeaderScripts() {
    // Language Switcher Functionality
    const btnHindi = document.getElementById('btn-hindi');
    const btnEnglish = document.getElementById('btn-english');
    function setLanguage(lang) {
        if (btnHindi && btnEnglish) {
            if(lang === 'hindi') {
                btnHindi.classList.add('active');
                btnEnglish.classList.remove('active');
            } else {
                btnHindi.classList.remove('active');
                btnEnglish.classList.add('active');
            }
        }
        document.querySelectorAll('.lang-hindi').forEach(el => {
            el.style.display = (lang === 'hindi') ? '' : 'none';
        });
        document.querySelectorAll('.lang-english').forEach(el => {
            el.style.display = (lang === 'english') ? '' : 'none';
        });
        updateNavActive();
    }
    if (btnHindi && btnEnglish) {
        btnHindi.addEventListener('click', () => setLanguage('hindi'));
        btnEnglish.addEventListener('click', () => setLanguage('english'));
    }

    // Nav active state logic
    let currentNavIndex = 0; // Default to first menu item
    function updateNavActive() {
        document.querySelectorAll('nav ul li a').forEach(link => link.classList.remove('active'));
        const navItems = document.querySelectorAll('nav ul li');
        if (navItems[currentNavIndex]) {
            navItems[currentNavIndex].querySelectorAll('a').forEach(link => link.classList.add('active'));
        }
    }
    document.querySelectorAll('nav ul li').forEach((li, idx) => {
        li.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.style.display === 'none') return;
                currentNavIndex = idx;
                updateNavActive();
            });
        });
    });
    updateNavActive();
    setLanguage('english'); // Set default language to English on page load

    // Hamburger menu functionality
    const hamburger = document.getElementById('hamburger');
    const navUl = document.querySelector('nav ul');
    const menuOverlay = document.getElementById('menu-overlay');
    if (hamburger && navUl && menuOverlay) {
        hamburger.addEventListener('click', function() {
            navUl.classList.toggle('open');
            menuOverlay.classList.toggle('open');
        });
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.addEventListener('click', function() {
                if(window.innerWidth <= 768) {
                    navUl.classList.remove('open');
                    menuOverlay.classList.remove('open');
                }
            });
        });
        menuOverlay.addEventListener('click', function() {
            navUl.classList.remove('open');
            menuOverlay.classList.remove('open');
        });
    }
}

// YouTube Latest Videos Section (No API key, uses rss2json)
(function() {
    const channelId = 'UCqEbnUlqW5SFheI_mvwxiIQ';
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
    const container = document.getElementById('youtube-videos');
    if (!container) return;
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            if (!data.items) return;
            const videos = data.items.filter(item => item.link.includes('watch')).slice(0, 3);
            container.innerHTML = videos.map(video => {
                const videoId = video.link.split('v=')[1];
                return `
                    <div style="max-width:350px;width:100%;">
                        <div style='position:relative;padding-bottom:56.25%;height:0;overflow:hidden;'>
                            <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen style='position:absolute;top:0;left:0;width:100%;height:100%;'></iframe>
                        </div>
                        <div style='margin-top:10px;font-weight:600;'>${video.title}</div>
                    </div>
                `;
            }).join('');
        });
})();

// Show Save Anangpur popup on page load
window.addEventListener('DOMContentLoaded', function() {
  var popup = document.getElementById('anangpur-popup');
  var closeBtn = document.getElementById('anangpur-close');
  if (popup && closeBtn) {
    popup.style.display = 'flex';
    closeBtn.onclick = function() { popup.style.display = 'none'; };
    popup.onclick = function(e) {
      if (e.target === popup) popup.style.display = 'none';
    };
  }
}); 