document.addEventListener('DOMContentLoaded', () => {

    // === 1. Header Scroll Effect ===
    const header = document.querySelector('.header');
    const backToTop = document.querySelector('.back-to-top');
    let lastScrollY = 0;

    const handleScroll = () => {
        const scrollY = window.scrollY;
        if (header) {
            header.classList.toggle('scrolled', scrollY > 50);
        }
        if (backToTop) {
            backToTop.classList.toggle('visible', scrollY > 600);
        }
        lastScrollY = scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // === 2. Mobile Menu Toggle ===
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isOpen);
            menuToggle.innerHTML = isOpen ? '&#10005;' : '&#9776;';
        });
        navMenu.querySelectorAll('a:not(.dropdown-toggle)').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.innerHTML = '&#9776;';
            });
        });
    }

    // === 3. Dropdown Toggle ===
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdown = document.querySelector('.dropdown');
    if (dropdownToggle && dropdown) {
        dropdownToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const isActive = dropdown.classList.toggle('active');
            dropdownToggle.setAttribute('aria-expanded', isActive);
        });
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
                dropdownToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // === 4. WhatsApp Forms ===
    const formBase = (formId, isSidebar) => {
        const form = document.getElementById(formId);
        if (!form) return;
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const nome = document.getElementById(isSidebar ? 'sidebar-nome' : 'nome').value;
            const empresa = isSidebar ? '' : (document.getElementById('empresa')?.value || '');
            const assunto = document.getElementById(isSidebar ? 'sidebar-servico' : 'assunto').value;
            const mensagem = isSidebar ? (document.getElementById('sidebar-mensagem')?.value || '') : (document.getElementById('mensagem')?.value || '');
            const telefone = '5584999533552';

            let texto = '';
            if (isSidebar) {
                texto = `Ol\u00e1! Meu nome \u00e9 ${nome}. Tenho interesse no servi\u00e7o de ${assunto} e gostaria de agendar uma consultoria.`;
                if (mensagem) texto += `\n\nMensagem: ${mensagem}`;
            } else {
                texto = `Ol\u00e1! Meu nome \u00e9 ${nome}, da empresa ${empresa}.\nTenho interesse em: ${assunto}.\nGostaria de mais informa\u00e7\u00f5es.`;
                if (mensagem) texto += `\n\nMensagem: ${mensagem}`;
            }
            window.open(`https://wa.me/${telefone}?text=${encodeURIComponent(texto)}`, '_blank');
        });
    };
    formBase('whatsapp-form', false);
    formBase('sidebar-form', true);

    // === 5. Scroll Reveal (Enhanced) ===
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        revealElements.forEach(el => revealObserver.observe(el));
    }

    // === 6. Typewriter Effect ===
    const typeWriterEl = document.getElementById('typewriter');
    if (typeWriterEl) {
        const words = ['Seguran\u00e7a do Trabalho', 'Engenharia de Produ\u00e7\u00e3o', 'Higiene Ocupacional', 'Treinamentos in Loco'];
        let wordIndex = 0;
        let isDeleting = false;

        const typeEffect = () => {
            const currentWord = words[wordIndex];
            const currentLength = typeWriterEl.innerHTML.length;

            if (!isDeleting) {
                typeWriterEl.innerHTML = currentWord.substring(0, currentLength + 1);
                if (typeWriterEl.innerHTML === currentWord) {
                    isDeleting = true;
                    setTimeout(typeEffect, 2000);
                    return;
                }
                setTimeout(typeEffect, 80);
            } else {
                typeWriterEl.innerHTML = currentWord.substring(0, currentLength - 1);
                if (typeWriterEl.innerHTML === '') {
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                    setTimeout(typeEffect, 400);
                    return;
                }
                setTimeout(typeEffect, 40);
            }
        };
        setTimeout(typeEffect, 800);
    }

    // === 7. Counter Animation (Enhanced Odometer) ===
    const counters = document.querySelectorAll('.counter-num');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, idx) => {
                if (entry.isIntersecting) {
                    const target = +entry.target.getAttribute('data-target');
                    let count = 0;
                    const duration = 2000;
                    const startTime = performance.now();

                    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

                    const updateCount = (currentTime) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const easedProgress = easeOutQuart(progress);
                        count = Math.floor(easedProgress * target);
                        entry.target.innerText = count;

                        if (progress < 1) {
                            requestAnimationFrame(updateCount);
                        } else {
                            entry.target.innerText = target;
                            if (target === 15 || target === 400) entry.target.classList.add('has-plus');
                            if (target === 100) entry.target.classList.add('has-percent');
                        }
                    };
                    requestAnimationFrame(updateCount);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        counters.forEach(counter => counterObserver.observe(counter));
    }

    // === 8. FAQ Accordion (Enhanced) ===
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(other => other.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // === 9. Active Nav Link Highlight ===
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    if (sections.length && navLinks.length) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active-link');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active-link');
                        }
                    });
                }
            });
        }, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });
        sections.forEach(section => navObserver.observe(section));
    }
});
