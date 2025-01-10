fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const taskContainer = document.getElementById('task-container');
        const memberContainer = document.getElementById('member-container');

        // Tampilkan tugas
        data.tasks.forEach(task => {
            const card = createTaskCard(task.title, task.description, task.popupDescription, task.link);
            taskContainer.appendChild(card);
        });

        // Tampilkan anggota
        data.members.forEach(member => {
            const memberGridItem = createMemberGrid(member.name, member.role, member.photo, member.blog);
            memberContainer.appendChild(memberGridItem);
        });
    })
    .catch(error => console.error('Error:', error));

/** Fungsi untuk membuat card tugas */
function createTaskCard(title, description, popupDescription, link) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="card-content">
            <h3 class="card-title">${title}</h3>
            <p class="card-description">${description}</p>
            <button class="task-btn" onclick="showPopup('${title}', '${popupDescription}', '${link}', 'task')">Lihat Tugas</button>
        </div>
    `;
    return card;
}

/** Fungsi untuk membuat item grid anggota */
function createMemberGrid(name, role, photo, blog) {
    const memberGridItem = document.createElement('div');
    memberGridItem.className = 'anggota-grid-item';
    memberGridItem.innerHTML = `
        <img src="${photo}" alt="${name}" class="anggota-photo">
        <h3 class="anggota-name">${name}</h3>
        <p class="anggota-role">${role}</p>
        <a href="${blog}" target="_blank" class="anggota-link">Kunjungi Website</a>
    `;
    return memberGridItem;
}


/** Fungsi untuk menampilkan popup */
function showPopup(title, popupDescription, link, type) {
    const popup = document.getElementById('popup');
    const popupLink = document.getElementById('popup-link');
    
    document.getElementById('popup-title').textContent = title;
    document.getElementById('popup-description').innerHTML = popupDescription.replace(/\n/g, '<br>');
    popupLink.setAttribute('href', link);
    popupLink.textContent = type === 'task' ? 'Link Tugas' : 'Kunjungi Blog';
    
    popup.classList.remove('hidden');
    popup.classList.add('show');
}

/** Fungsi untuk menutup popup */
function closePopup() {
    const popup = document.getElementById('popup');
    popup.classList.remove('show');
    popup.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    const videoSection = document.querySelector('.video-section');
    videoSection.classList.add('fade-in'); // Memulai animasi fade-in
});

document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll('.header-nav a'); // Pilih semua tautan di navbar

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Mencegah navigasi default
            const targetId = link.getAttribute('href').substring(1); // Ambil ID tujuan
            const targetElement = document.getElementById(targetId); // Dapatkan elemen dengan ID tersebut

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth', // Animasi scrolling mulus
                    block: 'start' // Posisi awal scroll
                });
            }
        });
    });
});

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.header-nav a');

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.header-nav a[href="#${section.id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
});
