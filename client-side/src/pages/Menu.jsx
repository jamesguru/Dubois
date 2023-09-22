import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import QRCode from "react-qr-code";
import { logOut } from "../redux/userRedux";
import { DataGrid } from "@material-ui/data-grid";
import JsPDF from "jspdf";
import "../styles/menu.css";
import { Publish } from "@material-ui/icons";
import { toast, ToastContainer } from "react-toastify";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import DashBoard from "./DashBoard";
import Seller from "./Seller";
import ProductsModal from "../components/ProductsModal";
import { useSelector, useDispatch } from "react-redux";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Products from "../components/Products";
import Product from "../components/Product";
import { backgroundservicesreq, publicRequest } from "../requestMethods";
import {
  FontDownload,
  DeleteOutline,
  DataUsageSharp,
} from "@material-ui/icons";
import Table from "react-bootstrap/Table";
import ProductDataGrid from "../components/ProductDataGrid";

const Container = styled.div`
  margin: 50px;
  font-weight: 900px;
`;

const Wrapper = styled.div`
  display: flex;

  padding: 5px;

  flex-wrap: wrap;

  margin: 10px;

  @media screen and (max-width: 600px) {
    margin: 10px;
  }
`;

const Left = styled.div`
  flex: 1;
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  margin: 20px;
`;
const Right = styled.div`
  flex: 4;
`;
const Button = styled.button`
  margin: 10px 0px;
  font-size: 15px;
  font-weight: 900;
  border: none;
  width: 200px;
  color: #dcca87;
  background-color: #0c0c0c;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Header = styled.h5`
  font-family: "Roboto";
`;
const Modal = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
`;
const Delete = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 20%;
  background-color: #fff;
  height: 100%;
  @media screen and (max-width: 600px) {
    width: 80%;
  }
`;
const Update = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 20%;
  background-color: #fff;
  height: 100%;
  @media screen and (max-width: 600px) {
    width: 80%;
  }
`;
const UpdateInfo = styled.div`
  margin: 20px;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
`;

const Cancel = styled.button`
  border: none;
  background-color: #aaa;
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
  margin-right: 20px;
`;
const Remove = styled.button`
  border: none;
  background-color: red;
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
  color: #fff;
`;
const Text = styled.span`
  font-size: 25px;
  font-weight: 900;
  margin: 30px;
`;
const Information = styled.div`
  margin-top: 400px;
  margin-left: 50px;
  text-align: left;
`;

const Promote = [];

