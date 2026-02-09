const container = document.getElementById("arxiv-papers");

const author = "Ashirbad Padhan";
const maxResults = 5;

const url =
  "https://export.arxiv.org/api/query?" +
  `search_query=au:"${encodeURIComponent(author)}"` +
  "&sortBy=submittedDate&sortOrder=descending" +
  `&max_results=${maxResults}`;

fetch(url)
  .then(res => res.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => {
    const entries = data.getElementsByTagName("entry");
    container.innerHTML = "";

    if (entries.length === 0) {
      container.innerHTML = "<p>No arXiv papers found.</p>";
      return;
    }

    Array.from(entries).forEach((entry, index) => {
      const title = entry.getElementsByTagName("title")[0].textContent.trim();
      const link = entry.getElementsByTagName("id")[0].textContent;
      const published = entry.getElementsByTagName("published")[0]
        .textContent.substring(0, 10);

      const div = document.createElement("div");
      div.className = "paper" + (index === 0 ? " latest" : "");

      div.innerHTML = `
        <a href="${link}" target="_blank">
          <h3>${title}</h3>
          <p>${link.replace("http://arxiv.org/abs/", "arXiv:")} · ${published}</p>
        </a>
      `;

      container.appendChild(div);
    });
  })
  .catch(() => {
    container.innerHTML = "<p>Error loading arXiv papers.</p>";
  });
