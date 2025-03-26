document.addEventListener("DOMContentLoaded", () => {
    // Предзагрузка первой фотографии каждого слайдера
    document.querySelectorAll(".slider-container").forEach(slider => {
        const folder = slider.getAttribute("data-folder");
        const count = parseInt(slider.getAttribute("data-count"), 10);
        const images = Array.from({ length: count }, (_, i) => `${folder}${i + 1}.jpg`);
        
        // Кэшируем массив изображений
        slider.dataset.images = JSON.stringify(images);
        
        // Предзагружаем следующее и предыдущее изображение
        const img = new Image();
        img.src = images[1 % count]; // Предзагружаем следующее изображение
    });
});

function changeSlide(button, direction) {
    const sliderContainer = button.closest('.slider-container');
    const imageElement = sliderContainer.querySelector('.roomImage');
    const images = JSON.parse(sliderContainer.dataset.images);
    const count = images.length;

    // Оптимизированное определение текущего индекса
    const currentFilename = imageElement.src.split('/').pop();
    let currentIndex = images.findIndex(img => img.endsWith(currentFilename));
    currentIndex = (currentIndex + direction + count) % count;

    // Быстрая смена без анимации
    imageElement.src = images[currentIndex];

    // Предзагрузка соседних изображений
    const nextIndex = (currentIndex + 1) % count;
    const prevIndex = (currentIndex - 1 + count) % count;
    
    [nextIndex, prevIndex].forEach(idx => {
        const img = new Image();
        img.src = images[idx];
    });

    // Отключаем кнопки на время переключения (опционально)
    button.disabled = true;
    setTimeout(() => button.disabled = false, 300);
}

// Оптимизированная версия scrollToMain
function scrollToMain() {
    const main = document.getElementById("main-content");
    const start = performance.now();
    const duration = 500; // Длительность анимации
    
    const animateScroll = (time) => {
        const elapsed = time - start;
        const progress = Math.min(elapsed / duration, 1);
        const startPos = window.pageYOffset;
        const endPos = main.offsetTop;
        window.scrollTo(0, startPos + (endPos - startPos) * progress);
        
        if (progress < 1) {
            requestAnimationFrame(animateScroll);
        }
    };
    
    requestAnimationFrame(animateScroll);
}