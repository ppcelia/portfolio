// ==============================
// 圖片放大功能（Modal / Lightbox）
// 單張圖片 + 多張 Gallery
// ==============================

const modal = document.getElementById("imageModal");

if (modal) {
    const modalImage = modal.querySelector(".image-modal-img");
    const closeButton = modal.querySelector(".image-modal-close");
    const prevButton = modal.querySelector(".image-modal-prev");
    const nextButton = modal.querySelector(".image-modal-next");
    const counter = modal.querySelector(".image-modal-counter");

    const openButtons = document.querySelectorAll(".image-open");

    let currentImages = [];
    let currentIndex = 0;


    // 顯示目前圖片
    function showImage() {
        if (!currentImages.length) return;

        modalImage.src = currentImages[currentIndex];

        if (counter) {
            if (currentImages.length > 1) {
                counter.textContent =
                    `${currentIndex + 1} / ${currentImages.length}`;
                counter.style.display = "block";
            } else {
                counter.style.display = "none";
            }
        }

        if (prevButton && nextButton) {
            if (currentImages.length > 1) {
                prevButton.style.display = "block";
                nextButton.style.display = "block";
            } else {
                prevButton.style.display = "none";
                nextButton.style.display = "none";
            }
        }
    }


    // 點作品後開啟圖片
    openButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const thumbnail = button.querySelector("img");

            modalImage.alt = thumbnail ? thumbnail.alt : "";

            // 多張圖片
            if (button.dataset.images) {
                currentImages = button.dataset.images
                    .split(",")
                    .map((image) => image.trim())
                    .filter((image) => image !== "");

            // 單張圖片
            } else if (button.dataset.image) {
                currentImages = [button.dataset.image];

            } else {
                return;
            }

            currentIndex = 0;

            showImage();

            modal.classList.add("is-open");
            modal.setAttribute("aria-hidden", "false");
            document.body.classList.add("modal-open");
        });
    });


    // 上一張
    if (prevButton) {
        prevButton.addEventListener("click", (event) => {
            event.stopPropagation();

            if (currentImages.length <= 1) return;

            currentIndex--;

            if (currentIndex < 0) {
                currentIndex = currentImages.length - 1;
            }

            showImage();
        });
    }


    // 下一張
    if (nextButton) {
        nextButton.addEventListener("click", (event) => {
            event.stopPropagation();

            if (currentImages.length <= 1) return;

            currentIndex++;

            if (currentIndex >= currentImages.length) {
                currentIndex = 0;
            }

            showImage();
        });
    }


    // 關閉 Modal
    function closeModal() {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");

        modalImage.src = "";
        modalImage.alt = "";

        currentImages = [];
        currentIndex = 0;
    }


    // 點右上角 × 關閉
    if (closeButton) {
        closeButton.addEventListener("click", (event) => {
            event.stopPropagation();
            closeModal();
        });
    }


    // 點黑色背景關閉
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });


    // 鍵盤操作
    document.addEventListener("keydown", (event) => {
        if (!modal.classList.contains("is-open")) return;

        // Esc 關閉
        if (event.key === "Escape") {
            closeModal();
        }

        // ← 上一張
        if (
            event.key === "ArrowLeft" &&
            currentImages.length > 1
        ) {
            currentIndex--;

            if (currentIndex < 0) {
                currentIndex = currentImages.length - 1;
            }

            showImage();
        }

        // → 下一張
        if (
            event.key === "ArrowRight" &&
            currentImages.length > 1
        ) {
            currentIndex++;

            if (currentIndex >= currentImages.length) {
                currentIndex = 0;
            }

            showImage();
        }
    });
}



// ==============================
// Header 滑動顯示／隱藏功能
// 往下滑：隱藏
// 往上滑：顯示
// 回到最上面：保持顯示
// ==============================

const header = document.querySelector("header");

if (header) {
    let lastScrollPosition = window.scrollY;

    window.addEventListener("scroll", () => {
        const currentScrollPosition = window.scrollY;

        // 回到頁面最上方時，Header 一定顯示
        if (currentScrollPosition < 20) {
            header.classList.remove("hide");
            lastScrollPosition = currentScrollPosition;
            return;
        }

        // 往下滑
        if (currentScrollPosition > lastScrollPosition) {
            header.classList.add("hide");
        }

        // 往上滑
        else {
            header.classList.remove("hide");
        }

        lastScrollPosition = currentScrollPosition;
    });
}



// ==============================
// Video Hover 播放功能
// 滑鼠移入：播放
// 滑鼠移出：暫停並回到開頭
// ==============================

document.querySelectorAll(".item video").forEach((video) => {

    video.addEventListener("mouseenter", () => {
        video.play();
    });

    video.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;
    });

});

const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

menuToggle.addEventListener("click", () => {
    menu.classList.toggle("open");
});

const menuLinks = document.querySelectorAll(".menu a");

menuLinks.forEach(link => {
    link.addEventListener("click", () => {
        menu.classList.remove("open");
    });
});