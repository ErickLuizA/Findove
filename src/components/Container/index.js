export default function Container ({ children }) {
  return (
    <div className='flex flex-col md:flex-row'>
      {children}
    </div>
  )
}
