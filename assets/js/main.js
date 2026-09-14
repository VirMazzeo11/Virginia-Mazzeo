const projects = window.portfolioProjects || [];

function renderWork() {
	const grid = document.querySelector('.project-grid');

	if (!grid) {
		return;
	}

	projects.forEach((project) => {
		const item = document.createElement('li');
		const link = document.createElement('a');
		const image = document.createElement('img');
		const title = document.createElement('span');

		link.href = `project.html?slug=${encodeURIComponent(project.slug)}`;
		image.src = project.thumbnail;
		image.alt = project.title;
		image.loading = 'lazy';
		title.className = 'project-hover-title';
		title.textContent = project.title;
		link.append(image);
		link.append(title);
		item.append(link);
		grid.append(item);
	});
}

function renderProject() {
	const page = document.querySelector('[data-page="project"]');
	const slug = new URLSearchParams(window.location.search).get('slug');
	const project = projects.find((item) => item.slug === slug);

	if (!page || !project) {
		return;
	}

	document.title = `Virginia Mazzeo | ${project.title}`;
	page.querySelector('.project-title').textContent = project.title;
	page.querySelector('.project-info-title').textContent = project.title;
	page.querySelector('.project-category').textContent = project.category;
	page.querySelector('.project-year').textContent = project.year;
	page.querySelector('.project-credits').textContent = project.credits;

	const infoToggle = page.querySelector('.project-info-toggle');
	const infoPanel = page.querySelector('.project-info-panel');
	const infoIcon = page.querySelector('.project-info-icon');

	const syncToggleState = () => {
		const isOpen = infoToggle.getAttribute('aria-expanded') === 'true';
		infoToggle.classList.toggle('is-open', isOpen);
	};

	infoToggle.addEventListener('click', () => {
		const isOpen = infoToggle.getAttribute('aria-expanded') === 'true';
		const nextState = !isOpen;
		infoToggle.setAttribute('aria-expanded', String(nextState));
		syncToggleState();

		if (isOpen) {
			infoPanel.setAttribute('hidden', '');
			return;
		}

		infoPanel.removeAttribute('hidden');
		infoPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
	});

	syncToggleState();

	project.gallery.forEach((imagePath) => {
		const image = document.createElement('img');
		image.src = imagePath;
		image.alt = project.title;
		image.loading = 'lazy';
		page.querySelector('.project-gallery').append(image);
	});
}

renderWork();
renderProject();
