document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".slider-container").forEach(slider => {
        const folder = slider.getAttribute("data-folder");
        const count = parseInt(slider.getAttribute("data-count"), 10);
        const images = Array.from({ length: count }, (_, i) => `${folder}${i + 1}.jpg`);
        slider.setAttribute("data-images", JSON.stringify(images));
    });
});

function changeSlide(button, direction) {
    const sliderContainer = button.closest('.slider-container');
    const imageElement = sliderContainer.querySelector('.roomImage');
    const images = JSON.parse(sliderContainer.getAttribute('data-images'));

    let currentSrc = imageElement.src.split('/').pop(); // Получаем только имя файла
    let currentIndex = images.findIndex(img => img.includes(currentSrc)); // Ищем в массиве

    if (currentIndex === -1) currentIndex = 0; // На случай ошибки

    currentIndex = (currentIndex + direction + images.length) % images.length;

    imageElement.style.opacity = 0;
    setTimeout(() => {
        imageElement.src = images[currentIndex];
        imageElement.style.opacity = 1;
    }, 500);
}
