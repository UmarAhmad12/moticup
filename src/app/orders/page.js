"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import DataTable from "../../components/datatable";
import Modal from "../../components/modal";

function Order() {
  const [products, setProducts] = useState([
    {
      id: 1,
      orderId: "001",
      title: "Title 1",
      client: "Client A",
      date: "2024-07-25",
      status: "Delivered",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    orderId: "",
    title: "",
    client: "",
    date: "",
    status: "Delivered",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleAddNewProduct = () => {
    setIsModalOpen(true);
    setIsEditing(false);
    setNewProduct({
      orderId: "",
      title: "",
      client: "",
      date: "",
      status: "Delivered",
    });
  };

  const handleSaveProduct = () => {
    if (isEditing) {
      setProducts(
        products.map((product) =>
          product.id === newProduct.id ? newProduct : product
        )
      );
    } else {
      const maxId = products.reduce(
        (max, product) => Math.max(max, product.id),
        0
      );
      setProducts([...products, { id: maxId + 1, ...newProduct }]);
    }
    setIsModalOpen(false);
    setNewProduct({
      orderId: "",
      title: "",
      client: "",
      date: "",
      status: "Delivered",
    });
  };

  const handleEditProduct = (product) => {
    setIsModalOpen(true);
    setIsEditing(true);
    setNewProduct(product);
  };

  const handleDeleteProduct = (product) => {
    setProducts(products.filter((p) => p.id !== product.id));
  };

  const columns = [
    { Header: "#", accessor: "id" },
    { Header: "Order ID", accessor: "orderId" },
    { Header: "Title", accessor: "title" },
    { Header: "Client", accessor: "client" },
    { Header: "Date", accessor: "date" },
    { Header: "Status", accessor: "status" },
  ];

  return (
    <>
      <div className="min-h-[90vh]">
        <div className="flex justify-between items-center p-4">
          <div className="text-black font-bold text-2xl p-2">All Orders</div>
          <div className="flex gap-1">
            <Button onClick={handleAddNewProduct} className="bg-blue-950">
              Add New Order
            </Button>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={products}
          editUrl={handleEditProduct}
          onDelete={handleDeleteProduct}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg transform transition-all duration-300 ease-in-out scale-95 p-6 w-full max-w-sm">
            <div className="text-xl font-semibold mb-4">
              {isEditing ? "Edit Order" : "Add New Order"}
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Order ID"
                value={newProduct.orderId}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, orderId: e.target.value })
                }
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="text"
                placeholder="Title"
                value={newProduct.title}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, title: e.target.value })
                }
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="text"
                placeholder="Client"
                value={newProduct.client}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, client: e.target.value })
                }
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="date"
                placeholder="Date"
                value={newProduct.date}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, date: e.target.value })
                }
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <select
                value={newProduct.status}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, status: e.target.value })
                }
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="Placed">Placed</option>
                <option value="Accepted">Accepted</option>
                <option value="Processing">Processing</option>
                <option value="Dispatched">Dispatched</option>
                <option value="Delivered">Delivered</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <Button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500"
              >
                Cancel
              </Button>
              <Button onClick={handleSaveProduct} className="bg-blue-950">
                {isEditing ? "Update" : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Order;
