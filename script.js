// Define um objeto chamado B7Validator com métodos relacionados à validação de formulários
let B7Validator = {
    // Função que lida com o envio de formulários
    handleSubmit:(event)=>{
        event.preventDefault(); // Impede o envio padrão do formulário
        let send = true; // Define variavel send como true

        // Obtém todos os elementos de entrada no formulário
        let inputs = form.querySelectorAll('input');

        // Limpa erros de validação anteriores
        B7Validator.clearErrors();

        // Itera sobre os elementos de entrada e verifica sua validade
        for(let i=0;i<inputs.length;i++){
            let input = inputs[i]; // define a variavel input com o input atual
            let check = B7Validator.checkInput(input); // verifica a validade do input atual

            // Se houver erro de validação, define 'send' como false e exibe o erro
            if(check !== true){
                send = false;
                B7Validator.showError(input, check);
            }
        }

        // Se todos os campos forem válidos, envia o formulário
        if(send) {
            form.submit();
        }
    },
    // Função para verificar a validade de um campo de entrada
    checkInput:(input)=> {
        // Obtém as regras de validação definidas no atributo 'data-rules' do elemento de entrada
        let rules = input.getAttribute('data-rules');
        if(rules !== null) {
            // Se as regras não forem nulas, divide as regras em um array com base no caractere '|'
            rules = rules.split('|');
            for(let k in rules) {
                // Divide os detalhes da regra em um array com base no caractere '='
                let rDetails = rules[k].split('=');
    
                // Realiza diferentes verificações com base nas regras fornecidas
                switch(rDetails[0]) {
                    case 'required':
                        // Verifica se o campo é obrigatório e se está vazio
                        if(input.value === '') {
                            return 'Preencha o Campo Obrigatório!';
                        }
                        break;
                    case 'min':
                        // Verifica se o campo deve ter um comprimento mínimo
                        if(input.value.length < rDetails[1]){
                            return 'Pelo menos '+ rDetails[1]+' caracteres são necessários';
                        }
                        break;
                    case 'email':
                        // Verifica se o campo deve conter um endereço de e-mail válido
                        if(input.value !== '') {
                            // Verifica se o valor do campo corresponde a um padrão de e-mail válido
                            let emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
                            if(!emailRegex.test(input.value.toLowerCase())) {
                                return 'Campo de e-mail inválido!';
                            }
                        }
                        break;
                }
            }
        }
    
        return true;
    },
    
// Função para exibir mensagens de erro
showError:(input, error)=> {
    // Muda a borda do elemento de entrada (input) para vermelho (#FF0000) para indicar um erro
    input.style.borderColor = '#FF0000';

    // Cria um elemento HTML <div> para exibir a mensagem de erro
    let errorElement = document.createElement('div');
    // Adiciona a classe 'error' ao elemento div para aplicar estilos de erro
    errorElement.classList.add('error');
    // Define o conteúdo do elemento div com a mensagem de erro fornecida
    errorElement.innerHTML = error;

    // Insere a mensagem de erro antes do elemento de entrada (input) no documento
    input.parentElement.insertBefore(errorElement, input.nextElementSibling);
},
// Função para limpar erros de validação anteriores
clearErrors:() => {
    // Obtém todos os elementos de entrada no formulário
    let inputs = form.querySelectorAll('input');
    // Remove qualquer estilo de borda que indica erro nos elementos de entrada
    for(let i=0;i<inputs.length;i++) {
        inputs[i].style = '';
    }

    // Remove elementos de erro anteriores do documento
    let errorElements = document.querySelectorAll('.error');
    for(let i=0;i<errorElements.length;i++) {
        errorElements[i].remove();
    }
}
};

// Obtém o formulário com a classe 'b7validator' e adiciona um ouvinte de evento para o envio
let form = document.querySelector('.b7validator');
form.addEventListener('submit', B7Validator.handleSubmit);
