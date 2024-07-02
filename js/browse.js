
const menuButtons = ["Browse", "Edit"];
let activeTab = 0;
let tabsHtml = "";

// Function to handle tab button clicks
function handleTabClick(index) {
    activeTab = index; // Set the clicked tab as active
    updateTabs(); // Update the tab buttons with new active state
}
// Function to update the tab buttons based on activeTab
function updateTabs() {
    tabsHtml = "";
    for (let index = 0; index < menuButtons.length; index++) {
        tabsHtml += `<button style="background-color: transparent" type="button" onclick="handleTabClick(${index})" class="${activeTab === index ? 'text-white' : 'text-gray-500'} border-none text-xl mr-1 font-bold underline">${menuButtons[index]}</button>`;
    }
    document.getElementById("tabs").innerHTML = tabsHtml;
}
// Initial rendering of tabs
updateTabs();
document.getElementById("tabs").innerHTML = tabsHtml;


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("web-content").innerHTML = '<div class="flex w-full flex-wrap items-center justify-center h-full" id="main-content"><p class="text-primary text-sm p-4">Select an item on the left or type above to search.</p></div>';
    let wavesurfer = null;
    let playerTime = document.getElementById('player-time');
    let playControl = document.getElementById('play');
    let replayControl = document.getElementById('replay');
    let volumeControl = document.getElementById('volume');
    let rangeControl = document.getElementById('player-range');










    // Sample directory data (nested structure with folders and files)
    const directoryData = [
        {
            name: "Impact",
            type: "folder",
            children: [
                { name: "PM_Impact 01 Strong.wav", type: "file", track: "Impacts/PM_Impact 01 Strong.png" },
                { name: "PM_Impact 02 Quick.wav", type: "file", track: "Impacts/PM_Impact 02 Quick.png" },
                { name: "PM_Impact 03 Epic.wav", type: "file", track: "Impacts/PM_Impact 03 Epic.png" },
                { name: "PM_Impact 04 Stutter.wav", type: "file", track: "Impacts/PM_Impact 04 Stutter.png" },
                { name: "PM_Impact 05 Stutter Boom.wav", type: "file", track: "Impacts/PM_Impact 05 Stutter Boom.png" }
            ]
        },
        {
            name: "Random",
            type: "folder",
            children: [
                { name: "PM_Bonus 01 Lion Roar.wav", type: "file", track: "Random/PM_Bonus 01 Lion Roar.png" },
                { name: "PM_Bonus 02 Crowd Cheer.wav", type: "file", track: "Random/PM_Bonus 02 Crowd Cheer.png" }
            ]
        },
        {
            name: "Risers",
            type: "folder",
            children: [
                { name: "PM_Riser 01 Quick.wav", type: "file", track: "Risers/PM_Riser 01 Quick.png" },
                { name: "PM_Riser 02 Long.wav", type: "file", track: "Risers/PM_Riser 02 Long.png" },
                { name: "PM_Riser 03 Deep.wav", type: "file", track: "Risers/PM_Riser 03 Deep.png" }
            ]
        },
        {
            name: "Whooshes",
            type: "folder",
            children: [
                { name: "PM_Whoosh 01 Deep.wav", type: "file", track: "Whooshes/PM_Whoosh 01 Deep.png" },
                { name: "PM_Whoosh 02 Shallow.wav", type: "file", track: "Whooshes/PM_Whoosh 02 Shallow.png" },
                { name: "PM_Whoosh 03 Airy.wav", type: "file", track: "Whooshes/PM_Whoosh 03 Airy.png" },
                { name: "PM_Whoosh 04 Middle.wav", type: "file", track: "Whooshes/PM_Whoosh 04 Middle.png" },
                { name: "PM_Whoosh 05 Textured.wav", type: "file", track: "Whooshes/PM_Whoosh 05 Textured.png" }
            ]
        }
    ];
    // Get the container where cards will be appended
    const container = document.getElementById('main-content');
 // Function to populate the directory sidebar
