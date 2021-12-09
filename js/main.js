const form = document.querySelector('form')
const section = document.querySelector('section')

function handleSearch(e) {
  e.preventDefault()

  if(e.target[0].value === null || e.target[0].value === undefined || e.target[0].value.length === 0) {
    return alert('Type a Github username first')
  }

  const username = e.target[0].value.trim()

  section.innerHTML = `<p class='message'>Loading...</p>`

  fetch(`https://api.github.com/users/${username}`)
    .then(res => res.json())
    .then(data => {
      if(data.message && data.message === 'Not Found') {
        return section.innerHTML = `<p class="message">User not found!</p>`
      }

      const {
        login: name,
        created_at: joined,
        avatar_url: user_img,
        bio,
        html_url: github_link,
        twitter_username: twitter,
        public_repos: repos,
        followers,
        following,
        location,
        blog
      } = data

      return section.innerHTML = `
        <div>
          <div>
            <div class="img-box">
              <img src="${user_img}" alt="User image">
            </div>
            <div class="user-info">
              <div class="user-info-box">
                <div>
                  <h2>${name}</h2>
                  ${twitter ? `<p>@${twitter}</p>` : `<p>Twitter not available</p>`}
                </div>
                <div>
                  <p>Joined ${new Intl.DateTimeFormat('pt-BR').format(new Date(joined))}</p>
                </div>
              </div>
              <div class="bio-box">
                <p class="bio">${bio ? bio : 'No bio available'}</p>
              </div>
            </div>
          </div>
          <div class="infos">
            <table>
              <thead>
                <tr>
                  <th>Repos</th>
                  <th>Followers</th>
                  <th>Following</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${repos}</td>
                  <td>${followers}</td>
                  <td>${following}</td>
                </tr>
              </tbody>
            </table>
            <div class="links-info">
              <div>
                <p><i class="fas fa-map-marker-alt"></i> ${location ? location : 'Not available'}</p>
                <p><i class="fas fa-link"></i> ${blog ? `<a target="_blank" href="${blog}">Blog</a>` : `<span>Not available</span>`}</p>
              </div>
              <div>
                <p><i class="fab fa-twitter"></i> ${twitter ? `@${twitter}` : 'Not available'}</p>
                <p><i class="fab fa-github"></i> <a target="_blank" href="${github_link}">Github</a></p>
              </div>
            </div>
          </div>
        </div>
      `
    })
    .catch(err => console.log(err))
}

form.addEventListener('submit', handleSearch)
