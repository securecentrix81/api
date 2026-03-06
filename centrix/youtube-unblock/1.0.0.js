document.addEventListener('click', (e) => {
  const origin = e.target.closest('a');
  if (origin && origin.href) {
    const url = new URL(origin.href);
    if (url.hostname.includes('youtube.com')) {
      e.preventDefault();
      location.href = "https://securecentrix81.github.io/youtube-viewer/viewer?v="+new URLSearchParams(url.search).get("v")
    }
  }
}, true);

// Intercept window.open
const originalOpen = window.open;
window.open = function(url, ...args) {
  if (url && url.toString().includes('youtube.com')) {
    location.href = "https://securecentrix81.github.io/youtube-viewer/viewer?v="+new URLSearchParams(url.search).get("v")
    return null;
  }
  return originalOpen.apply(window, [url, ...args]);
};

// Intercept Location changes (History API)
const originalPushState = history.pushState;
history.pushState = function(state, title, url) {
  if (url && url.toString().includes('youtube.com')) {
    location.href = "https://securecentrix81.github.io/youtube-viewer/viewer?v="+new URLSearchParams(url.search).get("v")
    return;
  }
  return originalPushState.apply(history, [state, title, url]);
};

setInterval(() => {
	let n = document.querySelectorAll("[src]")
	for (let element of n) {
		const url = new URL(element.src)
		if (url.hostname.includes('youtube.com')) {
			element.src = "https://securecentrix81.github.io/youtube-viewer/viewer?v="+new URLSearchParams(url.search).get("v")
		}
	}
},100)
