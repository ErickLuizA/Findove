import { ReactChild } from 'react'

interface IProps {
  children: ReactChild
}

export default function Container ({ children }: IProps): JSX.Element {
  return (
    <div className='flex flex-col md:flex-row'>
      {children}
    </div>
  )
}
