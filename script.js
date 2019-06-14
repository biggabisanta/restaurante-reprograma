const container = document.querySelector('#items-cardapio')
fetch(`http://localhost:3000/comidas`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data)

        data.forEach(comida => {
            console.log(comida)

            const mediaItem = document.createElement('div');
            mediaItem.setAttribute('class', 'media mb-4');
            mediaItem.innerHTML = `
            <img src="${comida.image}" alt="${comida.nome}" class="mr-3 img-thumbnail" width="200px">

            <div class="media-body>

                <h5 class="mt-0"><strong>${comida.nome}</strong></h5>
                ${comida.descricao}
              </div>`

            container.appendChild(mediaItem);
            const botaoDelete = document.createElement('button');
            botaoDelete.textContent = "✖ Remover",
            botaoDelete.setAttribute("class", "btn btn-danger")
            botaoDelete.setAttribute("data-id", comida._id)
            mediaItem.appendChild(botaoDelete)

            botaoDelete.addEventListener("click", () => {
                fetch (`http://localhost:3000/comidas/${comida._id}`,{
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            })
        }
        ).then((response) => {
            console.log(response)
            if(response.status === 204){
                window.location.reload()
            } else {

                window.alert("DEUUU ERRO AO DELETAR, Sorry")
            }
        })
    }

    )
    .catch((erro) => {
        console.log(erro)
    })

const botao =
    document.querySelector('#criar_comida_button')
botao.addEventListener('click', criarComida)

function criarComida() {
    const nome =
        document.querySelector('#nome_input').value
    const descricao =
        document.querySelector('#descricao_input').value
    const image =
        document.querySelector('#imagem_input').value
    const comida = {
        nome, descricao, image
    }
    fetch('http://localhost:3000/comidas', {
        method: 'POST',
        body: JSON.stringify(comida),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => console.log("UHUUUUU FOI!"))
}



