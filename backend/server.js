const express = require("express");
const app = express();

const port = process.env.PORT || 8080;
const cors = require("cors");
let corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));

require("dotenv").config();
const mysql = require("mysql2");
let address;
app.get("/", (req, res) => {
  res.send("Hello, Express");
});

app.listen(port, () => {
  console.log("포트 " + port + "번에서 실행중");
});

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
});

// RDS에 접속합니다.
connection.connect(function (err) {
  if (err) {
    throw err; // 접속에 실패하면 에러를 throw 합니다.
  } else {
    // 접속시 쿼리를 보냅니다."
    console.log("데이터베이스 접속에 성공하였습니다.");
  }
});

app.get("/spot", async (req, res) => {
  const query = "SELECT * FROM chajeungna.spot;";
  try {
    const result = await connection.promise().query(query);
    res.json(result[0]);
  } catch (err) {
    res.status(400).json({ text: "ErrorCode:400, 잘못된 요청입니다." });
    console.error(err);
  }
});

app.get(`/parkingspot/:name`, async (req, res) => {
  const spotName = req.params.name;
  const createViewQuery = `CREATE OR REPLACE VIEW spot_parking AS
    SELECT *
    FROM (
      SELECT spot.spot_name AS spot_name, parking.parking_name AS parking_name, parking.parking_latitude as latitude, parking.parking_longitude as longitude, parking.parking_address AS parking_address, 
        st_distance_sphere(POINT(spot.spot_longitude, spot.spot_latitude), POINT(parking.parking_longitude, parking.parking_latitude)) AS distance
      FROM spot, parking
      WHERE spot.spot_name = "${spotName}"
    ) AS sub_parking
    NATURAL JOIN parking_detail
    NATURAL JOIN price
    WHERE distance <= 1500`;

  const selectQuery = `select parking_name, latitude, longitude,distance,
  ifnull(basic_charge + ceil((60 - basic_time) / additional_unit_time) * additional_charge, basic_charge) as charge
  from spot_parking;`;

  try {
    await connection.promise().query(createViewQuery);
    const result = await connection.promise().query(selectQuery);
    res.json(result[0]);
  } catch (err) {
    res.status(400).json({ text: "ErrorCode:400, 잘못된 요청입니다." });
    console.error(err);
  }
});
app.get("/parkingdetail/average", async (req, res) => {
  const query = `select round(avg(basic_charge + ceil((60 - basic_time) / additional_unit_time) * additional_charge)) as average
  from spot_parking
  where free = 0`;
  try {
    const result = await connection.promise().query(query);

    res.json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ text: "ErrorCode:400, 잘못된 요청입니다." });
  }
});
app.get("/filterinfo", async (req, res) => {
  const query = `select min(ifnull(basic_charge + ceil((60 - basic_time) / additional_unit_time) * additional_charge, basic_charge)) as min, 
  max(ifnull(basic_charge + ceil((60 - basic_time) / additional_unit_time) * additional_charge, basic_charge)) as max
  from spot_parking where free = 0 or free =1 `;
  try {
    const result = await connection.promise().query(query);
    res.json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ text: "ErrorCode:400, 잘못된 요청입니다." });
  }
});
app.get("/filterinfo/info?", async (req, res) => {
  const day = req.params.day;
  const distance = req.query.distance;
  const min = req.query.min;
  const max = req.query.max;
  const ev = req.query.ev;
  console.log(day, distance, min, max, ev);
  const query = `select *
  from spot_parking
  where distance <= ${distance} and ${
    day == 0 ? `weekday_oper = 1` : `(saturday_oper = 1 or holiday_oper = 1)`
  } and ${
    ev == 1 ? "parking_name in (select parking_name from ev_charger) and" : ""
  }ifnull(basic_charge + ceil((60 - basic_time) / additional_unit_time) * additional_charge, basic_charge) between ${min} and ${max} and (free = 0 or free = 1); `;
  try {
    const result = await connection.promise().query(query);
    res.json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ text: "ErrorCode:400, 잘못된 요청입니다." });
  }
});

// 계속 호출해서 값더이상 없을 때까지 부르고 계속 누적해서 데이터 가지고 있다가 더이상 안나오면 그만 !!

