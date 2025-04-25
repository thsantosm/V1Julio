import React, { useState } from 'react';

function App() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [historico, setHistorico] = useState([]); // *anotacao* fila de histórico

  function calcularIMC(e) {
    e.preventDefault();

    const p = parseFloat(peso);
    const a = parseFloat(altura);

    if (!p || !a) {
      setMensagem('Preencha peso e altura corretamente.');
      return;
    }

    const imc = p / (a * a);
    const imcFormatado = imc.toFixed(2);
    let classificacao = '';

    if (imc < 19.1) {
      classificacao = 'Abaixo do Peso';
    } else if (imc < 25.8) {
      classificacao = 'Peso Normal';
    } else if (imc < 27.3) {
      classificacao = 'Pouco acima do Peso';
    } else if (imc <= 32.3) {
      classificacao = 'Acima do Peso';
    } else {
      classificacao = 'Obesidade';
    }

    const resultado = `IMC: ${imcFormatado} — ${classificacao}`;
    setMensagem(resultado);

    // *anotacao* adiciona a fila novo histórico
    setHistorico([...historico, resultado]);

    
    setPeso('');
    setAltura('');
  }

  return (
    <div className="App">
      <h1>Calculadora IMC</h1>
      <form onSubmit={calcularIMC}>
        <input
          type="number"
          placeholder="Peso (kg)"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
        />
        <input
          type="number"
          placeholder="Altura (m)"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
        />
        <button type="submit">Calcular</button>
      </form>

      {mensagem && <p>{mensagem}</p>}

      {historico.length > 0 && (
        <div>
          <h2>Histórico</h2>
          <ul>
            {historico.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
