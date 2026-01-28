import { AppShell, Group, Title, Anchor, Container } from '@mantine/core'
import { Outlet, Link, useLocation } from 'react-router'

function Layout() {
  const location = useLocation()

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Upload', path: '/upload' },
    { label: 'Tables', path: '/tables' },
    { label: 'Status', path: '/status' },
  ]

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Container size="lg" h="100%">
          <Group h="100%" justify="space-between">
            <Title order={3}>File Hasher</Title>
            <Group gap="lg">
              {navItems.map((item) => (
                <Anchor
                  key={item.path}
                  component={Link}
                  to={item.path}
                  fw={location.pathname === item.path ? 700 : 400}
                  underline={location.pathname === item.path ? 'always' : 'hover'}
                >
                  {item.label}
                </Anchor>
              ))}
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="lg">
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}

export default Layout
