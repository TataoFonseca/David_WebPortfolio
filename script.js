document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Condition that compares the headerHeight with the scrollTop value
        if (scrollTop >= headerHeight) { // When scrollTop is greater than the headerHeight
            navbar.classList.add('fixed'); // 'fixed' CSS status is placed on navbar HTML component
        } else {
            navbar.classList.remove('fixed'); // Restores the navbar to its original position status: relative 
        }
    });

    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Fetch the JSON data and populate the sections
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            populateSection('knowledge', data.academyAndKnowledge);
            populateSection('experience', data.workExperience);
            populateProjects(data.projects);
        })
        .catch(error => console.error('Error loading data:', error));
});

function populateSection(sectionId, items) {
    const section = document.getElementById(sectionId);
    const cardGrid = section.querySelector('.card-grid');
    cardGrid.innerHTML = ''; // Clear existing content

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.content.replace(/\n/g, '<br>')}</p>
        `;
        cardGrid.appendChild(card);
    });
}

function populateProjects(projects) {
    const projectGrid = document.querySelector('#projects .project-grid');
    projectGrid.innerHTML = ''; // Clear existing content

    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-image" style="background-image: url('${project.imageUrl}');"></div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="button-group">
                    
                </div>
            </div>
        `;
        projectGrid.appendChild(projectCard);
    });
}

{/* <button onclick="window.location.href='${project.viewMoreUrl}'">View More</button> */}
{/* <button onclick="window.location.href='${project.websiteUrl}'">Go to the website</button> */}