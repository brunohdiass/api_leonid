'use strict';

async function getMusicas() {
  const url = 'http://localhost:8080/v1/controle-musicas/musica';
  const resposta = await fetch(url);
  const dados = await resposta.json();
  console.log('Resposta da API:', dados);

  // Agora usamos dados.musics
  if (dados && Array.isArray(dados.musics)) {
    exibirMusicas(dados.musics);
  } else {
    console.error("Resposta inesperada. Esperado um array em 'musics'.", dados);
  }
}

async function postMusica(musica) {
    console.log("Enviando dados para o servidor:", musica); // Log dos dados
    const url = 'http://localhost:8080/v1/controle-musicas/musica';
    const opcoes = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(musica),
    };
  
    const resposta = await fetch(url, opcoes);
    const resultado = await resposta.json();
    console.log('Resultado da API:', resultado);
  
    if (resultado.status) {
      getMusicas();
    } else {
      alert('Erro ao cadastrar música: ' + (resultado.message || 'Ver console'));
    }
  }
  

async function deleteMusica(id) {
  const url = `http://localhost:8080/v1/controle-musicas/musica/${id}`;
  const opcoes = { method: 'DELETE' };

  const resposta = await fetch(url, opcoes);
  const resultado = await resposta.json();
  console.log(`Delete ID ${id}:`, resultado);

  if (resultado.status) {
    getMusicas();
  } else {
    alert('Erro ao deletar música: ' + (resultado.message || 'Ver console'));
  }
}

function exibirMusicas(musicas) {
    const lista = document.getElementById('musica-lista');
    lista.innerHTML = '';
  
    musicas.forEach(m => {
      const li = document.createElement('li');
      li.innerHTML = `
        <img src="${m.foto_capa}" alt="Capa de ${m.nome}">
        <div class="info">
          <strong>${m.nome}</strong>
          <span>${m.duracao}</span>
        </div>
        <div class="actions">
          <button onclick="window.open('${m.link}','_blank')">Ouvir ▶️</button>
          <button onclick="deleteMusica(${m.id})">🗑️</button>
        </div>
      `;
      lista.appendChild(li);
    });
  }
  

// Evento de submit do formulário
document.getElementById('form-musica').addEventListener('submit', event => {
  event.preventDefault();

  const musica = {
    nome: document.getElementById('nome').value,
    link: document.getElementById('link').value,
    duracao: document.getElementById('duracao').value,
    data_lancamento: document.getElementById('data_lancamento').value,
    foto_capa: document.getElementById('foto_capa').value,
    letra: document.getElementById('letra').value,
  };

  postMusica(musica);
  event.target.reset();
});

// Carrega tudo ao iniciar
getMusicas();
