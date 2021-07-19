/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
} from "react-icons/md";
import TableBodyRow from "./TableBodyRow/TableBodyRow";
import { TSortedList, TTask } from "../../Types";
import { DateObject } from "react-multi-date-picker";
import { useSelector, useDispatch } from "react-redux";
import TablePagination from "./TablePagination/TablePagination";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function BasicTable(props: any) {
  const Tasks = useSelector((state: any) => state);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [sort, setSort] = useState("");

  useEffect(() => {
    setTaskData(Tasks);
  }, [Tasks]);

  const [taskData, setTaskData] = useState([...Tasks]);
  const [sortedList, setSortedList] = useState<TSortedList>({
    priority: 0,
    status: 0,
    deadline: 0,
  });
  const [paginationValue, setPaginationValue] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function changeSortButton(sort: string) {
    setSort(sort);
    if (sort === "priority" && sortedList.priority < 2) {
      setSortedList({
        priority: sortedList.priority + 1,
        status: 0,
        deadline: 0,
      });
    } else if (sort === "status" && sortedList.status < 2) {
      setSortedList({
        priority: 0,
        status: sortedList.status + 1,
        deadline: 0,
      });
    } else if (sort === "deadline" && sortedList.deadline < 2) {
      setSortedList({
        priority: 0,
        status: 0,
        deadline: sortedList.deadline + 1,
      });
    } else {
      setSortedList({
        priority: 0,
        status: 0,
        deadline: 0,
      });
    }
  }

  useEffect(() => {
    if (
      sortedList.priority === 1 ||
      sortedList.status === 1 ||
      sortedList.deadline === 1
    ) {
      dispatch({ type: "Sort_Down", payload: sort });
    } else if (
      sortedList.priority === 2 ||
      sortedList.status === 2 ||
      sortedList.deadline === 2
    ) {
      dispatch({ type: "Sort_Up", payload: sort });
    } else {
      dispatch({ type: "Not_Sort", payload: Tasks });
    }
  }, [sortedList, sort]);

  function handleEdit(index: number) {
    props.setOpen(true);
    props.setValue(Tasks.find((item: { id: number }) => item.id === index));
    props.setEditMode(true);
  }

  function handleView(index: number) {
    props.setOpen(true);

    props.setValue(Tasks.find((item: { id: number }) => item.id === index));
    props.setViewMode(true);
  }

  useEffect(() => {
    let _tempData = [...Tasks];
    if (props.filters.priority !== 0) {
      _tempData = [
        ..._tempData.filter((item) => item.priority === props.filters.priority),
      ];
    }

    if (props.filters.status !== 0) {
      _tempData = [
        ..._tempData.filter((item) => item.status === props.filters.status),
      ];
    }

    if (props.filters.deadline !== 0) {
      if (props.filters.deadline === 1) {
        _tempData = [
          ..._tempData.filter(
            (item: { deadline: any }) =>
              item.deadline.dayOfBeginning <
              new DateObject({ calendar: "persian" }).dayOfBeginning
          ),
        ];
      } else if (props.filters.deadline === 2) {
        _tempData = [
          ..._tempData.filter(
            (item: { deadline: any }) =>
              item.deadline.dayOfBeginning ===
              new DateObject({ calendar: "persian" }).dayOfBeginning
          ),
        ];
      } else if (props.filters.deadline === 3) {
        _tempData = [
          ..._tempData.filter(
            (item: { deadline: any }) =>
              item.deadline.dayOfBeginning >
              new DateObject({ calendar: "persian" }).dayOfBeginning
          ),
        ];
      } else {
        _tempData = [..._tempData];
      }
    }

    setTaskData([..._tempData]);
  }, [props.filters]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              style={{ borderRight: "1px solid rgba(224, 224, 224, 1)" }}
            >
              Task
            </TableCell>
            <TableCell
              style={{ cursor: "pointer" }}
              align="center"
              onClick={() => changeSortButton("priority")}
            >
              Priority
              {sortedList.priority === 2 ? (
                <MdKeyboardArrowUp size={20} />
              ) : sortedList.priority === 1 ? (
                <MdKeyboardArrowDown size={20} />
              ) : (
                <MdKeyboardArrowLeft size={20} />
              )}
            </TableCell>
            <TableCell
              style={{ cursor: "pointer" }}
              align="center"
              onClick={() => changeSortButton("status")}
            >
              Status
              {sortedList.status === 0 ? (
                <MdKeyboardArrowLeft size={20} />
              ) : sortedList.status === 1 ? (
                <MdKeyboardArrowDown size={20} />
              ) : (
                <MdKeyboardArrowUp size={20} />
              )}
            </TableCell>
            <TableCell
              style={{ cursor: "pointer" }}
              align="center"
              onClick={() => changeSortButton("deadline")}
            >
              Deadline
              {sortedList.deadline === 0 ? (
                <MdKeyboardArrowLeft size={20} />
              ) : sortedList.deadline === 1 ? (
                <MdKeyboardArrowDown size={20} />
              ) : (
                <MdKeyboardArrowUp size={20} />
              )}
            </TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {taskData
            .filter((item: TTask) =>
              item.task.toLowerCase().includes(props.filter.toLowerCase())
            )
            // eslint-disable-next-line array-callback-return
            .map((item: TTask, index: number) => {
              if (paginationValue !== 0) {
                if (
                  pageNumber * paginationValue - paginationValue <= index &&
                  index < pageNumber * paginationValue
                ) {
                  return (
                    <TableBodyRow
                      key={index}
                      id={item.id}
                      task={item.task}
                      priority={item.priority}
                      status={item.status}
                      deadline={item.deadline}
                      handleView={handleView}
                      handleEdit={handleEdit}
                    />
                  );
                }
              } else {
                return (
                  <TableBodyRow
                    key={index}
                    id={item.id}
                    task={item.task}
                    priority={item.priority}
                    status={item.status}
                    deadline={item.deadline}
                    handleView={handleView}
                    handleEdit={handleEdit}
                  />
                );
              }
            })}
        </TableBody>
      </Table>
      <TablePagination
        taskData={taskData}
        setTaskData={setTaskData}
        paginationValue={paginationValue}
        setPaginationValue={setPaginationValue}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </TableContainer>
  );
}
