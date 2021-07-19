import { Edit, Delete, Visibility } from "@material-ui/icons";
import { TableCell, TableRow, Chip } from "@material-ui/core";
import { DateObject } from "react-multi-date-picker";

import { useDispatch } from "react-redux";

function TableBodyRow({
  id,
  task,
  priority,
  status,
  deadline,
  handleEdit,
  handleView,
}: any) {
  const dispatch = useDispatch();
  const handleRemove = (id: number) => {
    dispatch({ type: "Remove_Todo", payload: id });
  };
  return (
    <TableRow>
      <TableCell
        component="th"
        scope="row"
        style={{
          borderRight: "1px solid rgba(224, 224, 224, 1)",
        }}
      >
        {task}
      </TableCell>
      <TableCell align="center">
        <Chip
          label={priority === 3 ? "High" : priority === 2 ? "Medium" : "Low"}
          color={
            priority === 3
              ? "secondary"
              : priority === 2
              ? "primary"
              : "default"
          }
        />
      </TableCell>
      <TableCell align="center">
        <Chip
          label={status === 3 ? "Done" : status === 2 ? "Doing" : "Todo"}
          color={
            status === 3 ? "secondary" : status === 2 ? "primary" : "default"
          }
        />
      </TableCell>
      <TableCell align="center">
        <Chip
          label={
            deadline
              ? `${deadline.year}/${deadline.month}/${deadline.day}`
              : null
          }
          color={
            deadline.dayOfBeginning >=
            new DateObject({ calendar: "persian" }).dayOfBeginning
              ? "primary"
              : "secondary"
          }
          variant="outlined"
        />
      </TableCell>
      <TableCell align="center">
        <div className="icons w-50 d-flex justify-content-between align-item-center mx-auto">
          <Visibility onClick={() => handleView(id)} />
          <Edit onClick={() => handleEdit(id)} />
          <Delete
            onClick={() => handleRemove(id)}
            style={{ cursor: "pointer" }}
          />
        </div>
      </TableCell>
    </TableRow>
  );
}

export default TableBodyRow;
