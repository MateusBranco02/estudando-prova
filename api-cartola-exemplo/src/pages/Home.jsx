import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
    const [nomeTime, setNomeTime] = useState('');
    const [jogadoresTime, setJogadoresTime] = useState([]);
    const [clubes, setClubes] = useState({});

    useEffect(() => {
        carregarClubes();
    }, []);

    const carregarClubes = async () => {
        try {
            const urlClubes = 'https://api.cartola.globo.com/clubes';
            const response = await axios.get(urlClubes);
            setClubes(response.data);
        } catch (error) {
            console.error('Erro ao buscar dados dos clubes!', error);
        }
    };

    const carregarJogadores = async () => {
        try {
            // Encontrar o ID do time com base no nome inserido
            const idTime = Object.keys(clubes).find(
                key => clubes[key].nome.toLowerCase() === nomeTime.toLowerCase()
            );

            if (!idTime) {
                alert("Time não encontrado!");
                return;
            }

            // Carregar atletas e filtrar pelo ID do time
            const urlAtletas = 'https://api.cartola.globo.com/atletas/pontuados/1';
            const responseAtletas = await axios.get(urlAtletas);
            const atletas = responseAtletas.data.atletas;

            const jogadoresDoTime = Object.values(atletas).filter(
                atleta => atleta.clube_id === parseInt(idTime)
            );

            setJogadoresTime(jogadoresDoTime);
        } catch (error) {
            console.error('Erro ao buscar dados dos atletas!', error);
        }
    };

    return (
        <>
            <h1>Buscar Jogadores por Time:</h1>
            <input
                type="text"
                placeholder="Digite o nome do time"
                value={nomeTime}
                onChange={(time) => setNomeTime(time.target.value)}
            />
            <button onClick={carregarJogadores}>Buscar</button>

            {jogadoresTime.length > 0 && (
                <div>
                    <h2>Jogadores do {nomeTime}:</h2>
                    <ul>
                        {jogadoresTime.map((jogador, key) => (
                            <li key={key}>{jogador.apelido}</li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}
