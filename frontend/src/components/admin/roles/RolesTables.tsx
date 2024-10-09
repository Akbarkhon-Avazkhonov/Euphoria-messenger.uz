'use client';
import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import SearchIcon from '@mui/icons-material/Search';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import NumbersRoundedIcon from '@mui/icons-material/NumbersRounded';
import Option from '@mui/joy/Option';
import AvatarWithStatus from '@/components/ui/AvatarWithStatus';
import SwapVertRounded from '@mui/icons-material/SwapVertRounded';
import { Select } from '@mui/joy';
import EditRole from './EditRole';
import DeleteButton from '@/components/ui/DeleteButton';

interface UserProps {
  login: string;
  name: string;
  role: string;
  phoneNumber: string;
  created_at: string;
}

interface RolesTableProps {
  roles: any[];
}

export default function RolesTables({ roles }: RolesTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState<any[]>(roles);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSearch = (event: any) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredData(
      roles.filter(
        (role) =>
          role.name.toLowerCase().includes(query) ||
          role.description.toLowerCase().includes(query)
      )
    );
    setCurrentPage(1); // Reset to first page on search
  };

  const handlePageChange = (newPage: any) => {
    setCurrentPage(newPage);
  };

  const handleRecordsPerPageChange = (
    event: React.SyntheticEvent | null,
    newValue: number | null
  ) => {
    setRecordsPerPage(parseInt(String(newValue), 10));
    setCurrentPage(1); // Reset to first page on records per page change
  };

  const handleSort = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);

    const sortedData = [...filteredData].sort((a: any, b: any) => {
      const kyberA = a.totalKiberonePoints || 0;
      const kyberB = b.totalKiberonePoints || 0;

      if (newDirection === 'asc') {
        return kyberA - kyberB;
      } else {
        return kyberB - kyberA;
      }
    });

    setFilteredData(sortedData);
  };

  const totalPages = Math.max(1, Math.ceil(filteredData.length / recordsPerPage)); // Ensure totalPages is at least 1
  const startIndex = (currentPage - 1) * recordsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + recordsPerPage);

  return (
    <>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: 'sm',
          py: 2,
          display: { xs: 'none', sm: 'flex' },
          flexWrap: 'wrap',
          gap: 1.5,
          '& > *': {
            minWidth: { xs: '120px', md: '160px' },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <Input
            size="sm"
            placeholder="Поиск пользователей"
            startDecorator={<SearchIcon />}
            value={searchQuery}
            onChange={handleSearch}
          />
        </FormControl>
      </Box>
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: 'none', sm: 'initial' },
          width: '100%',
          borderRadius: 'sm',
          flexShrink: 1,
          overflow: 'auto',
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          stickyFooter
          hoverRow
          sx={{
            '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
            '--Table-headerUnderlineThickness': '1px',
            '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
            '--TableCell-paddingY': '8px',
            '--TableCell-paddingX': '8px',
          }}
        >
          <thead>
            <tr>
              <th style={{ width: '6%', textAlign: 'center', padding: '12px 6px' }}>
                <NumbersRoundedIcon />
              </th>
              <th style={{ width: 200, padding: '16px 6px' }}>
                <Typography>Имя</Typography>
              </th>
              <th style={{ width: 200, padding: '16px 6px' }}>Описание</th>
              <th style={{ width: 200, padding: '16px 6px' }}>Управление</th>
              <th style={{ width: 200, padding: '16px 6px' }}>Количество пользователей</th>
              <th style={{ width: '15%', padding: '16px 6px' }}>Дата создания</th>
              <th style={{ width: '4%', padding: '10px 6px', textAlign: 'center' }}>
                <SettingsRoundedIcon />
              </th>
              <th style={{ width: '4%', padding: '10px 6px', textAlign: 'center' }}>
                <DeleteOutlineRoundedIcon />
              </th>
            </tr>
          </thead>
          <tbody>
            {roles &&
              roles.map((row: any, index: any) => (
                <tr key={row.id}>
                  <td style={{ textAlign: 'center', width: 120 }}>{index + 1}</td>
                  <td>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <AvatarWithStatus size="sm" fullname={row.name[0]} />
                      <Typography level="body-xs">{row.name}</Typography>
                    </Box>
                  </td>
                  <td>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingRight: '24px',
                      }}
                    >
                      <Typography level="body-xs">{row.description}</Typography>
                    </Box>
                  </td>
                  <td>
                    <Typography level="body-xs">
                      {row.access.can_manage_users ? 'Да' : 'Нет '}
                    </Typography>
                  </td>

                  <td>
                    <Typography level="body-xs">{row.users_count}</Typography>
                  </td>
                  <td>
                    <Typography level="body-xs">{row.created_at.slice(0, 10)}</Typography>
                  </td>
                  {/* Условие для отображения кнопок редактирования и удаления */}
                  <td style={{ textAlign: 'center' }}>
                    {row.name !== 'Админ' ? (
                      <EditRole
                        id={row.id}
                        name={row.name}
                        description={row.description}
                        access={row.access}
                      />
                    )
                    : (
                      <EditRole 
                        id={row.id}
                        name={row.name}
                        description={row.description}
                        access={row.access}
                        disabled
                      />
                    )}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {row.name !== 'Админ' ? (
                      <DeleteButton id={row.id} canDelete={true} url={'roles/one'} />
                    ) : (
                      <DeleteButton id={row.id} canDelete={false} url={'roles/one'}  />

                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Sheet>
      <Box
        className="Pagination"
        sx={{
          pt: 2,
          gap: 1,
          display: {
            xs: 'none',
            md: 'flex',
          },
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          bottom: 0,
          borderTop: '1px solid #ccc',
          p: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>Показать:</Typography>
          <Select
            size="sm"
            value={recordsPerPage}
            defaultValue={25}
            onChange={handleRecordsPerPageChange}
            indicator={<SwapVertRounded />}
            sx={{ ml: 2, minWidth: 80 }}
          >
            {[5, 10, 25, 50].map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            size="sm"
            variant="outlined"
            color="neutral"
            startDecorator={<KeyboardArrowLeftIcon />}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            До
          </Button>

          <Box sx={{ mx: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            {Array.from({ length: totalPages }, (_, index) => index + 1)
              .slice(0, 10)
              .map((page) => (
                <IconButton
                  key={page}
                  size="sm"
                  variant={page === currentPage ? 'solid' : 'outlined'}
                  color="neutral"
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </IconButton>
              ))}
          </Box>

          <Button
            size="sm"
            variant="outlined"
            color="neutral"
            endDecorator={<KeyboardArrowRightIcon />}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            После
          </Button>
        </Box>
      </Box>
    </>
  );
}
