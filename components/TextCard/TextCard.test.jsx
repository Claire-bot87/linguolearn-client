// // import react from 'react'
// import { expect } from 'vitest';

// import { render, screen } from '@testing-library/react';
// import { describe, it, expect, vi } from 'vitest';
// import TextCard from './TextCard.jsx';

// // Mock service
// vi.mock('../../src/services/textService', () => ({
//   textDelete: vi.fn()
// }));

// describe('TextCard', () => {
//   it('renders with a title', () => {
//     render(<TextCard text={{ name: 'Example Title' }} />);
//     expect(screen.getByText('Example Title')).toBeInTheDocument();
//   });
// });


// components/TextCard/TextCard.test.jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import TextCard from './TextCard.jsx';
import { UserContext } from '../../src/contexts/UserContext';

vi.mock('../../src/services/textService', () => ({
  textDelete: vi.fn()
}));

describe('TextCard', () => {
  it('renders a title', () => {
    const mockUser = { name: 'Test User' };
    const mockText = { _id: '123', name: 'Example Title', bodyoftext: 'Some body text' };

    render(
      <UserContext.Provider value={{ user: mockUser }}>
        <MemoryRouter initialEntries={['/texts']}>
          <TextCard text={mockText} />
        </MemoryRouter>
      </UserContext.Provider>
    );

    screen.debug(); // optional, helps you inspect the rendered DOM
    expect(screen.getByText('Example Title')).toBeInTheDocument();
    expect(screen.getByText('Example body')).toBeInTheDocument();
  });
});
