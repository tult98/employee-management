import GroupIcon from '@mui/icons-material/Group'
import HomeIcon from '@mui/icons-material/Home'
import { Box, Container, Drawer, List, ListItemButton, Toolbar } from '@mui/material'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import { SelectLanguage } from '@/components'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import 'react-toastify/dist/ReactToastify.css'

const drawerWidth = 240

export const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const { t } = useTranslation()

  const MENU_TABS = useMemo(
    () => [
      {
        id: 'home',
        label: t('Home'),
        icon: <HomeIcon />,
        path: '/',
      },
      {
        id: 'add-employee',
        label: t('New Employee'),
        icon: <PersonAddAlt1Icon />,
        path: '/employees/add',
      },
      {
        id: 'employee-list',
        label: t('Employees'),
        icon: <GroupIcon />,
        path: '/employees',
      },
    ],
    [t]
  )

  const drawer = useMemo(
    () => (
      <div>
        <Toolbar />
        <List>
          {MENU_TABS.map((tab) => (
            <Link key={tab.id} href={tab.path}>
              <ListItemButton
                classes={{ root: 'mx-4 hover:bg-transparent focus:bg-transparent', selected: 'rounded-full' }}
                selected={router.pathname === tab.path}
              >
                <ListItemIcon>{tab.icon}</ListItemIcon>
                <ListItemText primary={tab.label} />
              </ListItemButton>
            </Link>
          ))}
        </List>
      </div>
    ),
    [router.pathname, MENU_TABS]
  )
  return (
    <>
      <Box component='nav' sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label='mailbox folders'>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box component='main' sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <Container maxWidth='xl' className='bg-white p-8 rounded-lg shadow-xl'>
          {children}
        </Container>
      </Box>
      <SelectLanguage />
    </>
  )
}
