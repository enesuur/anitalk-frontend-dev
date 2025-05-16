import { render, fireEvent } from '@testing-library/react';
import Page from '@/app/user/[...username]/page';

/* 
RUN THE TEST DIRECTLY
yarn jest --testPathPattern=followerModal.spec.ts
*/

test('Opens modal when clicking followers.', () => {
  render(<Page />);

  const followersButton = document.getElementById('btn-followers');
  expect(followersButton).toBeInTheDocument();

  if (followersButton) {
    fireEvent.click(followersButton);
  }

  const modal = document.getElementById('follow-modal');
  expect(modal).toBeInTheDocument();
});
