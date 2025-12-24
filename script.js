/* ============================================
   PORTAFOLIO JS - ANGEL GABRIEL RODRIGUEZ ARROYO
   Interactividad y Animaciones
============================================= */

document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // VARIABLES Y SELECTORES
    // ============================================
    const header = document.getElementById('header');
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');
    const scrollTopBtn = document.getElementById('scroll-top');
    const sections = document.querySelectorAll('section[id]');
    const contactForm = document.getElementById('contact-form');

    // ============================================
    // MENÚ MÓVIL
    // ============================================

    // Abrir menú móvil
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
            document.body.style.overflow = 'hidden';
        });
    }

    // Cerrar menú móvil
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
            document.body.style.overflow = '';
        });
    }

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
            document.body.style.overflow = '';
        });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) &&
            !navToggle.contains(e.target) &&
            navMenu.classList.contains('show-menu')) {
            navMenu.classList.remove('show-menu');
            document.body.style.overflow = '';
        }
    });

    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    const handleHeaderScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    // ============================================
    // SCROLL TO TOP BUTTON
    // ============================================
    const handleScrollTop = () => {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    };

    // ============================================
    // ACTIVE LINK ON SCROLL
    // ============================================
    const setActiveLink = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href*="${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    };

    // ============================================
    // SCROLL EVENT LISTENER
    // ============================================
    window.addEventListener('scroll', () => {
        handleHeaderScroll();
        handleScrollTop();
        setActiveLink();
    });

    // ============================================
    // SCROLL REVEAL ANIMATION
    // ============================================
    const revealElements = document.querySelectorAll(
        '.skill-card, .project-card, .contact-card, .info-card'
    );

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 100;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('revealed');
            }
        });
    };

    // Add reveal animation styles
    const style = document.createElement('style');
    style.textContent = `
        .skill-card, .project-card, .contact-card, .info-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .skill-card.revealed, .project-card.revealed, 
        .contact-card.revealed, .info-card.revealed {
            opacity: 1;
            transform: translateY(0);
        }
        
        .skill-card:nth-child(1) { transition-delay: 0.1s; }
        .skill-card:nth-child(2) { transition-delay: 0.2s; }
        .skill-card:nth-child(3) { transition-delay: 0.3s; }
        .skill-card:nth-child(4) { transition-delay: 0.4s; }
        .skill-card:nth-child(5) { transition-delay: 0.5s; }
        .skill-card:nth-child(6) { transition-delay: 0.6s; }
        
        .project-card:nth-child(1) { transition-delay: 0.1s; }
        .project-card:nth-child(2) { transition-delay: 0.2s; }
        .project-card:nth-child(3) { transition-delay: 0.3s; }
        .project-card:nth-child(4) { transition-delay: 0.4s; }
        
        .contact-card:nth-child(1) { transition-delay: 0.1s; }
        .contact-card:nth-child(2) { transition-delay: 0.2s; }
        .contact-card:nth-child(3) { transition-delay: 0.3s; }
    `;
    document.head.appendChild(style);

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run on load

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // SUPABASE INITIALIZATION
    // ============================================
    let supabase = null;

    // Verificar si Supabase está configurado
    const initSupabase = () => {
        if (window.SUPABASE_CONFIG &&
            window.SUPABASE_CONFIG.SUPABASE_URL !== 'TU_URL_DE_SUPABASE_AQUI' &&
            window.SUPABASE_CONFIG.SUPABASE_KEY !== 'TU_CLAVE_ANONIMA_AQUI') {
            try {
                supabase = window.supabase.createClient(
                    window.SUPABASE_CONFIG.SUPABASE_URL,
                    window.SUPABASE_CONFIG.SUPABASE_KEY
                );
                console.log('✅ Supabase conectado correctamente');
                return true;
            } catch (error) {
                console.error('❌ Error al conectar Supabase:', error);
                return false;
            }
        } else {
            console.warn('⚠️ Supabase no configurado. Los mensajes no se guardarán en la base de datos.');
            console.warn('📝 Edita el archivo config.js con tus credenciales de Supabase.');
            return false;
        }
    };

    const supabaseReady = initSupabase();

    // ============================================
    // CONTACT FORM HANDLING
    // ============================================
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            // Simple validation
            if (!name || !email || !message) {
                showNotification('Por favor completa todos los campos', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Por favor ingresa un email válido', 'error');
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;

            try {
                // Si Supabase está configurado, guardar en la base de datos
                if (supabaseReady && supabase) {
                    const { data, error } = await supabase
                        .from('contactos')
                        .insert([
                            {
                                name: name,
                                email: email,
                                message: message
                            }
                        ]);

                    if (error) {
                        console.error('Error al guardar mensaje:', error);
                        throw new Error(error.message);
                    }

                    console.log('✅ Mensaje guardado en Supabase:', data);
                    showNotification('¡Mensaje enviado con éxito! 📬', 'success');
                } else {
                    // Modo demo: simular envío si Supabase no está configurado
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    showNotification('¡Mensaje enviado! (Modo demo - configura Supabase)', 'success');
                }

                contactForm.reset();
            } catch (error) {
                console.error('Error:', error);
                showNotification('Error al enviar mensaje. Intenta de nuevo.', 'error');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification helper
    function showNotification(message, type = 'success') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 30px;
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 15px 25px;
            background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)'};
            color: white;
            border-radius: 10px;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;

        // Add animation keyframes
        const animStyle = document.createElement('style');
        animStyle.textContent = `
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            @keyframes slideOut {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(100px);
                }
            }
        `;
        document.head.appendChild(animStyle);

        document.body.appendChild(notification);

        // Auto remove after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    // ============================================
    // TYPING EFFECT (Optional Enhancement)
    // ============================================
    const typingTexts = document.querySelectorAll('.typing-text');

    typingTexts.forEach((text, index) => {
        text.style.opacity = '0';
        setTimeout(() => {
            text.style.transition = 'opacity 0.5s ease';
            text.style.opacity = '1';
        }, 500 + (index * 300));
    });

    // ============================================
    // PARALLAX EFFECT ON HERO
    // ============================================
    const heroBlob = document.querySelector('.hero__blob');

    if (heroBlob) {
        window.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.clientX) / 50;
            const y = (window.innerHeight / 2 - e.clientY) / 50;

            heroBlob.style.transform = `translate(${x}px, ${y}px)`;
        });
    }

    // ============================================
    // SKILL CARDS TILT EFFECT
    // ============================================
    const skillCards = document.querySelectorAll('.skill-card');

    skillCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ============================================
    // PROJECT CARDS IMAGE HOVER EFFECT
    // ============================================
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        const placeholder = card.querySelector('.project-card__placeholder');

        if (placeholder) {
            card.addEventListener('mouseenter', () => {
                placeholder.style.transform = 'translate(-50%, -50%) scale(1.2)';
                placeholder.style.opacity = '0.5';
            });

            card.addEventListener('mouseleave', () => {
                placeholder.style.transform = 'translate(-50%, -50%) scale(1)';
                placeholder.style.opacity = '0.3';
            });
        }
    });

    // ============================================
    // INITIALIZE
    // ============================================
    handleHeaderScroll();
    handleScrollTop();
    setActiveLink();

    console.log('🚀 Portfolio loaded successfully!');
});
