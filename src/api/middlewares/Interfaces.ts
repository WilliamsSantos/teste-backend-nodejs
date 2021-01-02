export interface requestApi {
    latitude: number;
    longitude: number;
    denunciante: {
        nome: string;
        cpf: number;
    };
    denuncia: {
        descricao: string;
        titulo: string;
    };
}
