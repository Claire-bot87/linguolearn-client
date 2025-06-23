import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import AllTexts from './AllTexts'
import { textIndex } from '../../src/services/textService'
import { UserContext } from '../../src/contexts/UserContext';

vi.mock('../../src/services/textService', () => ({
  textIndex: vi.fn()
}))

test('AllTexts renders all the texts', async () => {
const mockTexts = [{_id:'123', name:'example name', bodyoftext:'example body' }]
const mockUser = { name: 'Test User' };



textIndex.mockResolvedValue(mockTexts)


    render(
       <UserContext.Provider value={{ user: mockUser }}>    
          <MemoryRouter initialEntries={['/texts']}>
          <AllTexts/>
      </MemoryRouter>
</UserContext.Provider>
  

    );
 const name = await screen.findByText('example name')
  expect(name).toBeInTheDocument()


expect(screen.getByText('example body')).toBeInTheDocument()
})