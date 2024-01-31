import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';


const columns = [
  {
    field: "CruiseID",
    headerName: "航次代號",
    width: 120,
    type:'string',
    sortable: false,
    editable: false,
    filterable: false,
    headerClassName: 'super-app-theme--header',
    renderCell: (params) => {
        return (
          <Link to={`/csr/${params.value}`} style={{ color: "#2789E3" }}>
            {params.value}
          </Link>
        );
      },
  },
  {
    field: "LeaderName",
    headerName: "領隊教授",
    minWidth: 120,
    type:'string',
    sortable: false,
    editable: false,
    flex: 1,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: "ExploreOcean",
    headerName: "探測海域",
    minWidth: 200,
    type:'string',
    sortable: false,
    editable: false,
    flex: 2,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: "StartDate",
    headerName: "出港日期 (UTC+8)",
    minWidth: 200,
    type:'datetime',
    sortable: true,
    editable: false,
    flex: 2,
    filterable:false,
    headerClassName: 'super-app-theme--header',
    valueGetter: (params) => {
        if (!params.row.StartDate) return '';
        // Parse the ISO string
        const date = new Date(params.row.StartDate);
        // Format the date and time
        return `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1).toString().padStart(2, '0')}-${date.getUTCDate().toString().padStart(2, '0')} ${date.getUTCHours().toString().padStart(2, '0')}:${date.getUTCMinutes().toString().padStart(2, '0')}:${date.getUTCSeconds().toString().padStart(2, '0')}`;
      },
  },
  {
    field: "EndDate",
    headerName: "進港日期 (UTC+8)",
    minWidth: 200,
    type:'datetime',
    editable: false,
    sortable: true,
    filterable:false,
    flex: 2,
    headerClassName: 'super-app-theme--header',
    valueGetter: (params) => {
        if (!params.row.EndDate) return '';
        const date = new Date(params.row.EndDate);
        return `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1).toString().padStart(2, '0')}-${date.getUTCDate().toString().padStart(2, '0')} ${date.getUTCHours().toString().padStart(2, '0')}:${date.getUTCMinutes().toString().padStart(2, '0')}:${date.getUTCSeconds().toString().padStart(2, '0')}`;
      },
  },
  {
    field: "TotalDistance",
    headerName: "航行浬程",
    type: "number",
    editable: false,
    minWidth: 95,
    headerClassName: 'super-app-theme--header',
    flex: 0
  },
  {
    field: "DurationDays",
    headerName: "航行天數",
    type: "number",
    editable: false,
    headerClassName: 'super-app-theme--header',
    minWidth: 95,
    flex: 0
  },
  {
    field: "DurationHours",
    headerName: "航行時數",
    type: "number",
    editable: false,
    headerClassName: 'super-app-theme--header',
    minWidth: 95,
    flex: 0
  },
  {
    field: "FarestDistance",
    headerName: "離岸最遠",
    type: "number",
    editable: false,
    headerClassName: 'super-app-theme--header',
    flex: 0,
    minWidth: 95,
  },
];

const StyledGridOverlay = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  '& .ant-empty-img-1': {
    fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
  },
  '& .ant-empty-img-2': {
    fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
  },
  '& .ant-empty-img-3': {
    fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
  },
  '& .ant-empty-img-4': {
    fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
  },
  '& .ant-empty-img-5': {
    fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
    fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
  },
}));

function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        style={{ flexShrink: 0 }}
        width="240"
        height="200"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>資料庫沒有符合您搜尋的航次資料</Box>
    </StyledGridOverlay>
  );
}
export default function CruiseTable({cruiseData }) {
  
    if (!cruiseData || cruiseData.length === 0) {
        return (
          <Box sx={{'& .super-app-theme--header': {
            backgroundColor: 'rgba(219, 235, 250,0.55)',
          },
          }}>
            <DataGrid
              autoHeight
              rows={[]}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableRowSelectionOnClick
              slots={{ noRowsOverlay: CustomNoRowsOverlay }}
              sx={{ '--DataGrid-overlayHeight': '400px' }}
            />
          </Box>
        );
      }
      return(
    <Box 
      sx={{'& .super-app-theme--header': {
        backgroundColor: 'rgba(219, 235, 250,0.55)',
      }}}>
      <DataGrid
        autoHeight 
        rows={cruiseData.map((row, index) => ({
          id: index,
          ShipName: row.CruiseBasicData.ShipName,
          CruiseID: `${row.CruiseBasicData.ShipName}${row.CruiseBasicData.CruiseID}`,
          LeaderName: row.CruiseBasicData.LeaderName,
          ExploreOcean: row.CruiseBasicData.ExploreOcean,
          StartDate: row.CruiseBasicData.StartDate,
          EndDate: row.CruiseBasicData.EndDate,
          TotalDistance: row.CruiseBasicData.TotalDistance,
          DurationDays: row.CruiseBasicData.DurationDays,
          DurationHours: row.CruiseBasicData.DurationHours,
          FarestDistance: row.CruiseBasicData.FarestDistance,
        }))}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableRowSelectionOnClick
        localeText={{ noRowsLabel: '資料庫沒有符合您搜尋的航次資料' }}
      />
    </Box>
  );
}