const request = require("request-promise");
const APIKEY = encodeURIComponent("696e56735072657639375a51534b6f");

const callopenApi = async (parkingAddressInfo) => {
  try {
    const encodedAddress = encodeURIComponent(parkingAddressInfo);
    const url = `http://openapi.seoul.go.kr:8088/${APIKEY}/json/GetParkingInfo/1/1000/${encodedAddress}`;
    const body = await request(url);
    const json_data = JSON.parse(body).GetParkingInfo;
    return json_data;
  } catch (error) {
    console.error(error);
  }
};

app.get("/currentinfo/:address/:name", async (req, res) => {
  const address = req.params.address;
  const parkingName = req.params.name;
  const partialResult = await callopenApi(address);
  const createViewQuery = `CREATE OR REPLACE VIEW cur_parking_db AS
  SELECT *
  FROM JSON_TABLE('${JSON.stringify(partialResult.row)}', '$[*]'
    COLUMNS(
      parking_name  varchar(255) PATH '$.PARKING_NAME', 
      capacity int PATH '$.CAPACITY',
      cur_parking int PATH '$.CUR_PARKING',
      cur_parking_time varchar(255) PATH '$.CUR_PARKING_TIME',
      latitude decimal(8, 6) PATH '$.LAT',
      longitude decimal(9, 6) PATH '$.LNG'
    )
  ) AS jt`;
  const selectQuery = `with selected_parking as(
    select *
      from spot_parking
      where parking_name = '${parkingName}'
  )
  
  select 
    case
      when (sum(cur_parking) >= 0) then sum(cur_parking)
      else '정보 미제공'
    end as cur_parking,
    parking.capacity
  from 
    (
      select parking_name, max(cur_parking) as cur_parking, cur_parking_time
          from cur_parking_db
          group by parking_name
    ) as cur_parking
  right join
  selected_parking as parking
  on convert(cur_parking.parking_name using utf8) like concat('%', parking.parking_name,'%') or parking.parking_name like concat('%', convert(cur_parking.parking_name using utf8), '%')
  group by parking.parking_name;`;

  try {
    await connection.promise().query(createViewQuery);
    const result = await connection.promise().query(selectQuery);
    res.json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ text: "ErrorCode:400, 잘못된 요청입니다." });
  }
});
app.get("/detail/:name", async (req, res) => {
  const parkingName = req.params.name;
  const query = `with selected_parking as(
    select *
      from spot_parking
      where parking_name = '${parkingName}'
  )
  
  select 
    parking.parking_name, 
    parking_address, 
    parking.distance, 
    case 
      when (weekday_oper = 1) then concat('평일 운영 : ', date_format(weekday_start, '%H:%i'), ' ~ ', date_format(weekday_end, '%H:%i'))
      else '평일 미운영'
    end as weekday_oper_info,
    case
      when (saturday_oper = 1) then concat('토요일 운영 : ', date_format(saturday_start, '%H:%i'), ' ~ ', date_format(saturday_end, '%H:%i'))
      else '토요일 미운영'
    end as saturday_oper_info, 
    case
      when (holiday_oper = 1) then concat('공휴일 운영 : ', date_format(holiday_start, '%H:%i'), ' ~ ', date_format(holiday_end, '%H:%i'))
      else '공휴일 미운영'
    end as holiday_oper_info,
    oper_status,
    case
      when (ev_charger_ = 1) then 1
      else 0
    end as ev_charger_,
    case
      when (phone_no like '02-%') then phone_no
      else '정보 미제공'
    end as phone_no,
    parking.free,
    concat(basic_charge, '원 / ', basic_time, '분') as basic_charge,
    case 
      when free = 0 then concat(additional_charge, '원 / ', additional_unit_time, '분')
      else null
    end as additional_charge
  from (
      select *,
        case
          when (selected_parking.parking_name in (select ev_charger.parking_name from ev_charger)) then True
                  else False
        end as ev_charger_
      from selected_parking
      natural join parking_detail
    ) as parking;
  `;
  try {
    const result = await connection.promise().query(query);
    res.json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ text: "ErrorCode:400, 잘못된 요청입니다." });
  }
});
