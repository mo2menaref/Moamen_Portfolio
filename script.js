// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileNav.classList.toggle('show');
        
        // Animate hamburger menu
        const bars = this.querySelectorAll('.bar');
        if (this.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
    
    // Close mobile menu when clicking on a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            mobileNav.classList.remove('show');
            
            const bars = mobileMenuBtn.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });
    
    // Smooth scrolling for all links that point to an ID
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Update active nav link based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#desktop-nav a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Skill Progress Animation
    const skillProgress = document.querySelectorAll('.skill-progress');
    
    // Function to start animation when element is in viewport
    function animateSkill() {
        skillProgress.forEach(skill => {
            const progress = skill.getAttribute('data-progress');
            const position = skill.getBoundingClientRect().top;
            const screenPosition = window.innerHeight * 0.8;
            
            if (position < screenPosition) {
                skill.style.width = progress;
            }
        });
    }
    
    // Initial check for elements in viewport
    animateSkill();
    
    // Check when scrolling
    window.addEventListener('scroll', animateSkill);
    
    // Animation on scroll for elements with 'animate' class
    const animatedElements = document.querySelectorAll('.animate');
    
    function animateOnScroll() {
        animatedElements.forEach(el => {
            const position = el.getBoundingClientRect().top;
            const screenPosition = window.innerHeight * 0.8;
            
            if (position < screenPosition) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initial check for elements in viewport
    animateOnScroll();
    
    // Check when scrolling
    window.addEventListener('scroll', animateOnScroll);
    
    // Simple form validation for contact form
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        let valid = true;
        
        // Simple validation
        if (nameInput.value.trim() === '') {
            nameInput.style.borderColor = 'red';
            valid = false;
        } else {
            nameInput.style.borderColor = '';
        }
        
        if (emailInput.value.trim() === '' || !validateEmail(emailInput.value)) {
            emailInput.style.borderColor = 'red';
            valid = false;
        } else {
            emailInput.style.borderColor = '';
        }
        
        if (messageInput.value.trim() === '') {
            messageInput.style.borderColor = 'red';
            valid = false;
        } else {
            messageInput.style.borderColor = '';
        }
        
        if (valid) {
            // Current time for the time parameter
            const currentTime = new Date().toLocaleString();
            
            // Send email using EmailJS with matching template parameters
            emailjs.send("service_zgbq6fa", "template_uh9cn9d", {
                title: "Contact Form Submission", // Add a title parameter
                name: nameInput.value,
                time: currentTime, // Add time parameter
                email: emailInput.value,
                message: messageInput.value
            }).then(function(response) {
                console.log("Email sent successfully", response);
                alert("Message sent successfully!");
                contactForm.reset();
            }, function(error) {
                console.error("Failed to send email", error);
                alert("Failed to send message: " + (error.text || "Unknown error"));
            });
        }
    });
}
    
    // Helper function to validate email
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Phone mockup animation
    const phoneMockup = document.querySelector('.phone-mockup');
    const appDemo = document.querySelector('.app-demo');
    
    // Create Flutter-style app UI inside the phone mockup
    if (appDemo) {
        // App header
        const appHeader = document.createElement('div');
        appHeader.className = 'app-header';
        appHeader.innerHTML = '<div class="app-title">Flutter App</div>';
        appHeader.style.backgroundColor = '#19B8FA';
        appHeader.style.color = 'white';
        appHeader.style.padding = '15px';
        appHeader.style.textAlign = 'center';
        appHeader.style.fontWeight = 'bold';
        appDemo.appendChild(appHeader);
        
        // App content
        const appContent = document.createElement('div');
        appContent.className = 'app-content';
        appContent.style.padding = '15px';
        appContent.style.backgroundColor = 'white';
        appContent.style.height = 'calc(100% - 110px)';
        appContent.style.overflowY = 'auto';
        
        // Create sample content items
        for (let i = 1; i <= 5; i++) {
            const item = document.createElement('div');
            item.className = 'app-item';
            item.innerHTML = `
                <div class="app-item-content">
                    <h3>Flutter Widget ${i}</h3>
                    <p>Beautiful cross-platform UI component</p>
                </div>
            `;
            item.style.backgroundColor = '#F3F7FA';
            item.style.padding = '15px';
            item.style.borderRadius = '8px';
            item.style.marginBottom = '10px';
            item.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';
            appContent.appendChild(item);
        }
        
        appDemo.appendChild(appContent);
        
        // App bottom navigation
        const appNav = document.createElement('div');
        appNav.className = 'app-nav';
        appNav.style.display = 'flex';
        appNav.style.justifyContent = 'space-around';
        appNav.style.backgroundColor = 'white';
        appNav.style.padding = '15px';
        appNav.style.borderTop = '1px solid #eee';
        appNav.style.position = 'absolute';
        appNav.style.bottom = '0';
        appNav.style.width = '100%';
        
        // Create nav icons
        ['Home', 'Search', 'Add', 'Notifications', 'Profile'].forEach(item => {
            const navItem = document.createElement('div');
            navItem.className = 'nav-item';
            navItem.textContent = item === 'Add' ? '+' : item[0];
            navItem.style.width = '30px';
            navItem.style.height = '30px';
            navItem.style.borderRadius = '50%';
            navItem.style.backgroundColor = item === 'Home' ? '#19B8FA' : '#F3F7FA';
            navItem.style.color = item === 'Home' ? 'white' : '#666';
            navItem.style.display = 'flex';
            navItem.style.justifyContent = 'center';
            navItem.style.alignItems = 'center';
            navItem.style.fontWeight = 'bold';
            navItem.style.fontSize = item === 'Add' ? '20px' : '14px';
            appNav.appendChild(navItem);
        });
        
        appDemo.appendChild(appNav);
    }
    
    // Interactive tilt effect for phone mockup
    if (phoneMockup) {
        phoneMockup.addEventListener('mousemove', function(e) {
            const x = e.clientX - this.getBoundingClientRect().left;
            const y = e.clientY - this.getBoundingClientRect().top;
            
            const centerX = this.offsetWidth / 2;
            const centerY = this.offsetHeight / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            this.style.transform = `perspective(1000px) rotateY(${deltaX * 10}deg) rotateX(${-deltaY * 10}deg)`;
        });
        
        phoneMockup.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateY(-15deg) rotateX(5deg)';
        });
    }
});

