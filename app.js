/**
 * WEB222 – Assignment 06
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       MD ARAFAT KOYES
 *      Student ID: 13368229
 *      Date:       06-08-2024
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.

const { artists, songs } = window;

document.addEventListener("DOMContentLoaded", function () {
  const menu = document.getElementById("menu");
  const artistName = document.getElementById("selected-artist");
  const artistLinks = document.getElementById("artists");
  const cardContainer = document.getElementById("cards");

  function createSongCard(song) {
    const card = document.createElement("div");
    card.classList.add("card");

    const songImg = document.createElement("img");
    songImg.src = song.imageUrl;
    songImg.classList.add("card-image");
    card.appendChild(songImg);

    const songTitle = document.createElement("h2");
    songTitle.innerText = song.title;
    card.appendChild(songTitle);

    const songYear = document.createElement("time");
    songYear.innerText = `Year: ${song.year}`;
    card.appendChild(songYear);

    const songDuration = document.createElement("span");
    songDuration.innerText = `Duration: ${formatTime(song.duration)}`;
    card.appendChild(songDuration);

    songImg.addEventListener("click", () => {
      window.open(song.url, "_blank");
    });

    return card;
  }

  function formatTime(secs) {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  }

  function showSongs(artistId) {
    const artist = artists.find((a) => a.artistId === artistId);
    if (artist) {
      artistName.innerText = artist.name;
      artistLinks.innerHTML = "";
      for (let i = 0; i < artist.urls.length; i++) {
        const link = artist.urls[i];
        artistLinks.innerHTML += `<a href="${link.url}" target="_blank">${link.title}</a>`;
        if (i < artist.urls.length - 1) artistLinks.innerHTML += ", ";
      }

      cardContainer.innerHTML = "";
      for (let i = 0; i < songs.length; i++) {
        if (songs[i].artistId === artistId && !songs[i].explicit) {
          cardContainer.appendChild(createSongCard(songs[i]));
        }
      }
    }
  }

  for (let i = 0; i < artists.length; i++) {
    const btn = document.createElement("button");
    btn.innerText = artists[i].name;
    btn.onclick = (
      (id) => () =>
        showSongs(id)
    )(artists[i].artistId);
    menu.appendChild(btn);
  }

  // Show songs for the first artist by default
  if (artists.length > 0) {
    showSongs(artists[0].artistId);
  }
});
