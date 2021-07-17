import React from 'react'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

function ProfileSidebar(props) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function JJProfileRelationBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {propriedades.title} ({propriedades.items.length})
      </h2>
      <ul>
        {propriedades.items.slice(0, 6).map((itemAtual) => {
          return (
            <li key={itemAtual.id}>
              <a href={itemAtual.link_url} key={itemAtual}>
                <img src={itemAtual.img_url} />
                <span>{itemAtual.caption}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

function ProfileFollowers(props) {
  return (
    <JJProfileRelationBox title={props.title} items={props.items.map(
      function (s) {
        return {
          id: s.id,
          link_url: `https://github.com/${s.login}`,
          img_url: `https://github.com/${s.login}.png`,
          caption: s.login
        }
      })}
    />
  )
}

function ProfileCommunities(props) {
  return (
    <JJProfileRelationBox title={props.title} items={props.items.map(
      function (c) {
        return {
          id: c.id,
          link_url: 'http://www.google.com',
          img_url: c.image,
          caption: c.title
        }
      })}
    />
  )
}

function ProfileCommunityPeople(props) {
  return (
    <JJProfileRelationBox title={props.title} items={props.items.map(
      function (s) {
        return {
          id: s,
          link_url: `https://github.com/${s}`,
          img_url: `https://github.com/${s}.png`,
          caption: s
        }
      }
    )} />
  )
}

export default function Home() {
  const githubUser = 'janaite';
  const [comunidades, setComunidades] = React.useState([{
    id: 12313131313,
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);

  const pessoasFavoritas = [
    'giselli',
    'peas',
    'omariosouto',
    'juunegreiros',
    'marcobrunodev',
    'rafaballerini'
  ]

  const [seguidores, setSeguidores] = React.useState([]);

  React.useEffect(function () {
    fetch('https://api.github.com/users/janaite/followers')
      .then(function (respostaDoServidor) {
        return respostaDoServidor.json();
      })
      .then(function (respostaCompleta) {
        setSeguidores(respostaCompleta);
      })
  }, []) // empty array means run once

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        {/* <div style="grid-area: profileArea;"> */}
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem-vindo(a)
            </h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);

              const comunidade = {
                id: new Date().toISOString,
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image')
              }
              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas);
            }}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua counidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
                <button>
                  Criar comunidade
                </button>
              </div>
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileFollowers title="Seguidores" items={seguidores} />
          <ProfileCommunities title="Comunidades" items={comunidades} />
          <ProfileCommunityPeople title="Pessoas da Comunidade" items={pessoasFavoritas} />
        </div>
      </MainGrid>
    </>
  )
}
