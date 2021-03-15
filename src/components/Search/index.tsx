import { ChangeEvent, FormEvent, useState } from 'react'
import { FaSearch } from 'react-icons/fa'

interface ISearch {
  handleSearch: (searchValue: string) => Promise<void>
}

export default function Search ({ handleSearch }: ISearch): JSX.Element {
  const [search, setSearch] = useState('')

  function handleInputChange (e: ChangeEvent<HTMLInputElement>): void {
    setSearch(e.target.value)
  }

  async function handleForm (e: FormEvent): Promise<void> {
    e.preventDefault()

    await handleSearch(search)
  }

  return (
    <div className='pt-12 pl-6 w-full'>
      <form onSubmit={handleForm}>
        <label className='flex'>
          <FaSearch
            title='Search'
            className='text-5xl text-gray-100 bg-secondary rounded-full p-2 absolute'
          />
          <input
            type='text'
            name='search'
            onChange={handleInputChange}
            value={search}
            className='w-10/12
             outline-none py-3 pl-16
             rounded rounded-l-full
             rounded-r-full
             bg-transparent
             text-secondary'
          />
        </label>
      </form>
    </div>
  )
}
