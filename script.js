const container = document.getElementById("arxiv-papers");

const rssUrl =
  "https://arxiv.org/search/?query=Ashirbad+Padhan" +
  "&searchtype=author" +
  "&order=-announced_date_first" +
  "&size=5" +
  "&format=rss";

fetch(rssUrl)
  .then(res => res.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => {
    const items = data.querySelectorAll("item");
    container.innerHTML = "";

    if (items.length === 0) {
      container.innerHTML = "<p>No arXiv papers found.</p>";
      return;
    }

    items.forEach((item, index) => {
      const title = item.querySelector("title").textContent;
      const link = item.querySelector("link").textContent;
      const date = new Date(
        item.querySelector("pubDate").textContent
      ).toISOString().slice(0, 10);

      const div = document.createElement("div");
      div.className = "paper" + (index === 0 ? " latest" : "");

      div.innerHTML = `
        <a href="${link}" target="_blank">
          <h3>${title}</h3>
          <p>arXiv · ${date}</p>
        </a>
      `;

      container.appendChild(div);
    });
  })
  .catch(() => {
    container.innerHTML =
      "<p>Unable to load arXiv papers at the moment.</p>";
  });
