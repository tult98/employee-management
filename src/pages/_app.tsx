import '@/styles/globals.css'
import GroupIcon from '@mui/icons-material/Group'
import HomeIcon from '@mui/icons-material/Home'
import { Box, Container, Divider, Drawer, List, ListItem, Toolbar } from '@mui/material'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const MENU_TABS = [
  {
    id: 'home',
    label: 'Home',
    icon: <HomeIcon />,
    path: '/',
  },
  {
    id: 'add-employee',
    label: 'New Employee',
    icon: <PersonAddAlt1Icon />,
    path: '/employees/add',
  },
  {
    id: 'employee-list',
    label: 'Employees',
    icon: <GroupIcon />,
    path: '/employees',
  },
]

const drawerWidth = 240

const drawer = (
  <div>
    <Toolbar />
    <Divider />
    <List>
      {MENU_TABS.map((tab) => (
        <Link key={tab.id} href={tab.path}>
          <ListItem>
            <ListItemIcon>{tab.icon}</ListItemIcon>
            <ListItemText primary={tab.label} />
          </ListItem>
        </Link>
      ))}
    </List>
  </div>
)

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className='flex h-screen bg-[#F9F9F9]'>
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
          <Component {...pageProps} />
        </Container>
      </Box>
      <ToastContainer />
    </div>
  )
}
