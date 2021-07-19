/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Form } from "react-bootstrap";
import {
  MdKeyboardArrowLeft,

  MdKeyboardArrowRight,
} from "react-icons/md";
import { useEffect , useState } from "react";


function TablePagination({taskData,setTaskData,paginationValue,setPaginationValue,pageNumber,setPageNumber}:any) {

    const [pageCounts, setPageCounts] = useState<number>(1);


    function paginationChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setPaginationValue(parseFloat(e.target.value));
      }
    
      useEffect(() => {
        paginationValue !== 0
          ? setPageCounts(taskData.length / paginationValue)
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
  return (
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
  );
}

export default TablePagination;
