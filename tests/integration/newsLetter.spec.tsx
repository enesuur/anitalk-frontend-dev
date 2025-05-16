import { render, screen, fireEvent } from '@testing-library/react';
import Topbar from '@/app/(home)/_components/topbar/Topbar';

/*
RUN THE TEST DIRECTLY
yarn jest --testPathPattern=newsLetter.spec.ts
*/

describe('Topbar Newsletter Button', () => {
  test('clicking newsletter button opens Newsletter modal', () => {
    render(<Topbar />);

    // Modal başlangıçta görünmemeli
    expect(screen.queryByTestId('newsletter-modal-overlay')).not.toBeInTheDocument();

    // Butona tıkla
    fireEvent.click(screen.getByTestId('btn-newsletter'));

    // Modal açılmış olmalı
    expect(screen.getByTestId('newsletter-modal-overlay')).toBeInTheDocument();
  });
});
