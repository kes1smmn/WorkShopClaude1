import { useState } from 'react'
import {
  Stack,
  Title,
  Text,
  Select,
  Card,
  Group,
  Code,
  Alert,
  Loader,
  Badge,
} from '@mantine/core'
import { Dropzone } from '@mantine/dropzone'
import { IconUpload, IconX, IconFile, IconCheck, IconAlertCircle } from '@tabler/icons-react'

interface HashResult {
  filename: string
  algorithm: string
  hash: string
  size: number
  previously_seen: boolean
  first_seen: string | null
}

function Upload() {
  const [algorithm, setAlgorithm] = useState<string>('sha256')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<HashResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleUpload = async (files: File[]) => {
    if (files.length === 0) return

    setLoading(true)
    setError(null)
    setResult(null)

    const formData = new FormData()
    formData.append('file', files[0])
    formData.append('algorithm', algorithm)

    try {
      const response = await fetch('/api/hash', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to compute hash')
      }

      const data: HashResult = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  return (
    <Stack gap="lg">
      <Title order={1}>Upload File</Title>
      <Text c="dimmed">
        Select a hash algorithm and upload a file to compute its hash.
      </Text>

      <Select
        label="Hash Algorithm"
        description="Choose the cryptographic hash function"
        data={[
          { value: 'md5', label: 'MD5' },
          { value: 'sha1', label: 'SHA-1' },
          { value: 'sha256', label: 'SHA-256 (Recommended)' },
          { value: 'sha512', label: 'SHA-512' },
        ]}
        value={algorithm}
        onChange={(value) => setAlgorithm(value || 'sha256')}
      />

      <Dropzone
        onDrop={handleUpload}
        maxSize={200 * 1024 ** 2}
        loading={loading}
      >
        <Group
          justify="center"
          gap="xl"
          mih={150}
          style={{ pointerEvents: 'none' }}
        >
          <Dropzone.Accept>
            <IconUpload size={52} color="var(--mantine-color-blue-6)" />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX size={52} color="var(--mantine-color-red-6)" />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconFile size={52} color="var(--mantine-color-dimmed)" />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag a file here or click to select
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              File should not exceed 200MB
            </Text>
          </div>
        </Group>
      </Dropzone>

      {loading && (
        <Group justify="center">
          <Loader size="lg" />
          <Text>Computing hash...</Text>
        </Group>
      )}

      {error && (
        <Alert color="red" title="Error" icon={<IconX />}>
          {error}
        </Alert>
      )}

      {result && result.previously_seen && (
        <Alert color="yellow" title="Previously Seen" icon={<IconAlertCircle />}>
          This file hash has been seen before! First recorded on {formatDate(result.first_seen!)}.
        </Alert>
      )}

      {result && (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group mb="sm" justify="space-between">
            <Group>
              <IconCheck size={24} color="green" />
              <Title order={3}>Hash Result</Title>
            </Group>
            {result.previously_seen ? (
              <Badge color="yellow" size="lg">Previously Seen</Badge>
            ) : (
              <Badge color="green" size="lg">New File</Badge>
            )}
          </Group>
          <Stack gap="xs">
            <Text>
              <strong>Filename:</strong> {result.filename}
            </Text>
            <Text>
              <strong>Algorithm:</strong> {result.algorithm.toUpperCase()}
            </Text>
            <Text>
              <strong>File Size:</strong> {result.size.toLocaleString()} bytes
            </Text>
            <Text>
              <strong>Hash:</strong>
            </Text>
            <Code block>{result.hash}</Code>
          </Stack>
        </Card>
      )}
    </Stack>
  )
}

export default Upload
