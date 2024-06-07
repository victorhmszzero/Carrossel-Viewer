document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
let currentIndex = 0;
let slides = [];

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione uma imagem.');
        return;
    }

    const img = new Image();
    const reader = new FileReader();

    reader.onload = function(e) {
        img.src = e.target.result;
    }

    reader.readAsDataURL(file);

    img.onload = function() {
        if (img.width < 1080 || img.height < 1350) {
            alert('A imagem deve ter pelo menos 1350px de largura e 1080px de altura.');
            return;
        }

        const carouselContainer = document.getElementById('carousel');
        carouselContainer.innerHTML = ''; // Limpa qualquer imagem anterior

        const widthSegment = 1080;
        const heightSegment = 1350;
        const numSegments = Math.ceil(img.width / widthSegment);

        slides = []; // Reset slides array
        for (let i = 0; i < numSegments; i++) {
            const slide = document.createElement('div');
            slide.className = 'slide';
			slide.classList.add('slide', 'slide--animated');

            const segment = new Image();
            segment.src = img.src;
            segment.style.objectPosition = `-${i * widthSegment}px 0`;
            slide.appendChild(segment);
            carouselContainer.appendChild(slide);
            slides.push(slide);
        }

        document.getElementById('prev').style.display = numSegments > 1 ? 'block' : 'none';
        document.getElementById('next').style.display = numSegments > 1 ? 'block' : 'none';
    }
}

document.getElementById('prev').addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
    updateCarousel();
});

document.getElementById('next').addEventListener('click', () => {
    currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
});

function updateCarousel() {
    const offset = -currentIndex * 1080;
    slides.forEach(slide => {
        slide.style.transform = `translateX(${offset}px)`;
    });
}



const toggleAnimationBtn = document.getElementById('toggleAnimationBtn');

toggleAnimationBtn.addEventListener('click', () => {
    const slides = document.querySelectorAll('.slide');

    slides.forEach(slide => {
        slide.classList.toggle('slide--animated');
    });
});