// ✅ tarefa concluída: Lista mockada com 30 objetos de pagamento criada
import type { Pagamento } from '../types';

// Função para gerar ID único
const generateUniqueId = (): string => {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};

// Dados de exemplo para geração aleatória
const nomes = [
  'João Silva',
  'Maria Santos',
  'Pedro Oliveira',
  'Ana Costa',
  'Carlos Souza',
  'Lucia Ferreira',
  'Roberto Lima',
  'Fernanda Alves',
  'Eduardo Santos',
  'Patricia Rocha',
  'José Pereira',
  'Sandra Martins',
  'Antonio Cardoso',
  'Carla Barbosa',
  'Ricardo Gomes',
  'Monica Dias',
  'Francisco Castro',
  'Julia Nascimento',
  'Marcos Vieira',
  'Aline Moreira',
  'Rafael Torres',
  'Camila Ramos',
  'Bruno Cavalcanti',
  'Vanessa Correia',
  'Daniel Ribeiro',
  'Isabella Fernandes',
  'Thiago Monteiro',
  'Priscila Araújo',
  'Leonardo Carvalho',
  'Sabrina Mendes',
];

const descricoes = [
  'Pagamento de salário mensal',
  'Comissão de vendas',
  'Bônus por performance',
  'Reembolso de despesas',
  'Adiantamento salarial',
  'Pagamento de freelancer',
  'Consultoria especializada',
  'Serviços prestados',
  'Hora extra trabalhada',
  'Ajuda de custo',
  'Gratificação natalina',
  'Participação nos lucros',
  'Pagamento de estágio',
  'Verba de treinamento',
  'Auxílio alimentação',
];

// Função para gerar data aleatória nos últimos 12 meses
const generateRandomDate = (): string => {
  const now = new Date();
  const yearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
  const randomTime = yearAgo.getTime() + Math.random() * (now.getTime() - yearAgo.getTime());
  return new Date(randomTime).toISOString().split('T')[0];
};

// Função para gerar valor aleatório entre 1000 e 15000
const generateRandomValue = (): number => {
  return Math.floor(Math.random() * (15000 - 1000 + 1)) + 1000;
};

// Geração da lista mockada com 30 objetos únicos
export const mockPagamentos: Pagamento[] = Array.from({ length: 30 }, (_, index) => ({
  id: generateUniqueId(),
  nome: nomes[index],
  data: generateRandomDate(),
  valor: generateRandomValue(),
  descricao: descricoes[Math.floor(Math.random() * descricoes.length)],
  user_id: `user_${Math.floor(Math.random() * 100) + 1}`,
}));
