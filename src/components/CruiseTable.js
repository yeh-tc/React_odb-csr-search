import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

const originalRows = [
  {
    CruiseBasicData: {
      ShipName: "OR1",
      CruiseID: "1242",
      LeaderName: "魏志潾",
      ExploreOcean: "龜山島周圍海域,西南海域",
      FarestDistance: 21,
      TotalDistance: 197,
      FuelConsumption: null,
      StartDate: "2019-10-15T10:00:00.000Z",
      EndDate: "2019-10-23T06:00:00.000Z",
      StartPort: "高雄港",
      EndPort: "高雄港",
      DurationDays: 9,
      DurationHours: 188,
      PlanName: "陸源/非陸原物質在高輸砂量之河-海運輸系統中的宿命整合研究",
      Technician: "陸慶榮、龔進成、溫大杰、葉海濤、葉啟田、薛玉誠",
      Remark:
        "1.2019/10/16-10:15 進高雄港維修機器,人員在船待命2.2019/10/17-17:30 出港作業(C001:10站10次;G003:8站19次複管沉積物收集器;C010:4站LANDER;B001:2站3次;P009:1站)",
    },
  },
  {
    CruiseBasicData: {
      ShipName: "OR1",
      CruiseID: "1199",
      LeaderName: "楊穎堅",
      ExploreOcean: "東部海域",
      FarestDistance: 177,
      TotalDistance: 797,
      FuelConsumption: null,
      StartDate: "2018-06-19T12:00:00.000Z",
      EndDate: "2018-06-25T05:00:00.000Z",
      StartPort: "高雄港",
      EndPort: "基隆港",
      DurationDays: 7,
      DurationHours: 137,
      PlanName:
        "1.黑潮研究計畫III(6/22-6/24 3天)及海嘯預警浮標系統建置(6/19-6/21 3天)。2.海洋研究所6/25 (1天)。",
      Technician:
        "陸慶榮、張志豪、龔進成、龔國安、溫大杰、葉海濤、葉啟田、薛玉誠",
      Remark:
        "1.因回收氣象局海氣浮標進港時間延後至06/25(P002:3站;P008:1站;C001:7站8次;B001:4站8次 ps:浮游生物網)",
    },
  },
  {
    CruiseBasicData: {
      ShipName: "OR1",
      CruiseID: "1178",
      LeaderName: "楊穎堅",
      ExploreOcean: "東部海域",
      FarestDistance: 105,
      TotalDistance: 783,
      FuelConsumption: null,
      StartDate: "2017-10-08T10:00:00.000Z",
      EndDate: "2017-10-13T19:00:00.000Z",
      StartPort: "高雄港",
      EndPort: "高雄港",
      DurationDays: 6,
      DurationHours: 129,
      PlanName: "1.黑潮研究計畫SK(III)。2.海氣象資料浮標計畫。",
      Technician: "陸慶榮、龔進成、龔國安、溫大杰、葉海濤、葉啟田、薛玉誠",
      Remark:
        "1.2017-10-12-12:30因熱帶氣旋生成作業區域風浪過大停止作業提前返高雄港。(P008:8站;C001:8站8次;B001:8站 ps:浮游生物網)",
    },
  },
];

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
    headerName: "探測海域 (航次名稱)",
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
    type: "dateTime",
    minWidth: 200,
    editable: false,
    flex: 2,
    valueGetter: (params) => { // Convert the date string to a Date object
        return params.row.StartDate ? new Date(params.row.StartDate) : null;
      },
      headerClassName: 'super-app-theme--header',
  },
  {
    field: "EndDate",
    headerName: "進港日期 (UTC+8)",
    type: "dateTime",
    minWidth: 200,
    editable: false,
    flex: 2,
    valueGetter: (params) => {
      // Convert the date string to a Date object
      return params.row.EndDate ? new Date(params.row.EndDate) : null;
    },
    headerClassName: 'super-app-theme--header',
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

const transformedRows = originalRows.map((row, index) => ({
  id: index,
  CruiseID: `${row.CruiseBasicData.ShipName}${row.CruiseBasicData.CruiseID}`,
  LeaderName: row.CruiseBasicData.LeaderName,
  ExploreOcean: row.CruiseBasicData.ExploreOcean,
  StartDate: new Date(row.CruiseBasicData.StartDate),
  EndDate: new Date(row.CruiseBasicData.EndDate),
  TotalDistance: row.CruiseBasicData.TotalDistance,
  DurationDays: row.CruiseBasicData.DurationDays,
  DurationHours: row.CruiseBasicData.DurationHours,
  FarestDistance: row.CruiseBasicData.FarestDistance,
}));
export default function CruiseTable() {
  return (
    <Box 
      sx={{'& .super-app-theme--header': {
        backgroundColor: 'rgba(219, 235, 250,0.55)',
      },}}>
      <DataGrid
        autoHeight
        rows={transformedRows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableRowSelectionOnClick
        
      />
    </Box>
  );
}
