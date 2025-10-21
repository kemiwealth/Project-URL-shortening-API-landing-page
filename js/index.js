

// Access token: 331b940285005f90e0a36e6362622a86b61e7765 for bitly

// after user submit
document.getElementById("shortenedBtn").addEventListener("click", async () => {
  const url = document.getElementById("urlInput").value;
  console.log(url);
  const linksContainer = document.getElementById("shortened-links");

  try {
  const response = await fetch('https://api-ssl.bitly.com/v4/shorten', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer 331b940285005f90e0a36e6362622a86b61e7765',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ long_url: url })
  });

  const data = await response.json();
  console.log(data);

  if (data.link) {
    const linkItem = document.createElement("div");
    linkItem.className = "link-item";
    linkItem.innerHTML = `
      <div class="link-text">
        <p>${url}</p>
        <a href="${data.link}" target="_blank">${data.link}</a>
        <button class="copy-btn">Copy</button>
      </div>
    `;

    linksContainer.prepend(linkItem);
    saveLink(url, data.link);

    const copyBtn = linkItem.querySelector(".copy-btn");
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(data.link);
      copyBtn.textContent = "Copied!";
      copyBtn.classList.add("copied");
      setTimeout(() => {
        copyBtn.textContent = "Copy";
        copyBtn.classList.remove("copied");
      }, 2000);
    });
  } else {
    alert("Failed to shorten URL.");
  }
} catch (error) {
  console.error("Error:", error);
  alert("An error occurred.");
}
});

// Load Links When DOM is refreshed
document.addEventListener("DOMContentLoaded", () => {
  loadLinks();
});

function saveLink(originalUrl, shortUrl) {
  const storedLinks = JSON.parse(localStorage.getItem("shortLinks")) || [];

  storedLinks.push({ originalUrl, shortUrl });

  localStorage.setItem("shortLinks", JSON.stringify(storedLinks));

  // Set a timer to remove after 60 seconds
  setTimeout(() => {
    removeLink(shortUrl);
  }, 60000); // 60000 ms = 60 seconds
}

function loadLinks() {
  const storedLinks = JSON.parse(localStorage.getItem("shortLinks")) || [];

  storedLinks.forEach((link) => {
    displayLink(link.originalUrl, link.shortUrl);
  });
}

function displayLink(original, shortened) {
  const linksContainer = document.getElementById("shortened-links"); // change to your div id
  const linkItem = document.createElement("div");
  linkItem.className = "link-item";
  linkItem.innerHTML = `
      <div class="link-text">
      <p>${original}</p>
      <a href="${shortened}" target="_blank">${shortened}</a>
      <button class="copy-btn">Copy</button>
        </div>
      `;
  linksContainer.appendChild(linkItem);

  const copyBtn = linkItem.querySelector(".copy-btn");

  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(shortened);
    copyBtn.textContent = "Copied!";
    copyBtn.classList.add("copied");
    setTimeout(() => {
      copyBtn.textContent = "Copy";
      copyBtn.classList.remove("copied");
    }, 2000);
  });
}

function removeLink(shortUrl) {
  let storedLinks = JSON.parse(localStorage.getItem("shortLinks")) || [];

  storedLinks = storedLinks.filter((link) => link.shortUrl !== shortUrl);

  localStorage.setItem("shortLinks", JSON.stringify(storedLinks));

  // Optional: also remove it visually from page
  removeLinkFromDOM(shortUrl);
}

function removeLinkFromDOM(shortUrl) {
  const linkElements = document.querySelectorAll(".link-item"); // assuming you give each link a class
  linkElements.forEach((link) => {
    if (link.querySelector("a")?.href === shortUrl) {
      link.remove();
    }
  });
}
