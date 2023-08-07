import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { publicRequest } from "../requestMethods";

const ProductDataGrid = () => {
  const [products, setproducts] = React.useState([]);
  React.useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(`/products`);

        setproducts(res.data);
      } catch (error) {}
    };

    getProducts();
  }, []);

  console.log(products);
  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Product",
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
    { field: "inStock", headerName: "Stock", width: 250 },

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
    <div>
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={20}
        checkboxSelection
      />
    </div>
  );
};

export default ProductDataGrid;
