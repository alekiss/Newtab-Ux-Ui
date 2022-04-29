import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom/extend-expect';

import ListaDeUsuarios from '../ListaDeUsuarios';

describe('Testando componentes da UI', () => {
    const history = createMemoryHistory();

    beforeEach(() => {
        render(
               <ListaDeUsuarios />
        );
    });
    
    it('Testando renderização dos cards', () => {
        const div = screen.queryAllByTestId("custom-element");

        expect(div).toHaveLength(33);
    });

    it("Testando renderização do modal", () => {
        const modal = screen.getByTestId('abrirModal');

        expect(modal).toBeInTheDocument();
    });

    it("Testando renderização do modal de pagamento", () => {
        const pagamento = screen.getByTestId("modalPagamento");

        expect(pagamento).toBeInTheDocument();
    });

});