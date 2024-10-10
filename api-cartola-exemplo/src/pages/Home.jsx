import axios from 'axios';
import { useEffect } from 'react';


export default function Home() {

    useEffect(() => {
        carregarAtletas();
    }, [])

    const carregarAtletas = async () => {
        try {
            const url = 'https://api.cartola.globo.com/atletas/pontuados/1';
            const response = await axios.get(url);
            console.log(response.data);
        } catch (error) {
            console.error('Erro ao buscar dados dos atletas!', error);
        }
    }

    return (
        <h1>Cartola FC:</h1>
    );
}
