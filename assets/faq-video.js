
function showPopup(dataVideoUrl) {
    if (!dataVideoUrl) return;

    const videoCard = document.querySelector(`[data-video-url="${dataVideoUrl}"]`);

    if (videoCard) {
        showVideo(videoCard.dataset.videoUrl);
    } else {
        console.warn(`No video card found for data-video-url: ${dataVideoUrl}`);
    }
}

function showVideo(videoUrl) {
    const popup = document.getElementById('popup');
    const videoContainer = document.getElementById('videoContainer');

    videoContainer.innerHTML = '';

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoUrl}`;
    iframe.className = 'js-youtube';
    iframe.allow = 'autoplay; encrypted-media';
    iframe.allowFullscreen = true;

    videoContainer.appendChild(iframe);

    popup.style.display = 'block';
    popup.style.position = 'fixed';
}

function closePopup() {
    const popup = document.getElementById('popup');
    const iframe = document.querySelector('#videoContainer iframe');

    if (iframe) {
        iframe.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
    }

    if (popup) {
        document.getElementById('videoContainer').innerHTML = '';
        popup.style.display = 'none';
    }
}
