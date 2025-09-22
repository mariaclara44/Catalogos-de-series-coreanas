import dados from "./../models/dados.js"
const {kDramas} = dados;

const getAllSeries = (req, res) => {
    const resultado = kDramas

    res.status(200).json ({
       total: resultado.length,
       kDramas: resultado
    });
}

const getPorGenero = (req, res ) => {
let genero = req.params.genero;
genero = genero.toLowerCase();

const generoFiltrados = kDramas.filter(k => k.genero.toLowerCase().includes(genero.toLowerCase()));
if (generoFiltrados) {
    res.status(200).json(generoFiltrados);
} else {
    res.status(404).json ({
        mensagem: "Genero não encotrado"
    })
}

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
    
        if (!episodios || episodios <= 6 || episodios >= 50) {
            return res.status(400).json({
                success: false,
                message: "O campo 'episodios' é obrigatório e deve estar conter episodios de 6 a 50!"
            });
        }
        if (!avaliacao || avaliacao <= 0 || avaliacao >= 10) {
            return res.status(400).json({
                success: false,
                message: "A avaliação deve estar entre 0 e 10"
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
    
  const updateSerie = (req, res) => {
    //Lógica para atualizar
    const id = parseInt(req.params.id);
    //Body para dados novos
    const { titulo, genero, canal, episodios, anoLancamento, avaliacao, dublado, status } = req.body;

    const idParaEditar = id;

    //Verificar o id 
    if (isNaN(idParaEditar)) {
        return res.status(400). json ({
            success: false,
            message: "O id deve ser um número válido!!!"
        })
    }

    //Verificar se a K-Drama id  existe
    const serieExiste = kDramas.find(kDrama =>kDrama.id === idParaEditar);

    if (!serieExiste) {
        return res.status(404).json ({
            success:false,
            message: `K-Drama com Id: ${id}, não existe`
        })
    }
    //Após todos os cenários, atualiza a barbie

    //  Laço com map
    const seriesAtualizadas = kDramas.map(kDrama => kDrama.id === idParaEditar ? {
        ...kDrama,
        ...(titulo && { titulo }),
        ...(genero && {genero}),
        ...(canal && {canal}),
        ...(episodios && {episodios: parseInt(episodios)}),
        ...(anoLancamento && {anoLancamento: parseInt(anoLancamento)}),
        ...(avaliacao && {avaliacao: parseInt(avaliacao)}),
        ...(dublado && {dublado}),
        ...(status && {status: parseInt(status)}),
} : kDrama)
    //Atualizando o arry com splice 
    kDramas.splice(0, kDramas.length, ... seriesAtualizadas);

    const serieNova = kDramas.find(kDrama => kDrama.id === idParaEditar);

    res.status(200).json ({
        success: true,
        message: `Dados do K-Drama ID ${idParaEditar} atualizados com sucesso!`,
        kDrama: serieNova
    })
}
export {getAllSeries, getById, createSerie, serieDelete, getPorGenero, updateSerie};