function populateDirectory(data, parentElement) {
    data.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.name;
        li.classList.add('directory-item');

        if (item.type === 'folder' && item.children) {
            const ul = document.createElement('ul');
            ul.style.display = 'none'; // Initially hide subfolders
            li.appendChild(ul);

            // Event listener for folders to toggle visibility of subfolders
            li.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent parent folders from collapsing

                const contentArea = document.getElementById('main-content');
                contentArea.classList.add('justify-start', 'p-1', 'items-start');
                contentArea.style.height = "auto";
                contentArea.innerHTML = '';

                // Display each file name
                item.children.forEach((child, _id) => { // Adjusted here
                    contentArea.innerHTML += `<div class="w-full sm:w-1/2 lg:w-1/3" style="padding:0 5px">
                        <div class="card voice-card" style="margin: 4px 0">
                            <div class="wave-form" data-audio-file="Media/${child.name}">
                                <img class="w-full" style="cursor: pointer; max-height: 100px" src="./../Media/${child.track}" />
                            </div>
                            <div class="voice-card-content">
                                <div class="voice-card-content-det">
                                    <div class="voice-det">
                                        <div class="image_cover" style="padding:0 3px; border: 1px solid #01E0B9; height: 24px;">
                                            <img src="images/audio-wave.png" alt="" class="img" style="height: 100%;">
                                        </div>
                                        <span class="text-sm">${child.name}</span>
                                    </div>
                                    <button type="button" class="bg-transparent border-none star-icon add-to-favorites" data-folder="${item.name}" data-child-folder="${item.name}" onclick="toggleFavorite(${_id})" data-files="Media/${child.name}">
                                        <i class="fa-solid fa-star"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>`;
                });

                if (ul.style.display === 'none') {
                    ul.style.display = 'block';
                } else {
                    ul.style.display = 'none';
                }
            });

            // Recursively populate subfolders
            populateDirectory(item.children, ul);
        } else if (item.type === 'file') {
            // Display files directly without further action
            li.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent files from triggering further actions
                displayFileDetails(item); // Example function to handle file details display
            });
        }

        parentElement.appendChild(li);
    });
}
    // Example function to display file details
    function displayFileDetails(file) {
        console.log('Clicked file:', file.name);
    }
    // Function to display details of selected directory item
    function displayDirectoryDetails(item) {
        const contentArea = document.querySelector('.content');
        contentArea.innerHTML = `<h2>${item.name}</h2><p>Type: ${item.type}</p>`;
    }


    // Function to handle search input
    function handleSearch() {
        const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
        const directoryItems = document.querySelectorAll('.directory-item');

        directoryItems.forEach(item => {
            const itemName = item.textContent.toLowerCase();
            if (itemName.includes(searchTerm)) {
                // Highlight the matched text
                const regex = new RegExp(searchTerm, 'gi');
                item.classList.display = 'block'; // Show the item
                item.style.display = 'block'; // Show the item
                item.classList.add('bg-gray-100');
            } else {
                item.style.display = 'none'; // Hide the item if it doesn't match
            }
        });
    }

    // Initialize the directory
    const directoryContainer = document.getElementById('directory');
    populateDirectory(directoryData, directoryContainer);

    // Attach event listener to search input
    document.getElementById('searchInput').addEventListener('input', handleSearch);





    document.querySelectorAll('.wave-form').forEach(waveform => {
        const audioFile = waveform.getAttribute('data-audio-file');
        const wavesurfer = WaveSurfer.create({
            container: waveform,
            waveColor: '#ffffffce',
            progressColor: '#383351',
            height: 110,
            barWidth: 4,
            responsive: true,
            barRadius: 4,
            url: audioFile,
        });

        // wavesurfer.on('interaction', () => {
        //     wavesurfer.play();
        // });
    });
    if (playControl && replayControl && volumeControl && rangeControl) {
        document.querySelectorAll(".voice-card").forEach(function (voiceCard) {
            voiceCard.addEventListener("click", function () {
                // get the audio file from .voice-card> .wave-form
                let audioFile_play = voiceCard.querySelector(".wave-form").getAttribute("data-audio-file");

                // form-wave
                let form_wave = document.querySelector(".form-wave");

                // remove data-audio-file from form_wave
                form_wave.removeAttribute("data-audio-file");
                form_wave.innerHTML = '';

                form_wave.setAttribute("data-audio-file", audioFile_play);

                // debug the files are ready to play or not
                // console.log('audio file ready to play');

                if (wavesurfer) {
                    wavesurfer.destroy();
                }

                wavesurfer = WaveSurfer.create({
                    container: form_wave,
                    waveColor: '#ffffffce',
                    progressColor: '#383351',
                    height: 90,
                    barWidth: 4,
                    responsive: true,
                    barRadius: 4,
                    url: audioFile_play,
                });

                wavesurfer.on('ready', function () {
                    // Get the duration of the audio file
                    let duration = wavesurfer.getDuration();

                    // Format the duration to HH:MM:SS
                    let formattedDuration = new Date(duration * 1000).toISOString().substr(11, 8);

                    // Set the formatted duration to the player-time element
                    playerTime.innerText = formattedDuration;

                    // Reset range control
                    rangeControl.value = 0;
                });

                wavesurfer.on('audioprocess', function () {
                    let currentTime = wavesurfer.getCurrentTime();
                    let duration = wavesurfer.getDuration();
                    let remainingTime = duration - currentTime;
                    let formattedTime = new Date(remainingTime * 1000).toISOString().substr(11, 8);
                    playerTime.innerText = formattedTime;

                    // Update range input
                    rangeControl.value = currentTime / duration;
                });

                wavesurfer.on('seek', function () {
                    let currentTime = wavesurfer.getCurrentTime();
                    let duration = wavesurfer.getDuration();
                    let remainingTime = duration - currentTime;
                    let formattedTime = new Date(remainingTime * 1000).toISOString().substr(11, 8);
                    playerTime.innerText = formattedTime;
                });

                wavesurfer.on('finish', function () {
                    // Reset play button to 'play' icon
                    playControl.querySelector('i').classList.remove('fa-pause');
                    playControl.querySelector('i').classList.add('fa-play');
                });

                // Show the player
                let player = document.getElementById('player');

                // Ensure the player's right style is set to 0 initially if it doesn't exist
                if (player) {
                    if (!player.style.display) {
                        player.style.display = 'block';
                    }
                    if (player.style.block === 'block') {
                        player.style.block = 'none';
                    }
                }
            });
        });

        playControl.addEventListener('click', function () {
            if (wavesurfer) {
                wavesurfer.playPause();
                this.querySelector('i').classList.toggle('fa-play');
                this.querySelector('i').classList.toggle('fa-pause');
            }
        });

        replayControl.addEventListener('click', function () {
            if (wavesurfer) {
                wavesurfer.seekTo(0);
                wavesurfer.play();
                playControl.querySelector('i').classList.remove('fa-play');
                playControl.querySelector('i').classList.add('fa-pause');
            }
        });

        volumeControl.addEventListener('click', function () {
            if (wavesurfer) {
                let currentVolume = wavesurfer.getVolume();
                let newVolume = currentVolume === 0 ? 1 : 0;
                wavesurfer.setVolume(newVolume);
                this.querySelector('i').classList.toggle('fa-volume-high');
                this.querySelector('i').classList.toggle('fa-volume-mute');
            }
        });

        rangeControl.addEventListener('input', function () {
            if (wavesurfer) {
                let seekTo = this.value * wavesurfer.getDuration();
                wavesurfer.seekTo(seekTo / wavesurfer.getDuration());
            }
        });
    }
    // Function to handle the toggle favorite action