const Menu = () => {
  const [open, setOpen] = React.useState(false);
  const [id, setID] = React.useState(null);
  const [option, setOption] = React.useState("");
  const [remove, setRemove] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const downloadRef = useRef(null);
  const [customer, setCustomer] = React.useState(false);
  const [promote, setPromote] = React.useState(false);
  const [data, setproducts] = React.useState([]);
  const [orders, setOrders] = React.useState([]);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const [inputs, setInputs] = React.useState({});

  const handleClick = () => {
    setOpen(true);
  };

  const handleOption = (e, choice, id) => {
    e.preventDefault();
    setOption(choice);
    setID(id);
    setRemove(true);
  };
  const handleOpenUpdate = (e, id) => {
    e.preventDefault();
    setUpdate(true);
  };

  const handlePromote = (product) => {
    setPromote(true);
    Promote.push(product);
  };

  const handleCustomer = (e) => {
    e.preventDefault();
    setCustomer(!customer);
  };
  const handleStatus = (status) => {
    if (status === 0) {
      return "pending";
    } else if (status === 1) {
      return "confirmed";
    } else if (status === 2) {
      return "Delivered";
    } else {
      return "Reviewed";
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setRemove(false);
  };
  const handleUpdate = async (id, status) => {
    try {
      await publicRequest.put(`/orders/${id}`, { status: status + 1 });

      window.location.reload();
    } catch (error) {
      console.log("update went wrong");
    }
  };
  const Delete = async (e) => {
    if (option === "product") {
      try {
        await publicRequest.delete(`/products/${id}`);
        window.location.reload();
      } catch (error) {}
    } else {
      try {
        await publicRequest.delete(`/orders/${id}`);
        window.location.reload();
      } catch (error) {}
    }
  };
  const sendPromote = async (e) => {
    console.log(Promote);
    e.preventDefault();
    if (Promote.length > 0) {
      await backgroundservicesreq.post("/promote/", { promote: Promote });
    }
    console.log(Promote);
  };

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(logOut());
    history.push("/seller");
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  console.log(inputs);

  const handleAddCustomer = (e) => {
    e.preventDefault();
    publicRequest.put(`/products/ratings/${id}`, inputs);
  };
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          `/products/shop/${user._id}/products`
        );

        setproducts(res.data);
      } catch (error) {}
    };

    getProducts();
  }, []);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await publicRequest.post(`/orders/seller/find/`, {
          email: user.email,
        });

        setOrders(res.data);
      } catch (error) {}
    };

    getOrders();
  }, []);

  const generatePDF = () => {
    const report = new JsPDF("landscape", "pt", "a3");
    report.html(document.querySelector(".prod")).then(() => {
      report.save("report.pdf");
    });
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },

    {
      field: "product",
      headerName: "Products",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img
              className="productListImg"
              src={params.row.img}
              alt=""
              height="100px"
              width="100px"
            />
            {params.row.title}
          </div>
        );
      },
    },

    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <button className="productListEdit">Edit</button>

            <DeleteOutline className="productListDelete" />
          </>
        );
      },
    },
  ];

  return (
    <Container>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="profile" title="Home">
          <Button onClick={generatePDF}>
            Print Pdf
            <Publish className="publish-icon" />
          </Button>

          <div>
            <Header>Shop:{user.seller}</Header>
            <Header>Location: {user.location}</Header>
            <Header>Address:{user.address}</Header>
            <Header>Telephone:{user.phone}</Header>
            <Wrapper>
              {data.map((item, index) => (
                <div className="prod">
                  <Product item={item} key={index} />
                </div>
              ))}
            </Wrapper>
          </div>
        </Tab>
        <Tab eventKey="home" title="Add Product">
          <DashBoard />
        </Tab>
        <Tab eventKey="manage" title="Manage">
          {promote && <Button onClick={sendPromote}>Promote</Button>}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Stock</th>
                <th>Promote</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="products">
                      <img src={product.img} alt="" />
                      <h5>{product.title}</h5>
                    </div>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      onClick={() => handlePromote(product)}
                    />
                  </td>
                  <td>
                    <button
                      className="updatebtn"
                      onClick={(e) => handleOpenUpdate(e, product._id)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <DeleteOutline
                      className="delete"
                      onClick={(e) => handleOption(e, "product", product._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="orders" title="Orders">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Orders</th>
                <th>Status</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {order.products.map((product) => (
                      <div className="products">
                        <img src={product.img} alt="" />
                        <h5>{product.title}</h5>
                      </div>
                    ))}

                    <div className="order">
                      <span>
                        <strong>Name:</strong>
                        {order.name}
                      </span>
                      <span>
                        <strong>TEL:</strong>
                        {order.phone}
                      </span>
                      <span>
                        <strong>Address:</strong>
                        {order.address}
                      </span>
                      <span>
                        <strong>EMAIL:</strong>
                        {order.email}
                      </span>
                      <span>
                        <strong>TOTAL:</strong>
                        {order.total}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span>{handleStatus(order.status)}</span>
                  </td>
                  <td>
                    {order.status < 2 ? (
                      <button
                        onClick={() => handleUpdate(order._id, order.status)}
                        style={{
                          backgroundColor: "teal",
                          color: "white",
                          cursor: "pointer",
                          border: "none",
                        }}
                        className="updatebtn"
                      >
                        next
                      </button>
                    ) : (
                      "Delivered"
                    )}
                  </td>
                  <td>
                    <DeleteOutline
                      className="delete"
                      onClick={(e) => handleOption(e, "order", order._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="contact" title="My Account">
          <h5>My Customers</h5>

          <Button onClick={handleCustomer}>New Customer</Button>
          {customer && (
            <div className="addcustomer">
              <input
                type="text"
                placeholder="Enter customer name"
                onChange={handleChange}
              />
              <input
                type="phone"
                placeholder="Enter customer phone"
                onChange={handleChange}
              />
              <input
                type="phone"
                placeholder="Enter customer email"
                onChange={handleChange}
              />
              <Button onClick={handleAddCustomer}>Submit</Button>
            </div>
          )}

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {data.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <h5>jameskagunga15@gmail.com</h5>
                  </td>
                  <td>
                    <span>0727632051</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="HpQrcode">
            <h5>Shop QR CODE</h5>

            <QRCode
              size={200}
              bgColor="white"
              fgColor="black"
              value={`https://www.duboisbeauty.co.ke/shop/${user._id}`}
              level="H"
            />
          </div>

          <Button onClick={handleLogout}>Logout</Button>
        </Tab>
      </Tabs>

      {remove && (
        <Modal>
          <Delete>
            <Information>
              <Text>Are you sure you want to delete?</Text>
              <Option>
                <Cancel onClick={handleCancel}>Cancel</Cancel>
                <Remove onClick={Delete}>Delete</Remove>
              </Option>
            </Information>
          </Delete>
        </Modal>
      )}

      {update && (
        <Modal>
          <Update>
            <UpdateInfo>
              <div className="update">
                <label htmlFor="file">Image</label>
                <div className="image-upload">
                  <img
                    src="https://cdn.pixabay.com/photo/2022/12/23/23/25/serum-7675105_640.jpg"
                    alt=""
                    height={200}
                    width={200}
                  />
                  <label for="file">
                    <Publish className="publish-icon" />
                  </label>
                </div>
                <label htmlFor="">Title</label>
                <input type="text" placeholder="Dr Rashel" />
                <label htmlFor="">Price</label>
                <input type="number" placeholder="ksh 500" />
                <label htmlFor="">Description</label>
                <textarea
                  placeholder="Lorem ipsum is derived from the Latin dolorem 
                ipsum roughly translated as pain itself. Lorem ipsum 
                presents the sample font and orientation of writing on 
                web pages and other software applications where content 
                is not the main concern of the developer."
                ></textarea>
                <label htmlFor="">Wholesale</label>
                <input type="number" placeholder="ksh 500" />
                <Button>Update</Button>
              </div>
            </UpdateInfo>
          </Update>
        </Modal>
      )}
    </Container>
  );
};

export default Menu;
