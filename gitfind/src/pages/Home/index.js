import { useState } from 'react';
import { Header } from '../../components/Header';
import background from '../../assets/background.png';
import ItemList from '../../components/ItemList';
import './styles.css';

function App() {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState([]);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if (newUser.name) {
      const { avatar_url, name, bio, login } = newUser;
      setCurrentUser({ avatar_url, name, bio, login });

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();

      if (Array.isArray(newRepos)) {
        setRepos(newRepos);
      }
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="conteudo">
        <img src={background} className="background" alt="background app" />
        <div className="info">
          <div className='all-center'>
            <input
              name="usuario"
              value={user}
              onChange={(event) => setUser(event.target.value)}
              placeholder="@username"
            />
            <button className="btn" onClick={handleGetData}>
              Buscar
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="icon-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </button>
          </div>

          <div className="container-stats all-center">
            {currentUser?.name ? (
              <div className="flex-desktop">
                <div className="perfil">
                  <img src={currentUser.avatar_url} className="profile" alt="profile img" />
                  <div>
                    <h3>{currentUser.name}</h3>
                    <span>@{currentUser.login}</span>
                    <p className="bio">{currentUser.bio}</p>
                  </div>
                </div>
                <div className="adjust-static">
                  <img
                    width="300px"
                    src={`https://github-readme-stats.vercel.app/api?username=${currentUser.login}&show_icons=true&count_private=true&border_radius=10&bg_color=1d2128&text_color=abd1ff&title_color=5ca5ff&icon_color=5ca5ff&hide_border=true`}
                  />
                </div>
              </div>
            ) : null}

            {repos.length ? (
              <div>
                <img
                  height="auto"
                  src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${currentUser.login}&layout=compact&langs_count=16&border_radius=10&bg_color=1d2128&text_color=bfddff&title_color=5ca5ff&icon_color=5ca5ff&hide_border=true`}
                />
              </div>
            ) : null}
          </div>

          {repos.length ? (
            <div>
              <h4 className="repositorio-find all-center">Repositórios ({repos.length})</h4>
            </div>
          ) : (
            <div className="toSearch">
              <h4 className="repositorio">Busque a conta do GitHub informando @ da conta. </h4>
            </div>
          )}

          <div className="scroll-content">
            {repos.map((repo) => (
              <ItemList key={repo.id} title={repo.name} description={repo.description} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
