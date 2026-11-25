export const gerarDadosMix = (periodo = 'hoje') => {
  const dados = {
    hoje: [
      { name: 'Carne (Churrasco)', value: 45, cor: '#ef4444' },
      { name: 'Arroz/Feijão', value: 35, cor: '#f59e0b' },
      { name: 'Saladas', value: 20, cor: '#10b981' },
    ],
    ontem: [
      { name: 'Carne (Churrasco)', value: 30, cor: '#ef4444' },
      { name: 'Arroz/Feijão', value: 50, cor: '#f59e0b' },
      { name: 'Saladas', value: 20, cor: '#10b981' },
    ],
    semana: [
      { name: 'Carne (Churrasco)', value: 38, cor: '#ef4444' },
      { name: 'Arroz/Feijão', value: 42, cor: '#f59e0b' },
      { name: 'Saladas', value: 20, cor: '#10b981' },
    ],
  };
  return dados[periodo] || dados.hoje;
};

export const gerarDadosTempo = (periodo = 'hoje') => {
  const dados = {
    hoje: [
      { hora: '11:30', buffet: 2, churrasqueira: 1, mesa: 3 },
      { hora: '12:00', buffet: 5, churrasqueira: 4, mesa: 6 },
      { hora: '12:30', buffet: 8, churrasqueira: 9, mesa: 7 },
      { hora: '13:00', buffet: 4, churrasqueira: 6, mesa: 5 },
      { hora: '13:30', buffet: 2, churrasqueira: 2, mesa: 3 },
    ],
    ontem: [
      { hora: '11:30', buffet: 1, churrasqueira: 2, mesa: 2 },
      { hora: '12:00', buffet: 3, churrasqueira: 5, mesa: 4 },
      { hora: '12:30', buffet: 6, churrasqueira: 7, mesa: 5 },
      { hora: '13:00', buffet: 3, churrasqueira: 4, mesa: 3 },
      { hora: '13:30', buffet: 1, churrasqueira: 2, mesa: 2 },
    ],
    semana: [
      { hora: '11:30', buffet: 4, churrasqueira: 3, mesa: 4 },
      { hora: '12:00', buffet: 7, churrasqueira: 8, mesa: 6 },
      { hora: '12:30', buffet: 9, churrasqueira: 10, mesa: 8 },
      { hora: '13:00', buffet: 6, churrasqueira: 7, mesa: 6 },
      { hora: '13:30', buffet: 4, churrasqueira: 3, mesa: 3 },
    ],
  };
  return dados[periodo] || dados.hoje;
};