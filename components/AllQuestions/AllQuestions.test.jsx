
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import AllQuestions from './AllQuestions.jsx';
import { UserContext } from '../../src/contexts/UserContext'

describe('AllQuestions', () => {
  it('renders a list of questions related to a paerticular text', () => {

    const mockText = { _id: '123', name: 'Example Title', bodyoftext: 'Some body text' };
    const mockQuestions = [{ _id: 'q1', content: 'Question Content', questiontext: '123' }];


    render(
          <MemoryRouter initialEntries={['/texts']}>

      
          <AllQuestions text={mockText} questions={mockQuestions}/>
        

      </MemoryRouter>
    );


      expect(screen.getByText('Question Content')).toBeInTheDocument();
    

  })
})