import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Table } from "reactstrap";
import {
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import { GrSearch } from "react-icons/gr";

function AdminAttendance() {
  let [attendance, setAttendance] = useState();
  console.log("AdminAttendance ~ attendance:", attendance);
  let [search, setSearch] = useState();
  let [filterSearch, setFilterSearch] = useState();

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8000/attendance/admin/getAll",
    }).then((res) => {
      console.log("res", res);
      setAttendance(res?.data);
    });
  }, []);

  useEffect(() => {
    const searchData = attendance?.filter((e) => {
      const firstNamefilter = e?.userId?.firstname
        ?.toLowerCase?.()
        ?.includes?.(search?.toLowerCase?.());

      const lastNameFilter = e?.userId?.lastname
        ?.toLowerCase?.()
        ?.includes?.(search?.toLowerCase?.());

      // const dateFilter = e?.attendanceRecords?.filter((e) => {
      //   return e?.date?.toLowerCase?.()?.includes?.(search?.toLowerCase?.());
      // });

      return firstNamefilter || lastNameFilter;
    });

    setFilterSearch(searchData);
  }, [search, attendance]);

  return (
    <>
      <div className="py-24 min-h-screen admin bg-[#EBF3FC] ms-52 globle">
        <Container>
          <div className="pt-[45px] pb-[32px] globle-breadcum">
            <h1 className="head">Attendence Data's</h1>
          </div>
          <div className="searchbar w-full flex justify-between globle-search">
            <div className="pos">
              <input
                className="input ps-3"
                type="text"
                value={search}
                placeholder="Search Here"
                onChange={(e) => setSearch(e?.target?.value)}
              />
              <GrSearch className="icon" />
            </div>
          </div>
          <TableContainer>
            <Table variant="simple">
              <thead>
                <tr>
                  <th>Sr</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                </tr>
              </thead>
              <tbody>
                {(search ? filterSearch : attendance)?.map((e, i) => {
                  return (
                    <tr key={`${e?.userId?._id}-${i}`}>
                      <td>{i + 1}</td>
                      <td className="capitalize font-semibold">
                        {e?.userId?.firstname} {e?.userId?.lastname}
                      </td>
                      <td>
                        {e?.attendanceRecords?.map((e, i) => {
                          return <div key={i}>{e?.date}</div>;
                        })}
                      </td>
                      <td>
                        {e?.attendanceRecords?.map((e, i) => {
                          return (
                            <div key={i}>
                              {e?.checkIn?.map((e, i) => {
                                return (
                                  <tr key={i}>
                                    <td>{e}</td>
                                  </tr>
                                );
                              })}
                            </div>
                          );
                        })}
                      </td>
                      <td>
                        {e?.attendanceRecords?.map((e, i) => {
                          return (
                            <div key={i}>
                              {e?.checkOut?.map((e, i) => {
                                return (
                                  <tr key={i}>
                                    <td>{e}</td>
                                  </tr>
                                );
                              })}
                            </div>
                          );
                        })}
                      </td>
                      {/* <td>
                        {e?.attendanceRecords?.map((e, i) => {
                          return <div key={i}>{e?.status}</div>;
                        })}
                      </td>
                      <td>
                        <Button
                          colorScheme="facebook"
                          onClick={() => attendanceHandler()}
                        >
                          Mark As Absent
                        </Button>
                      </td> */}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </TableContainer>
        </Container>
      </div>
    </>
  );
}

export default AdminAttendance;
