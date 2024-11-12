/**
 * WEB222 – Assignment 04
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       <Huynh Huy Hoang>
 *      Student ID: <151569233>
 *      Date:       <10/11/2024>
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;
console.log({ artists, songs }, "App Data");

document.addEventListener("DOMContentLoaded", () => {
    console.log("Loading the app..."); // output message when loading

    setupArtistButtons();
    if (artists.length > 0) {
        displaySongs(artists[0].artistId); // Display the first artist’s songs by default
    }
});

function setupArtistButtons() {
    const menu = document.querySelector("#menu"); // find menu in DOM
    console.log("Generating artist buttons..."); // log progress of creating buttons

    // Loop through each artist to create a button and add it to the menu
    artists.forEach(artist => {
        const button = document.createElement("button");
        button.classList.add('artist', 'button');
        button.textContent = artist.name; // Use artist's name as button text

        button.addEventListener('click', () => {
            console.log({ clickArtist: artist }); // log the artist clicked
            displaySongs(artist.artistId); // Display songs for the selected artist
        });

        menu.appendChild(button); // add button to menu
    });
}

function displaySongs(artistId) {
    console.log({ artistId }); // Log the artist ID for debugging

    // Find and display the selected artist's name
    const artist = artists.find(a => a.artistId === artistId);
    if (!artist) {
        console.warn(`Artist with ID ${artistId} not found`);
        return;
    }
    document.querySelector('#select-artist').textContent = artist.name;

    // Display artist's social links
    const socialLinkContainer = document.querySelector('#socialLink');
    socialLinkContainer.innerHTML = ''; // Clear previous links
    artist.urls.forEach(link => {
        const anchor = document.createElement('a');
        anchor.href = link.url;
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";

        const logo = document.createElement('img');
        logo.src = link.logo;
        logo.alt = link.name;
        logo.style.width = "30px";
        logo.style.height = "30px";

        anchor.appendChild(logo); // append the logo image to anchor
        socialLinkContainer.appendChild(anchor); // append anchor to socialLinkContainer
        socialLinkContainer.appendChild(document.createTextNode(' ')); // Space between links
    });

    // Filter and display artist's non-explicit songs
    const songTableBody = document.querySelector('#songs');
    songTableBody.innerHTML = ''; // Clear previous song list

    const artistSongs = songs.filter(song => song.artistId === artistId && !song.explicit);
    if (artistSongs.length === 0) {
        console.warn(`No non-explicit songs found for artist with ID ${artistId}`);
        return;
    }

    artistSongs.forEach(song => {
        const row = document.createElement('tr');
        row.addEventListener('click', () => console.log({ song })); // Log song details on row click

        // Create cells for each song detail
        const titleCell = document.createElement('td');
        const titleLink = document.createElement('a');
        titleLink.href = song.url;
        titleLink.target = "_blank";
        titleLink.rel = "noopener noreferrer";
        titleLink.textContent = song.title;
        titleCell.appendChild(titleLink);

        const albumCell = document.createElement('td');
        albumCell.textContent = song.album;

        const yearCell = document.createElement('td');
        yearCell.textContent = song.year;

        const durationCell = document.createElement('td');
        durationCell.textContent = formatDuration(song.duration);

        // Append cells to row, and row to table body
        row.append(titleCell, albumCell, yearCell, durationCell);
        songTableBody.appendChild(row);
    });
}

// Helper function to format song duration as mm:ss
function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = String(seconds % 60).padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
}
