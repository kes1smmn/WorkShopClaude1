import { useEffect, useState } from 'react'
import {
  Stack,
  Title,
  Text,
  Table,
  Button,
  Group,
  Loader,
  Alert,
  Badge,
  Code,
} from '@mantine/core'
import { IconRefresh, IconTrash, IconX } from '@tabler/icons-react'

interface HashRecord {
  filename: string
  algorithm: string
  hash: string
  size: number
  timestamp: string
}

interface HashesResponse {
  hashes: HashRecord[]
  count: number
}

function Tables() {
  const [hashes, setHashes] = useState<HashRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchHashes = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/hashes')
      if (!response.ok) {
        throw new Error('Failed to fetch hashes')
      }
      const data: HashesResponse = await response.json()
      setHashes(data.hashes)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const clearHashes = async () => {
    if (!confirm('Are you sure you want to delete all hash records?')) {
      return
    }

    try {
      const response = await fetch('/api/hashes', { method: 'DELETE' })
      if (!response.ok) {
        throw new Error('Failed to clear hashes')
      }
      setHashes([])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  useEffect(() => {
    fetchHashes()
  }, [])

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <div>
          <Title order={1}>Hash History</Title>
          <Text c="dimmed">All files that have been hashed</Text>
        </div>
        <Group>
          <Button
            leftSection={<IconRefresh size={16} />}
            onClick={fetchHashes}
            loading={loading}
            variant="light"
          >
            Refresh
          </Button>
          <Button
            leftSection={<IconTrash size={16} />}
            onClick={clearHashes}
            color="red"
            variant="light"
            disabled={hashes.length === 0}
          >
            Clear All
          </Button>
        </Group>
      </Group>

      {loading && hashes.length === 0 && (
        <Group justify="center" py="xl">
          <Loader size="lg" />
          <Text>Loading hash history...</Text>
        </Group>
      )}

      {error && (
        <Alert color="red" title="Error" icon={<IconX />}>
          {error}
        </Alert>
      )}

      {!loading && hashes.length === 0 && !error && (
        <Alert color="blue" title="No Records">
          No files have been hashed yet. Go to the Upload page to hash a file.
        </Alert>
      )}

      {hashes.length > 0 && (
        <>
          <Badge size="lg" variant="light">
            {hashes.length} record{hashes.length !== 1 ? 's' : ''}
          </Badge>

          <Table striped highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Filename</Table.Th>
                <Table.Th>Algorithm</Table.Th>
                <Table.Th>Hash</Table.Th>
                <Table.Th>Size</Table.Th>
                <Table.Th>Timestamp</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {hashes.map((record, index) => (
                <Table.Tr key={index}>
                  <Table.Td>{record.filename}</Table.Td>
                  <Table.Td>
                    <Badge variant="outline">
                      {record.algorithm.toUpperCase()}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Code style={{ fontSize: '0.75rem' }}>
                      {record.hash.substring(0, 16)}...
                    </Code>
                  </Table.Td>
                  <Table.Td>{formatSize(record.size)}</Table.Td>
                  <Table.Td>{formatDate(record.timestamp)}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </>
      )}
    </Stack>
  )
}

export default Tables