function toggleFavorite(_id) {
    const button = event.currentTarget;
    const audioFileName = button.getAttribute('data-files'); // Retrieve audio file name from data-files attribute

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Check if the item already exists in favorites
    const index = favorites.findIndex(favorite => favorite.files === audioFileName);

    if (index !== -1) {
        // Item exists, remove it from favorites
        favorites.splice(index, 1);
        button.querySelector('i').style.color = ''; // Reset star color
        console.log('Removed from favorites:', { files: audioFileName });
    } else {
        // Item doesn't exist, add it to favorites
        favorites.push({ files: audioFileName });
        button.querySelector('i').style.color = '#EA8E37'; // Set star color
        console.log('Added to favorites:', { files: audioFileName });
    }

    // Save updated favorites to localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Initialize favorites functionality
function initializeFavorites() {
    // Delegate click event listener to #main-content for .add-to-favorites buttons
    document.getElementById('main-content').addEventListener('click', function (event) {
        if (event.target.classList.contains('add-to-favorites')) {
            toggleFavorite(event.target.dataset._id); // Pass the _id from dataset
        }
    });

    // Set initial star color based on existing favorites
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    document.querySelectorAll('.add-to-favorites').forEach(button => {
        const files = button.getAttribute('data-files');

        // Check if the current item exists in favorites
        const exists = favorites.some(favorite => (
            JSON.stringify(favorite.files) === JSON.stringify(files)
        ));

        if (exists) {
            button.querySelector('i').style.color = '#EA8E37'; // Set star color
        } else {
            button.querySelector('i').style.color = ''; // Reset star color
        }
    });
}
        
    initializeFavorites();
});