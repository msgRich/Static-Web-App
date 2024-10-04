// 'use client'

import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { NavItem } from './components';
import { getSPListItems } from 'api/callSharePointOnline.server';
import { jsx } from '@emotion/react';

interface Props {
  // eslint-disable-next-line @typescript-eslint/ban-types
  onSidebarOpen: () => void;
  pages: {
    landings: Array<PageItem>;
    company: Array<PageItem>;
    account: Array<PageItem>;
    secondary: Array<PageItem>;
    blog: Array<PageItem>;
    portfolio: Array<PageItem>;
  };
  colorInvert?: boolean;
}



const Topbar = ({  onSidebarOpen, pages, colorInvert = false,}: Props) => {
  const theme = useTheme();
  const { mode } = theme.palette;
  const {
    landings: landingPages,
    secondary: secondaryPages,
    company: companyPages,
    account: accountPages,
    portfolio: portfolioPages,
    blog: blogPages,
  } = pages;

  const getClientData:any = async () => await getSPListItems('Clients');

  const items:any = getClientData();

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={1}
    >
      <Box
        display={'flex'}
        component="a"
        href="/"
        title="theFront"
        width={{ xs: 100, md: 120 }}
      >
        <Box
          component={'img'}
          src={
            mode === 'light' && !colorInvert
              ? 'static/images/MSG-Logo-Slim.png'
              : 'static/images/MSG-Logo-Slim.png'
          }
          height={1}
          width={1}
        />
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>

        {/* {items ? items.map((item:any) => 
          <Box mr={3}>
            <Link
              underline="hover" 
              color="inherit"
              href="#solutions"
            >
              {item.Title}
            </Link>
          </Box>):null} */}
        <Box mr={3}>
          <Link
            underline="hover" 
            color="inherit"
            href="#solutions"
          >
            Solutions
          </Link>
        </Box>
        <Box mr={3}>
          <Link
            underline="hover" 
            color="inherit"
            href="#solutions"
          >
            Our Work
          </Link>
        </Box>
        <Box mr={3}>
          <Link
            underline="hover" 
            color="inherit"
            href="#solutions"
          >
            Who we are
          </Link>
        </Box>
        <Box mr={3}>
          <Link
            underline="hover" 
            color="inherit"
            href="#solutions"
          >
            Clients
          </Link>
        </Box>
        <Box>
          <Link
            underline="hover" 
            color="inherit"
            href="#solutions"
          >
            Trusted
          </Link>
        </Box>
        {/* <Box marginLeft={4}>
          <NavItem
            title={'Portfolio'}
            id={'portfolio-pages'}
            items={portfolioPages}
            colorInvert={colorInvert}
          />
        </Box> */}
      </Box>
      <Box sx={{ display: { xs: 'flex', md: 'none' } }} alignItems={'center'}>
        <Button
          onClick={() => onSidebarOpen()}
          aria-label="Menu"
          variant={'outlined'}
          sx={{
            borderRadius: 2,
            minWidth: 'auto',
            padding: 1,
            borderColor: alpha(theme.palette.divider, 0.2),
          }}
        >
          <MenuIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default Topbar;
