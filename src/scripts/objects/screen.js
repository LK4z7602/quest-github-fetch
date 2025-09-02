const screen = {
  userProfile: document.querySelector(".profile-data"),
  renderUser(userData) {
    this.userProfile.innerHTML = `    <div class="info">
                            <img src="${
                              userData.avatarUrl
                            }" alt="Foto de perfil do user"/>
                            <div class="data">
                                <h1>${
                                  userData.name ??
                                  "Não possui nome cadastrado 😅"
                                }</h1>
                                <p>${
                                  userData.bio ?? "Não possui bio cadastrada 😅"
                                }</p>
                              <div class="follow-container">
                                <div class="follow followers">
                                  <h3>👥 Followers</h3>
                                  <p>${userData.followers}</p>
                                </div>
                                <div class="follow following">
                                  <h3>👥 Following</h3>
                                  <p>${userData.following}</p>
                                </div>
                              </div>

                            </div>
                        </div>`;

    let reposItens = "";
    userData.repos.forEach((repo) => {
      let repoItem = `
      <li>
        <a href="${repo.html_url}" target="_blank">
          ${repo.name}
          <br>
            <div class="repo-info">
              <p>🍴${repo.forks_count}</p>
              <p>⭐${repo.stargazers_count}</p>
              <p>👀${repo.watchers_count}</p>
              <p>💻${repo.language ?? "Sem Linguagem"}</p>
            </div>
        </a>
      </li>
      `;

      reposItens += repoItem;
    });

    let eventsItens = ""
    userData.events.forEach((evento) => {{
      let commitMessage = ""

      if(evento.type !== "PushEvent"){
        commitMessage = "Sem mensagem de commit"
      }else{
        commitMessage = evento.payload.commits[0].message
      }

      let eventText = `<strong>${evento.repo.name}</strong>: ${commitMessage}`

      let eventItem = `
      <li>
        <p>${eventText}</p>
      </li>
      `;

      eventsItens += eventItem
    }})

    if (userData.repos.length > 0) {
      this.userProfile.innerHTML += `<div class="repositories section">
        <h2>Repositórios</h2>
        <ul>${reposItens}</ul>
        </div>`;
    }

    if(userData.events.length > 0){
      this.userProfile.innerHTML += `<div class="events section">
        <h2>Eventos</h2>
        <ul>${eventsItens}</ul>
        </div>`
    }


  },
  renderNotFound() {
    this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>";
  },
};

export { screen };
