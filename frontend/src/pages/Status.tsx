import { useEffect, useState } from 'react'
import {
  Stack,
  Title,
  Text,
  Card,
  Badge,
  Button,
  Group,
  Loader,
} from '@mantine/core'
import { IconRefresh, IconCheck, IconX } from '@tabler/icons-react'

interface StatusResponse {
  status: string
  message: string
}

function Status() {
  const [status, setStatus] = useState<StatusResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const checkStatus = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/status')
      if (!response.ok) {
        throw new Error('Backend not responding')
      }
      const data: StatusResponse = await response.json()
      setStatus(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection failed')
      setStatus(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkStatus()
  }, [])

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Title order={1}>Backend Status</Title>
        <Button
          leftSection={<IconRefresh size={16} />}
          onClick={checkStatus}
          loading={loading}
        >
          Refresh
        </Button>
      </Group>

      {loading && !status && !error && (
        <Group justify="center" py="xl">
          <Loader size="lg" />
          <Text>Checking backend status...</Text>
        </Group>
      )}

      {status && (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="md">
            <Title order={3}>Flask Backend</Title>
            <Badge
              color="green"
              size="lg"
              leftSection={<IconCheck size={14} />}
            >
              Online
            </Badge>
          </Group>
          <Text>
            <strong>Status:</strong> {status.status}
          </Text>
          <Text>
            <strong>Message:</strong> {status.message}
          </Text>
        </Card>
      )}

      {error && (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="md">
            <Title order={3}>Flask Backend</Title>
            <Badge
              color="red"
              size="lg"
              leftSection={<IconX size={14} />}
            >
              Offline
            </Badge>
          </Group>
          <Text c="red">
            <strong>Error:</strong> {error}
          </Text>
          <Text mt="sm" c="dimmed">
            Make sure the Flask backend is running on port 5000.
          </Text>
        </Card>
      )}
    </Stack>
  )
}

export default Status
