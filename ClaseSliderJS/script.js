const videos = [
    {
        id: "TbzrOz8HbFM",
    },
    {
        id: "MO7Iqx6j0_M",
    },
    {
        id: "66ky3Dopcq0",
    },
    {
        id: "08f8_eHrarU",
    },
    {
        id: "Sfnu5OmAITA",
    },
    {
        id: "8d2PfwMBoc4"
    }
];

const bPrev = document.querySelector('#prev');
const bNext = document.querySelector('#next');
const currentVideo = document.querySelector('#currentVideo');
const thumbnails = document.querySelector('#thumbnails');

let current = 0;

function renderCurrentVideo(id) {
    currentVideo.innerHTML = `
    <iframe width="100%" height="685" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    `
}

renderCurrentVideo(videos[current].id);

bNext.addEventListener('click', (e) => {
    let changed = current
    if (current + 1 < videos.length) {
        current++;
    }
    else {
        current = current;
    }
    if (current !== changed) {
        renderCurrentVideo(videos[current].id)
    }
    console.log("current: " + current);
    console.log("changed: " + changed);
})

bPrev.addEventListener('click', (e) => {
    let changed = current;
    if (current - 1 >= 0) {
        current = current - 1;
    } else {
        current = videos.length;
    }
    if (current !== changed) {
        renderCurrentVideo(videos[current].id)
    }
})

function renderThumbs() {
    let html = "";

    for (let index = 0; index < videos.length; index++) {
        const video = videos[index];
        html += `<div class="thumb" data-id="${index}">
        <img src="https://i3.ytimg.com/vi/${video.id}/mqdefault.jpg" />
    </div>`;
    }

    const thumbnailsContainer = document.getElementById("thumbnails");
    thumbnailsContainer.innerHTML = html;
}

renderThumbs();