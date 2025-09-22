import dados from "./../models/dados.js"
const {kDramas} = dados;

const getAllSeries = (req, res) => {
    const resultado = kDramas

    res.status(200).json ({
       total: resultado.length,
       kDramas: resultado
    });


}


const getById = (req, res) => {
    let id = parseInt (req.params.id)

    const kDrama = kDramas.find(k => k.id === id);

    res.status(200).json ({
        success: true,
        kDrama: kDrama
    })
}

const createSerie = (req, res) => {
        const {id, titulo, genero, canal, episodios, anoLancamento, avaliacao, dublado, status } = req.body;
    
        if (!titulo || !genero) {
            return res.status(400).json({
                success : false,
                message: "Titulo e genero são obrigatórios!!!"
            });
        }
        
        const novoKDrama = {
           id: kDramas.length + 1,
            titulo: titulo,
            genero: genero,
            canal: canal,
            episodios: episodios,
            anoLancamento: anoLancamento,
            avaliacao: avaliacao,
            dublado: dublado,
            status: status
        }
        kDramas.push(novoKDrama);
    
    res.status(201).json ({
        success: true,
        message: "K-Drama cadastrado com sucesso!",
        kDrama: novoKDrama
    });
    
}

const serieDelete = (req, res) => {
    let id = parseInt(req.params.id);
  
    const removerKDrama = kDramas.find((k) => k.id === id);
  
    if (!removerKDrama) {
      return res.status(404).json({
        success: false,
        message: `Esse K-Drama não existe ${id}!`,
      });
    }
    const filtroKDrama = kDramas.filter((kDrama) => kDrama.id !== id);
  
    kDramas.splice(0, kDramas.length, ...filtroKDrama);
  
    res.status(200).json({
      success: true,
      message: `K-Drama removido com sucesso!`,
    });
  }


// Regras de Negócio 
if (episodios => 6 || episodios <= 50) {
    return res.status(400).json({
        success: false,
        message: "O campo 'episodios' deve estar entre 6 e 50!"
    });
}

export {getAllSeries, getById, createSerie, serieDelete};