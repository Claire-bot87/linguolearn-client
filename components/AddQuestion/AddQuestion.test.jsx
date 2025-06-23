import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import { UserContext } from '../../src/contexts/UserContext'
import AddQuestion from './AddQuestion'
import { questionCreate, questionIndex } from '../../src/services/questionService'
import { textShow } from '../../src/services/textService'

vi.mock('../../src/services/textService', () => ({
  textShow: vi.fn()
}))

vi.mock('../../src/services/questionService', () => ({
  questionCreate: vi.fn(),
  questionIndex: vi.fn()
}))

it('AddQuestion submits a question', async () => {
  const mockText = { _id: '123', name: 'Test Title', bodyoftext: 'Test Body' }
  const mockQuestions = [{_id:'q1', content:'example question' }]
  const mockUser = { _id: 'user1', name: 'Claire' }

  textShow.mockResolvedValue(mockText)
  questionIndex.mockResolvedValue(mockQuestions)
  questionCreate.mockResolvedValue({ message: 'Created' })

  render(
    <MemoryRouter initialEntries={['/texts/123/questions/add']}>
      <UserContext.Provider value={{ user: mockUser }}>
        <Routes>
          <Route path="/texts/:textId/questions/add" element={<AddQuestion />} />
        </Routes>
      </UserContext.Provider>
    </MemoryRouter>
  )

  // Wait for text title to appear
 await screen.findByLabelText(/question:/i)

  // Fill in question form
  const input = screen.getByLabelText(/question/i)
  fireEvent.change(input, { target: { value: 'What is the theme?' } })

  const submitButton = screen.getByRole('button', { name: /create/i })
  fireEvent.click(submitButton)

await waitFor(() => {
  expect(questionCreate).toHaveBeenCalledWith(
    '123',
    { content: 'What is the theme?' }
  )
})
  })


