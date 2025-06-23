import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { vi } from 'vitest'
import SingleText from './SingleText.jsx'
import { textShow } from '../../src/services/textService'
import { questionIndex } from '../../src/services/questionService'
import { UserContext } from '../../src/contexts/UserContext'

// 🧪 Mock services
vi.mock('../../src/services/textService', () => ({
  textShow: vi.fn()
}))

vi.mock('../../src/services/questionService', () => ({
  questionIndex: vi.fn()
}))

test('SingleText renders fetched text and questions', async () => {
  // Sample mock data
  const mockText = { _id: '123', name: 'Mock Title', bodyoftext: 'Mock body' }
const mockQuestions = [
  {
    _id: 'q1',
    content: 'What is this?',
    questiontext: '123' // This links it to the mockText
  }
]

  textShow.mockResolvedValue(mockText)
  questionIndex.mockResolvedValue(mockQuestions)

  render(
    <MemoryRouter initialEntries={['/texts/123']}>
      <UserContext.Provider value={{ user: { name: 'Claire' } }}>
        <Routes>
          <Route path="/texts/:textId" element={<SingleText />} />
        </Routes>
      </UserContext.Provider>
    </MemoryRouter>
  )

  // Wait for the title to appear
  const title = await screen.findByText('Mock Title')
  expect(title).toBeInTheDocument()

  // Optional: check body or question
  expect(screen.getByText('Mock body')).toBeInTheDocument()
  expect(screen.getByText('What is this?')).toBeInTheDocument()
})
