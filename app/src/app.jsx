import React from 'react'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App () {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  )
}

function Home () {
  const { data, isLoading } = useQuery({
    queryKey: ['files'],
    queryFn: () =>
      fetch('http://localhost:3000/files/data').then(res =>
        res.json()
      )
  })

  if (isLoading) return <>Loading...</>

  return (
    <>
      <h1 className='text-white m-3 p-2 bg-danger border border-dark'>React Test App</h1>
      <div className='container'>
        <Table striped bordered hover>
          <thead style={{ borderBottom: '2px solid black' }}>
            <tr>
              <th>File</th>
              <th>Text</th>
              <th>Number</th>
              <th>Hex</th>
            </tr>
          </thead>

          <tbody>
            {data.map(file => (
              <>
                {file.lines.map(line => (
                  <>
                    <tr>
                      <td>{file.file}</td>
                      <td>{line.text}</td>
                      <td>{line.number}</td>
                      <td>{line.hex}</td>
                    </tr>
                  </>
                ))}
              </>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  )
}
