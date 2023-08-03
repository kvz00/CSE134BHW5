class ProjectCard extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(document.getElementById('custom-project-card').content.cloneNode(true));
    }

    connectedCallback() {
        this.shadowRoot.querySelector('h2').textContent = this.getAttribute('data-title');
        this.shadowRoot.querySelector('img').src = this.getAttribute('data-img');
        this.shadowRoot.querySelector('img').alt = this.getAttribute('data-alt');
        this.shadowRoot.querySelector('p').textContent = this.getAttribute('data-description');
        this.shadowRoot.querySelector('a').href = this.getAttribute('data-url');
    }
}

customElements.define('project-card', ProjectCard);
document.getElementById('load-local').addEventListener('click', loadLocal);
document.getElementById('load-remote').addEventListener('click', loadRemote);

let req = new XMLHttpRequest();
requestData = {
    "title": "Project Card",
    "img": "https://source.unsplash.com/random/",
    "alt": "Project Card Image",
    "description" : "This is a cool picture",
    "url": "https://www.google.com"
}
let cannedData = JSON.stringify(requestData);
localStorage.setItem('project', cannedData);

req.onreadystatechange = () => {
  if (req.readyState == XMLHttpRequest.DONE) {
    let response = JSON.parse(req.responseText);
    id = response.metadata.id
  }
};
  
req.open("POST", "https://api.jsonbin.io/v3/b", true);
req.setRequestHeader("Content-Type", "application/json");
req.setRequestHeader("X-Master-Key", "$2b$10$lDRiNmF5.IzUXBqcF9vv2.cIHLFVByK..7IS8w2FXMEFMwGaoxHLK");
req.setRequestHeader("X-Bin-Private", false);
req.send(cannedData);

function loadLocal() {
    const data = localStorage.getItem('project');
    const project = JSON.parse(data);
    createCard(project);
}

async function loadRemote() {
    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            let response = JSON.parse(req.responseText);
            project = response.record
            createCard(project);
        }
    };
    req.open("GET", `https://api.jsonbin.io/v3/b/${id}`, true);
    req.setRequestHeader("X-Master-Key", "$2b$10$lDRiNmF5.IzUXBqcF9vv2.cIHLFVByK..7IS8w2FXMEFMwGaoxHLK");
    req.send();
}

function createCard(project) {
    const card = document.createElement('project-card');
    card.setAttribute('data-title', project.title);
    card.setAttribute('data-img', project.img);
    card.setAttribute('data-alt', project.alt);
    card.setAttribute('data-description', project.description);
    card.setAttribute('data-url', project.url);
    document.querySelector('.cards-container').appendChild(card);
}
  
  
  
  
  
  

  