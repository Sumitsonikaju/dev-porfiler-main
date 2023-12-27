// https://api.github.com/users/ABHCH

const searchInput = document.querySelector(".user_name");
const userImage = document.querySelector(".user-image");
const userName = document.querySelector(".user-name");
const userId = document.querySelector(".user-id");
const userBio = document.querySelector(".user-bio");
const userFollower = document.querySelector(".follower");
const userfollowing = document.querySelector(".following");
const userLocation = document.querySelector(".user-location");
const searchContainer = document.querySelector(".container");
const resultContainer = document.querySelector(".main");
const line = document.querySelector(".developer-name");
const repContainer = document.querySelector(".repo");

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    fetch(`https://api.github.com/users/${searchInput.value}`)
      .then((res) => res.json())
      .then((data) => displayData(data));
    fetch(`https://api.github.com/users/${searchInput.value}/repos`)
      .then((res) => res.json())
      .then((data1) => displayRepo(data1));
    searchContainer.style.display = "none";
    line.style.display = "none";
    resultContainer.style.display = "block";
  }
});

const displayData = (data) => {
  userImage.src = data.avatar_url;
  const { name, login, location, bio, followers, following } = data;
  userName.textContent = name;
  userId.textContent = login;
  userLocation.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${location}`;
  userBio.textContent = bio;
  userFollower.innerHTML = `<i class="fa-solid fa-user-group"></i>  ${followers} followers`;
  userfollowing.textContent = `. ${following} following`;
};

const displayRepo = (data1) => {
  data1.forEach((repo) => {
    console.log(repo);
    const html = `<div class="repo-1">
        <div class="repo-info">
            <div class="repo-name">${repo.name}</div>
            <div class="visible">${repo.visibility}</div>
        </div>
        <div class="repo-bio">${repo.description}</div>
        <div class="repo-tec">
            <div class="repo-prog">${repo.language}</div>
            <div class="repo-start">${repo.stargazers_count}</div>
            <a href="${repo.html_url}" target="__blank"> <button class="check-repo">click</button></a>
        </div>
    </div> `;

    repContainer.insertAdjacentHTML("beforeend", html);
  });
};
