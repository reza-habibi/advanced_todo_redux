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
import { Form } from "react-bootstrap";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
} from "react-icons/md";
import TableBodyRow from "./TableBodyRow/TableBodyRow";
import { TSortedList, TTask } from "../../Types";
import { useSelector, useDispatch } from "react-redux";
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
    setCopyTask(Tasks);
  }, [Tasks]);

  const [copyTask, setCopyTask] = useState(Tasks);
  const [taskData, setTaskData] = useState([...Tasks]);
  const [sortedList, setSortedList] = useState<TSortedList>({
    priority: 0,
    status: 0,
    deadline: 0,
  });
  const [paginationValue, setPaginationValue] = useState<number>(0);
  const [pageCounts, setPageCounts] = useState<number>(1);
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

  function paginationChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setPaginationValue(parseFloat(e.target.value));
  }

  useEffect(() => {
    paginationValue !== 0
      ? setPageCounts(Tasks.length / paginationValue)
      : setPageCounts(1);
    setTaskData([...taskData]);
  }, [paginationValue]);

  const pageNumberUp = () => {
    pageNumber * paginationValue < taskData.length &&
      setPageNumber(pageNumber + 1);
  };
  const pageNumberDown = () => {
    pageNumber > 1 && setPageNumber(pageNumber - 1);
  };

  useEffect(() => {
    setTaskData([...Tasks]);

    if (
      props.filters.priority === 0 &&
      props.filters.status === 0 &&
      props.filters.deadline === 0
    ) {
      setTaskData([...Tasks]);
    } else if (
      props.filters.priority !== 0 &&
      props.filters.status === 0 &&
      props.filters.deadline === 0
    ) {
      setTaskData(
        copyTask.filter(
          (item: { priority: number }) =>
            item.priority === props.filters.priority
        )
      );
    } else if (
      props.filters.status !== 0 &&
      props.filters.priority === 0 &&
      props.filters.deadline === 0
    ) {
      setTaskData(
        copyTask.filter(
          (item: { status: number }) => item.status === props.filters.status
        )
      );
    } else if (
      props.filters.deadline !== 0 &&
      props.filters.priority === 0 &&
      props.filters.status === 0
    ) {
      setTaskData(filteredByDeadline());
    } else if (
      props.filters.priority !== 0 &&
      props.filters.status !== 0 &&
      props.filters.deadline === 0
    ) {
      setTaskData(
        copyTask
          .filter(
            (item: { priority: number }) =>
              item.priority === props.filters.priority
          )
          .filter(
            (item: { status: number }) => item.status === props.filters.status
          )
      );
    } else if (
      props.filters.priority !== 0 &&
      props.filters.status === 0 &&
      props.filters.deadline !== 0
    ) {
      setTaskData(
        filteredByDeadline().filter(
          (item: { priority: number }) =>
            item.priority === props.filters.priority
        )
      );
    } else if (
      props.filters.priority === 0 &&
      props.filters.status !== 0 &&
      props.filters.deadline !== 0
    ) {
      setTaskData(
        filteredByDeadline().filter(
          (item: { status: number }) => item.status === props.filters.status
        )
      );
    } else if (
      props.filters.priority !== 0 &&
      props.filters.status !== 0 &&
      props.filters.deadline !== 0
    ) {
      setTaskData(
        filteredByDeadline()
          .filter(
            (item: { priority: number }) =>
              item.priority === props.filters.priority
          )
          .filter(
            (item: { status: number }) => item.status === props.filters.status
          )
      );
    }
  }, [props.filters]);

  const filteredByDeadline: any = () => {
    if (props.filters.deadline === 1) {
      return copyTask.filter(
        (item: { deadline: any }) =>
          item.deadline < new Date(Date.now() + 1000 * 60 * 60 * 24)
      );
    } else if (props.filters.deadline === 2) {
      return copyTask.filter(
        (item: { deadline: any }) =>
          item.deadline === new Date(Date.now() + 1000 * 60 * 60 * 24)
      );
    } else if (props.filters.deadline === 3) {
      return copyTask.filter(
        (item: { deadline: any }) =>
          item.deadline > new Date(Date.now() + 1000 * 60 * 60 * 24)
      );
    }
  };

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
      <div className={"w-100 d-flex justify-content-end"}>
        <div
          className={
            "pagination-div w-25 d-flex justify-content-around align-items-center"
          }
        >
          <label htmlFor={"pagination-select"}>Rows per page :</label>
          <Form.Control
            as="select"
            id={"pagination-select"}
            className={"border-0 border-bottom-3"}
            custom
            onChange={paginationChange}
          >
            <option value={0}>All</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </Form.Control>
          {paginationValue !== 0 && (
            <div>
              {pageNumber * paginationValue - paginationValue + 1}-
              {pageNumber * paginationValue} / page : {pageNumber}
            </div>
          )}
          <MdKeyboardArrowLeft
            className={"display-6"}
            onClick={pageNumberDown}
          ></MdKeyboardArrowLeft>
          <MdKeyboardArrowRight
            className={"display-6"}
            onClick={pageNumberUp}
          ></MdKeyboardArrowRight>
        </div>
      </div>
    </TableContainer>
  );
}