// Project Details Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all project cards and add click event
    const projectCards = document.querySelectorAll('.project-card');
    const projectDetailsOverlay = document.getElementById('project-details-overlay');
    const projectDetailsContent = document.getElementById('project-details-content');
    const closeProjectDetails = document.getElementById('close-project-details');
    
    // Project details data - Makadi Vacation
    const projectsData = {
        'makadi-vacation': {
            title: 'Makadi Vacation',
            description: `
                <p>The Makadi Vacation project was designed to automate booking processes for vacation rentals, 
                providing users with a seamless experience from browsing available properties to 
                completing their reservation.</p>
                
                <p>The key features include:</p>
                <ul>
                    <li>Intuitive property browsing with advanced filters</li>
                    <li>Secure booking management system</li>
                    <li>Reservation modification and cancellation</li>
                    <li>User profile and booking history</li>
                </ul>
                
                <p>My role in this project was to create the complete UI/UX design from wireframing to high-fidelity prototypes.
                I conducted user research and testing to ensure the interface was intuitive and met user needs.</p>
            `,
            gallery: [
                'assets/Makadi/MakadiVacation1.png',
                'assets/Makadi/MakadiVacation2.png',
                'assets/Makadi/MakadiVacation3.png'
            ],
            links: {
                behance: 'https://www.behance.net/gallery/208377471/Makadi-Vacation',
                github: 'https://github.com/your-username/project-repo'
            },
            technologies: ['Figma', 'UI/UX', 'Prototype']
        },
        'flash': {
    title: 'Flash',
    description: `
        <p>This project was designed to streamline the process of buying and selling both new and used cars through a user-friendly online platform. 
        It connects individual sellers, dealerships, and buyers in a secure and efficient environment.</p>

        <p>The key features include:</p>
        <ul>
            <li>Advanced search filters for make, model, year, price, and location</li>
            <li>Detailed vehicle listings with photos, specifications, and history reports</li>
            <li>Support for financing options and trade-in evaluations</li>
            <li>User dashboards for managing listings, favorites, and purchase history</li>
        </ul>

        <p>My role in this project was to design the complete UI/UX experience—from wireframes to high-fidelity prototypes. 
        I focused on creating intuitive navigation, responsive layouts, and a seamless flow for both buyers and sellers. 
        I also conducted usability testing to ensure the platform met the needs of diverse user groups.</p>
    `,

            gallery: [
                'assets/Flash/CarsDesc.png',
                'assets/Flash/Homepage.png',
                'assets/Flash/Login.png'
            ],
            links: {
                behance: 'https://www.behance.net/gallery/229335719/Flash-%28Car-Website%29',
                github: 'https://github.com/your-username/project-repo'
            },
            technologies: ['Figma', 'UI/UX', 'Prototype']

        },

        'demoblaze': {
    title: 'DemoBlaze',
    description: `
        <p>This project involved a complete UI/UX redesign of an existing e-commerce website that specializes in selling tech products such as laptops, smartphones, and monitors. 
        The redesign was driven by direct user feedback and usability testing to improve both the visual appeal and functional experience of the platform.</p>

        <p>The key improvements include:</p>
        <ul>
            <li>Modernized interface with a clean, responsive layout</li>
            <li>Enhanced product filtering and comparison tools</li>
            <li>Streamlined checkout process to reduce cart abandonment</li>
            <li>Improved product detail pages with clearer specs and reviews</li>
        </ul>

        <p>My role was to lead the redesign process from research to high-fidelity prototyping. 
        I conducted user interviews, analyzed behavior patterns, and implemented design changes that aligned with user expectations and business goals. 
        The result was a more intuitive and engaging shopping experience that increased user satisfaction and conversion potential.</p>
    `,

    gallery: [
        'assets/Demoblaze/Home.png',
        'assets/Demoblaze/Place Order.png',
        'assets/Demoblaze/DeviceDetailes.png'
    ],
    links: {
        behance: 'https://www.behance.net/gallery/229335057/Redesign-for-DemoBalze-website',
        github: 'https://github.com/your-username/project-repo'
    },
    technologies: ['Figma', 'UI/UX', 'User Research', 'Prototype']
}

    };
    
    // Open project details when clicking on a project card
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't open modal if clicking on a link
            if (e.target.tagName === 'A' || e.target.parentElement.tagName === 'A') {
                return;
            }
            
            const projectId = this.getAttribute('data-project-id');
            if (projectId && projectsData[projectId]) {
                openProjectDetails(projectsData[projectId]);
            }
        });
    });
    
    // Close project details
    closeProjectDetails.addEventListener('click', function() {
        projectDetailsOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close on overlay click (outside the content)
    projectDetailsOverlay.addEventListener('click', function(e) {
        if (e.target === projectDetailsOverlay) {
            projectDetailsOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Function to open project details
    function openProjectDetails(project) {
        // Create content for project details
        let galleryHTML = '';
        if (project.gallery && project.gallery.length) {
            galleryHTML = `
                <div class="project-details-gallery">
                    ${project.gallery.map(img => `<img src="${img}" alt="${project.title}">`).join('')}
                </div>
            `;
        }
        
        let linksHTML = '';
        if (project.links) {
            linksHTML = '<div class="project-details-links">';
            if (project.links.behance) {
                linksHTML += `<a href="${project.links.behance}" target="_blank" class="project-link"><i class="fab fa-behance"></i> View on Behance</a>`;
            }
            // if (project.links.github) {
            //     linksHTML += `<a href="${project.links.github}" target="_blank" class="project-link"><i class="fab fa-github"></i> View Code</a>`;
            // }
            linksHTML += '</div>';
        }
        
        // Populate content
        projectDetailsContent.innerHTML = `
            <div class="project-details-description">
                <h2>${project.title}</h2>
                ${project.description}
                
                <div class="project-tech" style="margin: 1.5rem 0;">
                    ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>
                
                ${linksHTML}
            </div>
            
            ${galleryHTML}
        `;
        
        // Show overlay
        projectDetailsOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling background
    }
});