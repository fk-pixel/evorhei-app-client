import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useEffect, useState, useRef, useMemo } from "react";
import moment from "moment";
import { Container, Modal, Button } from "react-bootstrap";
import styled from "styled-components";
import { DataTableForm } from "./DataTableForm";
import { Portal } from "react-portal";
import { useAppContext } from "../../../context/AppContext";
//import { /* BrowserView, isMobile, */ MobileView } from "react-device-detect";

const initialList = {
  menge: 0,
  chargeNumber: "",
  material: "",
  id: "",
};

export default function DataTable() {
  // USE CONTEXT
  const appCtx = useAppContext();
  const ctxProps = useMemo(
    () => ({
      getUserListHandler: appCtx.getUserListHandler,
      userList: appCtx.userList,
      isLoading: appCtx.isLoading,
      deleteUserListHandler: appCtx.deleteUserListHandler,
      updateMaterialHandler: appCtx.updateMaterialHandler,
    }),
    [
      appCtx.getUserListHandler,
      appCtx.isLoading,
      appCtx.userList,
      appCtx.deleteUserListHandler,
      appCtx.updateMaterialHandler,
    ]
  );
  const [formEditValues, setFormEditValues] = useState(initialList);

  // Update action const
  const [showEditDialog, setshowEditDialog] = useState(false);
  const openEditDialog = (row) => {
    //console.log(row);
    setshowEditDialog(true);
    setFormEditValues({
      menge: row.menge,
      chargeNumber: row.chargenNumber,
      material: row.material,
      id: row._id,
    });
  };
  const closeListEditDialog = () => {
    setshowEditDialog(false);
    setFormEditValues(initialList);
  };

  // Delete action const
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [materialId, setMaterialId] = useState();
  const openDeleteDialog = (id) => {
    setMaterialId(id);
    setShowDeleteDialog(true);
  };
  const closeDeleteDialog = () => {
    setMaterialId(undefined);
    setShowDeleteDialog(false);
  };

  // If no data
  function indication() {
    return "No available data";
  }

  // Fetching all materials
  useEffect(() => {
    ctxProps.getUserListHandler();
  }, []);

  const updateMaterialHandler = (values) => {
    ctxProps.updateMaterialHandler(values);
    closeListEditDialog();
  };
  const deleteMaterialHandler = () => {
    ctxProps.deleteUserListHandler(materialId);
    closeDeleteDialog();
  };

  // Trigger click according to useRef
  const btnRef = useRef();
  const clickSubmitByRef = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const columns = [
    {
      dataField: "_id",
      text: "ID",
      sort: true,
      headerStyle: {
        lineHeight: "3rem",
        fontSize:"0.9rem"
      },
      style: {
        minWidth: "120px",
        fontSize: "0.8rem",
        padding: 0,
        left: 0,
        margin: 0,
        lineHeight: "2",
      },
    },
    {
      dataField: "material",
      text: "Materials",
      sort: true,
      headerStyle: {
        lineHeight: "3rem",
        fontSize:"0.9rem"
      },
      style: {
        minWidth: "120px",
        fontSize: "0.8rem",
        padding: 0,
        left: 0,
        margin: 0,
        lineHeight: "2",
      },
    },
    {
      dataField: "chargenNumber",
      text: "Ch.Nr",
      sort: true,
      headerStyle: {
        lineHeight: "3rem",
        fontSize:"0.9rem"
      },
      style: {
        minWidth: "120px",
        color: "var(--primary-color)",
        fontSize: "0.8rem",
        padding: 0,
        left: 0,
        margin: 0,
        lineHeight: "2",
      },
    },
    {
      dataField: "menge",
      text: "Menge",
      sort: true,
      headerStyle: {
        lineHeight: "3rem",
        fontSize:"0.9rem"
      },
      style: {
        minWidth: "120px",
        fontSize: "0.8rem",
        padding: 0,
        left: 0,
        margin: 0,
        lineHeight: "2",
      },
    },
    {
      dataField: "createdAt",
      text: "Date",
      sort: true,
      headerStyle: {
        width: "15vw",
        lineHeight: "3rem",
        fontSize:"0.9rem"
      },
      style: {
        minWidth: "120px",
        fontSize: "0.8rem",
        padding: 0,
        left: 0,
        margin: 0,
        lineHeight: "2",
        justifyContent:"center"
      },
      formatter: (cell) => {
        return `${moment(cell).format("LL HH:mm")}`;
      },
    },
    {
      dataField: "action",
      text: "Action",
      headerStyle: {
        lineHeight: "3rem",
        fontSize:"0.9rem"
      },
      style: {
        minWidth: "120px",
        lineHeight: "2",
      },
      formatter: (cellContent, row) => {
        return (
          <Icon>
            <i
              className="far fa-edit icon"
              id="update"
              onClick={() => openEditDialog(row)}
            ></i>
            <i
              className="m-2 far fa-trash-alt icon"
              id="delete"
              onClick={() => openDeleteDialog(row?._id)}
            ></i>
          </Icon>
        );
      },
    },
  ];

  const ModalContent = () => {
    return (
      <>
        <Portal node={document?.getElementById("root-portal")}>
          {/* Delete Modal */}
          <Modal show={showDeleteDialog} onHide={closeDeleteDialog}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Item Id: {materialId}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Möchten Sie dieses Element entfernen? </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeDeleteDialog}>
                Schliessen
              </Button>
              <Button variant="danger" onClick={deleteMaterialHandler}>
                Löschen
              </Button>
            </Modal.Footer>
          </Modal>
        </Portal>
        <Portal node={document?.getElementById("root-portal")}>
          {/* Edit Modal */}
          <Modal show={showEditDialog} onHide={closeListEditDialog}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Item Id: {formEditValues?.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <DataTableForm
                submitBtnRef={btnRef}
                initialValues={formEditValues}
                saveValues={updateMaterialHandler}
              />
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={closeListEditDialog}>
                Schliessen
              </Button>
              <Button variant="success" onClick={clickSubmitByRef}>
                Speichern
              </Button>
            </Modal.Footer>
          </Modal>
        </Portal>
      </>
    );
  };
  /* const stylesMobile = {
    fontSize: "0.8rem",
    padding: 0,
    left: 0,
    margin: 0,
    lineHeight: "2",
  }; */

  //console.log(ctxProps);
  return (
    <Container style={{ marginTop: "2rem", padding: "20px" }}>
      <ModalContent />
      {ctxProps.isLoading && <h4>Loading...</h4>}
      <h1>Item List</h1>

     {/*  <MobileView style={stylesMobile}> */}
        <BootstrapTable
          wrapperClasses="table-responsive"
          bootstrap4
          striped
          keyField="_id"
          data={ctxProps.userList ?? []}
          columns={columns}
          pagination={paginationFactory({ sizePerPage: 5 })}
          bordered={false}
          noDataIndication={indication}
        />
      {/* </MobileView> */}
    </Container>
  );
}

const Icon = styled.div`
  .icon {
    border: none;
    cursor: pointer;
    outline: none;
  }
  #update:hover {
    color: var(--primary-color);
  }
  #delete:hover {
    color: var(--btn-color-danger);
  }
`;
