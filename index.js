const http = require('http')
const fs = require('fs')
const porta = 443
const readline = require('readline')

const servidor = http.createServer((req, res) => {
  fs.readFile('pagina.html', (err, arquivo) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write(arquivo)
    res.end()
  })

  fs.appendFile('texto.txt', 'Ao iniciar os trabalhos com Node.js, rapidamente nota-se que mesmo o mais simples dos códigos acaba viabilizando muitas funcionalidades. Mesmo que você seja iniciante, com poucas linhas de código conseguirá criar aplicações de troca de mensagens entre clientes e servidor, como o exemplo mais clássico de aplicações em tempo real, um chat.', err => {
    if (err) throw err
    console.log('Arquivo criado!')
    res.end()
  })

  async function readFileByLine(file) {
    const fileStream = fs.createReadStream(file);
    const rl = await readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    for await (const line of rl) {
      console.log(line);
    }
  }

  readFileByLine('texto.txt');

})

servidor.listen(porta, () => { console.log('Servidor rodando') })




