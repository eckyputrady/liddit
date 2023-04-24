import { fireEvent, render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { TransactionForm } from './Transaction';

describe('Transaction', () => {
    describe('form', () => {
        test('should fail validation and disable submit button', async () => {
            render(<TransactionForm />)
            expect(screen.getByRole('button')).toBeDisabled();

            fireEvent.change(await screen.findByLabelText('date'), { target: { values: 'asdasd' } });
            fireEvent.change(await screen.findByLabelText('description'), { target: { values: 'asdasd' } });
            fireEvent.change(await screen.findByLabelText('amount'), { target: { values: 'sdfgsd' } });
        })

        test('should pass validation and trigger submission', () => {
            
        })
    })

    // list
});