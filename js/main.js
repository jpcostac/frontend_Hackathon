const url = ""

function createTurma(){
    let nome_turma = document.getElementById('inputName').value
    let periodo_turma = document.getElementById('inputPeriodo').value
    let id_professor = document.getElementById('inputId').value

    const data={
        nome_turma: nome_turma,
        periodo_turma: periodo_turma,
        id_professor: id_professor
    }

    axios.post(`${url}/aluno`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'

        }
    }).then((response) => {
        alert(response.data.result)
        window.location.href = "http://127.0.0.1:5500/front-hackathon/turmas.html"
    })
    // alert("Turma criada com sucesso")
    // window.location.href = "http://127.0.0.1:5500/front-hackathon/turmas.html"
}

function showTurmas(){
    axios.get(`${url}/curso`).then(
        (response) => {
            const data = response.data.result

            let html= ""

            for(let turma of data){
                html += `<tr>
                <th scope="row">${turma.id_turma}</th>
                <td>${turma.nome_turma}</td>
                <td>${turma.periodo_turma}</td>
                <td>${turma.id_professor}</td>
                <td><button class="btn btn-sucess" onclick="redirectTurma(${turma.id_turma})">Editar</button></td>
                <td><button class="btn btn-sucess" onclick="deleteTurma(${turma.id_turma})">Excluir</button></td>
                </tr>`
            }
        }
    )
}

function redirectTurma(id){
    window.location.href = ""//Ir para a tela de update turma
}

function deleteTurma(id){
    axios.delete(`${url}/aluno/${id}`).then(
        (response) => {
            alert(response.data.result)
            showTurmas()
        }
    ).catch(err => console.error(err))
}

function updateTurma(){
    let nome_turma = document.getElementById('inputName').value
    let periodo_turma = document.getElementById('inputPeriodo').value

    let params = new URLSearchParams(window.location.search)
    let idParams = params.get('id_turma')

    const data = {
        nome_turma: nome_turma,
        periodo_turma: periodo_turma
    }

    axios.put(`${url}/aluno/${idParams}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(
        (response) => {
            alert(response.data.result)
            window.location.href = ""
        }
    ).catch(err => console.error(err))
}

//FIM
//CRUD TURMAS

