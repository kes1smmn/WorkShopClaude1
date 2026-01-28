import { Title, Text, Stack, Card } from '@mantine/core'

function Home() {
  return (
    <Stack gap="lg">
      <Title order={1}>Welcome to File Hasher</Title>
      <Text size="lg" c="dimmed">
        A simple web application to compute cryptographic hashes of your files.
      </Text>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={3}>How to Use</Title>
        <Text mt="sm">
          1. Navigate to the <strong>Upload</strong> page using the header navigation.
        </Text>
        <Text>
          2. Select a hash algorithm (MD5, SHA-1, SHA-256, or SHA-512).
        </Text>
        <Text>
          3. Drag and drop a file or click to select one.
        </Text>
        <Text>
          4. View your computed hash result!
        </Text>
      </Card>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={3}>Supported Algorithms</Title>
        <Text mt="sm">
          <strong>MD5</strong> - 128-bit hash (legacy, not recommended for security)
        </Text>
        <Text>
          <strong>SHA-1</strong> - 160-bit hash (legacy, not recommended for security)
        </Text>
        <Text>
          <strong>SHA-256</strong> - 256-bit hash (recommended)
        </Text>
        <Text>
          <strong>SHA-512</strong> - 512-bit hash (high security)
        </Text>
      </Card>
    </Stack>
  )
}

export default Home
